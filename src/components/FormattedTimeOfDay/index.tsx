import React from 'react'
import { CustomFormatConfig, FormattedTime } from 'react-intl'

type Props =
  & Alt.Omit<Intl.DateTimeFormatOptions, /* 'dateStyle' |  */'weekday' | 'era' | 'year' | 'month' | 'day'>
  & CustomFormatConfig
  & {
      value: string | number | Date | undefined
      children?(formattedTime: string): React.ReactElement | null
    }

const FormattedTimeOfDay: React.FC<Props> = (props) => (
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
