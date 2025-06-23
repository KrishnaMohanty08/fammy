import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Avatar } from "@mui/material";
import AddPost from "./AddPost";

const FeedDisplay = ({ posts, session, fetchData, updateLikes, updateDislikes }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    setLoading(false); // Loading handled by parent, but kept for local state if needed
  }, []);

  const handleSearch = (e) => {
    try {
      const value = e.target.value;
      router.push(`?search=${encodeURIComponent(value)}`);
    } catch (error) {
      alert("unable to search the query");
    }
  };

  const filteredPosts = posts.filter((post) =>
    (post.title?.toLowerCase().includes(query) || 
     post.body?.toLowerCase().includes(query) || 
     post.tags?.some((tag) => tag.toLowerCase().includes(query)))
  );

  const stories = filteredPosts.length > 0 ? filteredPosts : posts;

  if (loading) {
    return <div className="flex items-center justify-center h-[calc(100vh-232px)] mx-4 sm:ml-40 mt-6">
      <div className="w-12 h-12 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="flex-1 overflow-y-auto max-h-screen mx-4 sm:ml-40 mt-6">
      <div className="flex justify-center bg-slate-700 rounded mt-15 mx-4 sm:mx-40">
        <input
          type="text"
          className="flex-1 bg-transparent text-white text-sm p-2 outline-none placeholder-gray-400"
          placeholder="Search stories that interest you..."
          onChange={handleSearch}
          defaultValue={query}
        />
      </div>
      <div className="flex justify-center sticky top-20 z-10">
        <AddPost fetchData={fetchData} session={session} />
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {stories.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 w-full max-w-md transition-transform duration-300 hover:shadow-black hover:shadow-2xl shadow-lg"
          >
            <div className="text-left text-white">
              <div className="flex items-center gap-4">
                <Avatar alt="Emy Sharp" src="./images/p4.jpg" className="w-12 h-12 border-2 border-white mb-4 inline" />
                <h2>{post.userId?.username || 'Anonymous'}</h2>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-100">{post.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Chip key={index} label={tag} variant="outlined" sx={{ color: "white" }} />
                ))}
              </div>
              <div>
                <span className="mb-2 text-green-400 mr-6">Likes: {post.reactions.likes}</span>
                <span className="mb-2 text-red-400">Dislikes: {post.reactions.dislikes}</span>
                <p className="mb-4 text-gray-200 p-3 rounded-lg bg-gray-700 bg-opacity-50">
                  {post.body}
                </p>
                <div className="flex justify-between gap-4">
                  <Button variant="contained" className="bg-blue-600 hover:bg-blue-700" onClick={() => updateLikes(post._id)}>
                    Like
                  </Button>
                  <Button variant="contained" className="bg-red-600 hover:bg-red-700" onClick={() => updateDislikes(post._id)}>
                    Dislike
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedDisplay;