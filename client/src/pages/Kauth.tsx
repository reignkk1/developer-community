import { useNavigate, useSearchParams } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { avartarUrl, logined } from "../atom";

export default function Kauth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const setIsLogin = useSetRecoilState(logined);
  const setAvartarUrl = useSetRecoilState(avartarUrl);

  const navigate = useNavigate();

  const grant_type = "authorization_code";
  const client_id = process.env.REACT_APP_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const code = authCode;

  const KAKAO_TOKEN_URI = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`;

  useEffect(() => {
    (async () => {
      const data = await (
        await fetch(KAKAO_TOKEN_URI, {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
      ).json();
      localStorage.setItem("kakao_token", data.access_token);
      const kakaoToken = localStorage.getItem("kakao_token");
      if (!kakaoToken) return;
      const response = await axios.post("/kauth", { kakaoToken });
      console.log(response);
      setIsLogin(true);
      setAvartarUrl(response.data.profile_image);
      navigate("/");
    })();
  }, []);

  return <div>카카오 인증</div>;
}
