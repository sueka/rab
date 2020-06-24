import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { withIntlProvider, withProvider } from '~/storybook/decorators'
import Counter from '.'

storiesOf('Counter', module)
.addDecorator(withProvider)
.addDecorator(withIntlProvider)
.add('default', () => (<Counter />))
