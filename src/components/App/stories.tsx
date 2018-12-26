import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { memoryRouterDecorator } from '../../storybook/decorators'
import App from '.'

storiesOf('App', module)
  .addDecorator(memoryRouterDecorator)
  .add('default', () => (<App />))
