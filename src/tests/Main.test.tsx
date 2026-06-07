import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Main from '../components/Main/Main';
import { it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

const renderMain = () =>
  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

it('renders buttons', () => {
  renderMain();

  expect(
    screen.getByRole('button', { name: /uncontrolled form/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /open rhf form/i })
  ).toBeInTheDocument();
});

it('opens uncontrolled modal', async () => {
  const user = userEvent.setup();

  renderMain();

  await user.click(screen.getByRole('button', { name: /uncontrolled form/i }));

  expect(
    screen.getByRole('heading', { name: /uncontrolled form/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /close modal/i })
  ).toBeInTheDocument();
});

it('opens RHF modal', async () => {
  const user = userEvent.setup();

  renderMain();

  await user.click(screen.getByRole('button', { name: /open rhf form/i }));

  expect(
    screen.getByRole('heading', { name: /react hook form/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /close modal/i })
  ).toBeInTheDocument();
});

it('renders submissions section', () => {
  renderMain();

  expect(screen.getByText(/submissions/i)).toBeInTheDocument();
});
