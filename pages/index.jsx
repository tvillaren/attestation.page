import React, { useEffect, useRef, useState } from "react";

import FormAddress, { updateAddressKey } from "../components/FormAddress";
import FormDate from "../components/FormDate";
import FormName, { updatePersonKey } from "../components/FormName";
import Meta from "../components/Meta";
import Reason from "../components/Reason";
import { generatePdf } from "../lib/pdf-util";
import useLocalStorage from "../lib/use-local-storage";
import { addSlash, openBlob, validateState } from "../lib/util";

export default function Home() {
  const emptyState = {
    lastname: "",
    firstname: "",
    birthday: "",
    lieunaissance: "",
    address: "",
    zipcode: "",
    town: "",
    addresses: {},
    persons: {},
  };

  const [state, setState] = useLocalStorage(
    "attestation-derogatoire",
    emptyState
  );

  const [initialStateValid, setInitialStateValid] = useState(false);
  useEffect(() => {
    if (validateState(state)) {
      setInitialStateValid(true);
    }

    const datesortie = new Date().toLocaleDateString("fr-FR");
    const heuresortie = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setState({
      ...state,
      heuresortie,
      datesortie,
    });
  }, []);

  const [stateValid, setStateValid] = useState(false);

  useEffect(() => {
    if (validateState(state)) {
      setStateValid(true);
    }
    setAddressKey(updateAddressKey(state));
    setPersonKey(updatePersonKey(state));
  }, [state]);

  const onChange = (event) => {
    const input = event.target;
    setState({ ...state, [input.id]: input.value });
  };

  // Address handling

  const [addressKey, setAddressKey] = useState("");
  const listAddressKey = () => Object.keys(state.addresses);

  const pickAddress = (key) => {
    const data = state.addresses[key];
    if (data) {
      setAddress(data);
      setAddressKey(key);
    }
  };

  const setAddress = (addressObj) => {
    setState({
      ...state,
      address: addressObj.address,
      zipcode: addressObj.zipcode,
      town: addressObj.town,
    });
  };

  const addAddress = (key) => {
    if (!key) return;

    const newAddress = {
      address: state.address,
      zipcode: state.zipcode,
      town: state.town,
    };

    setState({
      ...state,
      addresses: { ...state.addresses, [key]: newAddress },
    });
  };

  // Person handling

  const listPersonKey = () => Object.keys(state.persons);
  const [personKey, setPersonKey] = useState("");

  const pickPerson = (key) => {
    const data = state.persons[key];
    if (data) {
      setPerson(data);
    }
  };

  const setPerson = (personObj) => {
    setState({
      ...state,
      firstname: personObj.firstname,
      lastname: personObj.lastname,
      birthday: personObj.birthday,
      lieunaissance: personObj.lieunaissance,
    });
  };

  const addPerson = (key) => {
    if (!key) return;

    const newPerson = {
      firstname: state.firstname,
      lastname: state.lastname,
      birthday: state.birthday,
      lieunaissance: state.lieunaissance,
    };

    setState({
      ...state,
      persons: { ...state.persons, [key]: newPerson },
    });
  };

  // Time handling

  const setTime = (value) => {
    setState({ ...state, heuresortie: value });
  };

  // Generic handlers

  const onDateKeyUp = (event) => {
    const input = event.target;
    const key = event.keyCode || event.charCode;
    if (key !== 8 && key !== 46) {
      setState({ ...state, [input.id]: addSlash(input.value) });
    }
  };

  const onClick = async (event) => {
    const reason = event.target.id;
    const pdfBlob = await generatePdf(state, reason, "/certificate.pdf");
    console.log(pdfBlob);
    openBlob(pdfBlob, `attestation-${Date.now()}.pdf`);
  };

  const emptyForm = () => {
    setState(emptyState);
  };

  return (
    <>
      <Meta />
      <div className="p-4 md:p-6 lg:p-12 max-w-2xl mx-auto">
        <div className="prose mb-12">
          <h1>Attestation de déplacement dérogatoire</h1>
          <p>
            Remplissez le formulaire une fois, il sera sauvegardé sur votre
            navigateur. Choisissez un motif pour télécharger une attestation à
            l'heure et date actuelle.
          </p>
          <p>
            Ce service n'est pas officiel mais délivre des attestations
            conformes, en un clic.
          </p>
        </div>

        <FormDate
          setTime={setTime}
          state={state}
          onChange={onChange}
        ></FormDate>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
          <div className="flex">
            {listAddressKey().map((key) => {
              return (
                <button
                  key={key}
                  className={
                    "text-center mx-2 px-2" +
                    (addressKey === key ? " btn-green" : "")
                  }
                  onClick={() => pickAddress(key)}
                >
                  {key}
                </button>
              );
            })}
          </div>
          <div className="flex">
            {listPersonKey().map((key) => {
              return (
                <button
                  key={key}
                  className={
                    "text-center mx-2 px-2" +
                    (personKey === key ? " btn-green" : "")
                  }
                  onClick={() => pickPerson(key)}
                >
                  {key}
                </button>
              );
            })}
          </div>
        </div>

        {initialStateValid && (
          <Reason stateValid={stateValid} onClick={onClick} />
        )}

        <FormName
          addPerson={addPerson}
          state={state}
          onChange={onChange}
          onDateKeyUp={onDateKeyUp}
        />

        <FormAddress
          addAddress={addAddress}
          state={state}
          onChange={onChange}
        />

        {!initialStateValid && (
          <Reason stateValid={stateValid} onClick={onClick} />
        )}

        <div className="w-full prose">
          <a href="#" onClick={emptyForm}>
            Oublier mes informations
          </a>

          <p>
            Code source disponible sur{" "}
            <a href="https://github.com/tvillaren/attestation.page">GitHub</a>,
            adapté du projet de{" "}
            <a href="https://github.com/benjamintd/attestation.page">
              Benjamin
            </a>
            , lui-même inspiré des projets de{" "}
            <a href="https://github.com/LAB-MI">Lab MI</a>.
          </p>
          <p>
            Pour être certain d'avoir une attestation à jour, rendez-vous sur{" "}
            <a href="https://media.interieur.gouv.fr/deplacement-covid-19/">
              le site officiel
            </a>{" "}
            du Gouvernement.
          </p>
          {process.env.VERCEL_GITHUB_COMMIT_SHA && (
            <p>version {process.env.VERCEL_GITHUB_COMMIT_SHA.slice(0, 8)}</p>
          )}
        </div>
      </div>
    </>
  );
}
