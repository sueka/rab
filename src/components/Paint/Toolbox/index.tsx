import CreateIcon from '@mui/icons-material/Create'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import ToggleButton from '@mui/lab/ToggleButton'
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/lab/ToggleButtonGroup'
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
    <ToggleButton value="bucket" disabled>
      <FormatColorFillIcon />
    </ToggleButton>
  </ToggleButtonGroup>
)

export default Toolbox
