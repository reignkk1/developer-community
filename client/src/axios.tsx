import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

//https://port-0-board-server-6g2llexw0nts.sel3.cloudtype.app

// Axios defaults option 설정
axios.defaults.baseURL =
  "https://port-0-board-server-6g2llexw0nts.sel3.cloudtype.app";
axios.defaults.withCredentials = true;

// 모든 게시물 정보 불러오기
export async function articleAllGet(
  page: string,
  setLoginState: SetterOrUpdater<any>
) {
  const response = await axios.get(`/article/${page}`);
  response.data.logined ? setLoginState(true) : setLoginState(false);
  return response.data;
}

// 특정 게시물 정보 불러오기
export async function articleDetail(
  page: string,
  id: string | undefined,
  setLoginState: SetterOrUpdater<any>
) {
  const response = await axios.get(`/article/${page}/${id}`);
  response.data.logined ? setLoginState(true) : setLoginState(false);
  return response.data;
}

// 특정 게시물 댓글들 불러오기
export async function commentsGet(page: string, postID?: string) {
  const response = await axios.get(`/article/${page}/${postID}/comments`);
  return response.data;
}

// 프로필 회원정보 불러오기
export async function profileUserInfoGet() {
  const response = await axios.get("/user/profile");
  return response.data[0];
}

// 검색한 게시글 불러오기
export async function articleSearchGet(keyword: string | null) {
  const response = await axios.get(`/search?keyword=${keyword}`);
  return response.data;
}

// 유저 활동내역 불러오기

export async function userActivityGet(
  id: string | undefined,
  page: string,
  setLoginState: SetterOrUpdater<any>
) {
  const response = await axios.get(`/user/${page}/${id}`);
  response.data.logined ? setLoginState(true) : setLoginState(false);
  return response.data.result;
}

// 특정 유저 정보 불러오기
export function userInfoGet(userId: string | undefined) {
  return axios.get(`/user/${userId}`).then((response) => response.data[0]);
}
