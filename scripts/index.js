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
}

function popupToggle(popup) {
  popup.classList.toggle('popup_opened')
}

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.element')
  deletedCard.remove()
}

function resetInputsValues(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'))
  inputList.forEach((input) => {
    input.value = ''
  })
}

function resetInputError(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'))
  inputList.forEach((input) => {
    hideInputError(form, input)
  })
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
  hideInputError(popupEditProfile, inputName)
  hideInputError(popupEditProfile, inputAbout)
  actualButtonState(popupEditProfile)
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
}

function closePopupEdit() {
  resetInputsValues(profileForm)
  resetInputError(popupEditProfile)
  popupToggle(popupEditProfile)
}

function profileFormSubmit(evt) {
  evt.preventDefault()

  profileTitle.textContent = inputName.value
  profileSubtitle.textContent = inputAbout.value

  popupToggle(popupEditProfile)
}

function openPopupAddCard() {
  resetInputsValues(popupAddCard)
  resetInputError(popupAddCard)
  popupToggle(popupAddCard)
  actualButtonState(popupAddCard)
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
}

function closePopupAddCard() {
  popupToggle(popupAddCard)
}

function addCardFormSubmit(evt) {
  evt.preventDefault()

  renderNewCard(inputLocation.value, inputLink.value)
  resetInputsValues(popupAddCard)
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

////////////////////////////////////////////////////////////////////////////////
function closeOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    popupToggle(popup)
  }
}

function isEscBtn(item, evt) {
  return item.classList.contains('popup_opened') && evt.key === 'Escape'
}

function closePopupKeyEscape(evt) {
  const popupsArr = Array.from(popups)
  popupsArr.forEach((item) => {
    if (isEscBtn(item, evt)) {
      popupToggle(item)
    }
  })
}

popupEditProfile.addEventListener('click', (evt) => 
  closeOverlay(evt, popupEditProfile))

popupAddCard.addEventListener('click', (evt) =>
  closeOverlay(evt, popupAddCard))

popupPhoto.addEventListener('click', (evt) =>
  closeOverlay(evt, popupPhoto))

document.addEventListener('keydown', (evt) => closePopupKeyEscape(evt))
