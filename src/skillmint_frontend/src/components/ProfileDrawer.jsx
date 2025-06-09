import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CreateUserForm from "./CreateUserForm";

// Dummy data for badges, events, and certs
const badges = Array.from({ length: 8 });
const attendedEvents = Array.from({ length: 2 });
const certifications = Array.from({ length: 2 });

export default function ProfileDrawer({ open, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const { actor, userProfile } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && actor) {
      (async () => {
        try {
          const principal = await actor.agent.getPrincipal();
          const user = await actor.getUser(principal);
          if (!user || !user.info || !user.info.profile) setShowCreate(true);
          else {
            setUserProfile(user.info.profile);
            setShowCreate(false);
          }
        } catch (e) {
          setShowCreate(true);
        }
      })();
    }
  }, [open, actor]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const handleCreateProfile = async () => {
    if (!actor) return;
    setLoading(true);
    setError(null);
    try {
      const principal = await actor.agent.getPrincipal();
      await actor.addUser(principal, formData);
      setShowCreate(false);
      setUserProfile(formData);
    } catch (e) {
      console.error("[ProfileDrawer] Failed to create user:", e);
      setError("Failed to create profile: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 max-w-[95vw] max-h-[90vh] w-full overflow-y-auto overflow-x-auto"
        style={{ minWidth: 320 }}
      >
        {showCreate ? (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Create your SkillMint Profile</h2>
              <CreateUserForm onSuccess={() => setShowCreate(false)} />
            </div>
          </div>
        ) : editMode ? (
          <ProfileEditForm onCancel={() => setEditMode(false)} />
        ) : (
          <ProfileView userProfile={userProfile} onEdit={() => setEditMode(true)} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function ProfileView({ userProfile, onEdit, onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Banner and Avatar */}
      <div className="relative">
        {/* Banner */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="cover"
          className="w-full h-28 object-cover rounded-t-2xl"
        />
        {/* Avatar */}
        {userProfile && userProfile.profile_image && userProfile.profile_image.length > 0 ? (
          <img
            src={userProfile.profile_image[0]}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute left-1/2 top-16 -translate-x-1/2 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow-lg absolute left-1/2 top-16 -translate-x-1/2" />
        )}
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-2xl rounded-full p-1 shadow hover:bg-gray-100"
          aria-label="Close profile drawer"
        >
          &times;
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col items-center mt-16 px-6 pb-4">
        <div className="font-bold text-xl mb-1 flex items-center gap-1">
          {userProfile ? (
            <>
              {userProfile.first_name} {userProfile.last_name}
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div className="text-gray-500 text-sm mb-2">
          {userProfile && userProfile.affiliation && userProfile.affiliation.length > 0
            ? userProfile.affiliation.join(", ")
            : ""}
        </div>
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
          {userProfile && userProfile.bio && userProfile.bio.length > 0
            ? userProfile.bio[0]
            : ""}
        </p>
        {/* Contact */}
        <div className="flex flex-col items-center gap-1 text-xs mb-2">
          {userProfile && userProfile.email && (
            <span className="flex items-center gap-1">
              <span>📧</span>{userProfile.email}
            </span>
          )}
          {userProfile && userProfile.phone && (
            <span className="flex items-center gap-1">
              <span>📞</span>{userProfile.phone}
            </span>
          )}
          {userProfile && userProfile.social_links && userProfile.social_links.length > 0 && userProfile.social_links.map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              <span>🔗</span>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{s.platform}</a>
            </span>
          ))}
        </div>
        {/* Location */}
        {userProfile && userProfile.location && userProfile.location.length > 0 && (
          <div className="text-xs text-gray-600 text-center mb-2">
            {userProfile.location[0].establishment ? userProfile.location[0].establishment[0] + ", " : ""}
            {userProfile.location[0].bldg ? userProfile.location[0].bldg[0] + ", " : ""}
            {userProfile.location[0].street ? userProfile.location[0].street[0] + ", " : ""}
            {userProfile.location[0].brgy ? userProfile.location[0].brgy[0] + ", " : ""}
            {userProfile.location[0].city}, {userProfile.location[0].country}
            {userProfile.location[0].zipcode ? ", " + userProfile.location[0].zipcode[0] : ""}
          </div>
        )}
        {/* Skills */}
        {userProfile && userProfile.skills && userProfile.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {userProfile.skills.map((skill, i) => (
              <span key={i} className="bg-gray-200 rounded px-2 py-0.5 text-xs">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Badges */}
        <ProfileSection title="Badges" seeAll>
          {userProfile && userProfile.info && userProfile.info.badges && userProfile.info.badges.length > 0 ? (
            userProfile.info.badges.map((badgeObj, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <img src={badgeObj.badge.image_url} alt={badgeObj.badge.name} className="w-8 h-8 rounded-full border" />
                <div>
                  <div className="font-semibold">{badgeObj.badge.name}</div>
                  <div className="text-xs text-gray-600">{badgeObj.badge.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No badges yet.</div>
          )}
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

// Your original edit form, slightly tweaked for consistency
function ProfileEditForm({ onCancel }) {
  return (
    <form className="space-y-4 flex flex-col flex-1 overflow-y-auto p-6">
      {/* Banner and Avatar placeholders */}
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

// Reusable section
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
