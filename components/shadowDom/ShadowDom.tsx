import React from 'react'
import { useIframe } from '../../hooks/useIframe'
import { useDebounce } from 'react-use'

type ShadowDomProps = {
  styles: string
  scripts: string
  html: string
  containerStyle?: React.CSSProperties
}

const tryCatch = (fn) => {
  try {
    return fn()
  } catch (e) {
    console.error(e)
    return <div>ERROR</div>
  }
}
const ShadowDom = ({
  html,
  scripts,
  styles,
  containerStyle,
}: ShadowDomProps) => {
  const iframeRef = React.useRef(null)
  const { updateIframeDOM } = useIframe(iframeRef)

  useDebounce(
    () => {
      updateIframeDOM(html, styles, scripts)
    },
    800,
    [scripts, html, styles]
  )

  const iframeElementNode = React.useMemo(
    () => (
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
      ></iframe>
    ),
    []
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
          {iframeElementNode}
        </div>
      </div>
    </>
  )
}

export default ShadowDom
