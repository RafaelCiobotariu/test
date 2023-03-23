import React, { useState, useEffect } from 'react'
import CardList from './CardList';
import useFetch from '../hooks/useFetch';
import { slice } from 'lodash'


export default function MainContent() {
    const { data, isLoading, error } = useFetch('http://localhost:8000/projects')
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(6)
    const [showButton, setShowButton] = useState('')
    const initialProjects = slice(data, 0, index)


    const loadMore = () => {
        setIndex(index + 3)
        console.log(index)
        if (index >= data.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }

    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 50 ? setShowButton(true) : setShowButton(false);
        }

        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility)
        }
    }, [])

    const handleScrollButtonVisibility = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {error && <div className='error'>{error}</div>}
            {isLoading && <div className='loading-data'>Loading data...</div>}
            <section className="grid-display">
                {data && <CardList projects={initialProjects} />}
            </section>
            <div className="show-more-button-div">
                {isCompleted ? (
                    <button
                        onClick={loadMore}
                        type="button"
                        className="button-disabled"
                        disabled
                    >
                        That's It
                    </button>
                ) : (
                    <button onClick={loadMore} type="button" className="show-more-button">
                        Load More
                    </button>
                )}
            </div>
            {showButton && (
                <div>
                    <button onClick={handleScrollButtonVisibility} className='back-to-top'>
                        Back top
                    </button>
                </div>
            )}
        </>
    )
}
