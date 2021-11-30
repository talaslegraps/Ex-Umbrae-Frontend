import { Card } from "react-bootstrap";

const NFTCard = ({
  albumCard: { image, name, description, HP, POW, id },
  unique,
}) => {
  return unique ? (
    <div className="card-details">
      <Card className="single-card card-front" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title className="front-title">{name}</Card.Title>
        </Card.Body>
      </Card>
      <Card className="single-card card-back" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>HP: {HP}</Card.Text>
          <Card.Text>Power: {POW}</Card.Text>
          <Card.Text>Card ID: {id}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <Card className="single-album-card card-front" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="album-front-title">{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default NFTCard;
