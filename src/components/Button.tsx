import React from 'react'

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

function Button(props: ButtonProps) {
  return (
    <button className=' text-lg px-5 py-2 rounded-[8px] text-white bg-primary' {...props}>
        {props.children}
    </button>
  )
}

export default Button