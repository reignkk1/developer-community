import { css, Global, useTheme } from '@emotion/react';

export default function GlobalStyles() {
  const theme = useTheme();
  const reset = css`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: none;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
      overflow-x: hidden;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    * {
      box-sizing: border-box;
      font-family: Pretendard, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
    }
    a {
      text-decoration: none;
      color: black;
    }

    body {
      background-color: ${theme.bgColor};
      color: ${theme.textColor};
      @media (max-width: 850px) {
        zoom: 0.9;
      }
    }

    .ql-editor pre {
      background-color: #23241f;
      color: #f8f8f2;
      overflow: visible;
      white-space: pre-wrap;
      margin-bottom: 5px;
      margin-top: 5px;
      padding: 5px 10px;
      border-radius: 3px;
    }
    .ql-snow .ql-editor blockquote {
      border-left: 4px solid #0092fa;
    }
  `;
  return <Global styles={reset} />;
}
