import { useParams } from "react-router-dom";
import MetadataContext from "../context/MetadataContext";
import { useContext } from "react";
// import CardDetails from "./components/CardDetails";
import NFTCard from "./NFTCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/components/Album.css";

const Album = () => {
  const { userNftCollection } = useContext(MetadataContext);
  const { id } = useParams();

  // if (!userNftCollection) return null;

  return (
    <Container fluid className="nft-cards-container">
      <Row>
        {userNftCollection.assets &&
          userNftCollection.assets
            .filter((object) => {
              if (id) {
                return object.token_id === id;
              } else {
                return object;
              }
            })
            .map((albumCard) => {
              return (
                <Col key={albumCard.token_id}>
                  <NFTCard albumCard={albumCard} unique={id} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default Album;
