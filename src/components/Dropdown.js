import React, { useState, useEffect, useCallback } from 'react'
import { usePopper } from 'react-popper'

export const Dropdown = ({ children, placement = 'buttom', title }) => {
  const [expanded, setExpanded] = useState(false)
  const [toggleRef, setToggleRef] = useState(null)
  const [popperRef, setPopperRef] = useState(null)
  const { styles, attributes } = usePopper(toggleRef, popperRef, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  const randomInt = () => Math.floor(Math.random() * 1e4)
  const menuId = `menu-${randomInt()}-${randomInt()}`

  return (
    <>
      <button
        aria-controls={menuId}
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        ref={setToggleRef}
        type="button"
      >
        {title}
      </button>
      {expanded && (
        <Menu
          attributes={attributes}
          id={menuId}
          innerRef={popperRef}
          setExpanded={setExpanded}
          setInnerRef={setPopperRef}
          styles={styles}
        >
          {children}
        </Menu>
      )}
    </>
  )
}

const Menu = ({
  attributes,
  children,
  id,
  innerRef,
  setExpanded,
  setInnerRef,
  styles,
}) => {
  const handleClickOutside = useCallback(
    (e) => {
      if (!innerRef.contains(e.target)) {
        setExpanded(false)
      }
    },
    [innerRef, setExpanded]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside, innerRef, setExpanded])

  return (
    <div
      id={id}
      ref={setInnerRef}
      style={{
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '3px',
        ...styles.popper,
      }}
      {...attributes.popper}
    >
      {children}
    </div>
  )
}
