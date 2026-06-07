import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect } from 'vitest';
import RHFForm from '../components/forms/RHFForm';
import { Provider } from 'react-redux';
import { store } from '../store/store';

it('submits form successfully', async () => {
  const user = userEvent.setup();
  const onSuccess = vi.fn();

  render(
    <Provider store={store}>
      <RHFForm onSuccess={onSuccess} />
    </Provider>
  );

  await user.type(screen.getByLabelText('Name'), 'John');
  await user.type(screen.getByLabelText('Age'), '25');
  await user.type(screen.getByLabelText('Email'), 'john@mail.com');

  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Gender' }),
    'male'
  );

  await user.type(screen.getByLabelText('Country'), 'Germany');

  await user.type(screen.getByLabelText('Password'), '123456Aa!');
  await user.type(screen.getByLabelText('Confirm password'), '123456Aa!');

  await user.click(screen.getByLabelText(/terms/i));

  const file = new File(['a'], 'img.png', { type: 'image/png' });
  await user.upload(screen.getByLabelText('Upload image'), file);

  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSuccess).toHaveBeenCalled();
});
