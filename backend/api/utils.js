

const getImages = async(req, res) => {
    const theme = req.query.theme || 'Anime';
    const url = `https://api.unsplash.com/search/photos?page=1&query=${theme}&orientation=portrait&per_page=12&client_id=UQKdsCKoGSEN8Xn2Phji3AqVlMwcCRdhoWw6biCT3Cg`;

    try {
        const response = await fetch(url);
        const dataJSON = await response.json();
        
        if (response.ok) {
            res.status(200).json({results: dataJSON.results, error: null});
        } else {
            throw new Error(dataJSON.error || 'Error fetching from Unsplash')
        }
    } catch (err) {
        res.status(500).json({results: false, error: `Error fetching images: ${err.message}`});
    } 
}

module.exports = getImages;