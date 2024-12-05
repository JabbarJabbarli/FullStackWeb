import React from 'react'
import "./style.scss"
import { Link } from 'react-router-dom'
const Header = ({ setshowForm }) => {

    return (
        <div>
            <header>
                <h1>Logo</h1>
                <nav>
                    <Link to="/about">About</Link>
                    <Link to="/support">Support</Link>
                </nav>
                <button className='open' onClick={() => setshowForm(true)} >Login</button>
            </header>
        </div >
    )
}

export default Header