"use client";
import React, { useContext, useEffect, useState } from "react";
import {app, db, isICRC} from "@/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onIdTokenChanged,
  sendEmailVerification
} from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { createHash } from 'crypto';
const AuthContext = React.createContext();

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const [isAdmin, setIsAdmin] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [userData, setUserData] = useState({});
  const [userRecordsId, setUserRecordsId] = useState("");

  function anonymizeEmail(originalEmail) {
    if (isICRC) {
      originalEmail = originalEmail.toLowerCase().trim();
      let hash = createHash('sha256').update(originalEmail).digest('base64').toString();
      return `${hash}@humanitarianmoove.org`;
    } else {
      return originalEmail;
    }
  }

  function signup(email, password) {
    // return createUserWithEmailAndPassword(auth, anonymizeEmail(email), password);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    // return signInWithEmailAndPassword(auth, anonymizeEmail(email), password);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPass(email) {
    return sendPasswordResetEmail(auth, anonymizeEmail(email));
  }

  function updateMail(newEmail) {
    return updateEmail(auth, anonymizeEmail(newEmail));
  }

  function updatePass(password) {
    return updatePassword(auth.currentUser, password);
  }

  function sendEmailVer(user) {
    return sendEmailVerification(user);
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const q = query(
                collection(db, "users"),
                where("userId", "==", user.uid)
        );
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((user) => {
            setUserRecordsId(user.id);
            setUserData({ ...user.data() });
            setIsAdmin(user.data().isAdmin);
            setUserInitials(user.data().userInitials);
            setLoading(false);
          });
        });
      } else {
        setLoading(false);
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateMail,
    updatePass,
    resetPass,
    sendEmailVer,
    isAdmin,
    userData,
    userRecordsId,
    setUserData,
    anonymizeEmail
  };
  return (
          <AuthContext.Provider value={value}>
            {!loading && children}
          </AuthContext.Provider>
  );
}
