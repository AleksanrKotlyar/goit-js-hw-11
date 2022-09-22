import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BtnRef } from './index';

export default class ApiService {
  constructor() {
    this.pageValue = 1;
    this.inputValue = '';
    this.leftValue = 0;
    this.totalHits = 0;
  }
  async getQuery() {
    const parameters = new URLSearchParams({
      key: '30050939-5a79da0c6fd6f5109f8d21733',
      q: `${this.inputValue}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${this.pageValue}`,
      per_page: 40,
    });

    try {
      const response = await axios
        .get(`https://pixabay.com/api/?${parameters}`)
        .then(console.log())
        .catch(error => {
          console.log(console.log(error));
        });

      if (response.data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
      if (response.data.totalHits === 0) {
        return;
      }

      this.pageValue += 1;
      if (this.pageValue > 2) {
        this.countLeft(response);
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  set queryValue(newValue) {
    this.inputValue = newValue;
  }

  resetPage() {
    this.pageValue = 1;
  }

  countLeft(resp) {
    if (this.pageValue === 3) {
      this.totalHits = resp.data.totalHits - 40;
    }

    if (this.totalHits > 40) {
      this.leftValue = this.totalHits - 40;
      this.totalHits = this.leftValue;
      Notify.info(`"Hooray! We found more ${this.leftValue} images."`);
      return;
    }

    // BtnRef.classList.add('visually-hidden');
    // Notify.info(`We're sorry, but you've reached the end of search results`);
  }
}
