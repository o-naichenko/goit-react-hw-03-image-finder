import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './SearchBar.module.css';
export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  onInputChange = evt => {
    this.setState({
      searchQuery: evt.target.value,
    });
  };
  onSubmit = evt => {
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    evt.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Please, input search query');
    }
    onSubmit(searchQuery);
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
