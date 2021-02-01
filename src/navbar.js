import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return(
        <nav>
            <Link to='/'>Currencies</Link>
            <Link to='/converter'>Converter</Link>
        </nav>
    )
}