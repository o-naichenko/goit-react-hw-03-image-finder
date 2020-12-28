import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    closeModal: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalHandler);
  }
  closeModalHandler = e => {
    const { closeModal } = this.props;
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      closeModal();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.closeModalHandler}>
        <div className={s.Modal}>
          <img className={s.image} src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
