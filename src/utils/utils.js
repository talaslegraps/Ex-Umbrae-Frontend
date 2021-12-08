import { Modal } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      className="modal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          About "Ex Umbrae"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Before you can mint EXUM NFT Trading Cards you need to click the
          connect button and connect your MetaMask wallet to the Ethereum
          testnet Rinkeby. No transaction will be executed without your explicit
          consent via MetaMask.
        </p>
        <p>
          Smart Contract:{" "}
          <a href="https://rinkeby.etherscan.io/address/0x21F98862eb86f44604e1F8F67761E34901905216">
            0x21F98862eb86f44604e1F8F67761E34901905216
          </a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="cta-button" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
