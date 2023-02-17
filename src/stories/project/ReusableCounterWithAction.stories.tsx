import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import ReusableCounter from '../../Components/ReusableCounter'
export default {
  component: ReusableCounter,
} as ComponentMeta<typeof ReusableCounter>

const DefaultStory: ComponentStory<typeof ReusableCounter> = (args) => <ReusableCounter {...args} />

// For a given function, creates a bound function that has the same body as the original function.
export const People = DefaultStory.bind({})
People.args = {
  label: 'PEOPLE',
  counter: 12,
}

export const PeopleWithAction = DefaultStory.bind({})
PeopleWithAction.args = People.args
PeopleWithAction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const addButton = await canvas.getByRole('button', { name: 'add' })
  await userEvent.click(addButton)
}
