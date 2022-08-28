import React from 'react'

export type BuildInfoProps = {
  staticBuildTimestamp: string
  requestTimestamp: string
}
export const BuildInfo = ({
  requestTimestamp,
  staticBuildTimestamp,
}: BuildInfoProps) => {
  return (
    <div>
      {requestTimestamp && (
        <p>
          Request timestamp is <code>{requestTimestamp}</code>
        </p>
      )}
      <p>
        Build timestamp (getStaticProps) is <code>{staticBuildTimestamp}</code>
      </p>
    </div>
  )
}
