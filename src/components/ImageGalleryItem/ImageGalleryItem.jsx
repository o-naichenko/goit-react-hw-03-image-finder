import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { PureComponent } from 'react';

export default class ImageGalleryItem extends PureComponent {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    onImageClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { onImageClick } = this.props;
    onImageClick(this.props.image);
  };

  render() {
    const { image } = this.props;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          className={s.image}
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.onClick}
        />
      </li>
    );
  }
}
