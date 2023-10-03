'use client'
import styles from './CardMovie.module.css'



export const CardMovie = (Props: Props) => {
    const { id, title, score, genres, image } = Props;
    const imageUrl = image ? image.secure_url : '';
    const genresNames = genres.name;

    // const handleCardMovieClick = () => {
    //     if (typeof openModalEdit === 'function') {
    //         openModalEdit({ id, title, score, genres, image });
    //     }
    // };

    return (
        <div className={styles.cardTotal}>
            <div className={styles.imgContainer}>
                <img className={styles.imgContainer__img} src={imageUrl} />
            </div>
            <div className={styles.cardContainer__body}>
                <h5>{title}</h5>
                <h6>{genresNames}</h6>
                <div>{score}</div>
            </div>
        </div>
    )
}