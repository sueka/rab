import CircularProgress from '@mui/material/CircularProgress'
import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'

import FossLicenseComparisonTable from '~/components/FossLicenseComparisonTable'
import { createPage } from '~/components/PageTemplate'
import messages from './messages'

const TablePage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.table) } />
      <Suspense fallback={ <CircularProgress /> }>
        <FossLicenseComparisonTable />
      </Suspense>
    </>
  )
}

export default createPage(TablePage)
