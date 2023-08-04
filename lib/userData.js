"use client";
// const { getToken } = require('./');
const { getToken, readToken } = require("./authenticate");

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchWithAuth = async (urlEndpoint, options) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. User not authenticated.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(urlEndpoint, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
};

async function addToFavourites(id) {
  const url = `${API_URL}/api/user/favourites/${id}`;
  const options = { method: "PUT" };
  return fetchWithAuth(url, options);
}

async function removeFromFavourites(id) {
  const url = `${API_URL}/api/user/favourites/${id}`;
  const options = { method: "DELETE" };
  return fetchWithAuth(url, options);
}

async function getFavourites() {
  const url = `${API_URL}/api/user/favourites`;
  const options = { method: "GET" };
  return fetchWithAuth(url, options);
}

async function addToHistory(id) {
  const url = `${API_URL}/api/user/history/${id}`;
  const options = { method: "PUT" };
  return fetchWithAuth(url, options);
}

async function removeFromHistory(id) {
  const url = `${API_URL}/api/user/history/${id}`;
  const options = { method: "DELETE" };
  return fetchWithAuth(url, options);
}

async function getHistory() {
  const url = `${API_URL}/api/user/history`;
  const options = { method: "GET" };
  return fetchWithAuth(url, options);
}

module.exports = {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToHistory,
  removeFromHistory,
  getHistory,
};
