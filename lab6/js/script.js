const url = 'https://randomuser.me/api?results=20';

const fetchData = (url) => {
  return fetch(url).then((response) => response.json());
};

const parseData = (data) => {
  const result = [];

  for (const user of data.results) {
    const userData = {
      picture: user.picture.large,
      textData: {},
    };

    const { country, postcode, coordinates } = user.location;

    const textData = userData.textData;

    textData.cell = user.cell;
    textData.country = country;
    textData.postcode = postcode;
    textData.coordinates = Object.values(coordinates).toString();

    result.push(userData);
  }

  return result;
};

const container = document.querySelector('.users-container');

const createCard = (userData) => {
  const { picture, textData: data } = userData;

  const userContainer = document.createElement('div');
  userContainer.classList.add('user-element');

  const userImage = document.createElement('img');
  userImage.classList.add('user-photo');
  userImage.src = picture;

  const userDataContainer = document.createElement('div');
  userDataContainer.classList.add('user-data');

  for (const [key, value] of Object.entries(data)) {
    const dataElement = document.createElement('p');
    const dataSpan = document.createElement('span');

    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

    dataSpan.textContent = `${capitalizedKey}: `;
    dataElement.textContent = value;

    dataElement.prepend(dataSpan);
    userDataContainer.append(dataElement);
  }

  userContainer.append(userImage);
  userContainer.append(userDataContainer);

  container.append(userContainer);
};

const fetchContainer = document.querySelector('.fetch-container');

const fetchBtn = document.getElementById('fetch-button');
const fetchResult = fetchContainer.querySelector('.fetch-result');

fetchBtn.addEventListener('click', () => {
  container.innerHTML = '';
  fetchResult.innerHTML = '';

  fetchData(url)
    .then((data) => parseData(data))
    .then((parsedData) => {
      parsedData.forEach((userData) => createCard(userData));
    })
    .then(() => (fetchResult.textContent = 'Success!'))
    .catch((error) => {
      console.error(error);
      fetchResult.textContent = 'Error!';
    });
});
