import { ComponentMeta, ComponentStory } from '@storybook/react'
import ReusableCounter from '../../Components/ReusableCounter'
export default {
  component: ReusableCounter,
} as ComponentMeta<typeof ReusableCounter>

const DefaultStory: ComponentStory<typeof ReusableCounter> = (args) => <ReusableCounter {...args} />

export const People = DefaultStory.bind({})

People.args = {
  label: 'PEOPLE',
  counter: 12,
}
