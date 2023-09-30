import { getAllGenres } from '@/services/genres.services';
import styles from './page.module.css'

const Home = async () => {

    const genres = await getAllGenres();
    console.log(genres)
    console.log('genres')

    return (
        <div className={styles.homeGrid}>




        </div>
    )
}

export default Home