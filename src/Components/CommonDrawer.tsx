import { Button, Drawer, List, ListItem, styled } from '@mui/material'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { OrderType } from '../store/types/orders'
import logo from '../Assets/Images/logo_nobg.png'

interface CommonDrawerProps {
  items: string[]
  goBack: () => void
  type: OrderType
  onClickCategory: (cat: string) => void
}
interface DivProps {
  active: 'true' | 'false'
}

const CustomList = styled(List)({
  margin: '0 0 50px 0',
})

const CustomButton = styled(ButtonUnstyled)<DivProps>(({ active }) => ({
  fontWeight: 'bold',
  fontSize: '0.875rem',
  color: '#282828',
  width: '260px',
  borderRadius: '10px',
  backgroundColor: active === 'true' ? '#D3CD00' : '#F8F8F8',
  padding: '12px 24px',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    backgroundColor: '#C9C9C9',
  },
}))

const DrawerContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
})

const LogoContainer = styled('div')({
  textAlign: 'center',
})

const MenuCategory = styled('div')({
  marginBottom: '30px',
  marginLeft: '10px',
  '> h4': {
    margin: 0,
    marginLeft: '10px',
    textTransform: 'capitalize',

    '> span:first-of-type': {
      color: '#1C1C1C',
      paddingRight: '4px',
    },
  },
})

const drawerWidth = 300

const CommonDrawer = ({ items, goBack, onClickCategory, type }: CommonDrawerProps) => {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState<string>('')

  useEffect(() => {
    const pathArray = location.pathname.split('/')
    setActiveCategory(pathArray[pathArray.length - 1])
  }, [location])

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        '& .MuiListItem-root': {
          justifyContent: 'center',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <DrawerContent>
        <div>
          <LogoContainer>
            <div role="button" tabIndex={0} onClick={goBack} onKeyPress={() => {}}>
              <img
                src={logo}
                style={{ maxWidth: '50%', height: 'auto', cursor: 'pointer' }}
                alt="SushiPress Logo"
              />
            </div>
          </LogoContainer>
          <CustomList aria-label="category-list">
            {items.map((text) => (
              <ListItem key={text}>
                <CustomButton
                  active={text === activeCategory ? 'true' : 'false'}
                  onClick={() => onClickCategory(text)}
                >
                  {text.toUpperCase()}
                </CustomButton>
              </ListItem>
            ))}
          </CustomList>
        </div>
        <MenuCategory>
          <h4>
            <span>Menu:</span>
            <span aria-label="menu-type">{`${
              type === OrderType.AYCE ? 'all you can eat' : 'à la carte'
            }`}</span>
          </h4>
          <Button onClick={goBack} color="secondary">
            <h3 style={{ margin: 0 }}>GO BACK TO MENU SELECTION</h3>
          </Button>
        </MenuCategory>
      </DrawerContent>
    </Drawer>
  )
}

export default CommonDrawer
