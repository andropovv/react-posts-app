import About from "../pages/About";
import React from "react";
import Posts from "../pages/Posts";
import PostIdPage from "../components/utils/PostIdPage";
import Login from "../pages/Login";

export const privateRoutes = [
  { path: '/about', element: About },
  { path: '/posts', element: Posts },
  { path: '/', element: Posts },
  { path: '/*', element: Error },
  { path: '/posts/:id', element: PostIdPage },
]

export const publicRoutes = [
  { path: '/*', element: Login },
  { path: '/login', element: Login }

]

