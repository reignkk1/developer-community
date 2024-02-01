import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { IActivityPage, IComment, IPost } from '../../types/types';
import { Link, useSearchParams } from 'react-router-dom';
import { getUserActivity } from '../../api/http';
import { Paginate } from 'react-url-paginate';
import * as router from 'react-router-dom';

export default function ActivityList({ section, userId }: IActivityPage) {
  const { data } = useQuery<IPost[] & IComment[]>(
    [`userActivity_${section}`, userId],
    getUserActivity(section, userId),
    { suspense: true }
  );

  const [query] = useSearchParams();
  const pageCount = query.get('page');
  const resultData = data?.slice(
    pageCount === null ? 0 : Number(pageCount) * 10 - 10,
    pageCount === null ? 10 : Number(pageCount) * 10
  ) as (IPost[] & IComment[]) | undefined;

  let activityContent;

  if (section === 'posts') {
    activityContent = <ActivityPosts posts={resultData} />;
  } else if (section === 'comments') {
    activityContent = <ActivityComments comments={resultData} />;
  }

  return (
    <>
      {activityContent}
      {resultData?.length !== 0 && (
        <Paginate
          total={resultData?.length || 0}
          pageItems={10}
          router={router}
        />
      )}
    </>
  );
}

function ActivityPosts({ posts }: { posts?: IPost[] }) {
  return (
    <ItemBox>
      {posts?.map(({ id, page, title, date }) => (
        <Item key={id}>
          <ItemTitle>
            <ItemPage>
              <Page>
                {page === 'notice' ? (
                  <Link to="/notice">공지사항</Link>
                ) : page === 'tech' ? (
                  <Link to="/tech">Tech</Link>
                ) : page === 'life' ? (
                  <Link to="/life">사는얘기</Link>
                ) : (
                  <Link to="/guest-book">방명록</Link>
                )}
              </Page>
              <Span>에 게시물을 작성하였습니다.</Span>
            </ItemPage>
            <Link to={`/${page}/${id}`}>{title}</Link>
          </ItemTitle>
          <ItemDate>{date}</ItemDate>
        </Item>
      ))}
    </ItemBox>
  );
}

function ActivityComments({ comments }: { comments?: IComment[] }) {
  return (
    <ItemBox>
      {comments?.map(({ id, postID, date, text, page }) => (
        <Item key={id}>
          <ItemTitle>
            <ItemPage>
              <Page>
                {page === 'notice' ? (
                  <Link to={`/notice/${postID}`}>공지사항</Link>
                ) : page === 'tech' ? (
                  <Link to={`/tech/${postID}`}>Tech</Link>
                ) : page === 'life' ? (
                  <Link to={`/life/${postID}`}>사는얘기</Link>
                ) : (
                  <Link to={`/guest-book/${postID}`}>방명록</Link>
                )}
              </Page>
              <Span>에 댓글을 달았습니다.</Span>
            </ItemPage>
            <Link to={`/${page}/${postID}`}>
              {text?.replace(/<\/?[^>]+(>|$)/g, '')}
            </Link>
          </ItemTitle>
          <ItemDate>{date}</ItemDate>
        </Item>
      ))}
    </ItemBox>
  );
}

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
