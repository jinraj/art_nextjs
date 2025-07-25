'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { set } from 'zod';

const LoginPage = () => {
    const [step, setStep] = useState<'login' | 'code'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [serverCode, setServerCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Simulate backend authentication and code sending
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("domain-login", {
            redirect: true,
            email,
            password,
            callbackUrl: '/admin/addnewart'
        });

        if (!res?.ok) {
            setError('Invalid email or password');
        }
        
        // Replace with real authentication logic
        // if (email === "admin@gmail.com" && password === "admin") {
        //     // Generate random 4-digit code
        //     const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
        //     setServerCode(generatedCode);
        //     // TODO: Send code to user's email via backend API
        //     alert(`Access code sent to ${email}: ${generatedCode}`); // Replace with real email sending
        //     setStep('code');
        //     setError('');
        // } else {
        //     setError('Invalid email or password');
        // }
    };

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === serverCode) {
            alert('Authentication successful!');
            // Redirect or set authenticated state here
            router.push('/admin/listofartworks');
        } else {
            setError('Invalid access code');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
                onSubmit={step === 'login' ? handleLogin : handleCodeSubmit}
            >
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Login</h2>
                {error && <div className="text-red-500 text-center">{error}</div>}
                {step === 'login' ? (
                    <>
                        <div>
                            <label className="block text-gray-600 mb-2 font-semibold">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2 font-semibold">Password</label>
                            <input
                                type="password"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-gray-600 mb-2 font-semibold">Enter Access Code</label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                required
                                maxLength={4}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Verify Code
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default LoginPage;