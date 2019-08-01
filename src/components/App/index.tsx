import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl'

import Typography from '@material-ui/core/Typography'

import Route from 'src/components/Route'
import LocaleSelect from 'src/containers/LocaleSelect'
import Today from 'src/containers/Today'

import messages from './messages'
import * as classes from './classes.css'

export /* for testing */ const Counter = React.lazy(() => import(/* webpackChunkName: "counter" */ 'src/containers/Counter'))
export /* for testing */ const Info = React.lazy(() => import(/* webpackChunkName: "info" */ 'src/components/Info'))

type Props =
  & InjectedIntlProps

const App: React.FunctionComponent<Props> = ({ intl: { formatMessage } }) => (
  <div className={ classes.App }>
    <Helmet
      titleTemplate="%s - react-app-prototype"
      defaultTitle="react-app-prototype"
    />
    <LocaleSelect />
    <Link to="/counter"><FormattedMessage { ...messages.counter } /></Link>
    <Link to="/info"><FormattedMessage { ...messages.info } /></Link>
    <Typography>
      <FormattedMessage { ...messages.helloWorld } />
    </Typography>
    <Typography>
      <FormattedNumber format="usd" value={ 100 } />
    </Typography>
    <Today />
    <Switch>
      <Route path="/counter" component={ Counter } helmetProps={ { title: formatMessage(messages.counter) } } />
      <Route path="/info" component={ Info } helmetProps={ { title: formatMessage(messages.info) } } />
    </Switch>
  </div>
)

export default hot(module)(injectIntl(App))
