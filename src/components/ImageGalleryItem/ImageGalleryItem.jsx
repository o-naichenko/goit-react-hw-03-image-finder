import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img src={image.webformatURL} alt={image.tags} className={s.image} />
    </li>
  );
}
