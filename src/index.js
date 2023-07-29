import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getData, displayData } from './js/data';
import { elementIsVisibleInViewport } from './js/tools';
import throttle from 'lodash.throttle';

const cont = document.querySelector('.gallery');
const input = document.querySelector('#search-form input');
let curpage = 1;
let autoScroll = false;
let autoLoad = false;
let curReq; //якщо користувач змінить запит до натискання на кнопку шов мор, то покаже той самий результат, що і до попереднього

document.querySelector('[type=submit]').addEventListener('click', async e => {
  e.preventDefault();
  let q = encodeURIComponent(input.value);
  if (q == curReq) return;
  curReq = q;

  try {
    clear();

    let res = await getData(curReq, curpage);

    displayData(res, cont);
    scrollBy();
    showMore(true);
    if (res.hits.length == 0) {
      Notiflix.Notify.warning('no results found');
    }
  } catch (e) {
    console.log(e);
    Notiflix.Notify.failure('something went wrong while fetching our request');
  }
});
function clear() {
  cont.innerHTML = '';
  showMore(false);
}

const showmore = document.querySelector('.show-more');
function showMore(visible) {
  if (visible) {
    showmore.classList.remove('hidden');
  } else {
    if (!showmore.classList.contains('hidden')) {
      showmore.classList.add('hidden');
    }
  }
}
showmore.addEventListener('click', async () => {
  await loadMore();
});

async function loadMore() {
  try {
    let res = await getData(curReq, curpage);
    displayData(res, cont);
    scrollBy();
    if (res.hits.length == 0 || res.totalHits == 0) {
      showMore(false);
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  } catch (e) {
    Notiflix.Notify.failure('Something went wrong while fetching your request');
    console.log(e);
  }
  curpage++;
}

document.querySelector('#Autoload').addEventListener('change', () => {
  autoLoad = !autoLoad;
  if (autoLoad) {
    cont.addEventListener('scroll', async () => {
      if (
        elementIsVisibleInViewport(
          document.querySelector('.gallery').lastElementChild, true
        )
      )
       await loadMore();
    });
  } else {
    cont.removeEventListener('scroll');
  }
});

document.querySelector('#Autoscroll').addEventListener('change', () => {
  autoScroll = !autoScroll;
});

const scrollBy = throttle(()=> {
  if (autoScroll) {
    const { height: cardHeight, width: cardWidth } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    cont.scrollBy({
      top: cardHeight * Math.ceil(window.innerWidth / cardWidth),
      behavior: 'smooth',
    });
  }
}, 1000)
