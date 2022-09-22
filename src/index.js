import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './fetchAPI';
const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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

  if (searchValue.data.totalHits === 0) {
    console.log(searchValue.data.totalHits);
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
}

function onClickBtn(e) {
  checkSearchValue(inputValue);
}
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

var gallery = $('.photo-card a').simpleLightbox();
gallery.refresh();

var lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export { BtnRef };
