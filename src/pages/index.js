import './index.css'

import {
  requestUrl, 
  token,   
  validationConfig,  
  popupEditProfile, 
  popupAddCard, 
  popupPhoto, 
  popupAvatarUpd, 
  popupConfirmDelete, 
  editProfileBtn, 
  addCardBtn, 
  profileForm, 
  addCardForm, 
  avatarUpdForm,  
  profileTitle, 
  profileSubtitle, 
  profileAvatar, 
  profileContainer, 
  inputName, 
  inputAbout,  
  cardList } from '../scripts/constants.js'

import { renderLoading } from '../scripts/utils/utils.js'

import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import { Section } from '../scripts/components/Section.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { Api } from '../scripts/components/Api.js'

//////////////////////////////
const content = document.querySelector('.content')

const validateEditForm = new FormValidator(validationConfig, profileForm)
validateEditForm.enableValidation()

const validateAddCardForm = new FormValidator(validationConfig, addCardForm)
validateAddCardForm.enableValidation()

const validateAvatarUpd = new FormValidator(validationConfig, avatarUpdForm)
validateAvatarUpd.enableValidation()

const api = new Api({
  url: requestUrl,
  token: token
})

///////////////
Promise.all([
  api.getUserInfo(), 
  api.getInitialCards()
])
.then((res) => {

  const [getUserInfo, getInitialCards] = res
  userInfo.setUserInfo(getUserInfo.name, getUserInfo.about)
  profileAvatar.src = getUserInfo.avatar

  ///////// render initial cards
  const initialCards = getInitialCards.reverse()

  const itemRenderer = new Section({
    items: initialCards,
    renderer: (item) => {
      itemRenderer.addItem(
        createNewCard(item)
      )
    }
  },
  cardList)

  itemRenderer.renderItems()
  
  ///////// addcard popup
  const handleAddCard = new PopupWithForm({
    callbackSubmitForm: (data) => {
      renderLoading(true, popupAddCard, validationConfig)

      api.createCard(data.location, data.link)
      .then(res => {
        itemRenderer.addItem(
          createNewCard(res)
        )
      })
      .then(() => {
        handleAddCard.close()
      })
      .catch(err => console.error(err))
      .finally(() => {
        renderLoading(false, popupAddCard, validationConfig)
      })
    }
  }, popupAddCard)

  handleAddCard.setEventListeners()

  ///////// listeners
  addCardBtn.addEventListener('click', () => {
    validateAddCardForm.resetForm(
      validationConfig,
      popupAddCard.querySelector(validationConfig.submitButtonSelector)
    )
    handleAddCard.open()
  })
})
.then(() => {
  content.style.display = 'block',
    document.querySelector('.preloader').style.display = 'none'
})
.catch(err => console.log(err))

//////////////////////////////
const handleEditProfile = new PopupWithForm({
  callbackSubmitForm: (data) => {
    renderLoading(true, popupEditProfile, validationConfig)

    api.setUserInfo(data.name, data.job)
    .then(userInfo.setUserInfo(data.name, data.job))
    .then(handleEditProfile.close())
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, popupEditProfile, validationConfig)
    })
  }
}, popupEditProfile)

handleEditProfile.setEventListeners()

const updAvatar = new PopupWithForm({
  callbackSubmitForm: (data) => {
    renderLoading(true, popupAvatarUpd, validationConfig)
    api.setAvatar(data.linkavatar)
    .then(() => {
      profileAvatar.src = data.linkavatar
    })
    .then(() => {
      updAvatar.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, popupAvatarUpd, validationConfig)
    })
  }
},popupAvatarUpd)

updAvatar.setEventListeners()

const popupConfirm = new PopupWithSubmit(popupConfirmDelete)
popupConfirm.setEventListeners()


const handleImgPopup = new PopupWithImage(popupPhoto)
handleImgPopup.setEventListeners()

const userInfo = new UserInfo({
  nameSelerctor: profileTitle,
  aboutSelerctor: profileSubtitle
})

///////// cardClick
function cardClick(data) {
  handleImgPopup.open({
    location: data.name,
    link: data.link
  })
}
///////// likeClick
function likeClick(id, isLiked, counter, likeBtn) {
  api.likeCardToggle(id, isLiked, counter, likeBtn)
}
///////// delClick
function delClick(id, card) {
  popupConfirm.setSubmitAction(() => {
    api.deleteCard(id)
      .then(() => {
        card.remove()
        card = null
        popupConfirm.close()
      })
  })
  popupConfirm.open()
}

///////// render
function createNewCard(data) {
  const newCard = new Card({
    data: data,
    handleCardClick: () => {
      cardClick(data)
    },
    handleLikeClick: (id, isLiked, counter, likeBtn) => {
      likeClick(id, isLiked, counter, likeBtn)
    },
    handleDelClick: (id, card) => {
      // console.log(card)
      delClick(id, card)
    },

  }, '#card-template')

  return newCard.renderNewCard()
}

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

profileContainer.addEventListener('click', () => {
  validateAvatarUpd.resetForm(
    validationConfig,
    popupAvatarUpd.querySelector(validationConfig.submitButtonSelector)
  )
  updAvatar.open()
})