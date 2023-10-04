'use client'
import { ModalEditMovie } from '@/ui/cards/modalEditMovie/ModalEditMovie';
import styles from './CardMovie.module.css'
import { useState } from 'react';

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

export const CardMovie = (Props: Props) => {
    const { id, title, score, genres, image } = Props;
    const imageUrl = image ? image.secure_url : '';
    const genresNames = genres.name;

    // const handleCardMovieClick = () => {
    //     if (typeof openModalEdit === 'function') {
    //         openModalEdit({ id, title, score, genres, image });
    //     }
    // };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);

    const openModalEdit = ({ id, title, score, genres, image }: MovieProps) => {
        const movie = { id, title, score, genres, image }
        setSelectedMovie(movie);
        setIsModalEditOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalEditOpen(false)
    }

    return (
        <>
            <div className={styles.cardTotal} onClick={() => openModalEdit({ id, title, score, genres, image })}>
                <div className={styles.imgContainer}>
                    <img className={styles.imgContainer__img} src={imageUrl} />
                </div>
                <div className={styles.cardContainer__body}>
                    <h5 className={styles.cardContainer__body__overflow}>{title}</h5>
                    <h6 className={styles.cardContainer__body__overflow}>{genresNames}</h6>
                    <div>{score}</div>
                </div>
            </div>
            {
                isModalEditOpen &&
                <ModalEditMovie isOpen={isModalEditOpen} handleCloseModal={handleCloseModal} selectedMovie={selectedMovie}></ModalEditMovie>
            }
        </>
    )
}