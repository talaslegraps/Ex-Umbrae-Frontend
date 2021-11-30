import { Card } from "react-bootstrap";

const CardDetails = ({albumCard}) => {
  return (
    <div className="card-details">
      <Card className="single-card card-front" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={albumCard.image} />
        <Card.Body>
          <Card.Title className="front-title">{albumCard.name}</Card.Title>
        </Card.Body>
      </Card>
      <Card className="single-card card-back" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{albumCard.name}</Card.Title>
          <Card.Text>{albumCard.description}</Card.Text>
          <Card.Text>HP: {albumCard.HP}</Card.Text>
          <Card.Text>Power: {albumCard.POW}</Card.Text>
          <Card.Text>Card ID: {albumCard.id}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
};

export default CardDetails;
