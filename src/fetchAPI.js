import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import checkSearchValue from '.';

export default async function getQuery(parameters) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?${parameters}`);

    if (response.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }
    // checkSearchValue(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
