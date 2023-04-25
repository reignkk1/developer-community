import { useLocation, useSearchParams } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { useEffect } from "react";
import axios from "axios";

export default function Kauth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  // const grant_type = "authorization_code";
  // const client_id = process.env.REACT_APP_REST_API_KEY;
  // const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  // const code = authCode;

  // const KAKAO_TOKEN_URI = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`;

  // useEffect(() => {
  //   fetch(KAKAO_TOKEN_URI, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => localStorage.setItem("kakao_token", data.access_token));
  // }, []);

  return <div>카카오 인증</div>;
}
