import { BACKEND_URL } from "../config";

let API_URL = BACKEND_URL + "/api/userInfo";

export const updateImpactLevel = async (userId, level) => {
  let response = await fetch(API_URL + "/updateImpactLevel", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId,
      level,
    }),
  });
  response = await response.json();
  return response;
};
