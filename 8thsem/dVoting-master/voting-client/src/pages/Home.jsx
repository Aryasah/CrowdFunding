import React from "react";
import Hero from "../components/Hero";
import { useEffect } from "react";
import getWeb3 from "../../../client/src/getWeb3";
import Election from "../contracts/Election.json";
import Section from "../components/Section";
import Heading from "../components/Heading";
import AdminHome from "../components/Home/AdminHome";
const Home = () => {
  const [electionInstance, setElectionInstance] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [elStarted, setElStarted] = React.useState(false);
  const [elEnded, setElEnded] = React.useState(false);
  const [elDetails, setElDetails] = React.useState(null);
  useEffect(() => {
    const loadWeb3 = async () => {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
      try {
        // Getting the netwrok provider and web3 instance.
        const web3 = await getWeb3();
        console.log("web3", web3);

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const instance = new web3.eth.Contract(
          Election.abi,
          deployedNetwork && deployedNetwork.address
        );
        setElectionInstance(instance);
        setWeb3(web3);
        setAccount(accounts[0]);
        const admin = await electionInstance?.methods.admin().call();
        const started = await electionInstance?.methods.started().call();
        const ended = await electionInstance?.methods.ended().call();
        const details = await electionInstance?.methods.details().call();
        setIsAdmin(admin === accounts[0]);
        setElStarted(started);
        setElEnded(ended);
        setElDetails((elDetails) => ({
          adminName: details?.adminName,
          adminEmail: details?.adminEmail,
          adminTitle: details?.adminTitle,
          electionTitle: details?.electionTitle,
          organizationTitle: details?.organizationTitle,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    loadWeb3();
  }, []);

  if (!web3) {
    return (
      <>
        <Hero />
        <center className="text-white text-lg">
          Loading Web3, accounts, and contract...
        </center>
      </>
    );
  }
  return (
    <>
      <Hero />
      {/* <Section
        className="pt-[12rem] -mt-[5.25rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
      >
      </Section> */}
      {!isAdmin ? (
        <>
          <AdminHome account={account} />
        </>
      ) : (
        <p>Please Wait ...</p>
      )}
    </>
  );
};

export default Home;
