import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './fetchAPI';
const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const inputRef = document
  .querySelector('#search-form')
  .addEventListener('submit', onSubmit);
const galleryRef = document.querySelector('.gallery');
const BtnRef = document.querySelector('.load-more');

BtnRef.addEventListener('click', onClickBtn);

const apiService = new ApiService();

let inputValue = '';

function onSubmit(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';

  inputValue = e.currentTarget.elements.searchQuery.value;
  apiService.queryValue = inputValue;

  if (inputValue === '') {
    Notify.info('Sorry,enter the data for the request');
    return;
  }
  apiService.resetPage();
  checkSearchValue();
}

async function checkSearchValue() {
  const searchValue = await apiService.getQuery();

  if (!searchValue) {
    return;
  }

  const markup = searchValue.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class ="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                      <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${likes} </span>
                
                
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${views} </span>
                
               
              </p>
              <p class="info-item">
                <b> Comments</b>
                <span>${comments}</span>
                
               
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${downloads}</span>
                
                
              </p>
            </div>
           
        </div>
        `
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  // if (apiService.pageValue === 2 && searchValue.data.totalHits > 40) {
  //   BtnRef.classList.remove('visually-hidden');
  // }
  if (apiService.pageValue > 2) {
    ScrollTo();
  }
}

function onClickBtn(e) {
  checkSearchValue(inputValue);
}

function ScrollTo() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 5,
    behavior: 'smooth',
  });
}

const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && apiService.inputValue !== '') {
      checkSearchValue();
    }
  });
};

const observer = new IntersectionObserver(callback, {
  rootMargin: '300px',
});
observer.observe(BtnRef);

const callbackFooter = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && galleryRef.firstElementChild) {
      Notify.info(`We're sorry, but you've reached the end of search results`);
    }
  });
};

const observerFooter = new IntersectionObserver(callbackFooter);
observerFooter.observe(document.querySelector('footer'));

export { BtnRef };
