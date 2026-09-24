const moviesTitleElement = document.getElementById('movies-title');
const moviesListItem = document.querySelector('.movies-list-item');

moviesTitleElement.onclick = () => {
  moviesTitleElement.classList.toggle('dark-green-background');
  moviesTitleElement.classList.toggle('white-text-color');
};

moviesListItem.onclick = () => {
  moviesListItem.classList.toggle('dark-purple-background');
  moviesListItem.classList.toggle('white-text-color');
};

const newImageContainer = document.querySelector('.new-image');

const addBtn = document.querySelector('.image-btn.add');
const deleteBtn = document.querySelector('.image-btn.delete');
const increaseBtn = document.querySelector('.image-btn.increase');
const decreaseBtn = document.querySelector('.image-btn.decrease');

let containsImage = false;

addBtn.onclick = () => {
  if (containsImage) return;

  const pragueLink = document.createElement('a');
  pragueLink.href = 'https://praha.eu/';

  const pragueImage = document.createElement('img');
  pragueImage.classList.add('favorite-city-img');
  pragueImage.src = 'images/prague.jpg';
  pragueImage.alt = 'столиця Чехії, м. Прага';
  pragueImage.width = 800;

  pragueLink.append(pragueImage);
  newImageContainer.append(pragueLink);

  containsImage = true;
};

deleteBtn.onclick = () => {
  newImageContainer.innerHTML = '';
  containsImage = false;
};

increaseBtn.onclick = () => {
  if (!containsImage) return;

  const pragueImage = newImageContainer.querySelector('.favorite-city-img');
  pragueImage.width += pragueImage.width < 1500 ? 100 : 0;
};

decreaseBtn.onclick = () => {
  if (!containsImage) return;

  const pragueImage = newImageContainer.querySelector('.favorite-city-img');
  pragueImage.width -= pragueImage.width > 100 ? 100 : 0;
};
