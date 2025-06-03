import React, { useState, useEffect } from "react";

const badges = Array.from({ length: 8 });
const attendedEvents = Array.from({ length: 2 });
const certifications = Array.from({ length: 2 });

export default function ProfileDrawer({ open, onClose }) {
  const [editMode, setEditMode] = useState(false);

  // Lock scroll when drawer is open on mobile only
  // useEffect(() => {
  //   if (open && window.innerWidth < 768) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [open]);

  return (
    <>
      {/* Overlay only on mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`
          fixed right-0 z-50 bg-white shadow-2xl flex flex-col
          transition-transform duration-300
          w-full md:w-[420px] max-w-full md:max-w-none
          h-full md:top-12 md:bottom-8 md:h-auto
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {editMode ? (
          <ProfileEditForm onCancel={() => setEditMode(false)} />
        ) : (
          <ProfileView onEdit={() => setEditMode(true)} onClose={onClose} />
        )}
      </div>
    </>
  );
}

function ProfileView({ onEdit, onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Banner and Avatar */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="cover"
          className="w-full h-28 object-cover rounded-t-2xl"
        />
        <img
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute left-1/2 top-16 -translate-x-1/2"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-2xl rounded-full p-1 shadow hover:bg-gray-100"
          aria-label="Close profile drawer"
        >
          &times;
        </button>
      </div>

      <div className="flex flex-col items-center mt-16 px-6 pb-4">
        <div className="font-bold text-xl mb-1 flex items-center gap-1">
          Angela Tallon <span>👩‍💻🎓</span>
        </div>
        <div className="text-gray-500 text-sm mb-2">Quezon City University</div>
        <div className="flex gap-2 mb-2">
          <button className="text-xs bg-blue-100 text-blue-700 rounded px-3 py-1 hover:bg-blue-200">
            Export Profile
          </button>
          <button
            className="text-xs bg-gray-100 rounded px-3 py-1 hover:bg-gray-200"
            onClick={onEdit}
          >
            Edit Profile
          </button>
        </div>
        <p className="text-gray-700 text-center my-3 text-sm">
          I am a roblox addict. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
        </p>
        {/* Contact */}
        <div className="flex flex-col items-center gap-1 text-xs mb-2">
          <span className="flex items-center gap-1">
            <span>📧</span>robots.garage@gmail.com
          </span>
          <span className="flex items-center gap-1">
            <span>🔗</span>github.com/excel_tahe
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Badges */}
        <ProfileSection title="Badges" seeAll>
          <div className="flex gap-2 flex-wrap">
            {badges.map((_, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xl shadow"
              >
                🏅
              </div>
            ))}
          </div>
        </ProfileSection>

        {/* Attended Events */}
        <ProfileSection title="Attended Events" seeAll>
          <div className="flex gap-2 overflow-x-auto">
            {attendedEvents.map((_, i) => (
              <div
                key={i}
                className="min-w-[80px] h-16 bg-gray-200 rounded-lg flex items-center justify-center shadow text-xs px-2"
              >
                <span>Event {i + 1}</span>
              </div>
            ))}
          </div>
        </ProfileSection>

        {/* Certifications */}
        <ProfileSection title="Certifications" seeAll>
          <div className="flex gap-2 overflow-x-auto">
            {certifications.map((_, i) => (
              <div
                key={i}
                className="min-w-[80px] h-16 bg-gray-100 rounded-lg flex items-center justify-center shadow text-xs px-2"
              >
                <span>Certificate {i + 1}</span>
              </div>
            ))}
          </div>
        </ProfileSection>
      </div>
    </div>
  );
}

// Edit Form
function ProfileEditForm({ onCancel }) {
  return (
    <form className="space-y-4 flex flex-col flex-1 overflow-y-auto p-6">
      <div className="flex flex-col items-center relative mb-4">
        <div className="w-full h-28 bg-gray-200 rounded-t-2xl mb-[-48px]" />
        <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow-lg" />
        <button
          type="button"
          className="absolute right-0 top-2 px-3 py-1 text-xs bg-gray-200 rounded-full"
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

// Section component
function ProfileSection({ title, seeAll, children }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="font-semibold text-sm">{title}</div>
        {seeAll && (
          <button className="text-xs text-blue-600 hover:underline">
            See All
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
