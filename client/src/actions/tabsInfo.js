let API_URL = "https://tab.pledgeasmile.com/backend/api";

export const updateUserTabsOpened = async (userId) => {
  let response = await fetch(API_URL + "/tabsInfo/updateUserTabs", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  response = await response.json();
  return response;
};

export const fetchUserTabsOpened = async (userId) => {
  let response = await fetch(API_URL + "/tabsInfo/user/" + userId);
  response = await response.json();
  return response;
};

export const fetchGlobalTabsOpened = async () => {
  let response = await fetch(API_URL + "/tabsInfo/global");
  response = await response.json();
  return response;
};
