import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { withProvider, withIntlProvider } from '../../storybook/decorators'
import Info from '.'

storiesOf('Info', module)
  .addDecorator(withProvider)
  .addDecorator(withIntlProvider)
  .add('default', () => (<Info />))
