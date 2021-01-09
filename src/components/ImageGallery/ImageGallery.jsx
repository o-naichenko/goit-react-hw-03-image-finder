import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';

const modalRoot = document.querySelector('#portal-root');

export default class ImageGallery extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    largeImage: null,
  };
  onImageClick = largeImage => {
    this.setState({
      largeImage: largeImage,
    });
  };
  onCloseModal = () => {
    this.setState({ largeImage: null });
  };
  render() {
    const { images } = this.props;
    const { largeImage } = this.state;
    return (
      <>
        {largeImage &&
          createPortal(
            <Modal image={largeImage} closeModal={this.onCloseModal} />,
            modalRoot,
          )}
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              image={image}
              key={image.webformatURL}
              onImageClick={this.onImageClick}
            />
          ))}
        </ul>
      </>
    );
  }
}
