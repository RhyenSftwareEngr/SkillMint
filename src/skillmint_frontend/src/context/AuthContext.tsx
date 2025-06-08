import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from '../../../declarations/skillmint_backend_main';

interface AuthContextType {
  authClient: AuthClient | null;
  isAuthenticated: boolean;
  identity: any;
  actor: any;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("[AuthContext] Creating AuthClient...");
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const loggedIn = await client.isAuthenticated();
      setIsAuthenticated(loggedIn);
      if (loggedIn) {
        const id = client.getIdentity();
        setIdentity(id);
        const act = createActor(canisterId, { agentOptions: { identity: id } });
        setActor(act);
        console.log("[AuthContext] Created actor with principal:", id.getPrincipal().toText());
      }
      setLoading(false);
      console.log("[AuthContext] AuthClient created. isAuthenticated:", loggedIn);
    });
  }, []);

  useEffect(() => {
    console.log("[AuthContext] isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);

  const login = async () => {
    if (!authClient) return;
    console.log("[AuthContext] login() called");
    await authClient.login({
      identityProvider: "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/",
      onSuccess: async () => {
        setIsAuthenticated(true);
        const id = authClient.getIdentity();
        setIdentity(id);
        const act = createActor(canisterId, { agentOptions: { identity: id } });
        setActor(act);
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
    console.log("[AuthContext] Logged out");
  };

  return (
    <AuthContext.Provider value={{ authClient, isAuthenticated, identity, actor, login, logout, loading }}>
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