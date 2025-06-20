// app/profile/page.js
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Roboto } from 'next/font/google';
import Navbar from '@/components/navbar';
import { Divider } from '@mui/material';

const comic = Roboto({ weight: '400', subsets: ['latin'] });

export default function Profile() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ username: '', bio: '' });
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      setFormData({
        username: session.user.username || session.user.name || '',
        bio: session.user.bio || '',
        email:session.user.email,
      });
    }
  }, [status, session, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          username: formData.username,
          bio: formData.bio,

        }),
      });
      session.user.username = formData.username;
      session.user.bio = formData.bio;
      session.user.email=formData.email;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-[calc(100vh-232px)] mx-4 sm:ml-40 mt-6">
          <lord-icon
            src="https://cdn.lordicon.com/ydhnbgpj.json"
            trigger="loop"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
        </div>;
  }

  if (!session) return null;

  return (
      <div className="relative min-h-screen ">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-pink-800 to-indigo-900"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto mt-4 px-4 py-8">
          <div className={`${comic.className} bg-black/90 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto shadow-2xl`}>
            <h1 className="text-2xl font-bold text-white text-center mb-4">Welcome,{formData.username}</h1>
            <h3 className={`${comic.className} text-center text-white font-semibold `}>{session.user.email}</h3>
            <p className="text-white text-center mb-3">{formData.bio}</p>
            <Divider/>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-white">
                <label htmlFor="username" className="block mb-2 text-lg font-semibold ">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-6 text-white">
                <label htmlFor="bio" className="block mb-2 text-lg font-semibold text-white">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white font-semibold p-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
