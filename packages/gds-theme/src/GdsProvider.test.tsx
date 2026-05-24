import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notifications } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';
import { Button } from '@mantine/core';
import { renderWithGds } from '../../../test-utils/render';

function ProviderConsumer() {
  return (
    <>
      <Button onClick={() => notifications.show({ message: 'Shared notification' })}>
        Show notification
      </Button>
      <Button onClick={() => openConfirmModal({ title: 'Shared modal', labels: { confirm: 'Yes', cancel: 'No' } })}>
        Show modal
      </Button>
    </>
  );
}

describe('GdsProvider', () => {
  it('provides notifications and modals as part of the shared root composition', async () => {
    const user = userEvent.setup();

    renderWithGds(<ProviderConsumer />);

    await user.click(screen.getByRole('button', { name: 'Show notification' }));
    expect(await screen.findByText('Shared notification')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show modal' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Shared modal')).toBeInTheDocument();
  });

  it('sets rtl direction for rtl locales', () => {
    const { container } = renderWithGds(<div>RTL child</div>, { locale: 'ar' });

    expect(container.querySelector('[dir="rtl"]')).toBeInTheDocument();
  });
});
