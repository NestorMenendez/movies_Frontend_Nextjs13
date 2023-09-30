import { URL_MOVIES_PUBLIC } from "@/global/serverURLs";


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