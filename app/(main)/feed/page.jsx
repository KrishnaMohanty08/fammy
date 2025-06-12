"use client";
import "../../globals.css";
import Navbar from "../../../components/navbar";
import React, { useEffect, useState } from "react";
import { Roboto, Comic_Neue } from "next/font/google";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Avatar } from "@mui/material";
import SelectedListItem from "@/components/SelectedListItem";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddPost from "@/components/AddPost";
import { useForm } from "react-hook-form";

const comic = Comic_Neue({
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchData = async () => {
    try {
      let req = await fetch("/api/posts");
      let data = await req.json();
      setPosts(data.posts);
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
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      const data = await res.json();
      console.log('Updated Post:', data);
      fetchData();
    } catch (error) {
      console.log("Error updating like", error);
    }
  };

  const updateDislikes = async (postId) => {
    try {
      let res = await fetch(`/api/posts/${postId}/dislikes`, {
        method: "POST",
      });
      if (res) {
        const data = await res.json();
        console.log("updated data:", data);
        fetchData();
      } else {
        console.log("not decremented");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const onSubmit = async(data) => {
    try{  
      let res=await fetch(`/api/posts/${postId}/like`)

    }catch(error){
      console.log(error,"Error sorting cards")
    }
    console.log("Search submitted:", data);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-pink-800 to-indigo-900"></div>
      <Navbar />
      <SelectedListItem selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
          <lord-icon
            src="https://cdn.lordicon.com/ydhnbgpj.json"
            trigger="loop"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
        </div>
      ) : (
        <>
          {selectedIndex === 0 ? (
            <>
              <div className="flex justify-center mt-15 mx-4 sm:mx-40">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex items-center px-4 w-full max-w-lg bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-full p-1 shadow-lg"
                >
                  <input
                    type="search"
                    {...register("search")}
                    className="flex-1 bg-transparent text-white text-sm p-2 outline-none placeholder-gray-400"
                    placeholder="Search stories that interest you..."
                  />
                  <button type="submit" className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                    <lord-icon
                      src="https://cdn.lordicon.com/swqyihda.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#e8308c"
                      style={{ width: "24px", height: "24px" }}
                    ></lord-icon>
                  </button>
                </form>
              </div>
              <AddPost />
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-232px)] mx-4 sm:ml-40 mt-6">
                <div className="flex flex-wrap gap-6 justify-center">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 w-full max-w-md transition-transform duration-300 hover:shadow-black hover:shadow-2xl shadow-lg"
                    >
                      <div className="text-left text-white">
                        <Avatar
                          alt="Emy Sharp"
                          src={`./images/p4.jpg`}
                          className="w-12 h-12 border-2 border-white mb-4"
                        />
                        <h3 className="text-2xl font-bold mb-3 text-gray-100">{post.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              variant="outlined"
                              className="text-white border-gray-400"
                            />
                          ))}
                        </div>
                        <div>
                          
                          <span className="mb-2 text-green-400 mr-6">
                            Likes: {post.reactions.likes}
                          </span>
                          <span className="mb-2 text-red-400">
                            Dislikes: {post.reactions.dislikes}
                          </span>
                          <p className={`mb-4 text-gray-200 ${comic.className} p-3 rounded-lg bg-gray-700 bg-opacity-50`}>
                            {post.body}
                          </p>
                          <div className="flex justify-between gap-4">
                            <Button
                              variant="contained"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => updateLikes(post._id)}
                            >
                              Like
                            </Button>
                            <Button
                              variant="contained"
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => updateDislikes(post._id)}
                            >
                              Dislike
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : selectedIndex === 1 ? (
            <div className="text-white text-center text-xl mt-10">DMs coming soon!</div>
          ) : null}
        </>
      )}
    </>
  );
}