import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { identity } from '../../commonFunctions'
import { CounterActionDispatcher } from '../../redux/modules/counter'
import { withIntlProvider } from '../../storybook/decorators'
import Counter from '.'

storiesOf('Counter', module)
  .addDecorator(withKnobs)
  .addDecorator(withIntlProvider)
  .add('unconnected, with Knobs', () => (
    <Counter
      value={ number('Value', 0) }
      dispatchedActions={ new CounterActionDispatcher(identity) }
    />
  ))
