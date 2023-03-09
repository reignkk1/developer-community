import axios from "axios";

axios.defaults.baseURL = API_env;

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
