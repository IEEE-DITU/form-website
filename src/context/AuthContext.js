import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "@firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
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
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
