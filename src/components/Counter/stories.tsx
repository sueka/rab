import { Meta, Story } from '@storybook/react'
import * as React from 'react'

import { withIntlProvider, withProvider } from '~/storybook/decorators'
import Counter from '.'

const metadata: Meta<unknown> = {
  title: 'Counter',
  component: Counter,
  decorators: [
    withProvider,
    withIntlProvider,
  ],
}

export default metadata

export const Basic: Story<unknown> = () => <Counter />
