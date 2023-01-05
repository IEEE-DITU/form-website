import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "@firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { GoogleAuthProvider , signInWithPopup,signInWithRedirect,signOut,onAuthStateChanged} from "@firebase/auth";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const googleSignIn = () =>{
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth,provider);
	}
	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	useEffect(() => {
		const unsubsribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubsribe;
	}, []);
	function verifyUser() {
		return sendEmailVerification(auth.currentUser);
	}

	const value = {
		currentUser,
		signup,
		login,
		verifyUser,
		loading,
		googleSignIn,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
