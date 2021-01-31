import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ModalImage from './ModalImage/ModalImage';
import imageApi from '../service/api';

function App() {
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const onSubmitForm = query => {
    setKeyword(query);
    setPage(1);
    setImages([]);
  };

  const hideLargeImage = () => {
    setLargeImageURL(null);
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }

    fetchImage();
    // eslint-disable-next-line
  }, [keyword]);

  useEffect(() => {
    if (page > 2) {
      scrollDown();
    }
  }, [page]);

  const isLastPage = data => {
    const perPageImages = 12;
    const totalHits = data.totalHits - perPageImages;
    if (totalHits <= 0) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  function fetchImage() {
    setLoading(true);
    imageApi(keyword, page)
      .then(data => {
        setImages(images => [...images, ...data]);
        setPage(page => page + 1);
        isLastPage(data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }
  return (
    <>
      <Searchbar onSubmitForm={onSubmitForm} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={setLargeImageURL} />
      )}
      {largeImageURL && (
        <Modal onCloseModal={hideLargeImage}>
          <ModalImage largeImage={largeImageURL} />
        </Modal>
      )}
      {images.length > 0 && !lastPage && !loading && (
        <Button text="Load more" buttonAction={fetchImage} />
      )}
      {loading && <Loader />}
      {error && <p>ERROR</p>}
    </>
  );
}

export default App;
