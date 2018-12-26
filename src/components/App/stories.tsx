import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { memoryRouterDecorator, providerDecorator } from '../../storybook/decorators'
import App from '.'

storiesOf('App', module)
  .addDecorator(memoryRouterDecorator)
  .addDecorator(providerDecorator)
  .add('default', () => (<App />))
