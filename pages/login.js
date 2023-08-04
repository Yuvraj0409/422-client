"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { authenticateUser } from "../lib/authenticate";
import { getFavourites, getHistory } from "../lib/userData";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { Form, Button } from "react-bootstrap";

function Login() {
  const router = useRouter();
  const [favouriteList, setFavouriteList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    const favourites = await getFavourites();
    setFavouriteList(favourites);
    const history = await getHistory();
    setSearchHistory(history);
  }

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const success = await authenticateUser(userName, password);
      if (success) {
        await updateAtoms();
        router.push("/favourites");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className=" col gap-5">
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
