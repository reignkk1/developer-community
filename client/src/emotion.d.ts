import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    bgColor: string;
    textColor: string;
    borderColor: string;
    bgTitleColor: string;
    bgCommentWriteColor: string;
    borderHoverColor: string;
    bgUserInfoMenuColor: string;
    inputColor: string;
  }
}
