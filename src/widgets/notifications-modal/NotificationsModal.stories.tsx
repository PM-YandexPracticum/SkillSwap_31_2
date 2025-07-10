import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { NotificationsModal } from './NotificationsModal';

const meta: Meta<typeof NotificationsModal> = {
  title: 'Widgets/NotificationsModal',
  component: NotificationsModal,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider
          store={configureStore({
            reducer: {
              notifications: () => ({
                notifications: [
                  {
                    id: '1',
                    is_read: false,
                    sender_id: '100',
                    suggestion_id: 'suggestion-1',
                  },
                  {
                    id: '2',
                    is_read: false,
                    sender_id: '200',
                    suggestion_id: 'suggestion-2',
                  },
                  {
                    id: '3',
                    is_read: true,
                    sender_id: '300',
                    suggestion_id: 'suggestion-3',
                  },
                ],
              }),
              suggestions: () => ({
                sent: [
                  { id: 'suggestion-1', accepted: true },
                  { id: 'suggestion-2', accepted: false },
                  { id: 'suggestion-3', accepted: undefined },
                ],
              }),
            },
          })}
        >
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotificationsModal>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
