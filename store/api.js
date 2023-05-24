import AuthService from "./auth";

/*
 * @cookies: nuxt lib for cookies
 * Documentation: https://www.npmjs.com/package/cookie-universal-nuxt
 */
export async function request(axios, type, url, data, cookies) {
  let request;

  const token = await AuthService.getToken(cookies);

  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };

  switch (type) {
    case "get":
      request = axios.$get(url, config);
      break;
    case "post":
      request = axios.$post(url, data, config);
      break;
    case "put":
      request = axios.$put(url, data, config);
      break;
    case "delete":
      request = axios.$delete(url, config);
      break;
  }

  return request;
}
