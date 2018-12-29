import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { withProvider } from '../../storybook/decorators'
import Counter from '.'

storiesOf('Counter', module)
  .addDecorator(withProvider)
  .add('default', () => (<Counter />))
