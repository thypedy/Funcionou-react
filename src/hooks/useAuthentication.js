import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase/config";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  const logout = () =>{
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data) =>{
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try{
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error){
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("uses-not"));

      let systemErrorMessage;

      if(error.message.includes("user-not-found")){
        systemErrorMessage = "Usuário não encontrado";
      }else if( error.message.includes("wrong-password")){
        systemErrorMessage = "Senha Incorreta";
      }else {
        systemErrorMessage = "Ocorreu um erro, tente mais tarde";
      }

      console.log(systemErrorMessage);
      setError(systemErrorMessage);
    }
    console.log(error);
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};