let API_URL = "https://tab.pledgeasmile.com/backend/auth";

export const emailLogin = async (reqBody) => {
  let response = await fetch(API_URL + "/emailLogin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  response = await response.json();
  return response;
};

export const socialLogin = async ({ email, name, referralId }) => {
  let response = await fetch(API_URL + "/socialLogin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      referralId,
    }),
  });
  response = await response.json();
  return response;
};

export const forgotPassword = async (email) => {
  let response = await fetch(API_URL + "/forgotPassword", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  response = await response.json();
  return response;
};

export const updateUserPassword = async ({ password, resetPasswordToken }) => {
  let response = await fetch(API_URL + "/resetPassword", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      password,
      resetPasswordToken,
    }),
  });
  response = await response.json();
  return response;
};
