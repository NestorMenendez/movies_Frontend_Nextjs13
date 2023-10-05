'use client'
import { getAllGenres } from "@/services/genres.services";
import { FC, createContext, useEffect, useState } from "react"

type Props = {
    children: React.ReactNode;
}
interface GenresProps {
    id: string,
    name: string
}


export const GenresContext = createContext<{ genresAll: GenresProps[] }>({ genresAll: [] })


export const GenresProvider: FC<Props> = ({ children }) => {

    const [genresAll, setGenres] = useState<GenresProps[]>([])
    useEffect(() => {
        async function getAllGenresLauncher() {
            const arrayGenres = await getAllGenres();
            setGenres(arrayGenres);
            console.log(genresAll)
        }
        getAllGenresLauncher();
    }, [])

    console.log(genresAll)
    return (
        <>
            <GenresContext.Provider value={{ genresAll }}>
                {children}
            </GenresContext.Provider>
        </>
    )
}