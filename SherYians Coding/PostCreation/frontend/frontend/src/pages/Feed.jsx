import React, { useState,useEffect } from "react";
import axios from 'axios';
const Feed = () => {
  const [posts, setPosts] = useState([ ]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Feed
          </h1>

          <p className="text-gray-500 mt-1">
            See what's happening in the community
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />

                {/* Content */}
                <div className="p-6">

                  <p className="text-sm text-blue-600 font-medium mb-2">
                    By {post.author}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-5">
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Like
                    </button>

                    <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      Comment
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Feed */
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No posts available
            </h2>

            <p className="text-gray-500 mt-2">
              Create a post to see it here.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Feed;