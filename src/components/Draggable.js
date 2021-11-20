import React, { cloneElement } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Box } from '.'

export const Draggable = ({ children, data = {}, id, ...props }) => {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id,
      data,
    })

  const css = {
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  return (
    <Box
      {...props}
      css={css}
      innerRef={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {cloneElement(children, { isDragging })}
    </Box>
  )
}
