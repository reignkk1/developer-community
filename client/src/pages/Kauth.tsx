import { useLocation, useSearchParams } from "react-router-dom";

export default function Kauth() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("code"));
  return <div>카카오 인증</div>;
}
