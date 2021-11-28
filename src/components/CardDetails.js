import { useContext } from "react";
import MetadataContext from "../context/MetadataContext";

const CardDetails = () => {
  const { metadata } = useContext(MetadataContext);

  console.log(metadata);

  return metadata ? (
    <div>
      <img src={metadata[0].image} />
    </div>
  ) : (
    <h2>No metadata found.</h2>
  );
};

export default CardDetails;
