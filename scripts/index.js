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

const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupPhoto = document.querySelector('.popup_type_photo')

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

const cardList = document.querySelector('.elements__list')
const cardTemplate = document.querySelector('#card-template').content

let initialCardsReverse = initialCards.reverse()

//////////////////////////////
const addNewCard = function (location, link) {
  const newCard = cardTemplate.cloneNode(true)

  newCard.querySelector('.element__title').textContent = location
  newCard.querySelector('.element__image').setAttribute('src', link)
  newCard.querySelector('.element__image').setAttribute('alt', location)
  newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard)
  newCard.querySelector('.element__like-button').addEventListener('click', likeToggle)
  newCard.querySelector('.element__image').addEventListener('click', openPhotoPopup)
  return newCard
}

function renderNewCard(location, link) {
  cardList.prepend(addNewCard(location, link))
}

initialCardsReverse.forEach(function (item) {
  renderNewCard(item.name, item.link)
})

//////////////////////////////
function likeToggle(evt) {
  const likedBtn = evt.target.closest('.element__like-button')
  likedBtn.classList.toggle('element__like-button_pressed')
  console.log(likedBtn)
}

function popupToggle(popup) {
  popup.classList.toggle('popup_opened')
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

  popupToggle(popupPhoto)
}

function closePhotoPopup() {
  popupPhoto.querySelector('.popup__image').setAttribute('src', '')
  popupPhoto.querySelector('.popup__image').setAttribute('alt', '')
  popupPhoto.querySelector('.popup__description').textContent = ''

  popupToggle(popupPhoto)
}

function openPopupEdit() {
  popupToggle(popupEditProfile)

  inputName.value = profileTitle.textContent
  inputAbout.value = profileSubtitle.textContent
}

function closePopupEdit() {
  inputName.value = ''
  inputAbout.value = ''
  popupToggle(popupEditProfile)
}

function profileFormSubmit(evt) {
  evt.preventDefault()

  profileTitle.textContent = inputName.value
  profileSubtitle.textContent = inputAbout.value

  popupToggle(popupEditProfile)
}

function openPopupAddCard() {
  inputLocation.value = ''
  inputLink.value = ''

  popupToggle(popupAddCard)
}

function closePopupAddCard() {
  popupToggle(popupAddCard)
}

function addCardFormSubmit(evt) {
  evt.preventDefault()

  renderNewCard(inputLocation.value, inputLink.value)

  inputLocation.value = ''
  inputLink.value = ''

  popupToggle(popupAddCard)
}

//////////////////////////////
editProfileBtn.addEventListener('click', openPopupEdit)
addCardBtn.addEventListener('click', openPopupAddCard)

popupEditProfileCloseBtn.addEventListener('click', closePopupEdit)
popupPhotoCloseBtn.addEventListener('click', closePhotoPopup)
popupAddCardCloseBtn.addEventListener('click', closePopupAddCard)

profileForm.addEventListener('submit', profileFormSubmit)
addCardForm.addEventListener('submit', addCardFormSubmit)