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

const popups = document.querySelectorAll('.popup')
const popupEditProfile = popups[0]
const popupAddCard = popups[1]
const popupPhoto = popups[2]

const editProfileBtn = document.querySelector('.profile__edit-button')
const addCardBtn = document.querySelector('.profile__add-button')

const popupEditProfileCloseBtn = popupEditProfile.querySelector('.popup__close-btn')
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close-btn')
const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close-btn')

const profileForm = popupEditProfile.querySelector('.popup__form')
const addCardForm = popupAddCard.querySelector('.popup__form')

const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const inputName = document.querySelector('.popup__input_text_name')
const inputAbout = document.querySelector('.popup__input_text_job')
const inputLocation = document.querySelector('.popup__input_text_location')
const inputLink = document.querySelector('.popup__input_text_link')

let initialCardsReverse = initialCards.reverse()

//////////////////////////////
const addNewCard = function (location, link) {
  const cardList = document.querySelector('.elements__list')
  const cardTemplate = document.querySelector('#card-template').content
  const newCard = cardTemplate.cloneNode(true)

  newCard.querySelector('.element__title').textContent = location
  newCard.querySelector('.element__image').setAttribute('src', link)
  newCard.querySelector('.element__image').setAttribute('alt', location)

  newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard)
  newCard.querySelector('.element__like-button').addEventListener('click', likeToggle)
  newCard.querySelector('.element__image').addEventListener('click', openPhotoPopup)
  cardList.prepend(newCard)
}

for (i = 0; i < initialCardsReverse.length; i++) {
  addNewCard(initialCardsReverse[i].name, initialCardsReverse[i].link)
}

//////////////////////////////
function likeToggle(evt) {
  const likedBtn = evt.target.closest('.element__like-button')
  likedBtn.classList.toggle('element__like-button_pressed')
  console.log(likedBtn)
}

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.element')
  deletedCard.remove()
}

function openPhotoPopup(evt, location, link) {
  const cardImage = evt.target.closest('.element__image')

  link = cardImage.getAttribute('src')
  location = cardImage.getAttribute('alt')

  let popupImg = document.querySelector('.popup__image')
  let popupText = document.querySelector('.popup__description')

  popupImg.setAttribute('src', link)
  popupImg.setAttribute('alt', location)
  popupText.textContent = location

  popupPhoto.classList.add('popup_opened')
}

function closePhotoPopup() {
  popupPhoto.querySelector('.popup__image').setAttribute('src', '')
  popupPhoto.querySelector('.popup__image').setAttribute('alt', '')
  popupPhoto.querySelector('.popup__description').textContent = ''

  popupPhoto.classList.remove('popup_opened')
}

function openPopupEdit() {
  popupEditProfile.classList.add('popup_opened')
  
  inputName.value = profileTitle.textContent
  inputAbout.value = profileSubtitle.textContent
}

function closePopupEdit() {
  inputName.value = ''
  inputAbout.value = ''
  popupEditProfile.classList.remove('popup_opened')
}

function profileFormSubmit(evt) {
  evt.preventDefault()

  profileTitle.textContent = inputName.value
  profileSubtitle.textContent = inputAbout.value

  popupEditProfile.classList.remove('popup_opened')
}

function openPopupAddCard() {
  inputLocation.value = ''
  inputLink.value = ''

  popupAddCard.classList.add('popup_opened')
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened')
}

function addCardFormSubmit(evt) {
  evt.preventDefault()

  addNewCard(inputLocation.value, inputLink.value)

  inputLocation.value = ''
  inputLink.value = ''
  
  popupAddCard.classList.remove('popup_opened')
}

//////////////////////////////
editProfileBtn.addEventListener('click', openPopupEdit)
addCardBtn.addEventListener('click', openPopupAddCard)

popupEditProfileCloseBtn.addEventListener('click', closePopupEdit)
popupPhotoCloseBtn.addEventListener('click', closePhotoPopup)
popupAddCardCloseBtn.addEventListener('click', closePopupAddCard)

profileForm.addEventListener('submit', profileFormSubmit)
addCardForm.addEventListener('submit', addCardFormSubmit)