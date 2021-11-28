import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { ethers } from "ethers";
import myEpicNft from "./utils/MyEpicNFT.json";
import { Switch, Route, Link } from "react-router-dom";
import logo from "./media/logo.png";
import Header from "./components/Header";
import CardDetails from "./components/CardDetails";
import MetadataContext from "./context/MetadataContext";

const OPENSEA_LINK =
  "https://testnets.opensea.io/collection/squarenft-m9kt2kehck";

const CONTRACT_ADDRESS = "0x6dF721755414235268b8F7C7Dbb2eD49742E96e8";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalMintCount, setTotalMintCount] = useState(0);

  const [metadata, setMetadata] = useState([
    {
      name: "Hairy Potter",
      description:
        "One very hairy Wizard. He is been trying to learn the shave spell.",
      image:
        "https://ipfs.io/ipfs/QmPPGBtLCRthfNAAcdGMYJDqp8CxerkAs9WHsRJi8S1Ca8",
      HP: 50,
      POW: 50,
    },
    {
      name: "Professor Pengu",
      description: "Don't let his looks fool you. He is evil incarnate.",
      image:
        "https://ipfs.io/ipfs/QmccH44nTDVd5oqqsdVDeXv6smuL7wBz6Xj4mZm2samKZL",
      HP: 70,
      POW: 30,
    },
    {
      name: "La Wizardina",
      description:
        "She doesn't even know she's a real wizard. She just likeds to wear robes.",
      image:
        "https://ipfs.io/ipfs/QmY25boj1cSjSA1s6oLA88u2pwPU7WTH7gWwWazm1L9KF6",
      HP: 30,
      POW: 70,
    },
  ]);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
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

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've created your Card and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
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
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.");
        await nftTxn.wait();

        let totalMinted = await connectedContract.getTotalNFTsMinted();
        setTotalMintCount(totalMinted);
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalNFTsMinted = async () => {
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
        let totalMinted = await connectedContract.getTotalNFTsMinted();
        setTotalMintCount(totalMinted);
        console.log(`Total NFTs Minted: ${totalMinted}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
    getTotalNFTsMinted();
  }, []);

  return (
    <MetadataContext.Provider value={{ metadata }}>
      <Switch>
        <Route path="/collection">
          <Header />
        </Route>
        <Route path="/">
          <div className="App">
            <div className="container">
              <div className="header-container">
                <img src={logo} />
                <p className="landing-header-text">Le Card Game</p>
                <p className="sub-text">NFT Trading Card Game</p>
                <div className="button-container">
                  {currentAccount === "" ? (
                    renderNotConnectedContainer()
                  ) : (
                    <>
                      <button
                        onClick={askContractToMintNft}
                        className="cta-button connect-wallet-button"
                      >
                        Mint Card
                      </button>
                      <Link to="/collection">
                        <button className="cta-button opensea-button">
                          My Collection
                        </button>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => window.location.assign(OPENSEA_LINK)}
                    className="cta-button opensea-button"
                  >
                    Watch Collection on OpenSea
                  </button>
                </div>
              </div>
              <div className="footer-container"></div>
            </div>
          </div>
        </Route>
      </Switch>
    </MetadataContext.Provider>
  );
};

export default App;
