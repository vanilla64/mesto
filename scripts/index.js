import {
  validationConfig, 
  initialCards, 
  popups, 
  popupEditProfile, 
  popupAddCard, 
  popupPhoto, 
  editProfileBtn, 
  addCardBtn, 
  popupEditProfileCloseBtn, 
  popupAddCardCloseBtn, 
  popupPhotoCloseBtn, 
  profileForm, 
  addCardForm, 
  profileTitle, 
  profileSubtitle, 
  inputName, 
  inputAbout, 
  inputLocation, 
  inputLink, 
  cardList } from '../scripts/constants.js';  
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';

//////////////////////////////
const initialCardsReverse = initialCards.reverse()

const validateEditForm = new FormValidator(validationConfig, profileForm)
validateEditForm.enableValidation()

const validateAddCardForm = new FormValidator(validationConfig, addCardForm)
validateAddCardForm.enableValidation()

//////////////////////////////
initialCardsReverse.forEach(item => {
  renderCard(item.name, item.link, '#card-template')
})

function renderCard(location, link, selector) {
  const newCard = new Card(location, link, selector)
  cardList.prepend(newCard.renderNewCard())
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

function resetInputsValues(form) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
  inputList.forEach((input) => {
    input.value = ''
  })
}

function resetInputError(form, validClass, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))
  inputList.forEach(input => {
    validClass.hideInputError(form, input, config)
  })
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

  resetInputError(profileForm, validateEditForm, validationConfig)

  validateEditForm.buttonStateToggle(
    Array.from(popupEditProfile.querySelectorAll(validationConfig.inputSelector)), 
    popupEditProfile.querySelector(validationConfig.submitButtonSelector),
    validationConfig
  )
}

function closePopupEdit() {
  resetInputsValues(profileForm)
  resetInputError(popupEditProfile, validateEditForm, validationConfig)
  closePopup(popupEditProfile)
}

function profileFormSubmit() {
  profileTitle.textContent = inputName.value
  profileSubtitle.textContent = inputAbout.value
  resetInputsValues(profileForm)
  closePopup(popupEditProfile)
}

function openPopupAddCard() {
  resetInputsValues(popupAddCard)
  resetInputError(popupAddCard, validateAddCardForm, validationConfig)

  validateAddCardForm.buttonStateToggle(
    Array.from(popupAddCard.querySelectorAll(validationConfig.inputSelector)),
    popupAddCard.querySelector(validationConfig.submitButtonSelector), 
    validationConfig
  )
  openPopup(popupAddCard)
}

function closePopupAddCard() {
  closePopup(popupAddCard)
}

function addCardFormSubmit() {
  renderCard(inputLocation.value, inputLink.value, '#card-template')
  resetInputError(popupAddCard, validateAddCardForm, validationConfig)
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

popupEditProfile.addEventListener('click', (evt) => 
  closeOverlay(evt, popupEditProfile))

popupAddCard.addEventListener('click', (evt) =>
  closeOverlay(evt, popupAddCard))

popupPhoto.addEventListener('click', (evt) =>
  closeOverlay(evt, popupPhoto))

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    document.addEventListener('keydown', closePopupKeyEscape)
  }
})