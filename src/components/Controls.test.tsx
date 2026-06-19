import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Controls } from './Controls';
import userEvent from '@testing-library/user-event';

describe('Controls Component', () => {
  const defaultProps = {
    minElo: 500,
    maxElo: 1500,
    setMinElo: vi.fn(),
    setMaxElo: vi.fn(),
    onSpin: vi.fn(),
    isSpinning: false,
    hasValidBots: true,
  };

  it('renders correctly with default props', () => {
    render(<Controls {...defaultProps} />);
    expect(screen.getByLabelText('Min ELO')).toBeInTheDocument();
    expect(screen.getByLabelText('Max ELO')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Spin' })).toBeInTheDocument();
  });

  it('calls onSpin when the spin button is clicked', async () => {
    const onSpinMock = vi.fn();
    render(<Controls {...defaultProps} onSpin={onSpinMock} />);

    const spinButton = screen.getByRole('button', { name: 'Spin' });
    await userEvent.click(spinButton);

    expect(onSpinMock).toHaveBeenCalledTimes(1);
  });

  it('disables inputs and button when isSpinning is true', () => {
    render(<Controls {...defaultProps} isSpinning={true} />);

    expect(screen.getByLabelText('Min ELO')).toBeDisabled();
    expect(screen.getByLabelText('Max ELO')).toBeDisabled();

    const spinButton = screen.getByRole('button', { name: 'Spinning...' });
    expect(spinButton).toBeDisabled();
  });

  it('displays "Spinning..." text on button when isSpinning is true', () => {
    render(<Controls {...defaultProps} isSpinning={true} />);
    expect(screen.getByRole('button', { name: 'Spinning...' })).toBeInTheDocument();
  });

  it('disables the spin button when there are no valid bots', () => {
    render(<Controls {...defaultProps} hasValidBots={false} />);

    const spinButton = screen.getByRole('button', { name: 'Spin' });
    expect(spinButton).toBeDisabled();
  });

  it('displays an error message when there are no valid bots and not spinning', () => {
    render(<Controls {...defaultProps} hasValidBots={false} />);
    expect(screen.getByText('No bots found in this ELO range.')).toBeInTheDocument();
  });

  it('does not display error message when there are valid bots', () => {
    render(<Controls {...defaultProps} hasValidBots={true} />);
    expect(screen.queryByText('No bots found in this ELO range.')).not.toBeInTheDocument();
  });

  it('does not display error message when spinning, even if no valid bots', () => {
    render(<Controls {...defaultProps} hasValidBots={false} isSpinning={true} />);
    expect(screen.queryByText('No bots found in this ELO range.')).not.toBeInTheDocument();
  });

  it('calls setMinElo when a new min ELO is selected', async () => {
    const setMinEloMock = vi.fn();
    // Using defaultProps but changing the minElo so we can select something else
    // and setting a high maxElo so many options are available
    render(<Controls {...defaultProps} minElo={550} maxElo={2000} setMinElo={setMinEloMock} />);

    const minSelect = screen.getByLabelText('Min ELO');
    await userEvent.selectOptions(minSelect, '850');

    expect(setMinEloMock).toHaveBeenCalledWith(850);
  });

  it('calls setMaxElo when a new max ELO is selected', async () => {
    const setMaxEloMock = vi.fn();
    render(<Controls {...defaultProps} minElo={550} maxElo={1500} setMaxElo={setMaxEloMock} />);

    const maxSelect = screen.getByLabelText('Max ELO');
    await userEvent.selectOptions(maxSelect, '1200');

    expect(setMaxEloMock).toHaveBeenCalledWith(1200);
  });

  it('filters max ELO options to only show values >= minElo', () => {
    render(<Controls {...defaultProps} minElo={1500} />);

    const maxSelect = screen.getByLabelText('Max ELO');
    const options = Array.from(maxSelect.querySelectorAll('option'));

    // Check that all options in the max dropdown are >= 1500
    options.forEach(option => {
      const val = Number(option.value);
      if (!isNaN(val)) {
        expect(val).toBeGreaterThanOrEqual(1500);
      }
    });

    // Make sure smaller options are not present in the max dropdown
    const option1400 = options.find(o => o.value === "1400");
    expect(option1400).toBeUndefined();
  });

  it('filters min ELO options to only show values <= maxElo and ignores Infinity', () => {
    render(<Controls {...defaultProps} maxElo={1000} />);

    const minSelect = screen.getByLabelText('Min ELO');
    const options = Array.from(minSelect.querySelectorAll('option'));

    // Check that all options in the min dropdown are <= 1000
    options.forEach(option => {
      const val = Number(option.value);
      expect(val).toBeLessThanOrEqual(1000);
    });

    // Infinity shouldn't be an option in minElo
    const infinityOption = options.find(o => o.value === "Infinity");
    expect(infinityOption).toBeUndefined();
  });
});
