'use client'
import { TbArrowBack } from 'react-icons/tb'
import styles from './BackButton.module.css'
import { useRouter } from 'next/navigation';


const BackButton = ({ className }) => {

    const router = useRouter();

    return (
        <TbArrowBack className={`${className}`} onClick={router.back} />
    )
}

export default BackButton