import { getMovieId } from "@/services/movies.services";
import { Metadata } from "next"
import styles from './page.module.css'


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
    console.log(movieInfo)
    const imageUrl = movieInfo.image ? movieInfo.image.secure_url : '';
    console.log(movieInfo.image.secure_url)
    return (

        <>
            <section className={styles.movieContainer}>
                <div>
                    <img src={imageUrl} alt={movieInfo.title} />
                </div>
                <div className={styles.movieContainer__body}>
                    <h3>{movieInfo.title}</h3>
                    <h3>{movieInfo.genres.name}</h3>
                    <h3>{movieInfo.score}</h3>
                    <h4>{movieInfo.description}</h4>
                </div>

            </section>
        </>


    )
}

export default Movie
