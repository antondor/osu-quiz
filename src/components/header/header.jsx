import React from "react";
import styles from './header.module.css';
import GitHub_Logo from "../../assets/images/GitHub_Logo.png"
import OsuLogo_White from "../../assets/images/OsuLogo_White.svg"

function Header () {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Maiev's osu! Quiz
                </div>
                <div className={styles.socials}>
                    <a href="https://osu.ppy.sh/users/10183830" className={styles.logoLink}>
                        <img src={OsuLogo_White} alt="#" className={styles.logo}/>
                    </a>
                    <a href="https://github.com/antondor">
                        <img src={GitHub_Logo} alt="#" className={styles.logo}/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header ;