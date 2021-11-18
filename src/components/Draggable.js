import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const Draggable = ({ as: As = 'div', children, id }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id })

  return (
    <As ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </As>
  )
}
