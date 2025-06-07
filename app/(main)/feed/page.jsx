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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = React.useState(0);


  const fetchData = async () => {
    try {
      let req = await fetch("/api/posts");
      let data = await req.json();
      // console.log(data.posts)
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
      console.log("Error updating like", error)
    }
  }

  const updateDislikes = async (postId) => {
    try {
      let res = await fetch(`/api/posts/${postId}/dislikes`, {
        method: "POST"
      });

      if (res) {
        const data = await res.json();
        console.log("updated data:" + data);
        fetchData();
      } else {
        console.log("not decremented")
      }

    } catch (error) {
      console.log("ERROR:" + error)
    }
    console.log("dislikes updated");
  }



  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-19 py-24 [background:radial-gradient(180%_145%_at_10%_0%,#000_50%,#63e_120%)]"></div>
      <Navbar />
      <SelectedListItem selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-10">
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
              <AddPost />
              {/* Cards Section */}
              <div className="flex flex-wrap gap-6 justify-center m-4 ml-39 mt-5">
                {/* {posts.slice(Math.random()*15, Math.random() * 50).map((post) => ( */}
                {posts.slice(25, 31).map((post) => (
                  <div key={post._id} className="containers">
                    <div className="px-2 text-left align-top rounded text-white">
                      <Avatar alt="Emy Sharp" src={`./images/p4.jpg`} />
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.map((tag, index) => (
                          <Chip sx={{ color: 'white' }} key={index} label={tag} variant="outlined" className="text-white" />
                        ))}
                      </div>
                      <div>
                        <span className="mb-2 text-green-500 mr-10">
                          Likes: {post.reactions.likes}
                        </span>
                        <span className="mb-2 text-red-500">
                          Dislikes: {post.reactions.dislikes}
                        </span>
                        <p className={`mb-2 text-white ${comic.className} p-2 rounded`}>
                          {post.body}
                        </p>
                        <div className="flex justify-between ">
                          <Button variant="contained" onClick={() => updateLikes(post._id)}>Like </Button>
                          <Button variant="contained" onClick={() => updateDislikes(post._id)}>DisLike</Button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : selectedIndex === 1 ? (
            <div className="text-white text-center">DMs coming soon!</div>
          ) : null}
        </>
      )}
    </>
  );
}