/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ISection } from '../../types/types';

// =============================================================================

interface ITheme {
  borderColor: string;
  textColor: string;
}

// =============================================================================

const Container = (theme: ITheme) => css`
  margin-top: 100px;
  border-top: 1px solid ${theme.borderColor};
`;

const PageBar = css`
  text-align: center;
`;

const PageBtn = (index: number, pageCount: string | null, theme: ITheme) => css`
  font-size: 15px;
  width: 30px;
  color: ${theme.textColor};
  margin-right: 10px;
  padding-top: 30px;
  cursor: pointer;
  background: none;
  border: none;
  border-top: ${index + 1 === Number(pageCount) ||
  (pageCount === null && index === 0)
    ? '3px solid #0092fa'
    : null};
  &:hover {
    color: #0092fa;
  }
`;

// =============================================================================

interface IDataLength extends ISection {
  dataLength?: number;
  pageCount: string | null;
  userID?: string;
  keyword?: string | null;
}

// =============================================================================

export default function PageNumberBar({
  dataLength,
  pageCount,
  userID,
  keyword,
  section,
}: IDataLength) {
  const theme = useTheme();
  const navigate = useNavigate();

  // 게시글 수에 따른 버튼 갯수

  const buttonCount = Math.ceil((dataLength || 0) / 10);

  const onClick = (pageNumber: string) => {
    window.scrollTo(0, 0);
    userID
      ? navigate(`/user/${userID}/${section}?page=${pageNumber}`)
      : section === 'search'
      ? navigate(`/${section}?keyword=${keyword}&page=${pageNumber}`)
      : navigate(`/${section}?page=${pageNumber}`);
  };
  return (
    <div css={Container(theme)}>
      <div css={PageBar}>
        {Array(buttonCount)
          .fill('')
          .map((item, index) => (
            <button
              key={index}
              css={PageBtn(index, pageCount, theme)}
              onClick={() => onClick(index + 1 + '')}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
