import { useContext, useEffect } from "react"
import { GlobalContext } from "../../Context";
import axios from "axios";
import classes from './styles.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Home() {
    const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext)

    const navigate = useNavigate()

    async function fetchApi() {
        setPending(true)
        const res = await axios.get("http://localhost:3000/api/blogs")
        const result = await res.data

        if (result && result.blogList && result.blogList.length) {
            setBlogList(result.blogList)
            setPending(false)
        } else {
            setPending(false)
            setBlogList([])
        }
    }

    async function handleDeleteBlog(currentID) {
        const res = await axios.delete(`http://localhost:3000/api/blogs/delete/${currentID}`);
        const result = await res.data;
        console.log(result)

        if (result?.message) {
            fetchApi();
        }
    }

    async function handleEdit(currentBlogItem) {
        navigate('/add-blog', { state: { currentBlogItem } })
    }

    useEffect(() => {
        fetchApi()
    }, [])


    return (
        <div className={classes.wrapper}>
            <h1>Blog List</h1>
            {pending ? (
                <h1>Loading Blogs ! Please wait</h1>
            ) : (
                <div className={classes.blogList}>
                    {blogList && blogList.length ? blogList.map((blogItem, index) => (
                        <div key={index}>
                            <p>{blogItem.title}</p>
                            <p>{blogItem.description}</p>
                            <FaEdit size={30} onClick={() => handleEdit(blogItem)} />
                            <FaTrash size={30} onClick={() => handleDeleteBlog(blogItem._id)} />
                        </div>
                    )) : <h3>No Blog Added</h3>
                    }
                </div>
            )
            }
        </div>
    )
}

export default Home
