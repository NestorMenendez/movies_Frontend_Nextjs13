'use client'
import { useEffect, useState } from 'react';
import styles from './ModalEditMovie.module.css'
// import { useUser } from '@auth0/nextjs-auth0/client'
import { createMovie, deleteMovie, updateMovie } from '@/services/movies.services';
import { getAllGenres } from '@/services/genres.services';
// import { createMovie } from '../../api/movies.fetch';
// import { useContext, useState } from 'react';
// import { GenresContext } from '../../context/genres.context';
// import { MoviesUserContext } from '../../context/moviesUser.context';
// import { MoviesPublicContext } from '../../context/moviesPublic.context';


interface EditMovieProps {
    isOpen: boolean;
    handleCloseModal: () => void;
    selectedMovie: MovieProps | null;
}
interface MovieData {
    id: string,
    title: string;
    genres: string[];
    score: number;
    imageList: FileList | null;
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
    }
}


export const ModalEditMovie: React.FC<EditMovieProps> = ({ isOpen, handleCloseModal, selectedMovie }) => {

    // const user = useUser();
    const userEmail = "menendezechevarria@gmail.com";
    const [formData, setFormData] = useState<MovieData>({
        id: '',
        title: '',
        genres: [],
        score: 0,
        imageList: null,
    });

    useEffect(() => {
        if (selectedMovie) {
            const firstGenre = selectedMovie.genres.id;
            setFormData({
                id: selectedMovie.id,
                title: selectedMovie.title,
                genres: [firstGenre],
                score: selectedMovie.score,
                imageList: null,
            });
        }
    }, [selectedMovie]);

    let id = '';
    let title = '';
    let score = 0;
    let genres: string = '';
    let image = { public_id: '', secure_url: '' };
    if (selectedMovie) {
        id = selectedMovie.id;
        title = selectedMovie.title;
        score = selectedMovie.score;
        genres = selectedMovie.genres.name;
        image = selectedMovie.image;
    }


    // const { genresAll } = useContext(GenresContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const files = (e.target as HTMLInputElement).files;
            setFormData({ ...formData, [name]: files });
        } else if (type === 'select-multiple') {
            const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions);
            const selectedGenreIds = selectedOptions.map(option => option.value);
            setFormData({ ...formData, genres: selectedGenreIds });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formDataToSend = { ...formData };
            if (formDataToSend.imageList && formDataToSend.imageList.length === 0) {
                formDataToSend.imageList = null;
            }
            formDataToSend.id = id;
            const updatedMovie = updateMovie(formDataToSend, userEmail);
            // const updatedArrayMovies = arrayMovies.filter((movie) => movie.id !== formDataToSend.id);
            // handleArrayMoviesUser(updatedArrayMovies);
            // handleArrayMovies(updatedArrayMovies);

            setFormData({
                id: '',
                title: '',
                genres: [],
                score: 0,
                imageList: null,
            });
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = () => {

        try {
            deleteMovie(formData, userEmail);
            // handleDeleteMovieUser(formData.id)
            // const newArrayMovies = await getAllMovies();
            // handleArrayMovies(newArrayMovies);

            setFormData({
                id: '',
                title: '',
                genres: [],
                score: 0,
                imageList: null,
            });
            handleCloseModal();
        } catch (error) {
            console.error(error);
        }
    }

    const handleReset = () => {
        setFormData({
            id: '',
            title: '',
            genres: [],
            score: 0,
            imageList: null,
        });
    };

    useEffect(() => {
        const handleClickOutsideModal = (event: MouseEvent) => {
            const modalContent = document.querySelector(`.${styles.modalContent}`);
            if (!modalContent || !(event.target instanceof Node) || modalContent.contains(event.target)) {
                return;
            }
            handleCloseModal();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutsideModal);
        } else {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, [isOpen, handleCloseModal]);


    return (
        <div className={`${styles.modal} ${isOpen ? `${styles.open}` : ''}`}>
            <div className={styles.modalContent}>
                <h2>Edit Movie</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </label>
                    <label>
                        Genre:
                        <select name="genres" onChange={handleChange} required>
                            <option value="">Select genre</option>
                            {/* TOFIX falta por traer los genresAll en un context o redux */}
                        </select>
                    </label>
                    <label>
                        Score:
                        <input type="number" name="score" value={formData.score} onChange={handleChange} required />
                    </label>
                    <label>
                        Image:
                        <input type="file" accept="image/*" name="imageList" onChange={handleChange} required />
                    </label>
                    <div className={styles.buttonsSection}>
                        <button type="submit">Modifie</button>
                        <button type="button" onClick={handleDelete}>Delete</button>
                        <button type="button" onClick={handleCloseModal}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};