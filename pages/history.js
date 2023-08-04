import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "../lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = [];
  if (!searchHistory) return null;

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();

    parsedHistory.push(Object.fromEntries(entries));
  });

  async function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from triggering other events
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });

    // Remove history item from the database
    await removeFromHistory(searchHistory[index]);
  }

  // If searchHistory is not loaded yet, return null to prevent rendering the "Nothing Here" message
  if (!searchHistory) return null;

  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory?.map((current, index) => (
            <ListGroup.Item
              className={styles.historyListItem}
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(current).map((key) => (
                <span key={key}>
                  {key}: <strong>{current[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Nothing Here Try searching some artwork to update your history
          </Card.Body>
        </Card>
      )}
    </>
  );
}
