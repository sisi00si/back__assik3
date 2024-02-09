const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://su:lab123456@lab1.she7d5c.mongodb.net/blogging_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected succesfully'))
.catch(err => console.error(err));

app.use(bodyParser.json());

// Routes
const blogRoutes = require('./app');
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
