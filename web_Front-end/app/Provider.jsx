import React from 'react'
import Header from './_component/Header'
import Footer from "./_component/Footer"

function Provider({ children }) {
    return (
        <div>
            <Header />
            <div className=''>
                {children}
            </div>
            <Footer />
        </div >
    )
}

export default Provider