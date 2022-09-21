import getQuery from './fetchAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios').default;

const inputRef = document
  .querySelector('#search-form')
  .addEventListener('submit', onSubmit);
const galleryRef = document.querySelector('.gallery');
const BtnRef = document.querySelector('.load-more');
BtnRef.addEventListener('click', onClickBtn);
function onClickBtn() {
  // parameters = onSubmit();
  // parameters.page += 1;
  // console.log(parameters);
  // checkSearchValue(parameters);
}

function onSubmit(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';

  const parameters = new URLSearchParams({
    key: '30050939-5a79da0c6fd6f5109f8d21733',
    q: e.currentTarget.elements.searchQuery.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  });
  if (e.currentTarget.elements.searchQuery.value === '') {
    Notify.info('Sorry,enter the data for the request');
    return;
  }
  checkSearchValue(parameters);
  e.currentTarget.elements.searchQuery.value = '';
  return parameters;
}

export default async function checkSearchValue(parameters) {
  const searchValue = await getQuery(parameters);

  if (searchValue.data.hits == []) {
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
  BtnRef.classList.toggle('visually-hidden');
}
