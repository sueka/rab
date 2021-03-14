import CreateIcon from '@material-ui/icons/Create'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@material-ui/lab/ToggleButtonGroup'
import React from 'react'

// TODO: Remove
type Tool =
  | 'pen'
  | 'bucket'

export interface Props {
  value: Tool
  onChange: NonNullable<ToggleButtonGroupProps['onChange']>
}

const Toolbox: React.FC<Props> = ({ value, onChange }) => (
  <ToggleButtonGroup orientation="vertical" exclusive value={ value } onChange={ onChange }>
    <ToggleButton value="pen">
      <CreateIcon />
    </ToggleButton>
    <ToggleButton value="bucket">
      <FormatColorFillIcon />
    </ToggleButton>
  </ToggleButtonGroup>
)

export default Toolbox
