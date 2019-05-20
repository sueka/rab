import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    id: 'src.components.Info.title',
    defaultMessage: 'info',
  },
  fetchData: {
    id: 'src.components.Info.fetchData',
    defaultMessage: 'Fetch data',
  },
  fetching: {
    id: 'src.components.Info.fetching',
    defaultMessage: 'Fetching..',
  },
  fetchingNotStarted: {
    id: 'src.components.Info.fetchingNotStarted',
    defaultMessage: 'Fetching not started.',
  },
  fetchingDoneWith200: {
    id: 'src.components.Info.fetchingDoneWith200',
    defaultMessage: 'Fetching done with 200.',
  },
  fetchingDoneWithNon200: {
    id: 'src.components.Info.fetchingDoneWithNon200',
    defaultMessage: 'Fetching done with non-200.',
  },
})
