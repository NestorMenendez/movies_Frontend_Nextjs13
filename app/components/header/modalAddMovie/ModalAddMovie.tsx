'use client'
import { useState } from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client'
import { createMovie } from '@/services/movies.services';
import { getAllGenres } from '@/services/genres.services';
// import { createMovie } from '../../api/movies.fetch';
// import { useContext, useState } from 'react';
// import { GenresContext } from '../../context/genres.context';
// import { MoviesUserContext } from '../../context/moviesUser.context';
// import { MoviesPublicContext } from '../../context/moviesPublic.context';


interface AddMovieProps {
    isOpen: boolean;
    handleCloseModal: () => void;
}
interface MovieData {
    title: string;
    genres: string[];
    score: number;
    imageList: FileList | null;
}


export const ModalAddMovie: React.FC<AddMovieProps> = async ({ isOpen, handleCloseModal }) => {

    // const user = useUser();
    const userEmail = "menendezechevarria@gmail.com";
    const [formData, setFormData] = useState<MovieData>({
        title: '',
        genres: [],
        score: 0,
        imageList: null,
    });
    // const genresAll = await getAllGenres();
    // const { user, getAccessTokenSilently } = useAuth0();
    // const { genresAll } = useContext(GenresContext);
    // const { arrayMoviesUser, handleArrayMoviesUser } = useContext(MoviesUserContext);
    // const { arrayMovies, handleArrayMovies } = useContext(MoviesPublicContext);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const newMovie = await createMovie(formData, userEmail);
            // const updatedArrayMoviesUser = [...arrayMoviesUser, newMovie]
            // handleArrayMoviesUser(updatedArrayMoviesUser)
            // handleArrayMovies(updatedArrayMoviesUser)
            setFormData({
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

    const handleReset = () => {
        setFormData({
            title: '',
            genres: [],
            score: 0,
            imageList: null,
        });
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Add Movie</h2>
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
                    <div className="buttons-section">
                        <button type="submit">Add</button>
                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="button" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};