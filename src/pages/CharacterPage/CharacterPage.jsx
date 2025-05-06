import styles from "./CharacterPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export const CharacterPage = () => {
    const [characters, setCharacters] = useState([]);
    const [info, setInfo] = useState({
        count: 0,
        pages: 0,
        next: null,
        prev: null,
    });
    const [error, setError] = useState(null);

    const fetchData = (url) => {
        axios
            .get(url)
            .then((res) => {
                setCharacters(res.data.results);
                setInfo(res.data.info);
                setError(null);
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
    };

    useEffect(() => {
        fetchData("https://rickandmortyapi.com/api/character");
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

    const searchHandler = (event) => {
        const name = event.currentTarget.value;
        fetchData(`https://rickandmortyapi.com/api/character/?name=${name}`);
    };

    return (
        <div className={"pageContainer"}>
            <h1 className={"pageTitle"}>CharacterPage</h1>
            <input type="search" className={styles.search} onChange={searchHandler} placeholder="Search..." />
            {error && <div className="errorMessage">{error}</div>}

            {!error && characters.length && (
                <>
                    <div className={styles.characters}>
                        {characters.map((character) => {
                            return (
                                <div key={character.id} className={styles.character}>
                                    <Link className={styles.characterLink} to={`/characters/${character.id}`}>
                                        {character.name}
                                    </Link>
                                    <img src={character.image} alt={`${character.name} avatar`} />
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className="linkButton" disabled={info.prev === null} onClick={previousPageHandler}>
                            Назад
                        </button>
                        <button className="linkButton" disabled={info.next === null} onClick={nextPageHandler}>
                            Вперед
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
