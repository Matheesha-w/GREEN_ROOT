import React from "react";
import Sidebar from "../components/Sidebar";
import BlogPosts from "../components/BlogPosts";
import NavBFarmer from "../extras/NavBFarmer";

function BlogPage() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <BlogPosts />
    </div>
  );
}

export default BlogPage;
