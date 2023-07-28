import { useState } from "react"
import styles from "./SearchBar.module.css"
import PropTypes from 'prop-types'

export const SearchBar = ({onSubmit}) => {
    const [query, setQuery] = useState('')
    
    const onFormSubmit = (event) => {
        event.preventDefault()
        onSubmit(query)
        setQuery("")
        
    }

    return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={onFormSubmit}>
                    <button type="submit" className={styles.SearchFormButton}>
                    <span className="button-label">Search</span>
                    </button>
    
                    <input
                       className={styles.SearchFormInput}
                       type="text"
                       autoComplete="off"
                       autoFocus
                       placeholder="Search images and photos"
                       onChange={event => setQuery(event.target.value)}
                       value={query}
                    />
                    </form>
            </header>
        )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}