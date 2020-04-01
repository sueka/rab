import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { withProvider, withIntlProvider } from '~/storybook/decorators'
import Counter from '.'

storiesOf('Counter', module)
  .addDecorator(withProvider)
  .addDecorator(withIntlProvider)
  .add('default', () => (<Counter />))