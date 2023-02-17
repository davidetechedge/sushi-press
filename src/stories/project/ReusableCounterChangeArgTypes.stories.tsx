import { ComponentMeta, ComponentStory } from '@storybook/react'
import ReusableCounter from '../../Components/ReusableCounter'
import AcUnitIcon from '@mui/icons-material/AcUnit'

export default {
  component: ReusableCounter,
  argTypes: {
    counter: { control: 'text' },
    label: {
      control: 'select',
      options: ['Italic', 'Icon'],
      mapping: {
        Italic: <em>Italic</em>,
        Icon: <AcUnitIcon />,
      },
    },
  },
} as ComponentMeta<typeof ReusableCounter>

const DefaultStory: ComponentStory<typeof ReusableCounter> = (args) => <ReusableCounter {...args} />

// For a given function, creates a bound function that has the same body as the original function.
export const People = DefaultStory.bind({})
People.args = {
  label: 'PEOPLE',
}
