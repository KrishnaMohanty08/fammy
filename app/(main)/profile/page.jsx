// app/profile/page.js
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Comic_Neue } from 'next/font/google';
import Navbar from '@/components/navbar';

const comic = Comic_Neue({ weight: '400', subsets: ['latin'] });

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
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex justify-center items-center"><div className="w-12 h-12 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin"></div></div>;
  }

  if (!session) return null;

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <img
          src="/images/p2.png"
          alt="Background"
          className="w-full h-full object-cover blur-md transform transition duration-300 hover:scale-110"
        />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className={`${comic.className} bg-white/90 backdrop-blur-lg rounded-xl p-8 max-w-md mx-auto shadow-2xl`}>
            <h1 className="text-2xl font-bold text-center mb-4">{formData.username}</h1>
            <p className="text-gray-600 text-center mb-6">{formData.bio || 'No bio yet'}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block mb-2 text-lg font-semibold text-gray-800">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="bio" className="block mb-2 text-lg font-semibold text-gray-800">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
