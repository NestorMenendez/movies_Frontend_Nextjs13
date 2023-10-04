import { URL_MOVIES, URL_MOVIES_PUBLIC } from "@/global/serverURLs";
import { GetAccessToken, getAccessToken } from "@auth0/nextjs-auth0";


export const getAllMovies = async () => {
    try {
        const response = await fetch(URL_MOVIES_PUBLIC);
        const movies = await response.json();
        return movies;
    }
    catch {
        throw new Error("Error while getting all movies reference from mongoDB");
    }
};


export const getAllMoviesByUser = async (userEmail: string) => {
    console.log(userEmail)

    const token = await getAccessToken();

    try {
        const response = await fetch(`${URL_MOVIES}/byUser/${userEmail}`, {
            headers: {
                authorization: `Bearer ${token.accessToken}`
            }
        });
        const movies = await response.json();
        console.log('retorno del fetch' + movies)
        return movies;
    }
    catch {
        throw new Error("Error while getting movies from mongoDB user profile");
    }
};

export const updateMovie = async (data: any, user: any) => {
    const token = await getAccessToken();
    const { id, title, score, genres } = data

    const formData = new FormData()
    formData.append('title', title);
    formData.append('score', score);
    formData.append('genres', genres);

    try {
        const response = await fetch(`${URL_MOVIES}/${id}`,
            {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${token.accessToken}`,
                },
                body: formData
            })
        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status} `);
        }
        const movie = await response.json();
        return movie
    } catch {
        throw new Error("Error while sending movie to mongoDB");
    }
}

export const createMovie = async (data: any, userEmail: string) => {
    const token = await getAccessToken();
    const { title, score, genres, imageList } = data
    const image = imageList[0];

    const formData = new FormData()
    formData.append('title', title);
    formData.append('score', score);
    formData.append('genres', genres);
    formData.append('image', image);

    try {
        const response = await fetch(`${URL_MOVIES}/${userEmail}`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token.accessToken}`,
                },
                body: formData
            })
        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status} `);
        }
        const movie = await response.json();
        return movie
    } catch {
        throw new Error("Error while sending movie to mongoDB");
    }
}

export const deleteMovie = async (data: any, user: any) => {
    console.log('entring')
    const token = await getAccessToken();
    console.log(token)
    const { id } = data;

    try {
        const response = await fetch(`${URL_MOVIES}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status}`);
        }
        return { success: true, message: "Movie deleted successfully" };
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw new Error("Error while deleting movie");
    }
};
