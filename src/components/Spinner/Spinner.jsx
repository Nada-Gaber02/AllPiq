import React from 'react'
import styles from './Spinner.module.css'
import { ColorRing } from 'react-loader-spinner'

export default function Spinner() {
    
    return <>
        <div className='h-screen flex justify-center items-center'>
            (<ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#C27AFF', '#1C398E', '#C27AFF', '#1C398E', '#C27AFF']}
        />)
        </div>
    </>
}
