import React, { PureComponent } from 'react';
// import { createPortal } from 'react-dom';
import { ToastContainer, Slide } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './App.module.css';
import ApiService from './API-services/';
import Button from './components/Button';
import ImageGallery from './components/ImageGallery';
import Loader from 'react-loader-spinner';
import SearchBar from './components/Searchbar';

const apiService = new ApiService();
// const loaderRoot = document.querySelector('#portal-root');

class App extends PureComponent {
  static propTypes = {
    searchQuery: PropTypes.string,
  };
  state = {
    error: null,
    images: [],
    searchQuery: '',
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ images: [] });
      apiService.resetQueryPage();
      this.fetchImages();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  fetchImages() {
    const { searchQuery } = this.state;
    this.setState({ status: 'pending' });
    apiService
      .fetchImages(searchQuery)
      .then(response => response.json())
      .then(response => {
        if (response.hits.length === 0) {
          return Promise.reject(new Error(`No ${searchQuery} images found`));
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'error' }));
  }

  onLoadMoreBtnClick = () => {
    apiService.incrementQueryPage();
    this.fetchImages();
  };

  setQuery = newQquery => {
    this.setState({ searchQuery: newQquery });
  };

  render() {
    const { images, searchQuery, status } = this.state;
    const { onLoadMoreBtnClick, setQuery } = this;
    return (
      <div className={s.App}>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          transition={Slide}
        />
        <SearchBar onSubmit={setQuery} />
        {status === 'error' && (
          <b className={s.noImagesFoundWarn}>no {searchQuery} images found</b>
        )}
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending' && (
          <Loader
            className={s.Loader}
            type="ThreeDots"
            color="#3f51b5"
            height={40}
            width={40}
          />
        )}
        {status === 'resolved' && images.length % 12 === 0 && (
          <Button onClick={onLoadMoreBtnClick} />
        )}
      </div>
    );
  }
}

export default App;
