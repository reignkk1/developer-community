import { css, Global, useTheme } from "@emotion/react";

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
    pre,
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
      content: "";
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    * {
      box-sizing: border-box;
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

    .articleWrite,
    .editWrite {
      .ck.ck-editor__main > .ck-editor__editable {
        background: none;
      }
      .ck-editor__editable_inline {
        height: 600px;
        line-height: 1.5;
        margin-bottom: 20px;
        color: ${theme.textColor};
      }
      .ck.ck-toolbar {
        background: ${theme.bgCommentWriteColor};
      }
      .ck-icon_inherit-color {
        color: ${theme.textColor};
      }
      .ck.ck-button:hover {
        background: none;
      }
      .ck .ck-button__label {
        color: ${theme.textColor};
      }
      .ck.ck-button.ck-on {
        &:hover {
          background: ${theme.borderColor};
        }
        background: ${theme.borderColor};
      }
    }
    .commentWrite {
      color: ${theme.textColor};

      .ck.ck-editor {
        width: 93%;
        margin-left: 10px;
      }
      .ck.ck-toolbar {
        background: ${theme.bgCommentWriteColor};
      }
      .ck-icon_inherit-color {
        color: ${theme.textColor};
      }
      .ck.ck-button:hover {
        background: none;
      }
      .ck .ck-button__label {
        color: ${theme.textColor};
      }
      .ck.ck-button.ck-on {
        &:hover {
          background: ${theme.borderColor};
        }
        background: ${theme.borderColor};
      }
      .ck-editor__editable_inline {
        height: auto;
        line-height: 1.5;
        color: ${theme.textColor};
      }
      .ck.ck-editor__main > .ck-editor__editable {
        background: none;
      }
    }
  `;
  return <Global styles={reset} />;
}
