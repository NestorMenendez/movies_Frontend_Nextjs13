'use client'

import NotFoundTimer from './components/notFoundTimer/NotFoundTimer'
import styles from './not-found.module.css'
import { useRouter } from "next/navigation";

const NotFound = () => {

    return (
        <>
            <h3 className={styles.notFoundTitle}>NOT FOUND</h3>

            <div className={styles.notFoundContainer}>
                <img className={styles.notFoundContainerImg} src="/assets/img/NotFound.jpg" alt='Not Found' />
            </div >

            <NotFoundTimer to='home' />
        </>

    )
}

export default NotFound