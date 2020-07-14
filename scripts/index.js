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

const initialCardsReverse = initialCards.reverse()

//////////////////////////////
const addNewCard = function (location, link) {
  const newCard = cardTemplate.cloneNode(true)
  const newCardImage = newCard.querySelector('.element__image')

  newCard.querySelector('.element__title').textContent = location
  newCardImage.setAttribute('src', link)
  newCardImage.setAttribute('alt', location)
  newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard)
  newCard.querySelector('.element__like-button').addEventListener('click', likeToggle)
  newCardImage.addEventListener('click', openPhotoPopup)
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

function closeOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup)
  }
}

function isEscBtn(item, evt) {
  return item.classList.contains('popup_opened') && evt.key === 'Escape'
}

function closePopupKeyEscape(evt) {
  const popupsArr = Array.from(popups)
  popupsArr.forEach((item) => {
    if (isEscBtn(item, evt)) {
      closePopup(item)
    }
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupKeyEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupKeyEscape)
}



function deleteCard(evt) {
  const deletedCard = evt.target.closest('.element')
  deletedCard.remove()
}

function resetInputsValues(form) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
  inputList.forEach((input) => {
    input.value = ''
  })
}

function openPhotoPopup(evt) {
  const cardImage = evt.target.closest('.element__image')
  const link = cardImage.getAttribute('src')
  const location = cardImage.getAttribute('alt')

  const popupImg = document.querySelector('.popup__image')
  let popupText = document.querySelector('.popup__description')

  popupImg.setAttribute('src', link)
  popupImg.setAttribute('alt', location)
  popupText.textContent = location

  openPopup(popupPhoto)
}

function closePhotoPopup() {
  popupPhoto.querySelector('.popup__image').setAttribute('src', '')
  popupPhoto.querySelector('.popup__image').setAttribute('alt', '')
  popupPhoto.querySelector('.popup__description').textContent = ''

  closePopup(popupPhoto)
}

function openPopupEdit() {
  openPopup(popupEditProfile)
  inputName.value = profileTitle.textContent
  inputAbout.value = profileSubtitle.textContent
  hideInputError(popupEditProfile, inputName)
  hideInputError(popupEditProfile, inputAbout)
  buttonStateToggle(
    (Array.from(popupEditProfile.querySelectorAll(validationConfig.inputSelector))), 
    popupEditProfile.querySelector(validationConfig.submitButtonSelector))
}

function closePopupEdit() {
  resetInputsValues(profileForm)
  resetInputError(popupEditProfile)
  closePopup(popupEditProfile)
}

function profileFormSubmit(evt) {
  evt.preventDefault()

  profileTitle.textContent = inputName.value
  profileSubtitle.textContent = inputAbout.value

  closePopup(popupEditProfile)
}

function openPopupAddCard() {
  resetInputsValues(popupAddCard)
  resetInputError(popupAddCard)
  openPopup(popupAddCard)
  buttonStateToggle(
    Array.from(popupAddCard.querySelectorAll(validationConfig.inputSelector)),
    popupAddCard.querySelector(validationConfig.submitButtonSelector)
  )
}

function closePopupAddCard() {
  closePopup(popupAddCard)
}

function addCardFormSubmit(evt) {
  evt.preventDefault()

  renderNewCard(inputLocation.value, inputLink.value)
  resetInputsValues(popupAddCard)
  closePopup(popupAddCard)
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
popupEditProfile.addEventListener('click', (evt) => 
  closeOverlay(evt, popupEditProfile))

popupAddCard.addEventListener('click', (evt) =>
  closeOverlay(evt, popupAddCard))

popupPhoto.addEventListener('click', (evt) =>
  closeOverlay(evt, popupPhoto))

// document.addEventListener('keydown', (evt) => closePopupKeyEscape(evt))
