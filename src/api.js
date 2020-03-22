import axios from "axios";

const kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: "KakaoAK 77975f51ee52bc2ac6772de737313fd8"
  }
});

export const blogSearch = params => {
  return kakao.get("/v2/search/blog", { params });
};
