

export default async function fetchImages(theme) {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${theme}&per_page=12&client_id=${import.meta.env.VITE_UNSPLASH_SECRET_KEY}`;
    try {
        const response = await fetch(url);
        const responseJSON = await response.json()
       
        if (response.ok) {
            return responseJSON.results;
        } else {
            const errorMessage = responseJSON.error.message || 'Unknown error';
            throw new Error(`Error fetching images from API: ${errorMessage}`);
        }
    } catch (err) {
        throw new Error(err.message || 'Unknown error')
    }
}