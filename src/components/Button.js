import React from 'react'

export const Button = ({
  children,
  disabled,
  onClick,
  role = 'button',
  type,
  innerRef,
  variant,
}) => {
  const getVariant = (variant) => {
    switch (variant) {
      case 'naked':
        return {
          background: 'transparent',
          color: 'initial',
          '&:hover': { background: '#E9E9E9' },
        }
      case 'outline':
        return {
          background: 'transparent',
          color: 'initial',
          border: '1px solid #3D3D3D',
          '&:hover': { background: '#E9E9E9' },
        }
      default:
        return {}
    }
  }

  const Button = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#3D3D3D',
    appearance: 'none',
    border: '1px solid transparent',
    borderRadius: '3px',
    color: 'white',
    fontWeight: '600',
    letterSpacing: '.2px',
    padding: '4px 8px',
    cursor: 'pointer',
    transition: 'opacity ease-in-out 150ms',
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
    },
    ...getVariant(variant),
  }

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
