import { RichTextFieldReadError } from "pdf-lib";
import React, { useEffect, useState } from "react";

export const updatePersonKey = (state) => {
  let result = "";
  Object.entries(state.persons).forEach(([key, value]) => {
    if (
      state.firstname === value.firstname &&
      state.lastname === value.lastname &&
      state.birthday === value.birthday &&
      state.lieunaissance === value.lieunaissance
    )
      result = key;
  });
  return result;
};

export default function Form({ state, onChange, onDateKeyUp, addPerson }) {
  const { lastname, firstname, birthday, lieunaissance, persons } = state;
  const [personKey, setPersonKey] = useState("");
  const listPersons = Object.keys(persons);

  const [isCurrentPersonKeyValid, setIsCurrentPersonKeyValid] = useState(false);

  useEffect(() => {
    setIsCurrentPersonKeyValid(listPersons.indexOf(personKey) > -1);
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
      <label htmlFor="firstname">Prénom</label>
      <input
        autoFocus
        required
        aria-invalid="false"
        autoComplete="given-name"
        className="form-control"
        id="firstname"
        name="firstname"
        placeholder="Dominique"
        type="text"
        value={firstname}
        onChange={onChange}
      />

      <label htmlFor="lastname">Nom</label>
      <input
        autoFocus
        required
        aria-invalid="false"
        autoComplete="family-name"
        className="form-control"
        id="lastname"
        name="lastname"
        placeholder="Dupont"
        type="text"
        value={lastname}
        onChange={onChange}
      />

      <label htmlFor="birthday">Date de naissance (au format jj/mm/aaaa)</label>
      <input
        required
        aria-invalid="false"
        autoComplete="bday"
        className="form-control"
        id="birthday"
        inputMode="numeric"
        maxLength="10"
        name="birthday"
        pattern="^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)"
        placeholder="01/01/1970"
        type="text"
        value={birthday}
        onChange={onChange}
        onKeyUp={onDateKeyUp}
      />

      <label htmlFor="lieunaissance">Lieu de naissance</label>
      <input
        required
        aria-invalid="false"
        autoComplete="off"
        className="form-control"
        id="lieunaissance"
        name="lieunaissance"
        placeholder="Lyon"
        type="text"
        value={lieunaissance}
        onChange={onChange}
      />

      <label htmlFor="personKey">Mémoriser la personne</label>
      <div className="flex">
        <input
          aria-invalid="false"
          className="form-control"
          id="personKey"
          name="personKey"
          placeholder="Dominique"
          type="text"
          value={personKey}
          onChange={(e) => setPersonKey(e.target.value)}
        />
        <button
          className="w-auto inline-block ml-4"
          onClick={() => addPerson(personKey)}
        >
          {isCurrentPersonKeyValid ? "Sauvegarder" : "Ajouter"}
        </button>
      </div>
      <div>Personnes mémorisées: {listPersons.join(", ")}</div>
    </div>
  );
}
