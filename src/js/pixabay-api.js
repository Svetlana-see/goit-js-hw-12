import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54469620-809557b4428fb405aef4b70a6';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}