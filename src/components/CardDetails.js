import { useContext } from "react";
import { useParams } from "react-router-dom";
import MetadataContext from "../context/MetadataContext";
import { Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

const CardDetails = () => {
  const { metadata } = useContext(MetadataContext);
  const { id } = useParams();

  const foundCard = metadata.find((el) => el.id === Number(id));

  console.log(foundCard);

  return foundCard ? (
    <div className="card-details">
      <Card className="single-card card-front" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={foundCard.image} />
        <Card.Body>
          <Card.Title className="front-title">{foundCard.name}</Card.Title>
        </Card.Body>
      </Card>
      <Card className="single-card card-back" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{foundCard.name}</Card.Title>
          <Card.Text>{foundCard.description}</Card.Text>
          <Card.Text>HP: {foundCard.HP}</Card.Text>
          <Card.Text>Power: {foundCard.POW}</Card.Text>
          <Card.Text>Card ID: {foundCard.id}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <h2 className="error">No metadata found.</h2>
  );
};

export default CardDetails;
