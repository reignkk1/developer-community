import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { IActivityPage, IPost } from '../../types/types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getUserActivity } from '../../api/http';
import PageNumberBar from '../common/pageNumBar';

const ItemBox = styled.ul`
  margin-top: 70px;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  font-weight: bold;
`;
const ItemPage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
`;
const Page = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 15px;
  font-size: 12px;
  margin-right: 5px;

  a {
    display: block;
    padding: 9px 10px;
    color: #0092fa;
    font-size: 13px;
  }
  &:hover {
    border-color: ${props => props.theme.borderHoverColor};
    cursor: pointer;
  }
`;
const Span = styled.span`
  font-weight: 500;
  opacity: 0.7;
`;
const ItemTitle = styled.div`
  a:hover {
    color: #0092fa;
  }
  a {
    @media (max-width: 940px) {
      font-size: 14px;
    }
  }
`;
const ItemDate = styled.div`
  font-weight: 500;
  @media (max-width: 940px) {
    font-size: 13px;
  }
`;

export default function ActivityList({ page }: IActivityPage) {
  const { id } = useParams();

  const { data: posts } = useQuery<IPost[]>(
    [`userActivity_${page}`, id],
    getUserActivity(page, id),
    { suspense: true }
  );

  const [query] = useSearchParams();
  const pageCount = query.get('page');
  console.log(posts);

  return (
    <>
      {page === 'posts' ? (
        <ItemBox>
          {posts
            ?.slice(
              pageCount === null ? 0 : Number(pageCount) * 10 - 10,
              pageCount === null ? 10 : Number(pageCount) * 10
            )
            .map(post => (
              <Item key={post.id}>
                <ItemTitle>
                  <ItemPage>
                    <Page>
                      {post.page === 'notice' ? (
                        <Link to="/notice">공지사항</Link>
                      ) : post.page === 'tech' ? (
                        <Link to="/tech">Tech</Link>
                      ) : post.page === 'life' ? (
                        <Link to="/life">사는얘기</Link>
                      ) : (
                        <Link to="/guest-book">방명록</Link>
                      )}
                    </Page>

                    <Span>에 게시물을 작성하였습니다.</Span>
                  </ItemPage>
                  <Link to={`/${post.page}/${post.id}`}>{post.title}</Link>
                </ItemTitle>
                <ItemDate>{post.date}</ItemDate>
              </Item>
            ))}
        </ItemBox>
      ) : (
        <ItemBox>
          {posts
            ?.slice(
              pageCount === null ? 0 : Number(pageCount) * 10 - 10,
              pageCount === null ? 10 : Number(pageCount) * 10
            )
            .map(post => (
              <Item key={post.id}>
                <ItemTitle>
                  <ItemPage>
                    <Page>
                      {post.page === 'notice' ? (
                        <Link to={`/notice/${post.postID}`}>공지사항</Link>
                      ) : post.page === 'tech' ? (
                        <Link to={`/tech/${post.postID}`}>Tech</Link>
                      ) : post.page === 'life' ? (
                        <Link to={`/life/${post.postID}`}>사는얘기</Link>
                      ) : (
                        <Link to={`/guest-book/${post.postID}`}>방명록</Link>
                      )}
                    </Page>
                    <Span>에 댓글을 달았습니다.</Span>
                  </ItemPage>
                  <Link to={`/${post.page}/${post.postID}`}>
                    {post.text?.replace(/<\/?[^>]+(>|$)/g, '')}
                  </Link>
                </ItemTitle>
                <ItemDate>{post.date}</ItemDate>
              </Item>
            ))}
        </ItemBox>
      )}
      <PageNumberBar
        dataLength={posts?.length}
        pageCount={pageCount}
        userID={id}
        page={page}
      />
    </>
  );
}
