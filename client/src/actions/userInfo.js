let API_URL = "https://tab.pledgeasmile.com/backend/api/userInfo";

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
