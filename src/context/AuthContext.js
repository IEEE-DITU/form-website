import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import React, { useContext, useEffect, useState} from 'react'
import { auth } from '../Firebase';

const AuthContext=React.createContext();

export function useAuth(){
    return useContext(AuthContext);
    
}

export function AuthProvider({children}) {

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    useEffect(()=>{
        const unsubsribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
        })
        return unsubsribe
    },[])

const [currentUser,setCurrentUser]=useState();

const value={
    currentUser,
    signup,
    login
}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
