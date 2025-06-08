import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backendIdlFactory } from "../../../declarations/skillmint_backend_main";
import { idlFactory as llmIdlFactory } from "../../../declarations/llm";
import canisterIds from '../../../../.dfx/playground/canister_ids.json';

// WARNING: Use this backend actor everywhere in the frontend for consistent canister calls and error handling.

// Canister IDs from environment
const backendCanisterId = canisterIds.skillmint_backend_main.playground;

const isLocal = process.env.DFX_NETWORK === "local";

// Local development host
const host = isLocal
  ? "http://127.0.0.1:4943"
  : "https://icp0.io";

// Create a generic actor
console.log("Backend canister ID:", backendCanisterId);
function createActor(canisterId, idlFactory) {
  const agent = new HttpAgent({ host });

  // ONLY for local development
  if (process.env.DFX_NETWORK === "local") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "⚠️ Unable to fetch root key. Is the local replica running?"
      );
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}

// Export named actors
export const backend = createActor(backendCanisterId, backendIdlFactory);

// Helper to get a single event by ID
export async function getEventInfo(id) {
  return backend.getEvent(id);
}
