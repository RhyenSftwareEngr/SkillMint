import React, { useEffect, useState } from "react";
import NavBarLandingPage from "../components/NavBarLandingPage";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";
import { createActor } from "../../../declarations/skillmint_backend_main";
import { canisterId } from "../../../declarations/skillmint_backend_main/index.js";

const abstractBlocks = (
  <div className="flex flex-wrap gap-2 justify-end items-start mt-4">
    <div className="w-24 h-4 bg-gray-200 rounded"></div>
    <div className="w-36 h-4 bg-gray-300 rounded"></div>
    <div className="w-28 h-4 bg-gray-400 rounded"></div>
    <div className="w-40 h-4 bg-gray-200 rounded"></div>
    <div className="w-20 h-4 bg-gray-300 rounded"></div>
    <div className="w-32 h-4 bg-gray-400 rounded"></div>
  </div>
);

export default function LandingPage() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false
  });

  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    })

    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev)=>({
      ...prev,
      actor,
      authClient,
      isAuthenticated
    }))
  }

  const handleLogin = async () => {
    const authClient = await AuthClient.create();

    const network = process.env.DFX_NETWORK;
    const identityProvider =
      network === "ic"
        ? "https://identity.ic0.app/" // Mainnet
        : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/"; // Local

    await authClient.login({
      identityProvider: identityProvider,
      onSuccess: async () => {
        console.log("✅ Login successful");
        updateActor;
        navigate("/dashboard");
      },
      onError: (err) => {
        console.error("❌ Login failed:", err);
      },
    });
  };

  return (
    <div className="font-sans bg-gradient-to-b from-gray-100 to-white min-h-screen flex flex-col">
      <NavBarLandingPage />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-100 to-blue-100 py-20 flex flex-col items-center relative">
        <div className="absolute inset-0 opacity-30 bg-[url('/grid.svg')] bg-repeat pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 drop-shadow-lg text-center z-10">
          SkillMint
        </h1>
        <p className="text-xl md:text-2xl font-medium mt-4 mb-6 text-center text-gray-700 z-10">
          Unleash Verified Talent
        </p>
        <p className="max-w-xl mx-auto text-center text-gray-600 z-10">
          Build your verified tech profile. Earn badges, join events, and
          connect with future employers—all on a secure, blockchain-based
          platform.
        </p>
        <button
          className="mt-8 px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow hover:bg-blue-700 transition z-10"
          onClick={handleLogin}
        >
          Get Started
        </button>
        {/* You can add a pattern/grid background here */}
        <div className="mt-16 w-full flex justify-center">
          <div className="grid grid-cols-5 gap-4 w-full max-w-4xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-white rounded-xl shadow" />
            ))}
          </div>
        </div>
      </section>

      {/* Where Skills Meet Opportunity */}
      <section className="py-16 px-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Where Skills Meet Opportunity
          </h2>
          <p className="text-gray-600 mb-6">
            SkillMint connects students and professionals with real-world tech
            opportunities. Showcase your abilities with verifiable badges,
            participate in curated events, and join a community that values true
            skill. Whether you’re seeking internships, hackathons, or your dream
            job—SkillMint helps you stand out, everywhere.
          </p>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition">
            Learn More
          </button>
        </div>
        <div className="flex-1">{abstractBlocks}</div>
      </section>

      {/* SCOPE Section */}
      <section className="relative py-20 bg-gray-50">
        <h2 className="absolute top-6 left-1/2 -translate-x-1/2 text-[5rem] md:text-[7rem] font-extrabold text-gray-200 tracking-wide select-none opacity-70 pointer-events-none">
          SCOPE
        </h2>
        <div className="relative z-10 flex justify-center gap-6 mt-24">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-40 h-40 rounded-2xl bg-white shadow-lg flex flex-col items-center justify-end p-4"
            >
              <div className="w-full h-3/5 bg-gray-200 rounded mb-4"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded mb-1"></div>
              <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-gray-100">
        <h2 className="absolute top-6 left-1/2 -translate-x-1/2 text-[4rem] md:text-[6rem] font-extrabold text-gray-300 tracking-wide select-none pointer-events-none">
          EVENTS
        </h2>
        <div className="relative z-10 flex gap-6 justify-center mt-24">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-72 h-48 bg-white rounded-xl shadow-md flex flex-col justify-end p-4"
            >
              <div className="w-full h-3/4 bg-gray-200 rounded mb-3"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
          {/* Pagination dots example */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
          Begin Building Your Verified Future
        </h3>
        <p className="mb-6 text-gray-600">
          Join a thriving community of learners, builders, and employers. Start
          your journey today!
        </p>
        <button
          className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/dashboard")}
        >
          Create Your Profile
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-8 text-center mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm">
            &copy; 2025 SkillMint. All rights reserved.
          </span>
          <div className="flex gap-4">
            {/* Replace with links */}
            <span className="hover:underline cursor-pointer">About</span>
            <span className="hover:underline cursor-pointer">Contact</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            {/* Social icons placeholder */}
            <span className="ml-4 flex gap-2">
              <span className="bg-white rounded-full w-6 h-6 inline-block"></span>
              <span className="bg-white rounded-full w-6 h-6 inline-block"></span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
