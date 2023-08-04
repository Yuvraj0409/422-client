import Error from "next/error";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";
import { addToFavourites, removeFromFavourites } from "../lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(
    favouritesList?.includes(objectID) ? true : false
  );

  const favouritesClicked = async () => {
    if (showAdded) {
      // setFavouritesList((current) => current.filter((fav) => fav != objectID));
      setFavouritesList(await removeFromFavourites(objectID)); // Remove from favourites
      setShowAdded(false);
    } else {
      // setFavouritesList((current) => [...current, objectID]);
      setFavouritesList(await addToFavourites(objectID)); // Add to favourites
      setShowAdded(true);
    }
  };

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      {data.primaryImage && <Card.Img src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          {data.objectDate && data.classification && data.medium ? (
            <>
              <strong>Date: </strong>
              {data.objectDate} <br />
              <strong>Classification: </strong>
              {data.classification} <br />
              <strong>Medium: </strong>
              {data.medium}
              <br />
              <br />
              {data.objectDate && data.classification && data.medium ? (
                <>
                  <strong>Artist: </strong>
                  {data.artistDisplayName} (
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    wiki
                  </a>
                  )
                  <br />
                  <strong>Credit Line: </strong>
                  {data.creditLine} <br />
                  <strong>Dimensions: </strong>
                  {data.dimensions} <br />
                  <br />
                  <Button
                    variant={showAdded ? "primary" : "outline-primary"}
                    onClick={() => favouritesClicked()}
                  >
                    {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                  </Button>
                </>
              ) : (
                "N/A"
              )}
            </>
          ) : (
            "N/A"
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
