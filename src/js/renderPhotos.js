import { getRefs } from '../getRefs';
const { gallery } = getRefs();

//Добавить в деструктуризацию largeImageURL для LightBox
export function renderPhotos(array) {
  const markup = array
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">            
            <div class="photo-card__img-container">
                <a href="${largeImageURL}"><img class="photo-card__img" src="${webformatURL}" alt="${tags}" title=""/></a>
            </div>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads </b>
                    <span>${downloads}</span>
                </p>
            </div>
        </div>
`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
