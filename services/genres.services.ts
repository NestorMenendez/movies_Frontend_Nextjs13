import { URL_GENRES } from "@/global/serverURLs";


export const getAllGenres = async () => {
    try {
        console.log(URL_GENRES)
        const response = await fetch(URL_GENRES);
        const genres = await response.json();
        console.log('entre en genres')
        console.log(genres)
        return genres as genres[];
    }
    catch {
        throw new Error("Error while getting all genres reference from mongoDB");
    }
};