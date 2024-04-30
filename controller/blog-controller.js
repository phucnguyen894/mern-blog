const mongoose = require('mongoose');
const Blog = require('../model/Blog')

// fetch List of Blogs function
const fetchListOfBlogs = async (req, res) => {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch (e) {
        console.log(e)
    }
    if (!blogList) {
        return res.status(404).json({ message: 'No Blogs Found' })
    }

    return res.status(200).json({ blogList })
}


// Add new Blog fucntion
const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreateBlog = new Blog({
        title, description, date: currentDate
    })

    try {
        await newlyCreateBlog.save()
    } catch (e) {
        console.log(e)
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session)
        session.commitTransaction()
    } catch (e) {
        return res.send(500).json({ message: e })
    }

    return res.status(200).json({ newlyCreateBlog })
}

// Delete A Blog function
const deleteABlog = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json({ message: 'Successfully Deleted' });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Unable to delete ! Please try again' })
    }
}

//updata a Blog function
const updateABlog = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body
    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
            title, description
        })
    } catch (e) {
        console.log(e);

        return res.status(500).json({ message: 'Something went wrong while updating! Please try again' })
    }

    if(!currentBlogToUpdate){
        return res.status(500).json({message: 'No Blog Found'})
    }
    return res.status(200).json({currentBlogToUpdate})
}

module.exports = {fetchListOfBlogs, deleteABlog, updateABlog, addNewBlog}