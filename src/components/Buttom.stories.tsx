import { Meta, StoryObj } from '@storybook/react'
import { Buttom, ButtomProps } from "./Buttom";

export default {
    title: 'Component/Buttom',
    component: Buttom,
    args: {
        children: 'Create Account',
    },
    argTypes: {}

} as Meta<ButtomProps>

export const Default: StoryObj<ButtomProps> = {}
