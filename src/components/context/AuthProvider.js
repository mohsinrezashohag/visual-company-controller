import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';


export const myContext = createContext();
const AuthProvider = ({ children }) => {

    const allContext = useFirebase();

    return (
        <myContext.Provider value={allContext}>

            {children}

        </myContext.Provider>
    );
};

export default AuthProvider;