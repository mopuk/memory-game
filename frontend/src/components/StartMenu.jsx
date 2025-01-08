import { useEffect, useState } from "react";
import styles from "./StartMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function StartMenu() {
    const [theme, setTheme] = useState("Anime");
    const navigate = useNavigate();
    const handleTheme = (e) => {
        setTheme(e.target.value);
    };

    return (
        <div className={`${styles.container} ${styles["flex-centered"]}`}>
            <h1 className={styles.title}>Memory Game</h1>
            <h3 className={styles.title}>Choose any theme you want</h3>
            <div className={styles["typed-text"]}>
                <TypeAnimation
                    sequence={[
                        "Anime",
                        1000,
                        "Fantasy",
                        1000,
                        "Animals",
                        1000,
                        "Retro",
                        1000,
                        "Space",
                        1000,
                        "Mythology",
                        1000,
                        "Travel",
                        1000,
                        "Food",
                        1000,
                        "Nature",
                        1000,
                        "Technology",
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                />
            </div>
            <div className={styles.container}>
                <input
                    type="text"
                    name="theme"
                    id="theme"
                    placeholder="Enter the theme"
                    onChange={handleTheme}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            navigate(`/game?theme=${theme.toLowerCase()}`);
                        }
                    }}
                />
                <Link to={`/game?theme=${theme.toLowerCase()}`}>
                    <button>Play</button>
                </Link>
            </div>
        </div>
    );
}
