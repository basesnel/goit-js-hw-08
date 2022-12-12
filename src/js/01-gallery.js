// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

// Render gallery items.
gallery.insertAdjacentHTML(
  'beforeend',
  galleryItems
    .map(
      ({ preview, original, description }) =>
        `
        <a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        `
    )
    .join('')
);

// Simple-lightbox init.
const options = { captionsData: 'alt', captionDelay: 250 };

var lightbox = new SimpleLightbox('.gallery a', options);
