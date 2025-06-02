import React, { useState } from "react";

export default function ProfileDrawer({ open, onClose }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-40 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`
          fixed right-0 top-12 bottom-8 bg-white shadow-xl z-50
          transition-transform duration-300
          w-full max-w-[400px] flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        // No inline styles, all Tailwind!
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">
            {editMode ? "Edit Profile" : "Profile"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {editMode ? (
            <ProfileEditForm onCancel={() => setEditMode(false)} />
          ) : (
            <ProfileView onEdit={() => setEditMode(true)} />
          )}
        </div>
      </div>
    </>
  );
}

function ProfileView({ onEdit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
      <button
        className="ml-auto mb-2 px-3 py-1 rounded-full border bg-gray-100 hover:bg-gray-200 text-xs self-end"
        onClick={onEdit}
      >
        Edit Profile
      </button>
      <div className="font-bold text-base mb-1">Angela Tallon 👩‍💻🎓</div>
      <div className="text-xs text-gray-500 mb-3">Quezon City University</div>
      <p className="text-sm text-gray-600 mb-4 text-center">
        I am a roblox addict. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et.
      </p>
      <div className="flex flex-col gap-2 text-xs mb-4 w-full">
        <div className="flex items-center gap-2 text-gray-700">
          <span>📧</span> robots.garage@gmail.com
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span>🔗</span> github.com/excel_tahe
        </div>
      </div>
      <div className="w-full">
        <div className="font-semibold text-sm mb-2 flex justify-between">
          <span>Badges</span>
          <button className="text-xs text-blue-600 hover:underline">
            See All
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <span className="text-lg">🏅</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileEditForm({ onCancel }) {
  return (
    <form className="space-y-4">
      <div className="flex flex-col items-center relative mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
        <button
          type="button"
          className="absolute right-0 top-0 px-3 py-1 text-xs bg-gray-200 rounded-full"
        >
          Edit cover photo
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs mb-1">First Name</label>
          <input
            type="text"
            defaultValue="Angela"
            className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Last Name</label>
          <input
            type="text"
            defaultValue="Tallon"
            className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Organization</label>
        <select className="w-full rounded bg-gray-100 px-2 py-1 text-sm">
          <option>Quezon City University</option>
        </select>
      </div>
      <div>
        <label className="block text-xs mb-1">Description</label>
        <textarea
          className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
          rows={3}
          defaultValue="I am a roblox addict. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
        />
        <div className="text-xs text-gray-400 text-right">174/300</div>
      </div>
      <div>
        <label className="block text-xs mb-1">
          Tags (Separate using commas.)
        </label>
        <div className="flex flex-wrap gap-1 mb-1">
          <span className="bg-gray-200 rounded px-2 py-0.5 text-xs">
            UI/UX Design ✕
          </span>
          <span className="bg-gray-200 rounded px-2 py-0.5 text-xs">
            Data Analysis ✕
          </span>
          <span className="bg-gray-200 rounded px-2 py-0.5 text-xs">
            Roblox ✕
          </span>
        </div>
        <input
          type="text"
          className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
          placeholder="Add more tags..."
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Contact Number</label>
        <input
          type="text"
          className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs mb-1">Gmail Account</label>
        <input
          type="text"
          defaultValue="robots.garage@gmail.com"
          className="w-full rounded bg-gray-100 px-2 py-1 text-sm"
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 rounded-full border bg-gray-100 text-gray-800 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm"
        >
          Save
        </button>
      </div>
    </form>
  );
}
