'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
    to: string
}

const NotFoundTimer = ({ to }: Props) => {


    const router = useRouter();

    setTimeout(() => {
        router.push(to)
    }, 3000)


    return null;
}

export default NotFoundTimer