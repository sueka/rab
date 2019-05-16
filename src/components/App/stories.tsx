import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { withMemoryRouter, withProvider, withIntlProvider } from '../../storybook/decorators'
import App from '.'

storiesOf('App', module)
  .addDecorator(withMemoryRouter)
  .addDecorator(withProvider)
  .addDecorator(withIntlProvider)
  .add('default', () => (<App />))
