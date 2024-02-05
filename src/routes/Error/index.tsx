import React from 'react'
import styles from "../../styles.module.scss";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <section className={styles.home}>
            <h1>Error</h1>
            <p>Something went wrong. Please try again or contact an administrator.</p>
            <Link to='/'>Return Home</Link>
        </section>
    );
}

export default Error
