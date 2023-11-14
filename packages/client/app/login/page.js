"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API endpoint for user registration
    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful registration, you can redirect or show a success message
        console.log('User registered successfully!');
      } else {
        // Handle errors, show an error message, etc.
        console.error('Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <div className="form text-black">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="text-black">Username </label>
            <input
              type="text"
              name="uname"
              required
              className="text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="text-black">Password </label>
            <input
              type="password"
              name="pass"
              required
              className="text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account?{' '}
          <Link href="/">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
