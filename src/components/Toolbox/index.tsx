import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import CreateIcon from '@material-ui/icons/Create'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import React from 'react'

// TODO: Remove
type Tool =
  | 'pen'
  | 'bucket'

export interface Props {
  value: Tool
  onChange: NonNullable<RadioGroupProps['onChange']>
}

const Toolbox: React.FC<Props> = ({ value, onChange }) => (
  <FormControl>
    <RadioGroup name="tool" value={ value } onChange={ onChange }>
      <Radio icon={ <CreateIcon /> } checkedIcon={ <CreateIcon /> } value="pen" />
      <Radio icon={ <FormatColorFillIcon /> } checkedIcon={ <FormatColorFillIcon /> } value="bucket" />
    </RadioGroup>
  </FormControl>
)

export default Toolbox
