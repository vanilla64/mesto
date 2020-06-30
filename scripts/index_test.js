const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

////////////////////////////// popups
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupPhoto = document.querySelector('.popup_type_photo')

////////////////////////////// buttons
const editProfileBtn = document.querySelector('.profile__edit-button')
const addCardBtn = document.querySelector('.profile__add-button')
const popUpCloseBtn = document.querySelectorAll('.popup__close-btn')

////////////////////////////// card elements
const cardList = document.querySelector('.elements__list')
const cardImage = document.querySelector('.element__image')

////////////////////////////// inputs
let nameInput = document.querySelector('.popup__input_text_name')
let aboutInput =  document.querySelector('.popup__input_text_job')
let locationInput = document.querySelector('.popup__input_text_location')
let locationLink = document.querySelector('.popup__input_text_link')

//////////////////////////////
let userName = document.querySelector('.profile__title')
let userAbout = document.querySelector('.profile__subtitle')

////////////////////////////// добавляем карточки "из коробки"
const initialRender = function (location, link) {
  const cardTemplate = document.querySelector('#card-template').content
  const newCard = cardTemplate.cloneNode(true)

  newCard.querySelector('.element__title').textContent = location
  newCard.querySelector('.element__image').setAttribute('src', link)
  newCard.querySelector('.element__image').setAttribute('alt', location)

  cardList.append(newCard)
}

for (i = 0; i < initialCards.length; i++) {
  initialRender(initialCards[i].name, initialCards[i].link)
}



const addNewCard = function (location, link) {

  
}

//////////////////////////////

const cardElement = document.querySelector('.element')
const likeBtn = cardElement.querySelector('.element__like-button')
const likeToggle = function (evt) {
  evt.target.classList.toggle('element__like-button_pressed')
  console.log(evt)
}
likeBtn.addEventListener('click', likeToggle)

//////////////////////////////
const deleteBtn = document.querySelector('.element__delete-button')
const deleteCard = function () {
  let deletedCard = deleteBtn.closest('.element')
  deletedCard.remove()
}
deleteBtn.addEventListener('click', deleteCard)

//////////////////////////////
const openEditProfileForm = function () {
  popupEditProfile.classList.add('popup_opened')
  nameInput.value = userName.textContent
  aboutInput.value = userAbout.textContent
}
const closeEditProfileForm = function () {
  popupEditProfile.classList.remove('popup_opened')
}

editProfileBtn.addEventListener('click', openEditProfileForm)
popUpCloseBtn[0].addEventListener('click', closeEditProfileForm)

//////////////////////////////
const openAddCardForm = function () {
  popupAddCard.classList.add('popup_opened')
}
const closeAddCardForm = function () {
  popupAddCard.classList.remove('popup_opened')
}

addCardBtn.addEventListener('click', openAddCardForm)
popUpCloseBtn[1].addEventListener('click', closeAddCardForm)

//////////////////////////////
let photoCard = document.querySelector('.element__image')

const openPhotoPopup = function (location, link) {
  location = photoCard.getAttribute('alt')
  link = photoCard.getAttribute('src')
  document.querySelector('.popup__image').setAttribute('src', link)
  document.querySelector('.popup__image').setAttribute('alt', location)
  document.querySelector('.popup__description').textContent = location
  popupPhoto.classList.add('popup_opened')
}
const closePhotoPopup = function (e) {
  popupPhoto.classList.remove('popup_opened')
}



photoCard.addEventListener('click', openPhotoPopup)

//photoCard.addEventListener('click', )
popUpCloseBtn[2].addEventListener('click', closePhotoPopup)


//////////////////////////////
const formElements = document.querySelectorAll('.popup__form')
const editprofileForm = formElements[0]
const addCardForm = formElements[1]

function formSubmitHandler (event) {
  event.preventDefault();

  if ((nameInput.placeholder = 'Имя') || (nameInput.placeholder = 'О себе')) {
    userName.textContent = nameInput.value
    userAbout.textContent = aboutInput.value
  } else {

  }
  
  popupEditProfile.classList.remove('popup_opened')
}

editprofileForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', formSubmitHandler);