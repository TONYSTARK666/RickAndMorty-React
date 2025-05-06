import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./LocationPage.module.css";

export const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [info, setInfo] = useState({
        count: 0,
        pages: 0,
        next: null,
        prev: null,
    });

    const fetchData = (url) => {
        axios.get(url).then((res) => {
            setLocations(res.data.results);
            setInfo(res.data.info);
        });
    };

    useEffect(() => {
        fetchData("https://rickandmortyapi.com/api/location");
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [info]);

    const previousPageHandler = () => {
        fetchData(info.prev);
    };

    const nextPageHandler = () => {
        fetchData(info.next);
    };

    console.log(locations);

    return (
        <div className={"pageContainer"}>
            <h1 className={"pageTitle"}>LocationPage</h1>
            {locations.length &&
                locations.map((location) => {
                    return (
                        <>
                            <ul key={location.id}>
                                <li>
                                    Название локации: <span className={styles.accent}>{location.name}</span>
                                </li>
                                <li>
                                    Тип локации: <span className={styles.accent}>{location.type}</span>
                                </li>
                                <li>
                                    Измерение, в котором находится местоположение: <span className={styles.accent}>{location.dimension}</span>
                                </li>
                                <li>
                                    Количество персонажей, которых видели в данной локации: <span className={styles.accent}>{location.residents.length}</span>
                                </li>
                            </ul>
                            <hr />
                        </>
                    );
                })}
            <button className={"linkButton"} onClick={previousPageHandler} disabled={info.prev === null}>
                Назад
            </button>
            <button className={"linkButton"} onClick={nextPageHandler} disabled={info.next === null}>
                Вперед
            </button>
        </div>
    );
};
