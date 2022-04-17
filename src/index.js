import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

import { getRefs } from './getRefs';
const { searchForm, gallery, loadMoreBtn } = getRefs();
import * as APIService from './js/api/api';
import { renderPhotos } from './js/renderPhotos';
// import { loadMore } from './js/loadMore';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';

  APIService.APIObj.numPage = 1;
  APIService.APIObj.searchQuery = e.currentTarget.searchQuery.value;

  // console.log(APIService.searchQuery);

  APIService.fetchImages()
    .then(data => {
      console.log(data.hits.length);

      APIService.APIObj.totalHits = data.totalHits;

      if (!data.hits.length) {
        throw new Error(error);
      }

      Notify.info(`Hooray! We found ${data.totalHits} images.`);
      return data;
    })
    .then(data => {
      if (APIService.APIObj.totalHits >= APIService.pageSize) {
        setTimeout(() => {
          loadMoreBtn.classList.remove('is-hidden');
        }, 500);
      }
      console.log(APIService.totalPage);

      console.log('total hits in 2 then', APIService.APIObj.totalHits);

      return renderPhotos(data.hits);
    })
    .catch(error => {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      console.log(error);
    });

  e.currentTarget.reset();
}

loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.classList.add('is-hidden');

gallery.addEventListener('click', e => {
  e.preventDefault();

  let gallerySimpleBox = new SimpleLightbox('.gallery a');

  gallerySimpleBox.on('show.simplelightbox', function () {});

  console.log(e.target.parentNode.href);
});

function onLoadMore(e) {
  APIService.fetchImages()
    .then(data => {
      if (APIService.APIObj.numPage > Math.ceil(data.totalHits / APIService.pageSize)) {
        // gallerySimpleBox.refresh();

        renderPhotos(data.hits);
        loadMoreBtn.classList.add('is-hidden');

        throw new Error(error);
      }

      // gallerySimpleBox.refresh();
      return renderPhotos(data.hits);
    })
    .catch(error => {
      console.log(error);

      Notify.failure(`We're sorry, but you've reached the end of search results.`);
    });
}
