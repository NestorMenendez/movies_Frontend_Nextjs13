

import styles from './page.module.css'
import { getAllMoviesByUser } from '@/services/movies.services';
import { CardMovie } from '@/ui/cards/CardMovie';
import { getSession } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import { ModalEditMovie } from '../../ui/cards/modalEditMovie/ModalEditMovie';
import { useUser } from '@auth0/nextjs-auth0/client';

type MovieProps = {
    id: string,
    title: string,
    score: number,
    genres: {
        name: string,
        id: string
    },
    image: {
        public_id: string,
        secure_url: string
    }
}

const userHome = async () => {

    const session = await getSession();
    const userEmail = session?.user.email
    console.log('aqui el mail de usuario' + userEmail)
    const arrayMovies = await getAllMoviesByUser(userEmail || "");

    return (

        <>
            <section className={styles.moviesContainer}>
                {arrayMovies?.map(({ id, title, score, genres, image }) => (
                    <CardMovie key={id} id={id} title={title} score={score} genres={genres} image={image} />
                ))}
            </section>
        </>

    )
}

export default userHome