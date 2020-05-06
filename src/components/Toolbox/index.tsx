import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import CreateIcon from '@material-ui/icons/Create'

// TODO: remove
type Tool =
  | 'pen'

export interface Props {
  value: Tool
  onChange: NonNullable<RadioGroupProps['onChange']>
}

const Toolbox: React.FunctionComponent<Props> = ({ value, onChange }) => (
  <FormControl>
    <RadioGroup value={ value } onChange={ onChange }>
      <Radio icon={ <CreateIcon /> } checkedIcon={ <CreateIcon /> } value="pen" />
    </RadioGroup>
  </FormControl>
)

export default Toolbox
