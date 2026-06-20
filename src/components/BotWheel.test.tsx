import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BotWheel } from './BotWheel';
import type { Bot } from '../data/bots';

// Mock Web Audio API
const mockAudioContext = {
  state: 'running',
  resume: vi.fn(),
  currentTime: 0,
  sampleRate: 44100,
  createBuffer: vi.fn().mockReturnValue({
    getChannelData: vi.fn().mockReturnValue(new Float32Array(4410)),
  }),
  createBufferSource: vi.fn().mockReturnValue({
    buffer: null,
    connect: vi.fn(),
    start: vi.fn(),
  }),
  createBiquadFilter: vi.fn().mockReturnValue({
    type: '',
    frequency: { value: 0 },
    Q: { value: 0 },
    connect: vi.fn(),
  }),
  createGain: vi.fn().mockReturnValue({
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
  }),
  destination: {},
};

describe('BotWheel Component', () => {
  const mockBots: Bot[] = [
    { id: 'bot1', name: 'Bot 1', elo: 1000, group: 'Beginner', imageUrl: 'url1.png' },
    { id: 'bot2', name: 'Bot 2', elo: 1200, group: 'Intermediate', imageUrl: 'url2.png', displayElo: '1200?' },
    { id: 'bot3', name: 'Bot 3', elo: 1500, group: 'Advanced', imageUrl: '' },
  ];

  beforeEach(() => {
    vi.stubGlobal('AudioContext', class {
      constructor() { return mockAudioContext; }
    });
    vi.stubGlobal('webkitAudioContext', class {
      constructor() { return mockAudioContext; }
    });

    // Mock requestAnimationFrame and cancelAnimationFrame
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => {
      return setTimeout(() => cb(performance.now()), 16);
    }));
    vi.stubGlobal('cancelAnimationFrame', vi.fn((id) => clearTimeout(id)));

    // Mock getComputedStyle
    vi.stubGlobal('getComputedStyle', vi.fn(() => ({
      transform: 'matrix(1, 0, 0, 1, 0, -200)',
    } as unknown as CSSStyleDeclaration)));

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a fallback message when no bots are available', () => {
    render(<BotWheel bots={[]} isSpinning={false} selectedBot={null} onSpinComplete={vi.fn()} />);
    expect(screen.getByText('No bots available.')).toBeInTheDocument();
  });

  it('renders the initial state with the first bot or selected bot', () => {
    render(<BotWheel bots={mockBots} isSpinning={false} selectedBot={mockBots[1]} onSpinComplete={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(20);
    });

    // Should display Bot 2 because it's the selectedBot on mount
    expect(screen.getByText('Bot 2')).toBeInTheDocument();
    expect(screen.getByText('1200?')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();

    // Test empty imageUrl path (placeholder)
    render(<BotWheel bots={mockBots} isSpinning={false} selectedBot={mockBots[2]} onSpinComplete={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(screen.getByText('Bot 3')).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument(); // Name starts with B -> 'B'
  });

  it('handles the spinning logic', () => {
    const onSpinCompleteMock = vi.fn();
    const { rerender } = render(
      <BotWheel bots={mockBots} isSpinning={false} selectedBot={null} onSpinComplete={onSpinCompleteMock} />
    );

    act(() => {
      vi.advanceTimersByTime(20);
    });

    // Initial bot is Bot 1
    expect(screen.getByText('Bot 1')).toBeInTheDocument();

    // Trigger spin
    rerender(
      <BotWheel bots={mockBots} isSpinning={true} selectedBot={mockBots[1]} onSpinComplete={onSpinCompleteMock} />
    );

    act(() => {
      vi.advanceTimersByTime(20);
    });

    // Since requestAnimationFrame immediately calls the callback, the component should update stripBots
    // We should see a lot of items in the strip, including Bot 1, and the selected Bot 2
    const items = screen.getAllByText(/Bot [1-3]/);
    expect(items.length).toBeGreaterThan(1);

    // Advance timers by SPIN_DURATION_MS (4500) + 100
    act(() => {
      vi.advanceTimersByTime(4600);
    });

    expect(onSpinCompleteMock).toHaveBeenCalledTimes(1);
  });
});
