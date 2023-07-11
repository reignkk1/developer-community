import axios from "axios";

// Axios defaults option 설정
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

// 모든 게시물 정보 불러오기
export async function articleAllGet(page: string) {
  const response = await axios.get(`/article/${page}/all`);

  return response.data;
}

// 특정 게시물 정보 불러오기
export async function articleDetail(id: string | undefined) {
  const response = await axios.get(`/article/${id}`);

  return response.data;
}

// 검색한 게시글 불러오기
export async function articleSearchGet(keyword: string | null) {
  const response = await axios.get(`/search?keyword=${keyword}`);

  return response.data;
}

// 유저 활동내역 불러오기

export async function userActivityGet(id: string | undefined, page: string) {
  const response = await axios.get(`/user/${page}/${id}`);

  return response.data;
}

// 특정 유저 정보 불러오기
export function userInfoGet(userId: string | undefined) {
  return axios.get(`/user/${userId}`).then((response) => response.data);
}
// 프로필 회원정보 불러오기
export function profileUserInfoGet() {
  return axios.get("/user/profile").then((response) => response.data);
}

// 특정 게시물 댓글들 불러오기
export function commentsGet(page: string, postID?: string) {
  return axios
    .get(`/article/${page}/${postID}/comments`)
    .then((response) => response.data);
}

// 대댓글 불러오기

export function replyCommentsGet(parentID: number) {
  return axios
    .get(`/comment/children/${parentID}`)
    .then((response) => response.data);
}
