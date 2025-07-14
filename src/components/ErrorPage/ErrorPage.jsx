import React, { use, useEffect, useState } from 'react'
import styles from './ErrorPage.module.css'
import error from '../../assets/Images/error.svg'

export default function ErrorPage() {
    // const [first, setfirst] = useState(second)
    useEffect(()=>{},[])
    return <>
    <div className='flex justify-center items-center h-screen'>
        <img src={error} alt="" />
    </div>

    </>
}
