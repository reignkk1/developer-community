import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";

//https://port-0-board-server-6g2llexw0nts.sel3.cloudtype.app

// Axios 설정
axios.defaults.baseURL =
  "https://port-0-board-server-6g2llexw0nts.sel3.cloudtype.app";
axios.defaults.withCredentials = true;

// 모든 게시물 정보 불러오기
export function articleAllGet(
  page: string,
  setLoginState: SetterOrUpdater<any>
) {
  return axios
    .get(`/article/${page}`, { withCredentials: true })
    .then((response) => {
      if (response.data.logined) {
        setLoginState(true);
        return response.data.result;
      }
      setLoginState(false);
      return response.data.result;
    });
}

// 특정 게시물 정보 불러오기
export function articleDetail(
  page: string,
  id?: string,
  setLoginState?: SetterOrUpdater<any>
) {
  return axios.get(`/article/${page}/${id}`).then((response) => {
    if (response.data.logined) {
      setLoginState!(true);
      return response.data;
    }
    setLoginState!(false);
    return response.data;
  });
}

// 특정 게시물 댓글들 불러오기
export function commentsGet(
  page: string,
  postID?: string,
  setUndifined?: Dispatch<SetStateAction<boolean>>,
  setValue?: Dispatch<SetStateAction<string>>
) {
  return axios.get(`/article/${page}/${postID}/comments`).then((response) => {
    if (!response.data) return setUndifined!(true);
    setUndifined!(false);
    setValue!(response.data.info[0].text);
    return response.data;
  });
}

// 프로필 회원정보 불러오기
export function profileUserInfoGet(
  setName: Dispatch<SetStateAction<string | undefined>>,
  setNickName: Dispatch<SetStateAction<string | undefined>>
) {
  return axios.get("/user/profile").then((response) => {
    setName(response.data[0].name);
    setNickName(response.data[0].nickname);
    return response.data[0];
  });
}

// 검색한 게시글 불러오기
export function articleSearchGet(keyword: string | null) {
  return axios
    .get(`/search?keyword=${keyword}`)
    .then((response) => response.data);
}

// 유저 활동내역 불러오기

export function userActivityGet(
  id: string | undefined,
  page: string,
  setLoginState: SetterOrUpdater<any>
) {
  return axios.get(`/user/${page}/${id}`).then((response) => {
    if (response.data.logined) {
      setLoginState(true);
      return response.data.result;
    }
    setLoginState(false);
    return response.data.result;
  });
}

// 특정 유저 정보 불러오기
export function userInfoGet(userId: string | undefined) {
  return axios.get(`/user/${userId}`).then((response) => response.data[0]);
}
