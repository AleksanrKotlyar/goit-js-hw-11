import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ApiService {
  constructor() {
    this.pageValue = 1;
    this.inputValue = '';
    this.per_page = 40;
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
      const response = await axios.get(
        `https://pixabay.com/api/?${parameters}`
      );

      if (response.data.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
      this.pageValue += 1;

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
}
