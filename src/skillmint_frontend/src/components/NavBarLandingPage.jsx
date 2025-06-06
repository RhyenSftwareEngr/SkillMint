import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import {
  createActor,
  canisterId,
} from "../../../declarations/skillmint_backend_main";
import { useNavigate } from "react-router-dom";

export default function NavBarLandingPage() {
  const navigate = useNavigate();
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const loggedIn = await client.isAuthenticated();
      setIsAuthenticated(loggedIn);
    });
  }, []);

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/"
          : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        createActor(canisterId, {
          agentOptions: { identity },
        });
        navigate("/dashboard");
      },
      onError: (err) => {
        console.error("❌ Login failed:", err);
      },
    });
  };

  return (
    <nav className="w-full bg-white shadow-sm px-8 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="SkillMint Logo" className="w-10 h-10 mr-2" />
        <span className="text-xl font-bold text-blue-700 tracking-tight">
          SkillMint
        </span>
      </div>

      {/* Right: CTA + Icons */}

      <div className="flex items-center gap-3">
        <button className="ml-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
        <button
          className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
          onClick={handleLogin}
        >
          {isAuthenticated ? "Dashboard" : "Join Now"}
        </button>
      </div>
    </nav>
  );
}
