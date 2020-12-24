import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './ImageGallery.module.css';

import ApiService from '../../API-services/';
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem/';

const apiService = new ApiService();

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    queryPage: 1,
    error: null,
  };
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  fetchImages() {
    const { searchQuery } = this.props;

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
      .catch(error => this.setState({ status: 'rejected', error }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { queryPage } = this.state;

    if (searchQuery !== prevProps.searchQuery) {
      apiService.resetQueryPage();
      this.setState({ images: [], queryPage: 1 });
      this.fetchImages();
    }
    if (queryPage !== prevState.queryPage) {
      this.fetchImages();
    }
    if (queryPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
  loadMoreBtnHandler = () => {
    apiService.incrementQueryPage();
    this.setState(prevState => ({ queryPage: prevState.queryPage + 1 }));
  };
  render() {
    const { images, status, error } = this.state;
    if (status === 'idle') {
      return null;
    }
    if (status === 'pending') {
      return (
        <Loader
          style={{ margin: '0 auto' }}
          type="ThreeDots"
          color="#00BFFF"
          height={40}
          width={40}
        />
      );
    }
    if (status === 'rejected') {
      return <b className={s.noImagesFoundWarn}>{error.message}</b>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => (
              <ImageGalleryItem image={image} key={image.webformatURL} />
            ))}
          </ul>
          <Button onClick={this.loadMoreBtnHandler} />
        </>
      );
    }
  }
}
