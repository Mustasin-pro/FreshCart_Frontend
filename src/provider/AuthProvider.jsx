import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create Account
    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Email/Password Login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Login
    const signInWithGoogle = async () => {
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const firebaseUser = result.user;

            const response = await axios.post(
                "https://freshcart-backend-j35s.onrender.com/auth/google-signin",
                {
                    username: firebaseUser.displayName,
                    email: firebaseUser.email,
                    profileImage: firebaseUser.photoURL,
                }
            );

            return response.data;
        } catch (error) {
            console.error("Google Login Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logOut = () => {
        localStorage.removeItem("token");
        setUser(null);
        return signOut(auth);
    };

    // Firebase Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (!currentUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const decoded = jwtDecode(token);

                    setUser({
                        uid: currentUser.uid,
                        dbId: decoded.id,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        role: decoded.role,
                    });
                } catch (error) {
                    console.error("JWT Decode Error:", error);

                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    });
                }
            } else {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                });
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createAccount,
        signInUser,
        signInWithGoogle,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;