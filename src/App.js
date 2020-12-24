import React, { Component } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ImageGallery from './components/ImageGallery';
import SearchBar from './components/Searchbar';

class App extends Component {
  state = {
    searchQuery: '',
  };

  setQuery = newQquery => {
    this.setState({ searchQuery: newQquery });
  };

  render() {
    const { searchQuery } = this.state;
    const { setQuery } = this;
    return (
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={2500}
          transition={Slide}
        />
        <SearchBar onSubmit={setQuery} />
        <ImageGallery searchQuery={searchQuery} />
      </div>
    );
  }
}

export default App;
