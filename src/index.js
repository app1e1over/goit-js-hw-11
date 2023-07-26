import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

axios.defaults.headers.common["x-api-key"] = "38473838-e891e831f166f48f183183908";
axios.defaults.headers.common["image_type"] = "photo";
axios.defaults.headers.common["orientation"] = "horizontal";
axios.defaults.headers.common["safesearch"] = "true";

const input = document.querySelector("#search-form input");
document.querySelector("[type=submit]").addEventListener("click", async (e)=>{
    e.preventDefault();
    let q = encodeURIComponent(input.value);
    try{
    let res = await axios.get(`https://pixabay.com/api/?key=38473838-e891e831f166f48f183183908&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`);
    console.log(res);}catch{
        Notiflix.Notify.failure("something went wrong while fetching our request"); 
    }

})