import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./EpisodePage.module.css";

export const EpisodePage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [info, setInfo] = useState({
        count: 0,
        pages: 0,
        next: null,
        prev: null,
    });

    const fetchData = (url) => {
        axios.get(url).then((res) => {
            setEpisodes(res.data.results);
            setInfo(res.data.info);
        });
    };

    useEffect(() => {
        fetchData("https://rickandmortyapi.com/api/episode");
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [info]);

    const prevPageHandler = () => {
        fetchData(info.prev);
    };

    const nextPageHandler = () => {
        fetchData(info.next);
    };

    return (
        <div className={"pageContainer"}>
            <h1 className={"pageTitle"}>EpisodePage</h1>
            {episodes.length &&
                episodes.map((episode) => {
                    return (
                        <>
                            <ul key={episode.id}>
                                <li>
                                    Эпизод: <span className={styles.accent}>{episode.episode}</span>
                                </li>
                                <li>
                                    Название эпизода: <span className={styles.accent}>{episode.name}</span>
                                </li>
                                <li>
                                    Дата выхода эпизода в эфир: <span className={styles.accent}>{episode.air_date}</span>
                                </li>
                                <li>
                                    Количество персонажей, замеченных в эпизоде: <span className={styles.accent}>{episode.characters.length}</span>
                                </li>
                            </ul>
                            <hr />
                        </>
                    );
                })}
            <button className={"linkButton"} onClick={prevPageHandler} disabled={info.prev === null}>
                Назад
            </button>
            <button className={"linkButton"} onClick={nextPageHandler} disabled={info.next === null}>
                Вперед
            </button>
        </div>
    );
};
