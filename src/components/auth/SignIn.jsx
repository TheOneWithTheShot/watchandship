'use client';
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "/src/firebase";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="sign-in-container w-full h-max font-poppins z-[20]">
            <form onSubmit={signIn}>
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Log in</h1>
                            <input
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-gradient text-white focus:outline-none my-1"
                            >Log In</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default SignIn;