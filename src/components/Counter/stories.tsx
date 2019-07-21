import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { doNothing } from 'src/lib/commonFunctions'
import { withIntlProvider } from 'src/storybook/decorators'
import Counter from '.'

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
