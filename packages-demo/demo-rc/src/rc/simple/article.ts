import styled from 'styled-components';

export default styled.article`
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  
  .theme-dark & {
    color: hsl(0 0% 80%);
  }
  
  a {
    color: hsl(210 100% 39%);
    text-decoration: none;
    transition: all ease-in-out 0.3s;
    
    &:link {
      text-decoration: none;
    }
    
    &:hover {
      text-decoration: underline;
    }
    
    &:link:hover {
      text-decoration: underline;
    }
  }
  
  em {
    color: hsl(20 100% 50%);
    font-style: normal;
  }
  
  strong {
    font-weight: 600;
  }
  
  small {
    font-size: inherit;
  }
  
  code {
    padding: 2px 4px;
    background-color: hsl(0 0% 0% / 7%);
    border-radius: 2px;
    color: hsl(217 77% 55%);
    font-family: 'Operator Mono', Menlo, Monaco, 'Liberation Mono', 'DejaVu Sans Mono', 'Courier New', monospace;
    
    &.clean {
      background-color: transparent;
    }
  }
  
  kbd {
    display: inline-block;
    margin: 0 0.1em;
    padding: 0.1em 0.6em;
    border-radius: 3px;
    box-shadow: 0 1px 0 hsl(0 0% 0% / 15%), 0 0 0 2px hsl(0 0% 100%) inset;
    font: 600 12px/1.4 Arial, 'Helvetica Neue', Helvetica, sans-serif;
    white-space: nowrap;
  }
  
  br {
    content: '';
    display: block;
  }
  
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  fieldset,
  figure {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  
  blockquote {
    padding: 8px 16px;
    border-left: 4px solid hsl(0 0% 65%);
  }
  
  p {
    overflow-wrap: break-word;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.6em 0 0.6em;
    font-weight: 600;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* stylelint-disable no-descending-specificity */
  
  h1 {
    font-size: 1.75em;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h2 {
    font-size: 1.5em;
  }
  
  h3 {
    font-size: 1.35em;
  }
  
  h4 {
    font-size: 1.2em;
  }
  
  h5 {
    font-size: 1.1em;
  }
  
  h6 {
    font-size: 1em;
  }
  
  hr {
    margin: 16px 0;
    height: 0;
    border: 0;
    border-bottom: 1px solid hsl(0 0% 65%);
  }
  
  pre {
    padding: 16px;
    overflow: auto;
    overflow-wrap: break-word;
    background-color: hsl(0 0% 0%);
    color: hsl(0 0% 100%);
    font-family: 'Operator Mono', Menlo, Monaco, 'Liberation Mono', 'DejaVu Sans Mono', 'Courier New', monospace;
    font-size: 0.95em;
    line-height: 1.6;
    white-space: pre-wrap;
    
    code {
      padding: unset;
      background: unset;
      border: unset;
      border-radius: unset;
      color: unset;
      font-size: inherit;
    }
  }
  
  ul,
  ol,
  dl {
    margin: 1em 0 1em 2em;
    padding: 0;
    color: inherit;
    font-size: inherit;
    line-height: 1.5 !important;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    li {
      margin: 0.5em 0;
      list-style: inherit;
    }
  }
  
  ul {
    list-style: disc outside;
    
    ul {
      list-style-type: circle;
      
      ul {
        list-style-type: disc;
      }
    }
  }
  
  ol {
    list-style: decimal outside;
    
    ol {
      list-style-type: lower-roman;
    }
  }
  
  dl {
    dt {
      margin-top: 1em;
      padding: 0;
      font-weight: 600;
    }
    
    dd {
      margin: 0 0 1em;
    }
  }
  
  img {
    display: block;
    max-width: 100%;
    border: 0;
  }
  
  video {
    width: 100%;
    height: 100%;
  }
  
  iframe {
    display: block;
    width: 100%;
    height: 1024px;
    border: 0;
  }
  
  figcaption,
  caption {
    margin-bottom: 0.25em;
    font-style: italic;
    text-align: left;
  }
  
  table {
    display: table;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    color: inherit;
    word-wrap: break-word;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    tr {
      background-color: hsl(0 0% 100%);
    }
    
    thead {
      tr {
        background-color: hsl(0 0% 0% / 7%);
      }
    }
    
    th,
    td {
      padding: 8px 12px;
      border: 1px solid hsl(0 0% 0% / 13%);
      color: inherit;
      font-size: 0.95em;
      text-align: left;
      
      &:first-child {
        border-left-width: 0;
        text-align: left;
      }
      
      &:last-child {
        border-right-width: 0;
        text-align: left;
      }
    }
    
    th {
      font-weight: 600;
      
      &[colspan] {
        text-align: center;
      }
    }
  }
  
  p,
  section,
  pre,
  table,
  blockquote,
  fieldset,
  figure {
    margin: 1em 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
