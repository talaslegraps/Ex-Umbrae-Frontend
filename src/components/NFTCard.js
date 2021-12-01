import { Card } from "react-bootstrap";
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
      {metadata && unique &&
        <div className="card-details">
        <Card className="single-card card-front" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={metadata.image} />
          <Card.Body>
            <Card.Title className="front-title">{metadata.name}</Card.Title>
          </Card.Body>
        </Card>
        <Card className="single-card card-back" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{metadata.name}</Card.Title>
            <Card.Text>{metadata.description}</Card.Text>
            <Card.Text>HP: {metadata.HP}</Card.Text>
            <Card.Text>Power: {metadata.POW}</Card.Text>
            <Card.Text>Card ID: {token_id}</Card.Text>
          </Card.Body>
        </Card>
      </div>}

      {metadata && !unique &&
        <Card className="single-album-card card-front" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={metadata.image} />
        <Card.Body>
          <Card.Title className="album-front-title">{metadata.name}</Card.Title>
        </Card.Body>
      </Card>}
    </>
  );
};

export default NFTCard;
