import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { ethers } from "ethers";
import myEpicNft from "./utils/MyEpicNFT.json";
import { Switch, Route, Link } from "react-router-dom";
import logo from "./media/logo_final.png";
import Header from "./components/Header";
// import CardDetails from "./components/CardDetails";
import MetadataContext from "./context/MetadataContext";
import Navbar from "./components/Navbar";
import Album from "./components/Album.js";
import MyVerticallyCenteredModal from "./utils/utils";
import Info from "./components/Info";
import Spinner from "./components/Spinner";

const OPENSEA_LINK = "https://testnets.opensea.io/collection/exumbrae";

const CONTRACT_ADDRESS = "0x8B4172145AAC5cDBbeadec85cfdD21FB3EC770F0";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [openSeaAPI, setOpenSeaAPI] = useState("");
  const [userNftCollection, setUserNftCollection] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [popUp, setPopUp] = React.useState(false);

  const [minting, setMinting] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
      setOpenSeaAPI(
        `https://rinkeby-api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${CONTRACT_ADDRESS}&order_direction=desc&offset=0&limit=50`
      );
      setupEventListener(account);
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
      setupEventListener(accounts[0]);
      setOpenSeaAPI(
        `https://rinkeby-api.opensea.io/api/v1/assets?owner=${accounts[0]}&asset_contract_address=${CONTRACT_ADDRESS}&order_direction=desc&offset=0&limit=50`
      );

      fetch(openSeaAPI, { method: "GET" })
        .then((response) => response.json())
        .then((data) => setUserNftCollection(data))
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async (account) => {
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
          if (from.toLowerCase() === account) {
            return window.alert(
              `Hey there! We've created your Card and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
            );
          }
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const renderNotConnectedContainer = () => (
    <>
      <button className="cta-button" onClick={() => setModalShow(true)}>
        About
      </button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <button
        onClick={connectWallet}
        className="cta-button connect-wallet-button"
      >
        Connect to Wallet
      </button>
    </>
  );
// popup???
  const popUpConfirmation = () => {
    return (
      <PopUpConfirmation show={modalShow} onHide={() => setModalShow(false)} />
    );
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    fetch(openSeaAPI, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setUserNftCollection(data))
      .catch((err) => console.error(err));
  }, [openSeaAPI]);

  return (
    <MetadataContext.Provider value={{ userNftCollection }}>
      <Switch>
        <Route path="/collection/:id?">
          <Header onShowSidebar={showSidebar} sidebar={sidebar} />
          <Album />
        </Route>
        <Route path="/info">
          <Header onShowSidebar={showSidebar} />
          <Navbar sidebar={sidebar} onShowSidebar={showSidebar} />
          <Info />
        </Route>
        <Route path="/">
          <div className="App">
            <div className="container">
              <div className="header-container">
                <img src={logo} alt="logo" />
                <p className="font-face-magic">Ex Umbrae</p>
                <p className="sub-text">NFT Trading Card Game</p>
                <div className="button-container">
                  {currentAccount === "" ? (
                    renderNotConnectedContainer()
                  ) : minting === true ? (
                    <>
                      <h1>The spirits are listening to your invocation...</h1>
                      <Spinner />
                    </>
                  ) : (
                    <>
                      {/* {popUpConfirmation()} */}
                      <button
                        onClick={askContractToMintWizard}
                        className="cta-button connect-wallet-button"
                      >
                        Mint Wizard
                      </button>
                      <button
                        onClick={askContractToMintWarlock}
                        className="cta-button connect-wallet-button"
                      >
                        Mint Warlock
                      </button>
                      <button
                        onClick={askContractToMintNecromancer}
                        className="cta-button connect-wallet-button"
                      >
                        Mint Necromancer
                      </button>
                      <Link to="/collection">
                        <button className="cta-button opensea-button">
                          My Collection
                        </button>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => window.open(OPENSEA_LINK, "_blank")}
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
