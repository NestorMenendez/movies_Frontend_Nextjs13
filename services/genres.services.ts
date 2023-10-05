import { URL_GENRES } from "@/global/serverURLs";


export const getAllGenres = async () => {
    try {
        const response = await fetch(URL_GENRES);
        const genres = await response.json();
        return genres as genres[];
    }
    catch {
        throw new Error("Error while getting all genres reference from mongoDB");
    }
};