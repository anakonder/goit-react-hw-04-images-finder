import { useState, useEffect } from "react";
import { getImages } from "../API/API"
import { SearchBar } from "./SearchBar/SearchBar.jsx"
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx"
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";

export const App = () => {

    const [query, setQuery] = useState('');
    const [imagesArray, setImagesArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('')
  
  useEffect(() => {
    const fetchImages = async () => {
        setLoading(true);
        const result = await getImages(query, currentPage);
        console.log(result);
        if (result) {
          setImagesArray((prevImagesArray) => [
            ...prevImagesArray,
            ...result.hits,
          ]);
          setTotalHits(result.totalHits);
          setLoading(false);
        } else {
          setLoading(false);
        }
     };

    if (query !== "") {
      fetchImages();
    }
    }, [query, currentPage]
  )

    const onSubmit = (query) => {
      console.log(query);
        setQuery(query);
        setCurrentPage(1);
        setImagesArray([]);
    }
  
    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const modalOpen = (largeImg) => {
        setLargeImageURL(largeImg);
        setIsModalOpen(true);
    };

    const modalClose = () => {
        setIsModalOpen(false)
    };

      return (
      <div>
        <SearchBar
          onSubmit={onSubmit}
        />
        {loading && (
          <Loader/>          
        )} 
        <ImageGallery
          imagesArray={imagesArray}
          modalOpen={modalOpen}
        />
        
        { loading === false &&
          imagesArray.length !== 0 &&
          imagesArray.length < totalHits &&
            <Button
              handleLoadMore={handleLoadMore}
            />          
        }
        {isModalOpen && (
          <Modal
            modalClose={modalClose}
            largeImageURL={largeImageURL}
         />
        )}
      </div>
    );    
}