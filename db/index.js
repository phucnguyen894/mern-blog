const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://phucnguyen08051997:Phuc8947753@cluster0.eanwni9.mongodb.net/')
    .then(() => console.log('Connected mongo db'))
    .catch(e => console.log(e))