import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDrawer from "../components/ProfileDrawer";
import LeftSidebar from "../components/LeftSidebar";
import Carousel from "../components/Carousel";
import EventsGrid from "../components/EventsGrid";
import CreateEventModal from "../components/CreateEventModal";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { useAuth } from "../context/AuthContext";
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import CreateUserForm from "../components/CreateUserForm";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import { backend } from "../utils/backend";
import { Principal } from "@dfinity/principal";
// import { toast } from "react-toastify";

// const { auth } = useAuth();

// useEffect(() => {
//   const checkUser = async () => {
//     if (auth.actor && auth.isAuthenticated){
//       const exists = await auth.actor.userExist();
//       if (!exists) {
//         // Redirect to profile edit page or show modal
//         // navigate("/edit-profile");
//         toast.info("Please complete your profile to use all features!");
//       }
//       else{
//         const user_profile = await auth.actor.getUserInfo();
//         const user_firstname =
//           user_profile?.profile?.first_name || "User";
//         toast.info(`Welcome back, ${user_firstname}!`);
//       }
//     }
//   };
//   checkUser();
// }, [auth]
// );

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const { actor, loading, isAuthenticated } = useAuth();
  const [userExists, setUserExists] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const formRef = useRef(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    backend.getUpcomingEvents().then(setUpcomingEvents).catch(console.error);
  }, []);

  useEffect(() => {
    if (actor && isAuthenticated) {
      console.log("[Dashboard] Checking if user exists...");
      actor.userExist && actor.userExist().then((exists) => {
        console.log("[Dashboard] userExist result:", exists);
        setUserExists(exists);
      }).catch((err) => {
        console.error("[Dashboard] userExist error:", err);
        setUserExists(false);
      });
    }
  }, [actor, isAuthenticated]);
  
  useEffect(() => {
    console.log("[Dashboard] userExists changed:", userExists);
    if (userExists === false && actor) {
      // Minimal profile creation logic
      const defaultProfile = {
        first_name: "New",
        last_name: "User",
        email: "",
        phone: "",
        bio: [],
        skills: [],
        social_links: [],
        profile_image: [],
        affiliation: [],
        location: [],
      };
      console.log("[Dashboard] Creating user profile...");
      actor.createUser(defaultProfile)
        .then((result) => {
          console.log("[Dashboard] createUser result:", result);
          if (result[1] === "Created") {
            setUserExists(true);
          }
        })
        .catch(console.error);
    }
  }, [userExists, actor]);

  useEffect(() => {
    if (userExists === false && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [userExists]);

  useEffect(() => {
    backend.getEvents().then(setAllEvents).catch(console.error);
  }, []);

  useEffect(() => {
    if (userExists === false && actor) {
      // Minimal profile creation logic
      const defaultProfile = {
        first_name: "New",
        last_name: "User",
        email: "",
        phone: "",
        bio: [],
        skills: [],
        social_links: [],
        profile_image: [],
        affiliation: [],
        location: [],
      };
      actor.createUser(defaultProfile)
        .then((result) => {
          if (result[1] === "Created") {
            setUserExists(true);
          }
        })
        .catch(console.error);
    }
  }, [userExists, actor]);

  useEffect(() => {
    if (userExists === true && actor) {
      (async () => {
        const principal = await actor.agent.getPrincipal();
        console.log("[Dashboard] Fetching user profile for principal:", principal.toText());
        actor.getUser(principal)
          .then((profile) => {
            console.log("[Dashboard] getUser result:", profile);
            setUserProfile(profile);
          })
          .catch((err) => {
            console.error("[Dashboard] getUser error:", err);
            setUserProfile(null);
          });
      })();
    }
  }, [userExists, actor]);

  if (loading || !actor) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const calendarUpcomingEvents = upcomingEvents.map(ev => {
    const profile = ev.info?.profile || ev.profile || ev;
    return {
      ...ev,
      startDate: new Date(Number(profile.event_date) / 1_000_000).toISOString().slice(0, 10),
      endDate: new Date(Number(profile.event_date) / 1_000_000).toISOString().slice(0, 10),
      title: profile.event_name,
      description: profile.event_description,
    };
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#E8E8E8] w-screen max-w-full">
      <Navbar onProfileClick={() => setDrawerOpen(true)} />
      <div className="flex-1 w-full relative transition-all duration-300">
        <div className="flex flex-col md:flex-row w-full min-w-0 px-2 sm:px-4 md:px-8 py-2 sm:py-4 md:py-8 gap-6 transition-all duration-300">
          {/* Sidebar (Left) */}
          <aside className="w-full md:w-80 max-w-full md:max-w-xs flex-shrink-0 flex flex-col gap-6">
            <LeftSidebar />
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <Calendar events={calendarUpcomingEvents} />
            </div>
          </aside>
          {/* Main Area */}
          <main className="flex-1 flex flex-col min-w-0 gap-6">
            {/* User existence alert and form */}
            {userExists === false && (
              <div ref={formRef} className="mb-8">
                <div className="flex items-center gap-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                  <span>
                    <strong>Profile incomplete:</strong> You have not set up your SkillMint profile yet. Please complete your profile to use all features.
                  </span>
                  <button className="ml-auto bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setProfileModalOpen(true)}>
                    Create Profile
                  </button>
                </div>
                <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
                  <div className="text-center text-lg font-semibold mb-2">Create Your Profile</div>
                  <div className="border-b border-gray-200 mb-6"></div>
                  <CreateUserForm onSuccess={() => { setUserExists(true); setProfileModalOpen(false); }} />
                </Modal>
              </div>
            )}
            {userExists === true && (
              <>
                <div className="flex items-center gap-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span>
                    <strong>Welcome back!</strong> Your SkillMint profile is active.
                  </span>
                </div>
                {userProfile && (
                  <div className="bg-white rounded shadow p-6 mb-8 max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-4">
                      {userProfile.profile_image && userProfile.profile_image.length > 0 && (
                        <img src={userProfile.profile_image[0]} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
                      )}
                      <div className="flex-1">
                        <div className="text-2xl font-bold mb-1">{userProfile.first_name} {userProfile.last_name}</div>
                        <div className="text-gray-600 mb-1">{userProfile.email}</div>
                        <div className="text-gray-600 mb-1">{userProfile.phone}</div>
                        {userProfile.bio && userProfile.bio.length > 0 && (
                          <div className="text-gray-700 italic mb-1">{userProfile.bio[0]}</div>
                        )}
                        {userProfile.affiliation && userProfile.affiliation.length > 0 && (
                          <div className="text-gray-700 mb-1">Affiliation: {userProfile.affiliation.join(", ")}</div>
                        )}
                        {userProfile.skills && userProfile.skills.length > 0 && (
                          <div className="text-gray-700 mb-1">Skills: {userProfile.skills.join(", ")}</div>
                        )}
                        {userProfile.social_links && userProfile.social_links.length > 0 && (
                          <div className="text-gray-700 mb-1">Social Links: {userProfile.social_links.map((s, i) => (
                            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mr-2">{s.platform}</a>
                          ))}</div>
                        )}
                        {userProfile.location && userProfile.location.length > 0 && (
                          <div className="text-gray-700 mb-1">
                            Location: {userProfile.location[0].establishment ? userProfile.location[0].establishment[0] + ", " : ""}
                            {userProfile.location[0].bldg ? userProfile.location[0].bldg[0] + ", " : ""}
                            {userProfile.location[0].street ? userProfile.location[0].street[0] + ", " : ""}
                            {userProfile.location[0].brgy ? userProfile.location[0].brgy[0] + ", " : ""}
                            {userProfile.location[0].city}, {userProfile.location[0].country}
                            {userProfile.location[0].zipcode ? ", " + userProfile.location[0].zipcode[0] : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {loading || userExists === null ? (
              null
            ) : null}
            {/* Right Column - Carousel and Events List */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Featured Events</h2>
                <Carousel featuredEvents={allEvents.filter(ev => ev.info?.profile?.banner_image).slice(0, 1)} />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <EventsGrid onCreateEventClick={() => setCreateEventOpen(true)} />
              </div>
            </div>
            <CreateEventModal
              open={createEventOpen}
              onClose={() => setCreateEventOpen(false)}
            />
          </main>
        </div>
        {/* Profile Drawer (as a sibling) */}
        <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
      <Footer />
    </div>
  );
}

// Wrap export
export function DashboardPageWithProtection(props) {
  return (
    <ProtectedRoutes>
      <DashboardPage {...props} />
    </ProtectedRoutes>
  );
}
