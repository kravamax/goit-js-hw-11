import { getRefs } from '../getRefs';
const { gallery } = getRefs();
import numeral from 'numeral';

export function renderPhotos(photosArray) {
  const markup = photosArray
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">            
            <div class="photo-card__img-container">
                <a href="${largeImageURL}"><img class="photo-card__img" src="${webformatURL}" alt="${tags}" title=""/></a>
            </div>
            <div class="photo-card__info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${numeral(likes).format('0.a')}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${numeral(views).format('0.a')}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${numeral(comments).format('0.a')}</span>
                </p>
                <p class="info-item">
                    <b>Downloads </b>
                    <span>${numeral(downloads).format('0.a')}</span>
                </p>
            </div>
        </div>
`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
