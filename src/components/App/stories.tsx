import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { withMemoryRouter, withProvider } from '../../storybook/decorators'
import App from '.'

storiesOf('App', module)
  .addDecorator(withMemoryRouter)
  .addDecorator(withProvider)
  .add('default', () => (<App />))
