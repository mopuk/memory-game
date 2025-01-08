import { useEffect, useState } from "react";
import styles from "./Game.module.css";
import { useSearchParams, Link } from "react-router-dom";

const SECRET_KEY = "";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [clickedImagesIds, setClickedImagesIds] = useState([]);
    const [best, setBest] = useState(0);
    const [positions, setPositions] = useState([]);
    const [hover, setHover] = useState({ onHover: false, id: null });
    const theme = searchParams.get("theme") || "Anime";

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://localhost:9000/api/images`
                );
                const results = response.json();

                if (response.ok) {
                    setImages(results.results);
                } else {
                    throw new Error(results.error || 'Unknown error')
                }
            } catch (error) {
                console.error(`Error fetching images: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, [theme]);

    useEffect(() => {
        setPositions(images.map((value, index) => index));
    }, [images]);

    useEffect(() => {
        if (clickedImagesIds.length > best) {
            setBest(clickedImagesIds.length);
        }
    }, [clickedImagesIds, best]);

    const handleHover = (e) => {
        const id = e.target.dataset.id;
        setHover((prev) => ({
            onHover: !prev.onHover,
            id: prev.onHover ? null : id,
        }));
    };

    const randomizePositions = () => {
        setPositions(shuffleArray(positions));
    };

    const handleClick = (e) => {
        randomizePositions(shuffleArray(positions));

        if (clickedImagesIds.includes(e.target.dataset.id)) {
            setClickedImagesIds([]);
            return;
        }

        setClickedImagesIds((prev) => [...prev, e.target.dataset.id]);
    };

    const shuffleArray = (array) => {
        let slicedArray = array.slice(0);
        for (let i = 0; i < slicedArray.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return slicedArray;
    };

    return (
        <div className={styles.container}>
            <Link to="/" className={styles["back-button"]}>
                    <svg
                        height="20px"
                        id="Layer_1"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        version="1.1"
                        viewBox="0 0 512 512"
                        width="20px"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
                    </svg>
            </Link>
            {isLoading ? (
                <span className={styles.loader}></span>
            ) : (
                <>
                    <Stats counter={clickedImagesIds.length} best={best} />
                    <div className={styles.gallery}>
                        {positions.map((position) => {
                            return (
                                <Image
                                    key={images[position].id}
                                    image={images[position]}
                                    onClick={handleClick}
                                    width={100}
                                    handleHover={handleHover}
                                    hover={hover}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

function Image(props) {
    return (
        <div
            className={styles["image-container"]}
            onMouseEnter={props.handleHover}
            onMouseLeave={props.handleHover}
        >
            <img
                className={styles.image}
                src={props.image.urls.small}
                alt={props.image.alt_description}
                onClick={props["onClick"]}
                data-id={props.image.id}
            ></img>
            {props.hover.onHover && props.hover.id === props.image.id && (
                <div className={styles.credentials}>
                    <a href={props.image.links.html}>
                        {props.image.user.first_name}
                    </a>
                    on
                    <a href="https://unsplash.com/">Unsplash</a>
                </div>
            )}
        </div>
    );
}

function Stats({ counter, best }) {
    return (
        <div className={styles["stats-container"]}>
            <div className={styles.counter}>Your score: {counter}</div>
            <div className={styles.counter}>
                Your best score: <b>{best}</b>
            </div>
        </div>
    );
}
