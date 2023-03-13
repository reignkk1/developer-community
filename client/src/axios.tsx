import axios from "axios";

//https://port-0-board-server-6g2llexw0nts.sel3.cloudtype.app
axios.defaults.baseURL =
  "https://port-0-board-server-6g2llexw0nts.sel3.cloudtype.app";

export function articleGet(page: string) {
  return axios.get(`/article/${page}`, { withCredentials: true });
}

export function articleDetail(page: string, id?: string) {
  return axios.get(`/article/${page}/${id}`, { withCredentials: true });
}

export function commentsGet(page: string, postID?: string) {
  return axios.get(`/article/${page}/${postID}/comments`, {
    withCredentials: true,
  });
}
