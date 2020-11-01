import React from "react";

export default function Form({ state, onChange }) {
  const { address, zipcode, town } = state;

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
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
    </form>
  );
}
