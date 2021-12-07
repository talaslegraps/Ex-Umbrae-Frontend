import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Spinner({minting}) {
  return (
    <Loader
      type="ThreeDots"
      color="#d9ac18"
      height={100}
      width={100}
      timeout={minting}
    />
  );
}

export default Spinner;
