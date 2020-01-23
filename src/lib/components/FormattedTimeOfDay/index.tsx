import React from 'react'
import { FormattedTime, CustomFormatConfig } from 'react-intl'

type Props =
  & Alt.Omit<Intl.DateTimeFormatOptions, /* 'dateStyle' |  */'weekday' | 'era' | 'year' | 'month' | 'day'>
  & CustomFormatConfig
  & {
      value: string | number | Date | undefined
    }

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
