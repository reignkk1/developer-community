/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useLocation } from "react-router-dom";

const footer = (pathname: string) => css`
  display: ${pathname === "/login" || pathname === "/signup"
    ? "none"
    : "block"};
  margin-top: 50px;
`;

const snowCat = css`
  position: relative;
  left: 75%;
`;

interface ITheme {
  bgColor: string;
  textColor: string;
  borderColor: string;
  bgTitleColor: string;
  bgCommentWriteColor: string;
}

const Container = (theme: ITheme) => css`
  height: 200px;
  border-top: 1px solid ${theme.borderColor};
`;

const Content = css`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  @media (max-width: 1090px) {
    width: 80%;
  }
`;

const LogoBox = css`
  display: flex;
  flex-direction: column;
  div {
    font-size: 25px;
    font-weight: bold;
    color: #0092fa;
  }
  span {
    font-size: 14px;
    opacity: 0.5;
    margin-top: 5px;
    font-weight: bold;
  }
`;

const menuBox = css`
  margin-right: 100px;
  @media (max-width: 1090px) {
    font-size: 14px;
    width: 60%;
    margin-right: 0px;
  }
`;
const Menu = css`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 1090px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;
const MenuItem = css`
  margin-right: 30px;
  &:hover {
    color: #0092fa;
  }
  cursor: pointer;
  opacity: 0.8;
  @media (max-width: 1090px) {
    margin-right: 10px;
  }
`;
const Info = css`
  line-height: 1.7;
  font-size: 13px;
  opacity: 0.8;
  @media (max-width: 1090px) {
    font-size: 12px;
  }
`;

export default function Footer() {
  const theme = useTheme();
  const list = [
    "회사소개",
    "공지사항",
    "연락처",
    "광고문의",
    "채용",
    "버그제보",
    "개인정보 처리방침",
    "서비스 이용약관",
  ];

  const location = useLocation();

  return (
    <div css={footer(location.pathname)}>
      <div css={snowCat}>
        <img
          src="https://okky.kr/okky-snowman.svg"
          alt="눈사람"
          width="50px"
          height="50px"
        />
        <img
          src="https://okky.kr/cat-footer.svg"
          alt="고양이"
          width="50px"
          height="30px"
        />
      </div>
      <div css={Container(theme)}>
        <div css={Content}>
          <div css={LogoBox}>
            <div>Developer</div>

            <span>All That Developer</span>
          </div>
          <div css={menuBox}>
            <ul css={Menu}>
              {list.map((list, index) => (
                <li key={index} css={MenuItem}>
                  {list}
                </li>
              ))}
            </ul>
            <div css={Info}>
              상호명: (주)Developer | 대표명 : 김민겸 | 사업자등록번호 :
              5342-32-6532 | 문의 : Developer.kr
              <br />
              통신판매업신고번호 : 제 2022-서울강남-02343호 ㅣ 주소: 서울 강남구
              <br />© 2022 (주)Developer, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
