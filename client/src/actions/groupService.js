let API_URL = "http://localhost:3001/api/groups";

export const fetchGroups = async (userId) => {
  let response = await fetch(API_URL + "?userId=" + userId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    params: {
      userId
    }
  });
  response = await response.json();
  return response;
};

export const fetchGroupUsers = async (groupId) => {
  let response = await fetch(API_URL + "/" + groupId + "/users", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  response = await response.json();
  return response;
};

export const createGroup = async (userId, groupName) => {
  let response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId,
      groupName
    }),
  });
  response = await response.json();
  return response;
};

export const updateGroup = async (groupId, groupName) => {
  let response = await fetch(API_URL + '/' + groupId, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      groupId,
      groupName
    }),
  });
  response = await response.json();
  return response;
};

export const deleteGroup = async (groupId) => {
  let response = await fetch(API_URL + '/' + groupId, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      groupId
    }),
  });
  response = await response.json();
  return response;
};