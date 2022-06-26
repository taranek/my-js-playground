import React from 'react'
import StackTracey from 'stacktracey'

const ErrorMessage: React.FC<
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

const StackTrace: React.FC<
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

const executeWithErrorHandling = (fn) => {
  try {
    return fn()
  } catch (e) {
    console.error(e)
    const prettyStack = new StackTracey(e?.stack).asTable()
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ErrorMessage>{e?.message}</ErrorMessage>
        <StackTrace>{prettyStack}</StackTrace>
      </div>
    )
  }
}
export default executeWithErrorHandling
