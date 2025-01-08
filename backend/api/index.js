

const express = require('express');
const app = express();
const port = Number(process.env.PORT) || 9000;
const cors = require('cors');
const path = require('path');
const getImages = require(path.join(__dirname, '/api/utils.js'))

require('dotenv').config();

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", 'index.html'));
})

app.get('/api/images', async (req, res) => {
    const images = await getImages(req, res);
    if (images) {
        res.type('json');
        res.send(images.results);
    } else {
        res.type('text');
        res.send(images.error);
    }
})



app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));