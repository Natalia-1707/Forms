import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal/Modal';
import { it, expect, vi } from 'vitest';

it('renders modal with title', () => {
  render(
    <Modal title="Test Modal" onClose={() => {}}>
      Content
    </Modal>
  );

  expect(screen.getByText(/test modal/i)).toBeInTheDocument();
  expect(screen.getByText(/content/i)).toBeInTheDocument();
});

it('calls onClose when clicking close button', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <Modal title="Test Modal" onClose={onClose}>
      Content
    </Modal>
  );

  await user.click(screen.getByRole('button', { name: /close modal/i }));

  expect(onClose).toHaveBeenCalledOnce();
});

it('calls onClose on overlay click', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <Modal title="Test Modal" onClose={onClose}>
      Content
    </Modal>
  );

  const overlay = document.querySelector('.modal-overlay') as HTMLElement;

  await user.click(overlay);

  expect(onClose).toHaveBeenCalledOnce();
});
