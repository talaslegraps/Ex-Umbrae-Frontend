import "../styles/components/Candle.css";

const Candle = () => {
  return (
    <div className="candle-container">
      <div className="box-canvas">
        <div className="puddle"></div>
        <div className="candle">
          <div className="drip"></div>
          <div className="drip-left"></div>
        </div>
        <div className="flame-wrapper">
          <div className="flame-outer"></div>
          <div className="flame-inner"></div>
        </div>
        <div className="wick"></div>
      </div>
    </div>
  );
};

export default Candle;
