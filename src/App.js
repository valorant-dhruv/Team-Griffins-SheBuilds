import logo from "./logo.svg";
import "./App.css";
import Walletconnect from "./Walletconnect.jsx";
import IPFSapp from "./IPFS";
import Context from "./Context";
import React, { useContext, setContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  let [walletaddress, setwalletaddress] = useState();
  let [web3, setweb3] = useState();

  let obj = { walletaddress, setwalletaddress, web3, setweb3 };
  return (
    <div>
      <Context.Provider value={obj}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Walletconnect />} />
            <Route exact path="/Generate" element={<IPFSapp />} />
          </Routes>
        </Router>
      </Context.Provider>

      {/* <Route path="/about" component={} />
      <Route path="/contact" component={Contact} /> */}
    </div>
  );
}

export default App;
