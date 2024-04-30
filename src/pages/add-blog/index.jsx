import { useContext, useEffect } from 'react';
import classes from './styles.module.css'
import { GlobalContext } from '../../Context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AddNewBlog() {

    const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
    const navigate = useNavigate()
    const location = useLocation()

    async function handleSaveBlogToDatabase() {
        const res = isEdit ? await axios.put(`http://localhost:3000/api/blogs/update/${location.state.currentBlogItem._id}`, {
            title: formData.title,
            description: formData.description,
        }) : await axios.post('http://localhost:3000/api/blogs/add', {
            title: formData.title,
            description: formData.description,
        })
        const result = await res.data
        
        if (result){
            setIsEdit(false)
            setFormData({
                title: '',
                description: '',
            })
            navigate('/')
        }
    }

    useEffect(() => {
        if(location.state){
            const {currentBlogItem} = location.state;
            setIsEdit(true)
            setFormData({
                title: currentBlogItem.title,
                description: currentBlogItem.description
            })
        }
    }, [location])


    return (<div className={classes.wrapper}>
        <h1>{isEdit ? 'Edit a Blog' : 'Add a Blog'}</h1>
        <div className={classes.formWrapper}>
            <input
                name='title'
                placeholder='Enter Blog Title'
                id='title'
                type='text'
                value={formData.title}
                onChange={e => setFormData({
                    ...formData,
                    title: e.target.value,
                })}
            />

            <textarea
                name='description'
                placeholder='Enter Blog Description'
                id='description'
                value={formData.description}
                onChange={e => setFormData({
                    ...formData,
                    description: e.target.value,
                })}
            />

            <button onClick={handleSaveBlogToDatabase}>{isEdit ? 'Edit a Blog' : 'Add a Blog'}</button>


        </div>
    </div>);
}

export default AddNewBlog;