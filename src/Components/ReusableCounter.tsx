import { IconButton, styled, InputBase } from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'

interface ReusableCounterProps {
  label: string
  counter: number
  onClickAdd: () => void
  onClickRemove: () => void
}

const CounterContainer = styled('div')({
  textAlign: 'center',
})

const CustomizedInput = styled(InputBase)({
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: '45px',
    padding: '4px 8px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

const ReusableCounter = (props: ReusableCounterProps) => {
  const { label, counter, onClickAdd, onClickRemove } = props
  return (
    <CounterContainer>
      <h5>{label}</h5>
      <IconButton aria-label="remove" sx={{ color: '#D3CD00' }} onClick={onClickRemove}>
        <RemoveCircleRoundedIcon />
      </IconButton>
      <CustomizedInput value={counter} id="counter-input" readOnly />
      <IconButton aria-label="add" sx={{ color: '#D3CD00' }} onClick={onClickAdd}>
        <AddCircleRoundedIcon />
      </IconButton>
    </CounterContainer>
  )
}

export default ReusableCounter
