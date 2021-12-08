import { useState } from "react";
import { ethers } from "ethers";
import myEpicNft from "../utils/MyEpicNFT.json";
import Candle from "./Candle";
import wizSymbol from "../media/symbol_wizard_gold.png";
import warSymbol from "../media/symbol_warlock_gold.png";
import necSymbol from "../media/symbol_necromancer_gold.png";
import HP_30 from "../media/HP_30.png";
import HP_50 from "../media/HP_50.png";
import HP_70 from "../media/HP_70.png";
import POW_30 from "../media/POW_30.png";
import POW_50 from "../media/POW_50.png";
import POW_70 from "../media/POW_70.png";
import "../styles/components/Mint.css";

const Mint = ({ CONTRACT_ADDRESS }) => {
  const [minting, setMinting] = useState(false);

  const askContractToMintWizard = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeWizardNFT();

        console.log("Mining...please wait.");
        setMinting(true);
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setMinting(false);
      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  const askContractToMintWarlock = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeWarlockNFT();

        console.log("Mining...please wait.");
        setMinting(true);
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setMinting(false);
      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  const askContractToMintNecromancer = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeNecromancerNFT();

        console.log("Mining...please wait.");
        setMinting(true);
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setMinting(false);
      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  return (
    <>
      <center>The Summoning</center>
      <div className="mint-container">
        {minting === true ? (
          <div className="minting-container">
            <Candle />
            <h2 className="mint-message">
              The spirits are listening to your invocation...
            </h2>
          </div>
        ) : (
          <>
            <div className="mint-button-container">
              <div className="class-div">
                <img
                  className="img-example"
                  src="https://gateway.pinata.cloud/ipfs/QmYjiN28ZAMv9iRuNDn21q7LeXcM7iGbmGqN5EehQBC757"
                  alt="example wizard"
                />
                <figcaption>Sample wizard: Griselda Müller</figcaption>
                <h5>Class Symbol</h5>
                <img className="symbol" src={wizSymbol} alt="wizard symbol" />
                <h5>Base Stats</h5>
                <div className="stats-container">
                  <img className="stats" src={HP_50} alt="HP 50" />
                  <img className="stats" src={POW_50} alt="Power 50" />
                </div>
                <button
                  onClick={askContractToMintWizard}
                  className="cta-button mint-button"
                >
                  Summon Wizard
                </button>
              </div>
              <div className="class-div">
                <img
                  className="img-example"
                  src="https://gateway.pinata.cloud/ipfs/QmPrBimGmfbcR8XTHJ2nyoMWziTdw34PN2Fo9rmCXGWxCo"
                  alt="example warlock"
                />
                <figcaption>Sample warlock: Abigail Darkmore</figcaption>
                <h5>Class Symbol</h5>
                <img className="symbol" src={warSymbol} alt="warlock symbol" />
                <h5>Base Stats</h5>
                <div className="stats-container">
                  <img className="stats" src={HP_70} alt="HP 70" />
                  <img className="stats" src={POW_30} alt="Power 30" />
                </div>
                <button
                  onClick={askContractToMintWarlock}
                  className="cta-button mint-button"
                >
                  Summon Warlock
                </button>
              </div>
              <div className="class-div">
                <img
                  className="img-example"
                  src="https://gateway.pinata.cloud/ipfs/QmeiTjj1CCiLDBsY4fGsPrKseVAyye6Zv3YTUiYEXNci51"
                  alt="example necromancer"
                />
                <figcaption>Sample necromancer: Voidborn</figcaption>
                <h5>Class Symbol</h5>
                <img
                  className="symbol"
                  src={necSymbol}
                  alt="necromancer symbol"
                />
                <h5>Base Stats</h5>
                <div className="stats-container">
                  <img className="stats" src={HP_30} alt="HP 30" />
                  <img className="stats" src={POW_70} alt="Power 70" />
                </div>
                <button
                  onClick={askContractToMintNecromancer}
                  className="cta-button mint-button"
                >
                  Summon Necromancer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Mint;
