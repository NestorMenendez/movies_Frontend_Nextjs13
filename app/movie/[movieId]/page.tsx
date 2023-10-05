import { getMovieId } from "@/services/movies.services";
import { Metadata } from "next"
import styles from './page.module.css'
import BackButton from "@/ui/bottoms/backButton/BackButton";


type Props = {
    params: {
        movieId: string
    }
}
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
    },
    description: string
}


export async function generateMetadata(props: Props): Promise<Metadata> {

    const { params } = props;
    const movieInfo = await getMovieId(params.movieId)

    return {
        title: `${movieInfo.title}`,
        description: `${movieInfo.title}`
    }
}


const Movie = async (props: Props) => {

    const { params } = props;
    const movieInfo: MovieProps = await getMovieId(params.movieId)
    const imageUrl = movieInfo.image ? movieInfo.image.secure_url : '';

    return (
        <>
            <section className={styles.movieContainer}>
                <div className={styles.movieContainer__img}>
                    <img className={styles.movieContainer__img__img} src={imageUrl} alt={movieInfo.title} />
                </div>
                <div className={styles.movieContainer__body}>
                    <h3>{movieInfo.title}</h3>
                    <h3>{movieInfo.genres.name}</h3>
                    <h3>{movieInfo.score}</h3>
                    <h4 className={styles.description}>{movieInfo.description}</h4>
                </div>
                <BackButton className={styles.backButtonPosition} />
            </section>
        </>
    )
}

export default Movie
