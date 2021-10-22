import React from 'react'
import { css } from '@emotion/react'

export const Button = ({
  children,
  disabled,
  onClick,
  role = 'button',
  type,
  innerRef,
}) => {
  const Button = css({
    background: '#3D3D3D',
    appearance: 'none',
    border: '1px solid transparent',
    borderRadius: '3px',
    color: 'white',
    fontWeight: '600',
    letterSpacing: '.2px',
    padding: '4px 8px',
    transition: 'opacity ease-in-out 150ms',
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
    },
  })

  return (
    <button
      css={Button}
      onClick={onClick}
      type={type}
      disabled={disabled}
      role={role}
      ref={innerRef}
    >
      {children}
    </button>
  )
}
