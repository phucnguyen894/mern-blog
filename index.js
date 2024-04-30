const express = require('express');
const cors = require('cors');
const blogRouter = require('./route/blog-route')

// MongoDB
require("./db")

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter)

app.use('/api', (req,res) => {
    res.status(200).json({message: 'Hello World'});
});



app.listen(3000, () => console.log(`App is running port 3000...`))