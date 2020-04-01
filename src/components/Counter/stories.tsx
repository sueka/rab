import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { withProvider, withIntlProvider } from '~/storybook/decorators'
import Counter from '.'

const doNothing = () => {
  // Silence is golden.
}

storiesOf('Counter', module)
  .addDecorator(withKnobs)
  .addDecorator(withIntlProvider)
  .add('unconnected, with Knobs', () => (
    <Counter
      value={ number('Value', 0) }
      reset={ doNothing }
      increment={ doNothing }
      decrement={ doNothing }
      incrementIfOdd={ doNothing }
      incrementAsync={ doNothing }
    />
  ))

storiesOf('Counter', module)
  .addDecorator(withProvider)
  .addDecorator(withIntlProvider)
  .add('default', () => (<Counter />))
