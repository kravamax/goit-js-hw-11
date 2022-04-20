import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getRefs } from './getRefs';
const { searchForm, gallery, loadMoreBtn } = getRefs();
import { renderPhotos } from './js/renderPhotos';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import APIService from './js/api/api-service';

const API = new APIService();
let modal = null;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
gallery.addEventListener('click', onGalleryClick);

loadMoreBtn.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();
  galleryMarkupReset();

  API.query = e.currentTarget.searchQuery.value;
  API.resetPage();

  try {
    const response = await API.fetchImages();
    const { hits, totalHits } = await response;

    if (!hits.length) {
      throw new Error(error);
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    const render = await renderPhotos(hits);

    if (totalHits >= API.pageSize) {
      loadMoreBtn.classList.remove('is-hidden');
    }

    await e.target.reset();
    modal = new SimpleLightbox('.gallery a', {});

    return render;
  } catch (error) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

async function onLoadMore() {
  try {
    const response = await API.fetchImages();
    const { hits } = response;
    modal.refresh();

    if (API.pageNumber > API.totalPage) {
      loadMoreBtn.classList.add('is-hidden');
      renderAndScroll(hits);

      throw new Error(error);
    }

    renderAndScroll(hits);

    modal.refresh();
  } catch (error) {
    setTimeout(() => {
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
    }, 1500);
  }
}

function onGalleryClick(e) {
  e.preventDefault();

  if (!(e.target !== e.currentTarget)) {
    return;
  }

  openModal();
}

function openModal() {
  modal.on('show.simplelightbox', function () {});
}

function galleryMarkupReset() {
  gallery.innerHTML = '';
}

async function renderAndScroll(hits) {
  await renderPhotos(hits);
  await scrollDown();
}

function scrollDown() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight.toFixed() * 2,
    behavior: 'smooth',
  });
}
