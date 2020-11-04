import React, { useEffect, useState } from "react";

export const updateAddressKey = (state) => {
  let result = "";
  Object.entries(state.addresses).forEach(([key, value]) => {
    if (
      state.address === value.address &&
      state.zipcode === value.zipcode &&
      state.town === value.town
    )
      result = key;
  });
  return result;
};

export default function Form({ state, onChange, addAddress }) {
  const { address, zipcode, town, addresses } = state;

  const [addressKey, setAddressKey] = useState("");
  const [isCurrentAddressKeyValid, setIsCurrentAddressKeyValid] = useState(
    false
  );

  const listAddress = Object.keys(addresses);

  useEffect(() => {
    setIsCurrentAddressKeyValid(listAddress.indexOf(addressKey) > -1);
  });

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
      <label htmlFor="address">Adresse</label>
      <input
        required
        aria-invalid="false"
        autoComplete="address-line1"
        className="form-control"
        id="address"
        name="address"
        placeholder="999 avenue de france"
        type="text"
        value={address}
        onChange={onChange}
      />

      <label htmlFor="town">Ville</label>

      <input
        required
        aria-invalid="false"
        autoComplete="address-level2"
        className="form-control"
        id="town"
        name="town"
        placeholder="Paris"
        type="text"
        value={town}
        onChange={onChange}
      />

      <label htmlFor="zipcode">Code Postal</label>
      <input
        required
        aria-invalid="false"
        autoComplete="postal-code"
        className="form-control"
        id="zipcode"
        inputMode="numeric"
        max="99999"
        maxLength="5"
        min="00000"
        minLength="4"
        name="zipcode"
        pattern="[0-9]{5}"
        placeholder="75001"
        type="text"
        value={zipcode}
        onChange={onChange}
      />

      <label htmlFor="addressKey">Mémoriser l'adresse</label>
      <div className="flex">
        <input
          aria-invalid="false"
          className="form-control"
          id="addressKey"
          name="addressKey"
          placeholder="Maison"
          type="text"
          value={addressKey}
          onChange={(e) => setAddressKey(e.target.value)}
        />
        <button
          className="w-auto inline-block ml-4 btn-add"
          onClick={() => addAddress(addressKey)}
        >
          {isCurrentAddressKeyValid ? "Sauvegarder" : "Ajouter"}
        </button>
      </div>
      <div>Addresses mémorisées: {listAddress.join(", ")}</div>
    </div>
  );
}
