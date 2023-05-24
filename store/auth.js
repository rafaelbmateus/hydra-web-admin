class AuthService {
  static async getToken(cookies) {
    const token = await validateToken(cookies);
    return token;
  }
}

const validateToken = async (cookiesProvider) => {
  const cookiesApp = cookiesProvider.get("userCookies");
  let userCookies = null;

  if (cookiesApp) {
    userCookies = Object.assign(cookiesApp);

    const dateNow = new Date();

    if (cookiesApp.expires_token < dateNow.getTime()) {
      userCookies = await saveCookies(cookiesProvider);
    }

    return userCookies.token;
  }

  userCookies = await saveCookies(cookiesProvider);
  return userCookies.token;
};

const saveCookies = async (cookiesProvider) => {
  // Get last token in request
  const userToken = await requestToken();

  // Setting date expires
  const dateNow = new Date();
  const dateExpires = dateNow.setSeconds(
    dateNow.getSeconds() + userToken.expires_in
  );

  const userCookies = {
    token: userToken.access_token,
    expires_token: dateExpires,
  };

  // Save cookies
  cookiesProvider.set("userCookies", JSON.stringify(userCookies), {
    maxAge: userToken.expires_in,
    path: "/",
  });

  return userCookies;
};

const requestToken = async () => {
  const axios = require("axios");
  const qs = require("qs");

  const data = qs.stringify({
    client_id: process.env.clientId,
    client_secret: process.env.clientSecret,
    grant_type: "client_credentials",
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(process.env.tokenEndpoint, data, config);
    return response.data;
  } catch (err) {
    console.error("Error on get token request ===> ", err);
  }

  return null;
};

export default AuthService;
