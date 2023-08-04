import Error from "next/error";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <Card.Img
        src={
          data.primaryImageSmall ||
          `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`
        }
      />
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
              {data.medium} <br />
              <br />
            </>
          ) : (
            "N/A"
          )}
          <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="outline-secondary">{objectID}</Button>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
