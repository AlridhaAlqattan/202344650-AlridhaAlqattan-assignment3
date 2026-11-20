import { useState, useEffect } from 'react'
import './Box.css'

export default function Box({ title, content }) {
    const [isVisible, setIsVisible] = useState(true);


    return (
        <>
            <h2 id="boxTitle" onClick={() => setIsVisible(!isVisible)}>{title}</h2>
            {isVisible && <p>{content}</p>}

        </>


    )


}