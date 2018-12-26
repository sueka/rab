import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { providerDecorator } from '../../storybook/decorators'
import Info from '.'

storiesOf('Info', module)
  .addDecorator(providerDecorator)
  .add('default', () => (<Info />))
