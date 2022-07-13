import * as React from 'react'
export function useIframe(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  onError?: OnErrorEventHandler
) {
  const [iframeElement, setIframeElement] = React.useState(iframeRef.current)
  React.useEffect(() => {
    setIframeElement(iframeRef.current)
    if (onError && iframeElement?.contentWindow) {
      iframeElement.contentWindow.onerror = onError
    }
  }, [iframeRef, iframeElement, onError])

  const updateCss = React.useCallback(
    (css: string) => {
      const iframeHead = iframeElement.contentDocument.head
      const iframeStyles = iframeHead?.getElementsByTagName('style')[0]
      const stylesAlreadyInjected = !!iframeStyles
      const script = stylesAlreadyInjected
        ? iframeHead.getElementsByTagName('style')[0]
        : document.createElement('style')
      script.innerText = css
      if (!stylesAlreadyInjected) {
        iframeHead?.appendChild(script)
      }
    },
    [iframeElement]
  )

  const updateHtml = React.useCallback(
    (stringifiedHtml: string) => {
      const iframeBody = iframeElement.contentDocument.body
      iframeBody.innerHTML = stringifiedHtml
    },
    [iframeElement]
  )
  const updateScripts = React.useCallback(
    (scriptText: string) => {
      const iframeBody = iframeElement.contentDocument.body
      const iframeScript = iframeBody?.getElementsByTagName('script')[0]
      if (iframeScript) {
        iframeBody.removeChild(iframeScript)
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = `(function(){${scriptText}})()`
      iframeBody.appendChild(script)
    },
    [iframeElement]
  )

  const updateIframeDOM = React.useCallback(
    (html: string, css: string, js: string) => {
      if (!iframeElement) {
        return
      }
      updateHtml(html)
      updateCss(css)
      updateScripts(js)
    },
    [updateScripts, updateCss, updateHtml, iframeElement]
  )
  return {
    updateIframeDOM,
  }
}
