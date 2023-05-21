import axios from "axios";

const request = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
});
type HttpOptions = {
  method: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
  data?: any;
};

export function http<T>(options: HttpOptions) {
  return request[options.method.toLocaleLowerCase()](
    options.url,
    options.data
  ).then((res) => res.data.result);
}
