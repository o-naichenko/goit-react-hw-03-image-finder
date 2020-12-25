import React from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ image }) {
  return createPortal(
    <div className={s.Overlay}>
      <div className={s.Modal}>
        <img src={image.webformatURL} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}
