import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await axios.post(
        "http://localhost:3000/create-post",
        formData
      );

      console.log("Post created successfully:", res.data);

      // Clear form
      e.target.reset();

      // Go to Feed page
      navigate("/feed");

    } catch (error) {
      console.log("Error creating post:", error);

      if (error.response) {
        console.log("Backend error:", error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create a Post
          </h1>

          <p className="text-gray-500 mt-2">
            Share something with your community
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter post title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>

            <textarea
              name="caption"
              rows="5"
              placeholder="Write your post here..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent resize-none"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <select
              name="category"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent"
            >
              <option value="">
                Select a category
              </option>

              <option value="technology">
                Technology
              </option>

              <option value="education">
                Education
              </option>

              <option value="coding">
                Coding
              </option>

              <option value="lifestyle">
                Lifestyle
              </option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              text-gray-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg
              font-semibold hover:bg-blue-700 transition"
            >
              Create Post
            </button>

            <button
              type="reset"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg
              font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;