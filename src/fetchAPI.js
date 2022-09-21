import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let pageValue = 1;

export default async function getQuery(inputValue) {
  const parameters = new URLSearchParams({
    key: '30050939-5a79da0c6fd6f5109f8d21733',
    q: `${inputValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: `${pageValue}`,
    per_page: 40,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${parameters}`);

    if (response.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }
    pageValue += 1;

    return response;
  } catch (error) {
    console.log(error);
  }
}
