"use client";

export function ConfirmDelete({ name }: { name: string }) {
  return (
    <button
      className="adm-btn danger"
      onClick={(e) => {
        if (!confirm(`Delete the inquiry from ${name} permanently?`)) e.preventDefault();
      }}
    >
      Delete permanently
    </button>
  );
}
