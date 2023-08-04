import ArtworkCard from "@/components/ArtworkCard";
import { Card, Col, Row } from "react-bootstrap";

import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";

export default function FavouriteList() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Row className="gy-4">
      {favouritesList?.length > 0 ? (
        favouritesList.map((id) => (
          <Col lg={3} key={id}>
            <ArtworkCard objectID={id} />
          </Col>
        ))
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Nothing Here Try adding some new artwork to the list
          </Card.Body>
        </Card>
      )}
    </Row>
  );
}
