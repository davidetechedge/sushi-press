import { ComponentMeta } from '@storybook/react'
import ReusableCounter from '../../Components/ReusableCounter'
export default {
  title: 'Project/Reusable Counter',
} as ComponentMeta<typeof ReusableCounter>

export const People = () => (
  <ReusableCounter label="PEOPLE" counter={12} onClickAdd={() => {}} onClickRemove={() => {}} />
)
