import React from 'react'

export const ErrorMessage: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>
> = (props) => (
  <span
    style={{
      color: '#c0392b',
      fontWeight: 500,
      fontSize: '14px',
      width: '100%',
    }}
    {...props}
  />
)
