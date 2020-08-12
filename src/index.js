import {
  validationConfig, 
  initialCards,  
  popupEditProfile, 
  popupAddCard, 
  popupPhoto, 
  editProfileBtn, 
  addCardBtn, 
  profileForm, 
  addCardForm, 
  profileTitle, 
  profileSubtitle, 
  inputName, 
  inputAbout, 
  inputLocation, 
  inputLink, 
  cardList } from '../scripts/constants.js'
  
import { Card } from '../scripts/Card.js'
import { FormValidator } from '../scripts/FormValidator.js'
import { Section } from '../scripts/components/Section.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { UserInfo } from '../scripts/components/UserInfo.js'

//////////////////////////////
const initialCardsReverse = initialCards.reverse()

const validateEditForm = new FormValidator(validationConfig, profileForm)
validateEditForm.enableValidation()

const validateAddCardForm = new FormValidator(validationConfig, addCardForm)
validateAddCardForm.enableValidation()

//////////////////////////////
const itemRenderer = new Section({ 
  items: initialCardsReverse, 
  renderer: (item) => {
    itemRenderer.addItem(
      renderCard(item.name, item.link, '#card-template', handleCardClick)
    )
  }
}, 
cardList)

function renderCard(location, link, selector, handler) {
  const newCard = new Card(location, link, selector, handler)
  return newCard.renderNewCard()
}

itemRenderer.renderItems()

//////////////////////////////
const handleEditProfile = new PopupWithForm({
  handleOpenPopup: () => {
    inputName.value = handleUserInfo.getUserInfo().name
    inputAbout.value = handleUserInfo.getUserInfo().about

    handleEditProfile.resetInputError(validateEditForm, validationConfig)

    validateEditForm.buttonStateToggle(
      Array.from(popupEditProfile.querySelectorAll(validationConfig.inputSelector)),
      popupEditProfile.querySelector(validationConfig.submitButtonSelector),
      validationConfig
    )
  },
  callbackSubmitForm: () => {
    handleUserInfo.setUserInfo(inputName.value, inputAbout.value)
    handleEditProfile.close()
  }
}, popupEditProfile)

handleEditProfile.setEventListeners()


const handleAddCard = new PopupWithForm({
  handleOpenPopup: () => {
    handleAddCard.resetInputError(validateAddCardForm, validationConfig)

    validateAddCardForm.buttonStateToggle(
      Array.from(popupAddCard.querySelectorAll(validationConfig.inputSelector)),
      popupAddCard.querySelector(validationConfig.submitButtonSelector),
      validationConfig
    )
  }, 
  callbackSubmitForm: () => {
    itemRenderer.addItem(
      renderCard(inputLocation.value, inputLink.value, '#card-template', handleCardClick)
    )
    handleAddCard.close()
  }
}, popupAddCard)
handleAddCard.setEventListeners()

const handleImgPopup = new PopupWithImage(popupPhoto)
handleImgPopup.setEventListeners()

const handleUserInfo = new UserInfo({
  nameSelerctor: profileTitle,
  aboutSelerctor: profileSubtitle
})

//////////////////////////////
function handleCardClick(evt) {
  handleImgPopup.open()
  const photoPopupImg = popupPhoto.querySelector('.popup__image')

  photoPopupImg.src = evt.target.src
  photoPopupImg.alt = evt.target.alt
  popupPhoto.querySelector('.popup__description').textContent = evt.target.alt
}

//////////////////////////////
editProfileBtn.addEventListener('click', () => handleEditProfile.open())
addCardBtn.addEventListener('click', () => handleAddCard.open())

console.log('Its ALIVE!')