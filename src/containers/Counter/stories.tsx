import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { providerDecorator } from '../../storybook/decorators'
import Counter from '.'

storiesOf('Counter', module)
  .addDecorator(providerDecorator)
  .add('default', () => (<Counter />))
