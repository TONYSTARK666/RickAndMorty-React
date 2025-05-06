import { NavLink } from "react-router";
import styles from "./HomePage.module.css";

export const HomePage = () => {
    return (
        <div className={styles.mainWrapper}>
            <h1 className={`pageTitle ${styles.title}`}>The Rick and Morty</h1>
            <nav className={styles.linkWrapper}>
                <NavLink to={"/characters"} className={"linkButton"}>
                    Characters
                </NavLink>
                <NavLink to={"/locations"} className={"linkButton"}>
                    Locations
                </NavLink>
                <NavLink to={"/episodes"} className={"linkButton"}>
                    Episodes
                </NavLink>
            </nav>
        </div>
    );
};
