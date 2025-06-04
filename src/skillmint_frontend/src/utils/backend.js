import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backendIdlFactory } from "../../../declarations/skillmint_backend_main";
import { idlFactory as llmIdlFactory } from "../../../declarations/llm";

// Canister IDs from environment
const backendCanisterId = process.env.CANISTER_ID_SKILLMINT_BACKEND_MAIN;
const llmCanisterId = process.env.CANISTER_ID_LLM;

// Local development host
const host = "http://127.0.0.1:4943";

// Create a generic actor
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
export const llm = createActor(llmCanisterId, llmIdlFactory);
