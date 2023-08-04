import jwt_decode from "jwt-decode";
const axios = require("axios");

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return null;
  }
}

function removeToken() {
  localStorage.removeItem("token");
}

function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

function authenticateUser(user, password) {
  return axios
    .post(`${API_URL}/api/user/login`, { userName: user, password: password })
    .then((response) => {
      const token = response.data.token;

      if (token) {
        setToken(token);
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}

function registerUser(user, password, password2) {
  return axios
    .post(`${API_URL}/api/user/register`, {
      userName: user,
      password: password,
      password2: password2,
    })
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}

module.exports = {
  setToken,
  getToken,
  removeToken,
  readToken,
  isAuthenticated,
  authenticateUser,
  registerUser,
};
