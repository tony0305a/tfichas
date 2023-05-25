import { clsx } from 'clsx'
import { InputHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot'


export interface TextInputRootProps {
    children: ReactNode
}

function TextInputRoot(props: TextInputRootProps) {
    return (
        <div className='flex items-center gap-3 py-4 px-3 h-12 rounded bg-grey-800 w-full outline-none focus-within:ring-2 ring-cyan-300'>
            {props.children}
        </div>
    )
}

TextInputRoot.displayName = 'TextInput.Root'

export interface TextInputIconProps {
    children: ReactNode
}
function TextInputIcon(props: TextInputIconProps) {
    return (
        <Slot className='w-6 h-6 text-grey-400'>
            {props.children}
        </Slot>
    )
}
TextInputIcon.displayName = 'TextInput.Input'
export interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {
}

function TextInputInput(props: TextInputInputProps) {
    return (
        <input className='flex-1 bg-transparent outline-none text-grey-100 text-xs placeholder:text-grey-400'
            {...props}
        />
    )
}
TextInputIcon.displayName = 'TextInput.Icon'
export const TextInput = {
    Root: TextInputRoot,
    Icon: TextInputIcon,
    Input: TextInputInput
}