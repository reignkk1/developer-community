import '@testing-library/jest-dom';
import Footer from '../Footer';
import { renderWithTest } from '../../../utils/test/renderWithTest';

const imgs = ['눈사람', '고양이'];
const logoWords = ['Developer', 'All That Developer'];
const list = [
  '회사소개',
  '공지사항',
  '연락처',
  '광고문의',
  '채용',
  '버그제보',
  '개인정보 처리방침',
  '서비스 이용약관',
];

describe('Footer render test', () => {
  const setup = () => {
    const utils = renderWithTest(<Footer />);

    return { ...utils };
  };

  test('Footer 렌더링이 잘 된다.', () => {
    const { getByText, getByAltText } = setup();

    for (const item of list) {
      expect(getByText(item)).toBeInTheDocument();
    }

    for (const img of imgs) {
      expect(getByAltText(img));
    }

    for (const word of logoWords) {
      expect(getByText(word)).toBeInTheDocument();
    }

    expect(
      getByText(
        /상호명: (주)Developer | 대표명 : 김민겸 | 사업자등록번호 : 5342-32-6532 | 문의 : Developer.kr/
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        /통신판매업신고번호 : 제 2022-서울강남-02343호 ㅣ 주소: 서울 강남구/
      )
    ).toBeInTheDocument();
    expect(getByText(/© 2022/)).toBeInTheDocument();
  });
});
