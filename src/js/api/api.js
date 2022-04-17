const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26728738-d599205e790670b2a20ac6b2d';
export const pageSize = 40;
let counterPage = 1;

export const APIObj = {
  searchQuery: '',
  numPage: counterPage,
  totalHits: null,
};

export const totalPage = APIObj.totalHits / pageSize;

export function fetchImages() {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: APIObj.searchQuery,
    image_type: 'photo',
    orientation: 'horrizontal',
    safesearch: true,
    page: APIObj.numPage,
    per_page: pageSize,
  });

  const URL = `${BASE_URL}?${searchParams}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(`error: ${response.statusText}`);
    }
    APIObj.numPage += 1;
    // console.log(APIObj.searchQuery);
    // console.log('Total hits:', response.totalHits);
    // console.log(APIObj.numPage, '/', totalPage);

    return response.json();
  });
}
