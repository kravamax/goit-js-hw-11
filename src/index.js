import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';

import { getRefs } from './getRefs';
const { searchForm, gallery, loadMoreBtn } = getRefs();
// import * as APIService from './js/api/api';
import { renderPhotos } from './js/renderPhotos';
// import { loadMore } from './js/loadMore';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import APIService from './js/api/api-service';

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.classList.add('is-hidden');

const API = new APIService();

function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';

  API.query = e.currentTarget.searchQuery.value;
  API.resetPage();

  API.fetchImages()
    .then(({ totalHits, hits }) => {
      if (!hits.length) {
        throw new Error(error);
      }

      Notify.info(`Hooray! We found ${totalHits} images.`);

      return { totalHits, hits };
    })
    .then(({ totalHits, hits }) => {
      console.log(hits);

      console.log('API.pageSize', API.pageSize, 'totalHits', totalHits);
      if (totalHits >= API.pageSize) {
        loadMoreBtn.classList.remove('is-hidden');
      }

      return hits;
    })
    .then(renderPhotos)
    .catch(error => {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      console.log(error);
    });

  e.currentTarget.reset();
}

gallery.addEventListener('click', e => {
  e.preventDefault();

  let gallerySimpleBox = new SimpleLightbox('.gallery a');

  gallerySimpleBox.on('show.simplelightbox', function () {});

  console.log(e.target.parentNode.href);
});

function onLoadMore() {
  API.fetchImages()
    .then(({ hits }) => {
      console.log('API.pageNumber', API.pageNumber);
      console.log('API.totalPage', API.totalPage);

      if (API.pageNumber > API.totalPage) {
        renderPhotos(hits);
        loadMoreBtn.classList.add('is-hidden');
        throw new Error(error);
      }

      return hits;
    })
    .then(renderPhotos)
    .catch(error => {
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
      console.log(error);
    });
}
