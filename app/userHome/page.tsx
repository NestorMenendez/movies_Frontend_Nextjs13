

import styles from './page.module.css'
import { getAllMoviesByUser } from '@/services/movies.services';
import { CardMovie } from '@/ui/cards/CardMovie';
import { getSession } from '@auth0/nextjs-auth0';

const userHome = async () => {

    const session = await getSession();
    const userEmail = session?.user.email
    console.log('aqui el mail de usuario' + userEmail)
    const arrayMovies = await getAllMoviesByUser(userEmail);



    return (

        <section className={styles.moviesContainer}>
            {arrayMovies?.map(({ id, title, score, genres, image }) => (
                <CardMovie key={id} id={id} title={title} score={score} genres={genres} image={image} />
            ))}
        </section>

    )
}

export default userHome