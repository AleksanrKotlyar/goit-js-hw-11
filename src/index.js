import getQuery from './fetchAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios').default;

const inputRef = document
  .querySelector('#search-form')
  .addEventListener('submit', onSubmit);
const galleryRef = document.querySelector('.gallery');
const BtnRef = document.querySelector('.load-more');
BtnRef.addEventListener('click', onClickBtn);

let inputValue = '';

function onSubmit(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';
  inputValue = e.currentTarget.elements.searchQuery.value;
  // const parameters = new URLSearchParams({
  //   key: '30050939-5a79da0c6fd6f5109f8d21733',
  //   q: e.currentTarget.elements.searchQuery.value,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: true,
  //   page: 1,
  //   per_page: 40,
  // });
  if (inputValue === '') {
    Notify.info('Sorry,enter the data for the request');
    return;
  }
  checkSearchValue();
}

export default async function checkSearchValue() {
  const searchValue = await getQuery(inputValue);
  console.log(searchValue.data.hits.length);
  if (searchValue.data.hits.length === 0) {
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
        `<div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
        </div>`
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
  BtnRef.classList.remove('visually-hidden');
}

function onClickBtn(e) {
  checkSearchValue(inputValue);
}
