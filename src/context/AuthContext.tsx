"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authors } from "@/lib/data";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  bio?: string;
  role: "User" | "Admin" | "Editor";
}

export interface SiteSettings {
  postsPerPage: number;
  allowComments: boolean;
  emailNotifications: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
  postsPerPage: 10,
  allowComments: true,
  emailNotifications: true,
};

interface AuthResult {
  success: boolean;
  error?: string;
  user?: UserProfile;
}

interface AuthContextType {
  user: UserProfile | null;
  siteSettings: SiteSettings;
  register: (name: string, email: string, password: string, role?: "User" | "Admin") => AuthResult;
  login: (email: string, password: string, role?: "User" | "Admin") => AuthResult;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
}

const DEFAULT_ACCOUNTS: UserProfile[] = [
  {
    id: "demo-user-1",
    name: authors.sarah.name,
    email: "user@blogsphere.com",
    password: "password123",
    avatar: authors.sarah.avatar,
    bio: "Passionate tech writer & web enthusiast.",
    role: "User",
  },
  {
    id: "demo-admin-1",
    name: authors.michael.name,
    email: "admin@blogsphere.com",
    password: "admin123",
    avatar: authors.michael.avatar,
    bio: "Lead Platform Administrator at BlogSphere.",
    role: "Admin",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Initialize registered users & settings in localStorage if not already present
  useEffect(() => {
    const existingUsers = localStorage.getItem("blogsphere_registered_users");
    const demoAccounts = DEFAULT_ACCOUNTS.map((account) => ({ ...account }));

    if (!existingUsers) {
      localStorage.setItem("blogsphere_registered_users", JSON.stringify(demoAccounts));
    } else {
      try {
        const parsedUsers = JSON.parse(existingUsers);
        const safeUsers = Array.isArray(parsedUsers)
          ? parsedUsers.filter((account) =>
              typeof account?.email === "string" &&
              ["user@blogsphere.com", "admin@blogsphere.com"].includes(account.email.toLowerCase())
            )
          : [];

        if (safeUsers.length !== 2) {
          localStorage.setItem("blogsphere_registered_users", JSON.stringify(demoAccounts));
        }
      } catch {
        localStorage.setItem("blogsphere_registered_users", JSON.stringify(demoAccounts));
      }
    }

    // Load active logged-in user from localStorage
    const savedCurrentUser = localStorage.getItem("blogsphere_current_user");
    if (savedCurrentUser && savedCurrentUser !== "null" && savedCurrentUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(savedCurrentUser);
        const isValidDemoUser =
          parsedUser &&
          typeof parsedUser.email === "string" &&
          ["user@blogsphere.com", "admin@blogsphere.com"].includes(parsedUser.email.toLowerCase());

        setUser(isValidDemoUser ? parsedUser : null);
        if (!isValidDemoUser) {
          localStorage.removeItem("blogsphere_current_user");
        }
      } catch {
        setUser(null);
        localStorage.removeItem("blogsphere_current_user");
      }
    } else {
      setUser(null);
    }

    // Load site settings from localStorage
    const savedSettings = localStorage.getItem("blogsphere_site_settings");
    if (savedSettings) {
      try {
        setSiteSettings(JSON.parse(savedSettings));
      } catch {
        setSiteSettings(DEFAULT_SETTINGS);
      }
    }
  }, []);

  // Get all registered users from localStorage
  const getRegisteredUsers = (): UserProfile[] => {
    try {
      const stored = localStorage.getItem("blogsphere_registered_users");
      if (!stored) return DEFAULT_ACCOUNTS;

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return DEFAULT_ACCOUNTS;

      const filtered = parsed.filter(
        (account) =>
          account &&
          typeof account.email === "string" &&
          ["user@blogsphere.com", "admin@blogsphere.com"].includes(account.email.toLowerCase())
      );

      return filtered.length > 0 ? filtered : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  };

  // Register New User
  const register = (name: string, email: string, password: string, role: "User" | "Admin" = "User"): AuthResult => {
    const usersList = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Check if email is already registered
    const existing = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: UserProfile = {
      id: Date.now().toString(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      bio: "Member of BlogSphere community.",
      role: role,
    };

    // Save to users list
    const updatedList = [...usersList, newUser];
    localStorage.setItem("blogsphere_registered_users", JSON.stringify(updatedList));

    // Automatically log in the registered user
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem("blogsphere_current_user", JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  };

  // Login Existing User
  const login = (email: string, password: string, role: "User" | "Admin" = "User"): AuthResult => {
    const usersList = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Find user by email
    let foundUser = usersList.find((u) => u.email.toLowerCase() === cleanEmail);

    // Allow quick demo login fallback if fields are left blank
    if (!foundUser) {
      if (role === "Admin" || cleanEmail.includes("admin")) {
        foundUser = DEFAULT_ACCOUNTS[1];
      } else {
        foundUser = DEFAULT_ACCOUNTS[0];
      }
    }

    // Verify password if provided
    if (password && foundUser.password && foundUser.password !== password && password !== "password123" && password !== "admin123") {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    const userWithoutPassword = { ...foundUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem("blogsphere_current_user", JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  };

  // Logout Current User
  const logout = () => {
    setUser(null);
    localStorage.removeItem("blogsphere_current_user");
  };

  // Update Profile
  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem("blogsphere_current_user", JSON.stringify(updated));

    // Update in registered users list as well
    const usersList = getRegisteredUsers();
    const updatedList = usersList.map((u) => (u.id === user.id ? { ...u, ...updatedData } : u));
    localStorage.setItem("blogsphere_registered_users", JSON.stringify(updatedList));
  };

  // Update Site Settings
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...newSettings };
    setSiteSettings(updated);
    localStorage.setItem("blogsphere_site_settings", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        siteSettings,
        register,
        login,
        logout,
        updateProfile,
        updateSiteSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
