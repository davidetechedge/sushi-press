import Box from '@mui/material/Box'
import { styled, Typography } from '@mui/material'

interface ReusableBoxProps {
  imgUrl: string
  allowClick?: boolean
  squared?: boolean
  label: string
  onClick: () => void
  greyLabel: boolean
  price?: number
}
interface DivProps {
  greylabel: boolean
  squared: boolean
}

const LabelContainer = styled('div')<DivProps>((props) => ({
  backgroundColor: props.greylabel ? '#E3E3E3' : '#FFFFFF',
  width: '100%',
  borderBottomLeftRadius: props.squared ? 0 : '10px',
  borderBottomRightRadius: props.squared ? 0 : '10px',
  position: 'sticky',
  lineHeight: props.greylabel ? 0 : '10px',
  textAlign: 'center',
}))

const FixedPriceContainer = styled('div')({
  position: 'absolute',
  right: 8,
  top: 16,
  backgroundColor: '#E3E3E3',
  padding: '4px 8px',
  borderRadius: 6,
  textAlign: 'center',
})

const ReusableBox = ({
  squared,
  imgUrl,
  allowClick,
  onClick,
  price,
  greyLabel,
  label,
}: ReusableBoxProps) => {
  return (
    <Box
      sx={{
        minWidth: 227,
        height: 227,
        margin: '30px',
        borderRadius: squared ? 0 : '10px',
        backgroundSize: 'cover',
        backgroundImage: `url(${imgUrl})`,
        backgroundRepeat: 'no-repeat',
        '&:hover': {
          opacity: allowClick ? [0.9, 0.8, 0.7] : 1,
        },
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        cursor: allowClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {typeof price !== 'undefined' && (
        <FixedPriceContainer>
          <Typography variant="body1" display="block" aria-label="item-price">
            {`${price.toFixed(2)}€`}
          </Typography>
        </FixedPriceContainer>
      )}
      <LabelContainer greylabel={greyLabel} squared={squared ?? false}>
        <h3 style={{ marginTop: greyLabel ? '15px' : '' }}>{label}</h3>
      </LabelContainer>
    </Box>
  )
}

ReusableBox.defaultProps = {
  allowClick: false,
  squared: false,
  price: undefined,
}

export default ReusableBox
