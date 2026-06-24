import { useState } from "react"

export default function Searchbar({ value, onChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search versions..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
