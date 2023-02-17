import { ComponentMeta, ComponentStory } from '@storybook/react'
import ReusableCounter from '../../Components/ReusableCounter'
export default {
  title: 'Project/Reusable Counter with args',
  component: ReusableCounter,
} as ComponentMeta<typeof ReusableCounter>

const DefaultStory: ComponentStory<typeof ReusableCounter> = (args) => <ReusableCounter {...args} />

// creates a bound function that has the same body as the original function.
export const People = DefaultStory.bind({})
People.args = {
  label: 'PEOPLE',
  counter: 12,
}
