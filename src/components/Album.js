import { useParams, Link } from "react-router-dom";
import MetadataContext from "../context/MetadataContext";
import { useState, useContext } from "react";
// import CardDetails from "./components/CardDetails";
import NFTCard from "./NFTCard";
import Deck from "./Deck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/components/Album.css";
import { ToggleSlider } from "react-toggle-slider";

const Album = () => {
  const { userNftCollection } = useContext(MetadataContext);
  const { id } = useParams();
  const [active, setActive] = useState(false);

  // if (!userNftCollection) return null;
  console.log(userNftCollection);

  return (
    <>
      {!id ? (
        <div className="slider-container">
          <span className="view-label">Album View</span>
          <ToggleSlider
            className="toggle-slider"
            barBackgroundColor="#452f6b"
            barBackgroundColorActive="#d9ac18"
            onToggle={() => {
              setActive(!active);
            }}
          />
          <span>Deck View</span>
        </div>
      ) : (
        <div className="back-to-album">
          <Link to="/collection">Back to Album</Link>
        </div>
      )}
      <Container fluid className="nft-cards-container">
        {!active ? (
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
        ) : (
          <Deck />
        )}
      </Container>
    </>
  );
};

export default Album;
