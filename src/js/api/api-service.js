const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26728738-d599205e790670b2a20ac6b2d';

export default class APIService {
  totalHits = null;
  totalPage = null;
  pageSize = 20;

  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  fetchImages() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horrizontal',
      safesearch: true,
      page: this.pageNumber,
      per_page: this.pageSize,
    });

    const URL = `${BASE_URL}?${searchParams}`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`error: ${response.statusText}`);
        }

        return response.json();
      })
      .then(({ totalHits, hits }) => {
        this.totalHits = totalHits;
        this.totalPage = Math.ceil(this.totalHits / this.pageSize);
        this.incrementPage();

        return { totalHits, hits };
      });
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }
}
