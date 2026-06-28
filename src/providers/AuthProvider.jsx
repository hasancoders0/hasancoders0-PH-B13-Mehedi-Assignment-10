"use client";

import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { saveUserToDB, getJWTToken } from "@/services/auth.service";

import { auth } from "@/firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
    });

    await saveUserToDB({
      displayName: name,
      email,
    });

    const token = await getJWTToken(email);

    localStorage.setItem("access-token", token);

    return result;
  };

  const loginUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const token = await getJWTToken(email);

    localStorage.setItem("access-token", token);

    return result;
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    await saveUserToDB(result.user);

    const token = await getJWTToken(result.user.email);

    localStorage.setItem("access-token", token);

    return result;
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
