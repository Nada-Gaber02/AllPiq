import React from 'react'
import error from '../../assets/Images/error.svg'
import { Helmet } from 'react-helmet'

export default function ErrorPage() {
    return <>
    <Helmet>
        <title>Error</title>
    </Helmet>
    <div className='flex justify-center items-center h-screen'>
        <img src={error} alt="error" />
    </div>
    </>
}
