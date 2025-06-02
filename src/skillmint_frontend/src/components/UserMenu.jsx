import React from "react";

export default function UserMenu({ onProfileClick }) {
  return (
    <div className="absolute right-0 mt-2 w-52 bg-white rounded shadow-lg z-50 p-3 text-sm animate-fadeIn">
      <div className="flex items-center gap-2 pb-3 border-b">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div>
          <div className="font-semibold text-xs">Angela Tallon</div>
          <div className="text-xs text-gray-500">Quezon City University</div>
        </div>
      </div>
      <button
        className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded mt-2"
        onClick={onProfileClick}
      >
        View Profile
      </button>
      <button className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded text-red-500">
        Sign Out
      </button>
    </div>
  );
}
