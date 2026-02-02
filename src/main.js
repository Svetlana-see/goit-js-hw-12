import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();

  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
});

// async function fetchImages() {
//   try {
//     showLoader();

//     const data = await getImagesByQuery(query, page);

//     if (data.hits.length === 0 && page === 1) {
//       iziToast.error({
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//       });
//       hideLoadMoreButton();
//       return;
//     }

//     createGallery(data.hits);
//     totalHits = data.totalHits;

//     const totalPages = Math.ceil(totalHits / PER_PAGE);

//     if (page >= totalPages) {
//       hideLoadMoreButton();

//       iziToast.info({
//         message: "We're sorry, but you've reached the end of search results.",
//         position: 'topRight',
//       });

//       return;
//     }

//     showLoadMoreButton();

//     if (page > 1) {
//       smoothScroll();
//     }
//   } catch (error) {
//     iziToast.error({
//       message: 'Something went wrong. Please try again later.',
//       position: 'topRight',
//     });
//   } finally {
//     hideLoader();
//   }
// }

async function fetchImages() {
  try {
    showLoader();
    hideLoadMoreButton();

    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0 && page === 1) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalHits = data.totalHits;

    const totalPages = Math.ceil(totalHits / PER_PAGE);

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    showLoadMoreButton();

    if (page > 1) {
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}



function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

