export async function request(axios, type, url, data) {
  let request;

  const token = await getToken(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

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

export async function getToken(clientId, clientSecret) {
  const axios = require("axios");
  const qs = require("qs");

  const data = qs.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const res = await axios.post(process.env.TOKEN_ENDPOINT, data, config);

  return res.data.access_token;
}
