'use client'
import HeaderButton from '@/ui/bottoms/headerBottom/HeaderButton'
import styles from './Header.module.css'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'
import { ModalAddMovie } from './modalAddMovie/ModalAddMovie'

const Header = () => {

    const { user, error, isLoading, checkSession } = useUser();
    console.log(user)
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalAddOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalAddOpen(false);
    }

    return (

        <div className={styles.headerContainer}>
            <h1>MoviesDirectory</h1>
            <section>

                {!user ?
                    <a className={styles.authButton} href="/api/auth/login">Login</a>
                    :
                    <>
                        <a className={styles.authButton} onClick={handleOpenModal} >Add movie</a>
                        <a className={styles.authButton} href="/api/auth/logout">Logout</a>
                    </>
                }

            </section>
            {isModalAddOpen &&
                <ModalAddMovie isOpen={isModalAddOpen} handleCloseModal={handleCloseModal} ></ModalAddMovie>
            }
        </div>
    )
}

export default Header