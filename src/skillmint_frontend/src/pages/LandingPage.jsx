import React, { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import {
  createActor,
  canisterId,
} from "../../../declarations/skillmint_backend_main";
import { useNavigate } from "react-router-dom";
import NavBarLandingPage from "../components/NavBarLandingPage";

export default function LandingPage() {
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

  // const test = actor.whoAmI();
  // //if hindi gumana, remove .toStrng() then uncomment below
  // //const name = test.toString();
  // //console.log(name)
  // console.log(test);

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Navbar */}
      <NavBarLandingPage />

      {/* Hero Section */}
      <section className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 h-[70vh] overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full">
              <img
                src={`/hero${i + 1}.png`}
                alt={`bg-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            SkillMInt
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Unleash Verified Talent
          </h2>
          <p className="max-w-2xl text-base md:text-xl mb-6">
            Empower students with blockchain-based credentials— whether you're
            recognizing real-world skills or connecting future-ready talent to
            opportunities.
          </p>
          <button
            className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
            onClick={handleLogin}
          >
            Join Us
          </button>
        </div>
      </section>

      {/* Skills Meet Opportunity Section */}
      <section className="py-16 text-center max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Where Skills Meet Opportunity
        </h2>
        <p className="text-gray-700 text-lg">
          SkillMint is a decentralized platform that helps ICT students in the
          Philippines build real-world experience and verified portfolios.
          Through hackathons, bounties, and community-driven challenges,
          learners earn NFT-based credentials that prove their skills. The
          platform bridges education and opportunity, connecting students with
          events, collaborators, and future-ready tools.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="px-6 mb-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Upcoming Highlights</h3>
          <span className="text-blue-700 font-medium cursor-pointer">
            Show More →
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow">
              <img
                src={`/hack${i + 1}.png`}
                alt={`event-${i}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 text-sm text-gray-800">
                Hackathon – Philippine Blockchain Week 2025
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCOPE Section */}
      <section className="bg-[#022c52] text-white py-24 text-center relative overflow-hidden">
        <h2 className="absolute top-10 left-1/2 -translate-x-1/2 text-[7rem] font-extrabold text-white opacity-10 select-none pointer-events-none">
          SCOPE
        </h2>
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-4 gap-12 px-6">
          {[
            {
              title: "Indentity-Linked Profiles",
              desc: "Create trusted user profiles backed by Internet Identity for secure, verifiable data.",
            },
            {
              title: "Project-safe login",
              desc: "Your login uses Internet Identity for secure, personal access, keeping your profile and data safe from unauthorized use.",
            },
            {
              title: "Tamper-proof credentials",
              desc: "Your identity and credentials are secured in a way that no one can alter or forge them, guaranteeing authenticity and trustworthiness.",
            },
            {
              title: "All users",
              desc: "This profile system supports a range of users—from students developing skills to professionals and organizers managing events.",
            },
          ].map((item, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-gray-200 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          Begin Building Your Verified Future
        </h3>
        <p className="mb-6 text-gray-600">
          Your skills deserve to be seen, verified, and celebrated.
          <br />
          Join a community where learning meets recognition — and every
          experience counts.
        </p>
        <button
          className="px-8 py-3 rounded-full bg-[#002e5b] text-white font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Join SkillMint
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-800 py-12 text-center mt-auto border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left px-4">
          <div>
            <img src="/logo.png" alt="logo" className="w-10 mb-3" />
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">QUICK LINKS</h4>
            <ul className="text-sm space-y-1">
              <li>About SkillMint</li>
              <li>Events & Bounties</li>
              <li>NFT Credentials</li>
              <li>Portfolio Builder</li>
              <li>For Partners & Educators</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">SUPPORT</h4>
            <ul className="text-sm space-y-1">
              <li className="font-bold">Need Help?</li>
              <li>How It Works</li>
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">CONTACT US</h4>
            <ul className="text-sm space-y-1">
              <li>Message</li>
              <li>Email ↗</li>
              <li>Discord ↗</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <div className="w-6 h-6 bg-black rounded"></div>
              <div className="w-6 h-6 bg-black rounded"></div>
              <div className="w-6 h-6 bg-black rounded"></div>
              <div className="w-6 h-6 bg-black rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
