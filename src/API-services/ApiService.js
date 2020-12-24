export default class ApiService {
  constructor() {
    this.API_KEY = '19115402-2f4ed690e134b4c839000dec3';
    this.API_PATH = 'https://pixabay.com/api/';
    this.searchQuery = '';
    this.queryPage = 1;
    this.perPage = 12;
  }
  fetchImages(query) {
    let { API_PATH, API_KEY, searchQuery, queryPage, perPage } = this;
    searchQuery = query.split(' ').join('+');
    return fetch(
      `${API_PATH}?key=${API_KEY}&q=${searchQuery}&page=${queryPage}&per_page=${perPage}`,
    );
  }
  incrementQueryPage() {
    this.queryPage += 1;
  }
  resetQueryPage() {
    this.queryPage = 1;
  }
}
