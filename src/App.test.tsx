import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';

vi.mock('./data/bots', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./data/bots')>();
  return {
    ...actual,
    bots: [
      { id: 'martin', name: 'Martin', elo: 250, group: 'Beginner', imageUrl: 'fake-url' },
      { id: 'nelson', name: 'Nelson', elo: 1300, group: 'Intermediate', imageUrl: 'fake-url' }
    ]
  };
});

describe('App Component', () => {

  beforeEach(() => {
    // Mock Math.random to always return a predictable value (e.g., 0.5)
    // For a 100 element array, 0.5 will pick index 50
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    // We also need to mock requestAnimationFrame for the BotWheel to not hang/crash or wait forever
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(() => cb(0), 16) as unknown as number;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => clearTimeout(id as unknown as number));

    // Need to mock AudioContext for BotWheel
    class AudioContextMock {
      state = 'running';
      resume = vi.fn().mockResolvedValue(undefined);
      createBuffer = vi.fn().mockReturnValue({
        getChannelData: vi.fn().mockReturnValue(new Float32Array(100))
      });
      createBufferSource = vi.fn().mockReturnValue({
        buffer: null,
        connect: vi.fn(),
        start: vi.fn()
      });
      createBiquadFilter = vi.fn().mockReturnValue({
        type: '',
        frequency: { value: 0 },
        Q: { value: 0 },
        connect: vi.fn()
      });
      createGain = vi.fn().mockReturnValue({
        gain: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn()
        },
        connect: vi.fn()
      });
      destination = {};
      sampleRate = 44100;
      currentTime = 0;
    }
    window.AudioContext = AudioContextMock as unknown as typeof AudioContext;
    window.webkitAudioContext = AudioContextMock as unknown as typeof AudioContext;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  it('renders initial state correctly', async () => {
    render(<App />);
    expect(screen.getByText('Chess Bot Randomizer')).toBeInTheDocument();
    expect(screen.getByText('Spin to find your next opponent')).toBeInTheDocument();

    // Check controls
    expect(screen.getByLabelText('Min ELO')).toBeInTheDocument();
    expect(screen.getByLabelText('Max ELO')).toBeInTheDocument();

    const spinButton = screen.getByRole('button', { name: 'Spin' });
    expect(spinButton).toBeInTheDocument();
    expect(spinButton).not.toBeDisabled();

    // BotWheel updates stripBots in requestAnimationFrame, so we need to wait for it.
    // wait for Martin to be displayed
    const martinEl = await screen.findByText('Martin');
    expect(martinEl).toBeInTheDocument();
  });

  it('updates ELO limits correctly', async () => {
    render(<App />);

    const minSelect = screen.getByLabelText('Min ELO');
    const maxSelect = screen.getByLabelText('Max ELO');

    await userEvent.selectOptions(minSelect, '1000');
    expect(minSelect).toHaveValue('1000');

    await userEvent.selectOptions(maxSelect, '2000');
    expect(maxSelect).toHaveValue('2000');
  });

  it('handles spin functionality correctly', async () => {
    // Cannot easily use userEvent with fake timers when animations and microtasks are involved in a complex way.
    // So we use standard fireEvent or userEvent with real timers and wait.
    render(<App />);

    const spinButton = screen.getByRole('button', { name: 'Spin' });

    // Initial state
    expect(spinButton).not.toBeDisabled();

    // We mock Math.random to always pick a predictable bot, but here we just test spinning state
    vi.useFakeTimers({ shouldAdvanceTime: true });

    // Click spin
    await userEvent.click(spinButton);

    // Should be spinning
    expect(screen.getByRole('button', { name: 'Spinning...' })).toBeDisabled();

    // Advance timers by SPIN_DURATION_MS + 100
    act(() => {
      vi.advanceTimersByTime(4600);
    });

    // Should stop spinning
    expect(screen.getByRole('button', { name: 'Spin' })).not.toBeDisabled();

    vi.useRealTimers();
  });

  it('disables spin button when no bots match ELO range', async () => {
    render(<App />);

    const minSelect = screen.getByLabelText('Min ELO');
    const maxSelect = screen.getByLabelText('Max ELO');

    // We mocked the bots to only have 250 and 1300.
    // If we set min=1500 and max=2000, there will be no bots.
    await userEvent.selectOptions(maxSelect, '2000');
    await userEvent.selectOptions(minSelect, '1500');

    // Check if the button is disabled and the message appears
    const message = screen.getByText('No bots found in this ELO range.');
    const button = screen.getByRole('button', { name: 'Spin' });

    expect(message).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
