import axios from 'axios';
const API_KEY = '19799176-4c87c41e9b3623f80b0424cac';
const BASE_URL = 'https://pixabay.com/api';

axios.defaults.baseURL = BASE_URL;

axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getImage = async (keyword = '', page) => {
  try {
    const { data } = await axios.get('', {
      params: { q: keyword, page: page },
    });
    return data.hits;
  } catch (error) {
    console.log('error', { error });
    return [];
  }
};

// const getImage = (keword = '',page ) =>{
//   return axios.get('',{params:{q: keword, page: page}}).then(responce =>responce.data.hits);
// }

export default getImage;
