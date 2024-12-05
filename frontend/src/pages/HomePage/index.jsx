import React, { useState } from 'react'
import Header from '../../components/Header'
import "./style.scss"
import AuthForm from '../../components/AuthForm'

const HomePage = () => {
    const [showForm, setshowForm] = useState(false)

    return (
        <div className='homePage'>
            <Header setshowForm={setshowForm} />
            <section className='hero'>
                <h1>everybody chat now!</h1>
            </section>

            {showForm && <AuthForm />}
        </div>
    )
}

export default HomePage
