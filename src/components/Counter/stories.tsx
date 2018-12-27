import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { increment, decrement, incrementIfOdd, incrementAsync } from '../../redux/modules/counter'
import Counter from '.'

storiesOf('Counter', module)
  .addDecorator(withKnobs)
  .add('unconnected, with Knobs', () => (
    <Counter
      value={ number('Value', 0) }
      _increment={ increment }
      _decrement={ decrement }
      _incrementIfOdd={ incrementIfOdd }
      _incrementAsync={ incrementAsync }
    />
  ))
