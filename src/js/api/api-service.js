import axios from 'axios';

const API_KEY = '26728738-d599205e790670b2a20ac6b2d';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class APIService {
  totalHits = null;
  totalPage = null;
  pageSize = 20;

  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horrizontal',
      safesearch: true,
      page: this.pageNumber,
      per_page: this.pageSize,
    });

    const URL = `?${searchParams}`;

    try {
      const response = await axios.get(URL);
      const {
        data: { totalHits, hits },
      } = response;

      this.totalHits = totalHits;
      this.totalPage = Math.ceil(this.totalHits / this.pageSize);
      this.incrementPage();

      return { totalHits, hits };
    } catch (error) {
      console.log(error);
    }
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
