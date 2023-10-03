import styles from './page.module.css'
import { getAllMovies } from '@/services/movies.services';
import { CardMovie } from '@/ui/cards/CardMovie';

const Home = async () => {

    const arrayMovies = await getAllMovies();


    return (

        <section className={styles.moviesContainer}>
            {arrayMovies?.map(({ id, title, score, genres, image }) => (
                <CardMovie key={id} id={id} title={title} score={score} genres={genres} image={image} />
            ))}
        </section>

    )
}

export default Home