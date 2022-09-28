import React, {useState, useEffect, useRef} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import Postslist from "../components/Postslist";
import Pagination from "../components/UI/pagination/Pagination";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import Loader from "../components/UI/loader/Loader";
import {useObserver} from "../hooks/useObserver";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setlimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()


    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts,...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount,limit))
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    };

   useObserver(lastElement, page < totalPages, isPostLoading, () => {
     setPage(page + 1)

   })

    useEffect(() => {
        fetchPosts(limit, page)
    },[page])

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton onClick={fetchPosts}>Posts</MyButton>
            <MyButton style={{marginTop: "30px"}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <hr style={{ margin: "15px 0" }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>}
            {isPostLoading &&
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            }
          <Postslist remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
          <div ref={lastElement} style={{height: 20, backgroundColor: 'red'}} />
            <Pagination page={page} changePage={changePage} totalPages={totalPages} />

        </div>
    );
}

export default Posts;
