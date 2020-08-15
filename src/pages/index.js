import './index.css'

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
  cardList } from '../scripts/constants.js';
  
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { UserInfo } from '../scripts/components/UserInfo.js';

//////////////////////////////
const initialCardsReverse = initialCards.reverse()

const validateEditForm = new FormValidator(validationConfig, profileForm)
validateEditForm.enableValidation()

const validateAddCardForm = new FormValidator(validationConfig, addCardForm)
validateAddCardForm.enableValidation()

const itemRenderer = new Section({ 
  items: initialCardsReverse, 
  renderer: (item) => {
    const newCard = new Card({
      location: item.name,
      link: item.link, 
      handleCardClick: () => {
        handleImgPopup.open({
          location: item.name,
          link: item.link
        })
      }
    }, '#card-template')
    itemRenderer.addItem(newCard.renderNewCard())
  }
}, 
cardList)

itemRenderer.renderItems()

//////////////////////////////
const handleEditProfile = new PopupWithForm({
  callbackSubmitForm: () => {
    userInfo.setUserInfo(inputName.value, inputAbout.value)
    handleEditProfile.close()
  }
}, popupEditProfile)

handleEditProfile.setEventListeners()


const handleAddCard = new PopupWithForm({ 
  callbackSubmitForm: (data) => {
    const newCard = new Card({
      location: data.location,
      link: data.link, 
      handleCardClick: () => {
        handleImgPopup.open({
          location: data.location,
          link: data.link
        })
      }
    }, '#card-template')

    itemRenderer.addItem(newCard.renderNewCard())
    handleAddCard.close()
  }
}, popupAddCard)
handleAddCard.setEventListeners()

const handleImgPopup = new PopupWithImage(popupPhoto)
handleImgPopup.setEventListeners()

const userInfo = new UserInfo({
  nameSelerctor: profileTitle,
  aboutSelerctor: profileSubtitle
})

////////////////////////////// open popup with user info
editProfileBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo()

  inputName.value = userData.name
  inputAbout.value = userData.about

  validateEditForm.resetForm(
    validationConfig,
    popupEditProfile.querySelector(validationConfig.submitButtonSelector)
  )

  handleEditProfile.open()
})
////////////////////////////// open popup add card
addCardBtn.addEventListener('click', () => {

  validateAddCardForm.resetForm(
    validationConfig,
    popupAddCard.querySelector(validationConfig.submitButtonSelector)
  )
  
  handleAddCard.open()
})