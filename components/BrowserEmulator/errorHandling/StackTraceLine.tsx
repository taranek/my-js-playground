import * as React from 'react'

export const StackTraceLine: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>
> = (props) => (
  <span
    style={{
      color: '#c0392b',
      fontSize: '12px',
      width: '100%',
    }}
    {...props}
  />
)
