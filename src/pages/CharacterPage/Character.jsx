import { Link, useParams } from "react-router";
import styles from "./Character.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Character = () => {
    const { id } = useParams();

    const [character, setCharacter] = useState(null);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
            setCharacter(res.data);
        });
    }, []);

    const getStatusClassName = (status) => {
        let characterStatus;
        switch (status) {
            case "Alive":
                characterStatus = styles.aliveStatus;
                break;
            case "Dead":
                characterStatus = styles.deadStatus;
                break;
            case "unknown":
                characterStatus = styles.unknownStatus;
                break;
            default:
                characterStatus = "";
        }

        return `${styles.status} ${characterStatus}`;
    };

    return (
        <div className="pageContainer">
            {character !== null && (
                <div className={styles.container}>
                    <h1 className="pageTitle">{character.name}</h1>
                    <div className={styles.content}>
                        <img className={styles.img} src={character.image} />
                        <div className={styles.description}>
                            <div className={styles.statusContainer}>
                                <div className={getStatusClassName(character.status)}></div>
                                <div>
                                    {character.status} - {character.species}
                                </div>
                            </div>
                            <div className={styles.info}>
                                <p className={styles.subTitle}>Last known location:</p>
                                <p className={styles.subTitleResult}>{character.location.name}</p>
                            </div>
                            <div className={styles.info}>
                                <p className={styles.subTitle}>Episode count:</p>
                                <p className={styles.subTitleResult}>{character.episode.length}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/characters`} className={"linkButton"}>
                        Go back
                    </Link>
                </div>
            )}
        </div>
    );
};
