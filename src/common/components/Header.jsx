import { NavLink } from "react-router";
import logo from "../../assets/img/logo.png";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <nav className={styles.container}>
            <NavLink className={styles.headerLink} to={"/"}>
                <img className={styles.logo} src={logo} alt="logotype" />
            </NavLink>
            <NavLink className={styles.headerLink} to={"/"}>
                Home
            </NavLink>
            <NavLink className={styles.headerLink} to={"/characters"}>
                Characters
            </NavLink>
            <NavLink className={styles.headerLink} to={"/locations"}>
                Locations
            </NavLink>
            <NavLink className={styles.headerLink} to={"/episodes"}>
                Episodes
            </NavLink>
        </nav>
    );
};
