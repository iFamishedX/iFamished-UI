import React from "react";

export default function InputBox({ value, onChange, placeholder }) {
  return (
    <div className="inputbox">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
