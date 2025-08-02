const images = Array.from(document.querySelectorAll('.gallery .item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const nextBtn = document.querySelector('.lightbox .next');
const prevBtn = document.querySelector('.lightbox .prev');
let currentIdx = 0;

// Open lightbox
images.forEach((item, idx) => {
  item.addEventListener('click', () => {
    showLightbox(idx);
  });
});
function showLightbox(idx) {
  currentIdx = idx;
  lightboxImg.src = images[idx].querySelector('img').src;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function hideLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}
closeBtn.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) hideLightbox();
});
function nextImage() {
  currentIdx = (currentIdx + 1) % images.length;
  showLightbox(currentIdx);
}
function prevImage() {
  currentIdx = (currentIdx - 1 + images.length) % images.length;
  showLightbox(currentIdx);
}
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
window.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") hideLightbox();
});
// Category filtering
const filterBtns = document.querySelectorAll('.filters button');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    images.forEach(imgItem => {
      if (filter === 'all' || imgItem.classList.contains(filter)) {
        imgItem.style.display = '';
      } else {
        imgItem.style.display = 'none';
      }
    });
  });
});
