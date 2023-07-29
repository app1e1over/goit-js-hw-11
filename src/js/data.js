import axios from 'axios';
import Notiflix from 'notiflix';

const api_key = '38473838-e891e831f166f48f183183908';

var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
export async function getData(q, curpage) {
    let data = (
      await axios.get(
        `https://pixabay.com/api/?key=${api_key}&q=${q}&image_type=photo&orientation=horizontal?safesearch=true&per_page=40&page=${curpage}`
      )
    ).data;
  
    //  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
    //Notiflix.Notify.success(`Hooray! We found ${data.hits.length} images`)
  
    Notiflix.Notify.success(
      `Hooray! We loaded ${data.hits.length} more images out of ${data.totalHits} we found!`
    );
    return data;
  }

 export function displayData(data, cont) {
    data.hits.forEach(v => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      let img = document.createElement('img');
      img.src = v.webformatURL;
      img.loading = 'lazy';
      a.append(img);
      a.href = v.largeImageURL;
      img.alt = v.tags;
      li.append(a);
      let stats = document.createElement('table');
      stats.className = 'stats';
  
      stats.innerHTML +=
        '<tr><th>Views</th><th>Likes</th><th>Comments</th><th>Downloads</th></tr>';
      stats.innerHTML += `<tr><td>${v.views}</td><td>${v.likes}</td><td>${v.comments}</td><td>${v.downloads}</td></tr>`;
  
      li.append(stats);
      cont.append(li);
    });
    lightbox.refresh();

  }