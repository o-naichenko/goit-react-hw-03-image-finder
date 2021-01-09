import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onImageClick: PropTypes.func.isRequired,
};
