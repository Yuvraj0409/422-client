import { useRouter } from "next/router";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addToHistory } from "../lib/userData";

import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";

export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    let queryString = "";

    queryString += `searchBy=${data.searchBy}`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    if (data.isOnView) queryString += `&isOnView=${data.isOnView}`;

    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    // Assuming setSearchHistory and addToHistory functions are defined and work correctly
    setSearchHistory((current) => [...current, queryString]);
    await addToHistory(queryString);

    await router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="q"
              {...register("q", {
                required: true,
              })}
            />
            {errors?.q?.type === "required" && (
              <Form.Text className="text-danger">
                Search query is required
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select
            name="searchBy"
            className="mb-3"
            {...register("searchBy")}
          >
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="geoLocation"
              {...register("geoLocation")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
              &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.),
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="medium"
              {...register("medium")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;,
              &quot;Furniture&quot;, &quot;Paintings&quot;,
              &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
              values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
            {...register("isHighlight")}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
            {...register("isOnView")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
