import React from "react";
import "./Toggle.css";

export default function Toggle({ checked, onChange, label }) {
  return (
    <label class="label">
      <div class="toggle">
        <input
          class="toggle-state"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <div class="toggle-inner">
          <div class="indicator"></div>
        </div>
        <div class="active-bg"></div>
      </div>
      <div class="label-text">{label}</div>
    </label>
  );
}
