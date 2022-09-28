import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import Loader from "../UI/loader/Loader";

const PostIdPage = () => {
  const params = useParams()

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostById, isLoading, postError] = useFetching(async (id) => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })
  const [fetchComments, isCommentLoading, CommentError] = useFetching(async (id) => {
    const response = await PostService.getCommentsById(params.id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>Вы открыли страницу поста с ID = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>{post.id}. {post.title}</div>}
      <h1>Comments</h1>
      {isCommentLoading
        ? <Loader/>
        : <div>
          {comments.map((com) =>
            <div style={{marginTop: '15px'}} key={com.id}>
              <h5>{com.email}</h5>
              <div>{com.body}</div>
            </div>
          )
          }

        </div>}
    </div>
  );
};

export default PostIdPage;