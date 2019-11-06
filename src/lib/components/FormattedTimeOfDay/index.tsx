import React from 'react'
import { Omit } from 'react-redux'
import { FormattedTime } from 'react-intl'

type Props = Omit<FormattedTime.Props, /* 'dateStyle' |  */'weekday' | 'era' | 'year' | 'month' | 'day'>

const FormattedTimeOfDay: React.FunctionComponent<Props> = (props) => (
  <FormattedTime
    { ...props }
    // dateStyle={ undefined }
    weekday={ undefined }
    era={ undefined }
    year={ undefined }
    month={ undefined }
    day={ undefined }
  />
)

export default FormattedTimeOfDay
