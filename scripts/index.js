import {
  validationConfig, 
  initialCards,  
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
  cardList } from './constants.js';

import { 
  openPopup, 
  closePopup, 
  closeOverlay, 
  resetInputsValues,  
  resetInputError } from "./utils.js";
  
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

function closePhotoPopup() {
  const popupPhotoImg = popupPhoto.querySelector('.popup__image')
  popupPhotoImg.setAttribute('src', '')
  popupPhotoImg.setAttribute('alt', '')
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
  resetInputsValues(profileForm, validationConfig)
  closePopup(popupEditProfile)
}

function profileFormSubmit() {
  profileTitle.textContent = inputName.value
  profileSubtitle.textContent = inputAbout.value
  closePopup(popupEditProfile)
}

function openPopupAddCard() {
  resetInputsValues(popupAddCard, validationConfig)
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

popupEditProfile.addEventListener('mousedown', (evt) => 
  closeOverlay(evt, popupEditProfile))

popupAddCard.addEventListener('mousedown', (evt) =>
  closeOverlay(evt, popupAddCard))

popupPhoto.addEventListener('mousedown', (evt) =>
  closeOverlay(evt, popupPhoto))