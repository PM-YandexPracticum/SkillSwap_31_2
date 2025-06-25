import { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';

import { Logotype } from './Logotype';

const meta: Meta<typeof Logotype> = {
  title: 'shared/Logotype',
  component: Logotype,
};

export default meta;
export const Default: StoryObj<typeof Logotype> = {
  render: () => (
    <BrowserRouter>
      <Logotype />
    </BrowserRouter>
  ),
};
