import { URL_MOVIES, URL_MOVIES_PUBLIC } from "@/global/serverURLs";
import { getAccessToken } from "@auth0/nextjs-auth0";


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
