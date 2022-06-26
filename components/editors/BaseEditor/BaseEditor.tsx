import React from 'react'
import { useResizeDetector } from 'react-resize-detector'
import dynamic from 'next/dynamic'
import * as S from './BaseEditor.styles'

// @ts-expect-error TODO: fix the type later
const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

type EditorLanguage = 'javascript' | 'css' | 'html'
export type BaseEditorProps = {
  language: EditorLanguage
  content?: string
  onContentChange?: (content: string) => void
}
const BaseEditor = React.memo(
  ({ content, onContentChange, language }: BaseEditorProps) => {
    const [code, setCode] = React.useState(content)
    const onChange = React.useCallback(
      (codeChanges: string) => {
        setCode(codeChanges)
        onContentChange(codeChanges)
      },
      [onContentChange]
    )

    const { height, width, ref } = useResizeDetector()
    return (
      <S.BaseEditorContainer ref={ref}>
        <S.LanguageInfo>{language}</S.LanguageInfo>
        <MonacoEditor
          editorDidMount={() => {
            // @ts-ignore
            window.MonacoEnvironment.getWorkerUrl = (
              _moduleId: string,
              label: string
            ) => {
              if (label === 'json') return '_next/static/json.worker.js'
              if (label === 'css') return '_next/static/css.worker.js'
              if (label === 'html') return '_next/static/html.worker.js'
              if (label === 'typescript' || label === 'javascript')
                return '_next/static/ts.worker.js'
              return '_next/static/editor.worker.js'
            }
          }}
          theme={'vs-dark'}
          width={width}
          height={height}
          language={language}
          value={code}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onChange={onChange}
        />
      </S.BaseEditorContainer>
    )
  }
)
BaseEditor.displayName = 'BaseEditor'

export default BaseEditor
