import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NFTCard = ({ albumCard: { token_metadata, token_id }, unique }) => {
  const [metadata, setMetadata] = useState("");

  useEffect(() => {
    fetch(token_metadata)
      .then((response) => response.json())
      .then((data) => {
        setMetadata(data);
        console.log("Metadata set");
      })
      .catch((err) => console.error(err));
  }, [token_metadata]);

  return (
    <>
      {metadata && unique && (
        <div className="card-details">
          <Card className="single-card card-front" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={metadata.image} />
            <Card.Body>
              <Card.Title className="front-title">{metadata.name}</Card.Title>
            </Card.Body>
          </Card>
          <Card
            className="single-card card-back"
            style={{
              background: `linear-gradient(${metadata.color}, #000000)`,
              width: "18rem",
              border: "5px solid",
            }}
            border="white"
          >
            <Card.Body className="details-body" style={{ color: "white" }}>
              <div className="details-top">
                <Card.Title style={{ fontWeight: "bold" }}>
                  {metadata.name}
                </Card.Title>
                <Card.Text className="details-description">
                  {metadata.description}
                </Card.Text>
              </div>
              <div className="details-bot">
                <Card.Text>Class: {metadata.class}</Card.Text>
                <Card.Text>HP: {metadata.HP}</Card.Text>
                <Card.Text>Power: {metadata.POW}</Card.Text>
                <Card.Text>Card ID: {token_id}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {metadata && !unique && (
        <Card
          className="single-album-card card-front"
          style={{ width: "18rem" }}
        >
          <Link to={`/collection/${token_id}`}>
            <Card.Img variant="top" src={metadata.image} />
          </Link>
          <Card.Body>
            <Card.Title className="front-title">{metadata.name}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default NFTCard;
