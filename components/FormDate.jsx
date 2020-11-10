import React from "react";

import { addTime } from "../lib/util";

export default function Form({ state, setTime, onChange }) {
  const { datesortie, heuresortie } = state;

  function addTimeToHeureSortie(amount) {
    const newValue = addTime(heuresortie, amount);
    setTime(newValue);
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
      <label htmlFor="datesortie">Date de sortie</label>
      <input
        disabled
        readOnly
        required
        aria-invalid="false"
        className="form-control"
        id="datesortie"
        name="datesortie"
        value={datesortie}
      />

      <label htmlFor="heuresortie">Heure de sortie</label>
      <input
        required
        aria-invalid="false"
        className="form-control"
        id="heuresortie"
        name="heuresortie"
        type="time"
        value={heuresortie}
        onChange={onChange}
      />

      <div className="flex">
        <button
          className="btn-add-time"
          onClick={() => addTimeToHeureSortie(-30)}
        >
          -30
        </button>
        <button
          className="btn-add-time ml-2"
          onClick={() => addTimeToHeureSortie(-5)}
        >
          -5
        </button>
        <button
          className="btn-add-time ml-2"
          onClick={() => addTimeToHeureSortie(-1)}
        >
          -1
        </button>
        <button
          className="btn-add-time ml-2"
          onClick={() => addTimeToHeureSortie(1)}
        >
          +1
        </button>
        <button
          className="btn-add-time ml-2"
          onClick={() => addTimeToHeureSortie(5)}
        >
          +5
        </button>
        <button
          className="btn-add-time ml-2"
          onClick={() => addTimeToHeureSortie(30)}
        >
          +30
        </button>
      </div>
    </div>
  );
}
