import React from 'react'
import { SplitPane } from 'react-multi-split-pane'
import ShadowDom from '../../shadowDom/ShadowDom'
import { BaseEditorProps } from '../BaseEditor/BaseEditor'
import * as S from './MainEditor.styles'
import loadable from 'react-loadable-visibility/loadable-components'

const LazyEditor: React.FC<BaseEditorProps> = loadable(
  () => import('../BaseEditor/BaseEditor'),
  { ssr: true }
)

const MainEditor = () => {
  const [css, setCss] = React.useState('')
  const [scripts, setScripts] = React.useState('')
  const [html, setHTML] = React.useState('')
  return (
    <SplitPane
      split="vertical"
      minSize={50}
    >
      <S.ShadowDomContainer>
        <ShadowDom styles={css} scripts={scripts} html={html} />
      </S.ShadowDomContainer>
      <SplitPane split="horizontal">
        <S.Container>
          <LazyEditor
            language="html"
            content={html}
            onContentChange={setHTML}
          />
        </S.Container>
        <LazyEditor language="css" content={css} onContentChange={setCss} />
        <LazyEditor
          language="javascript"
          content={scripts}
          onContentChange={setScripts}
        />
      </SplitPane>
    </SplitPane>
  )
}

export default MainEditor
