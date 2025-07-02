"use client";
import "../../globals.css";
import Navbar from "../../../components/navbar";
import React, { useEffect, useState, Suspense } from "react";
import { Roboto, Comic_Neue } from "next/font/google";
import SelectedListItem from "@/components/SelectedListItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FeedDisplay from "@/components/FeedDisplay";
import Profile from "@/components/Profile";

const comic = Comic_Neue({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchData = async () => {
    try {
      const req = await fetch("/api/posts");
      const data = await req.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [status, router, session]);

  const updateLikes = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      const data = await res.json();
      console.log('Updated Post:', data);
      fetchData();
    } catch (error) {
      console.log("Error updating like", error);
    }
  };

  const updateDislikes = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}/dislikes`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        console.log("Updated data:", data);
        fetchData();
      } else {
        console.log("Not decremented");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-pink-800 to-indigo-900"></div>
      <Navbar />
      <SelectedListItem selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-20px)] mx-4 sm:ml-40 mt-6">
          <lord-icon
            src="https://cdn.lordicon.com/ydhnbgpj.json"
            trigger="loop"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
        </div>
      ) : (
        <>
          {selectedIndex === 0 ? (
            <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-232px)] mx-4 sm:ml-40 mt-6">
              <lord-icon src="https://cdn.lordicon.com/ydhnbgpj.json" trigger="loop" style={{ width: "150px", height: "150px" }}></lord-icon>
            </div>}>
              <FeedDisplay posts={posts} session={session} fetchData={fetchData} updateLikes={updateLikes} updateDislikes={updateDislikes} />
            </Suspense>
          )  : selectedIndex === 1 ? (
            <Profile />
          ) : null}
        </>
      )}
    </>
  );
}
