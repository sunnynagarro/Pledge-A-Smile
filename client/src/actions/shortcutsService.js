import { BACKEND_URL } from "../config";

let API_URL = BACKEND_URL + "/api/shortcuts";

export const createShortcut = async (name, url, userId) => {
  let response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, url, userId }),
  });
  response = await response.json();
  return response;
};

export const getShortcuts = async (userId) => {
  let response = await fetch(API_URL + "?userId=" + userId);
  response = await response.json();
  return response;
};

export const updateShortcut = async (name, url, shortcutId) => {
  let response = await fetch(API_URL + "/" + shortcutId, {
    method: "PUT",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({ name, url, shortcutId })
  });
  response = await response.json();
  return response;
};

export const deleteShortcut = async (shortcutId) => {
  let response = await fetch(API_URL + "/" + shortcutId, {
    method: "DELETE",
  });
  response = await response.json();
  return response;
};
