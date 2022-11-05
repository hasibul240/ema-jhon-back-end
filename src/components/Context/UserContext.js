import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase/firebase.init';


export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({ children }) => {

    const [user, set_user] = useState(null);
    const [loading, set_loading] = useState(true);

    const create_user = (email, password) => {
        set_loading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const sign_in = (email, password) => {
        set_loading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const log_out = () => {
        set_loading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const un_subscribed = onAuthStateChanged(auth, current_user => {
            set_user(current_user);
            set_loading(false);
        });
        return () => un_subscribed;
    }, [])

    const auth_info = { user, loading, create_user, sign_in, log_out };

    return (
        <AuthContext.Provider value={auth_info}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;