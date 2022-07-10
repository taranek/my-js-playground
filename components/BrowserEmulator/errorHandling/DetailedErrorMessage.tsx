import React from 'react'
import StackTracey from 'stacktracey'
import { StackTraceLine } from './StackTraceLine'
import { ErrorMessage } from './ErrorMessage'
type Props = {
  error?: Error
}
export const DetailedErrorMessage = ({ error }: Props) => {
  const stackTrace = new StackTracey(error?.stack).asTable()
  if (!error) {
    return null
  }
  return (
    <div
      style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column' }}
    >
      <ErrorMessage>{error?.message}</ErrorMessage>
      {stackTrace?.split('\n').map((l) => (
        <StackTraceLine key={l}>{l}</StackTraceLine>
      ))}
    </div>
  )
}
