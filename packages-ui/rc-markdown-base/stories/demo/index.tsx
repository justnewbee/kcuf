import {
  ReactElement,
  useState
} from 'react';
import {
  CompileContext
} from 'micromark-util-types';

import {
  H1,
  H2,
  Flex,
  Article,
  InputSwitch,
  CodeViewer
} from '@kcuf/demo-rc';

import Markdown, {
  MarkdownProps,
  MarkdownCompileOptions,
  MarkdownDirective,
  MarkdownExtensionDirectiveHtmlOptions,
  compileIntoHtml
} from '../../src';

function tagStart(this: CompileContext, d: MarkdownDirective, autoClose?: boolean, tag?: string): void {
  const {
    name,
    attributes
  } = d;
  
  this.tag(`<${tag || name}`);
  
  if (attributes) {
    Object.keys(attributes).forEach(v => {
      this.tag(` ${v}="${this.encode(attributes[v] || '')}"`);
    });
  }
  
  this.tag(autoClose ? '/>' : '>');
}

const directiveOptions: MarkdownExtensionDirectiveHtmlOptions = {
  /**
   * 支持 :abbr
   */
  abbr(d: MarkdownDirective) {
    if (d.type !== 'textDirective') {
      return false;
    }
    
    tagStart.call(this, d);
    
    this.raw(d.label || '');
    this.tag('</abbr>');
  },
  /**
   * 支持 ::hr
   */
  hr(d: MarkdownDirective) {
    if (d.type !== 'leafDirective') {
      return false;
    }
    
    tagStart.call(this, d, true);
  },
  /**
   * 支持 :::div
   */
  div(d: MarkdownDirective) {
    if (d.type !== 'containerDirective') {
      return false;
    }
    
    tagStart.call(this, d);
    
    this.raw(d.content || '');
    this.tag('</div>');
  }
  // '*': function any(d: MarkdownDirective) {
  //   console.info('DirectiveHtmlOptions *', d); // eslint-disable-line no-console
  //
  //   return false;
  // }
};

export default function Demo({
  source,
  options
}: MarkdownProps): ReactElement {
  const [stateSource, setStateSource] = useState<string>(source);
  const [stateHtmlSource, setStateHtmlSource] = useState<boolean>(false);
  const [stateApplyStyle, setStateApplyStyle] = useState<boolean>(true);
  const [stateAllowDangerousHtml, setStateAllowDangerousHtml] = useState<boolean>(false);
  const [stateGfmEnabled, setStateGfmEnabled] = useState<boolean>(true);
  const [stateDirectiveEnabled, setStateDirectiveEnabled] = useState<boolean>(true);
  const compileOptions: MarkdownCompileOptions = {
    allowDangerousHtml: stateAllowDangerousHtml,
    gfm: stateGfmEnabled,
    directive: stateDirectiveEnabled ? directiveOptions : undefined,
    ...options
  };
  
  const jsxMarkdown = stateHtmlSource ? <CodeViewer {...{
    language: 'html'
  }}>{compileIntoHtml(stateSource, compileOptions)}</CodeViewer> : <Markdown {...{
    source: stateSource,
    options: compileOptions
  }} />;
  
  return <>
    <H1>调戏 <span role="img" aria-label="tx">🙈</span></H1>
    <div>
      <InputSwitch {...{
        label: '展示 HTML 源码',
        value: stateHtmlSource,
        onChange: setStateHtmlSource
      }} /></div>
    <div>
      <InputSwitch {...{
        label: '加样式（this component comes with NO style at all... it is for demo only）',
        value: stateApplyStyle,
        onChange: setStateApplyStyle
      }} /></div>
    <div>
      <InputSwitch {...{
        label: 'props.allowDangerousHtml',
        value: stateAllowDangerousHtml,
        onChange: setStateAllowDangerousHtml
      }} /></div>
    <div>
      <InputSwitch {...{
        label: 'props.gfm',
        value: stateGfmEnabled,
        onChange: setStateGfmEnabled
      }} /></div>
    <div>
      <InputSwitch {...{
        label: 'props.directive',
        value: stateDirectiveEnabled,
        onChange: setStateDirectiveEnabled
      }} /></div>
    <Flex>
      <>
        <H2><span role="img" aria-label="mwa">💋</span> 展示</H2>
        {stateApplyStyle && !stateHtmlSource ? <Article>{jsxMarkdown}</Article> : jsxMarkdown}
      </>
      <>
        <H2><span role="img" aria-label="code">Ⓜ</span> 代码</H2>
        <CodeViewer {...{
          readOnly: false,
          language: 'markdown',
          onChange: setStateSource
        }}>{stateSource}</CodeViewer></></Flex></>;
}
