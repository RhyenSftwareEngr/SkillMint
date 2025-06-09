import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { createActor, canisterId } from '../../../declarations/skillmint_backend_main';

interface AuthContextType {
  authClient: AuthClient | null;
  isAuthenticated: boolean;
  identity: any;
  actor: any;
  userProfile: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [identity, setIdentity] = useState<any>(null);
  const [actor, setActor] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user profile helper
  const fetchUserProfile = async (act: any, id: any) => {
    if (act && id) {
      try {
        const profile = await act.getUser(id.getPrincipal());
        setUserProfile(profile);
      } catch (e) {
        setUserProfile(null);
      }
    }
  };

  useEffect(() => {
    console.log("[AuthContext] Creating AuthClient...");
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const loggedIn = await client.isAuthenticated();
      setIsAuthenticated(loggedIn);
      if (loggedIn) {
        const id = client.getIdentity();
        setIdentity(id);
        const act = createActor(canisterId, { agentOptions: { identity: id, host: import.meta.env.VITE_DFX_NETWORK === "local" ? "http://localhost:4943" : "https://icp0.io" } });
        setActor(act);
        await fetchUserProfile(act, id);
        console.log("[AuthContext] Created actor with principal:", id.getPrincipal().toText());
      }
      setLoading(false);
      console.log("[AuthContext] AuthClient created. isAuthenticated:", loggedIn);
    });
  }, []);

  useEffect(() => {
    console.log("[AuthContext] isAuthenticated changed:", isAuthenticated);
    if (isAuthenticated && actor && identity) {
      fetchUserProfile(actor, identity);
    }
  }, [isAuthenticated, actor, identity]);

  const login = async () => {
    if (!authClient) return;
    console.log("[AuthContext] login() called");
    await authClient.login({
      identityProvider: import.meta.env.VITE_DFX_NETWORK === "local" ? "https://2btah-yaaaa-aaaab-qaciq-cai.icp0.io/" : "https://identity.ic0.app",
      onSuccess: async () => {
        setIsAuthenticated(true);
        const id = authClient.getIdentity();
        setIdentity(id);
        const act = createActor(canisterId, { agentOptions: { identity: id, host: import.meta.env.VITE_DFX_NETWORK === "local" ? "http://localhost:4943" : "https://icp0.io" } });
        setActor(act);
        await fetchUserProfile(act, id);
        console.log("[AuthContext] Login success. Principal:", id.getPrincipal().toText());
      },
      onError: (err: unknown) => {
        console.error("[AuthContext] ❌ Login failed:", err);
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setActor(null);
    setUserProfile(null);
    console.log("[AuthContext] Logged out");
  };

  return (
    <AuthContext.Provider value={{ authClient, isAuthenticated, identity, actor, userProfile, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}