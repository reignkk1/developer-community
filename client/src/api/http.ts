import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

// Get Method

export function getFetch(url: string) {
  return () => axios.get(url).then(response => response.data);
}

export function getAllPost(
  page:
    | 'search'
    | 'notice'
    | 'tech'
    | 'life'
    | 'guest-book'
    | 'posts'
    | 'comments'
) {
  return () =>
    axios.get(`/article/${page}/all`).then(response => response.data);
}

export function getLoginUser() {
  return () => axios.get(`/user/login-info`).then(response => response.data);
}

export function getUserActivity(page: 'posts' | 'comments', id?: string) {
  return () => axios.get(`/user/${page}/${id}`).then(response => response.data);
}

export function getSearchResult(keyword: string | null) {
  return () =>
    axios.get(`/search?keyword=${keyword}`).then(response => response.data);
}

export function getPost(id?: string) {
  return () => axios.get(`/article/${id}`).then(response => response.data);
}

export function getUserInfo(userId?: string) {
  return () => axios.get(`/user/${userId}`).then(response => response.data);
}

export function getChildrenComments(parentID: number) {
  return () =>
    axios.get(`/comment/children/${parentID}`).then(response => response.data);
}

export function getComments(
  page:
    | 'search'
    | 'notice'
    | 'tech'
    | 'life'
    | 'guest-book'
    | 'posts'
    | 'comments'
    | null,
  id?: string
) {
  return () =>
    axios
      .get(`/article/${page}/${id}/comments`)
      .then(response => response.data);
}

// Post Method

export function createComment(data: {
  commentText: string;
  date: string;
  postID: number;
  page: string;
  parentID?: number;
}) {
  return () => axios.post('/comment', data).then(response => response.data);
}
export function createGuestBook(data: {
  title: string;
  content: string;
  date: string;
}) {
  return () =>
    axios.post('/article/guest-book', data).then(response => response.data);
}
export function createPost(
  page: string,
  data: {
    title: string;
    content: string;
    date: string;
  }
) {
  return () =>
    axios.post(`/article/${page}`, data).then(response => response.data);
}

// Patch Method

export function editPost(
  data: { title: string; content: string },
  id?: string
) {
  return () =>
    axios.patch(`/article/${id}`, data).then(response => response.data);
}

// Delete Method

export function deletePost(id?: string) {
  return () => axios.delete(`/article/${id}`).then(response => response.data);
}
