import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { withProvider } from '../../storybook/decorators'
import Info from '.'

storiesOf('Info', module)
  .addDecorator(withProvider)
  .add('default', () => (<Info />))
