import React from 'react'
import { useIframe } from '../../hooks/useIframe'
import { useDebounce } from 'react-use'
import { StackTraceLine } from './errorHandling/StackTraceLine'
import StackTracey from 'stacktracey'
import { ErrorMessage } from './errorHandling/ErrorMessage'
import { DetailedErrorMessage } from './errorHandling/DetailedErrorMessage'

type BrowserEmulatorProps = {
  styles: string
  scripts: string
  html: string
}

const BrowserEmulator = ({ html, scripts, styles }: BrowserEmulatorProps) => {
  const iframeRef = React.useRef(null)
  const [error, setError] = React.useState<Error | null>(null)

  const onError = (
    _event: Event | string,
    _source?: string,
    _lineno?: number,
    _colno?: number,
    error?: Error
  ) => {
    setError(error)
  }
  const { updateIframeDOM } = useIframe(iframeRef, onError)

  useDebounce(
    () => {
      setError(null)
      setTimeout(() => {
        updateIframeDOM(html, styles, scripts)
      }, 100)
    },
    800,
    [scripts, html, styles]
  )

  return (
    <>
      <div
        className="browser-mockup with-status-bar"
        style={{
          minHeight: 'calc(100% - 60px)',
          background: 'whitesmoke',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ overflow: 'scroll', flex: 1, display: 'contents' }}>
          <DetailedErrorMessage error={error} />

          <iframe
            ref={iframeRef}
            name="emulated-browser"
            width="100%"
            height="400px"
            title="Iframe Example"
            src="./frame.html"
            frameBorder="0"
            style={{
              flex: 1,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default BrowserEmulator
