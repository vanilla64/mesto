import './index.css'

import {
  requestUrl, 
  meUrl, 
  cardUrl, 
  token, 
  myId, 
  headers,  
  validationConfig, 
  initialCards,  
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
  confirmDeleteCardForm, 
  profileTitle, 
  profileSubtitle, 
  profileAvatar, 
  profileContainer, 
  inputName, 
  inputAbout,  
  cardList } from '../scripts/constants.js';

import { renderLoading } from '../scripts/utils/utils.js';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit.js'
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

//////////////////////////////

const content = document.querySelector('.content')
// content.style.display = 'none'

const validateEditForm = new FormValidator(validationConfig, profileForm)
validateEditForm.enableValidation()

const validateAddCardForm = new FormValidator(validationConfig, addCardForm)
validateAddCardForm.enableValidation()

const validateAvatarUpd = new FormValidator(validationConfig, avatarUpdForm)
validateAvatarUpd.enableValidation()

///////////////
const api = new Api({
  url: requestUrl,
  token: token
})

Promise.all([
  api.getUserInfo(), 
  api.getInitialCards()
]).then((res) => {
  // content.style.display = 'none'

  const [getUserInfo, getInitialCards] = res

  userInfo.setUserInfo(getUserInfo.name, getUserInfo.about)
  profileAvatar.src = getUserInfo.avatar

  ///////// render initial cards
  const initialCards = getInitialCards.reverse()
    const itemRenderer = new Section({
      items: initialCards,
      renderer: (item) => {
        // console.log(item)
        const newCard = new Card({
          data: item,
          handleCardClick: () => {
            handleImgPopup.open({
              location: item.name,
              link: item.link
            })
          },
          handleLikeClick: (id, isLiked, counter, likeBtn) => {
            api.likeCardToggle(id, isLiked, counter, likeBtn)
          },
          api: api,
          deletePopup: popupConfirm,
        }, '#card-template')
        itemRenderer.addItem(newCard.renderNewCard())
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
          const newCard = new Card({
            data: res,
            handleCardClick: () => {
              handleImgPopup.open({
                location: data.location,
                link: data.link
              })
            },
            handleLikeClick: (id, isLiked, counter, likeBtn) => {
              api.likeCardToggle(id, isLiked, counter, likeBtn)
            },
            api: api,
            deletePopup: popupConfirm,
          }, '#card-template')
          itemRenderer.addItem(newCard.renderNewCard())
        })
        .finally(() => {
          renderLoading(false, popupAddCard, validationConfig)
        })
        .catch(err => console.error(err))
        handleAddCard.close()
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
  }) // remove preloeder
.catch(err => console.log(err))

//////////////////////////////
const handleEditProfile = new PopupWithForm({
  callbackSubmitForm: (data) => {
    renderLoading(true, popupEditProfile, validationConfig)

    api.setUserInfo(data.name, data.job)
      .then(userInfo.setUserInfo(data.name, data.job))
      .then(handleEditProfile.close())
      .finally(() => {
        renderLoading(false, popupEditProfile, validationConfig)
      })
      .catch(err => console.log(err))
  }
}, popupEditProfile)

handleEditProfile.setEventListeners()

const updAvatar = new PopupWithForm({
  callbackSubmitForm: (data) => {
    // console.log(data.linkavatar);
    renderLoading(true, popupAvatarUpd, validationConfig)
    api.setAvatar(data.linkavatar)
      .then((res) => {
        if(res.ok) {
          profileAvatar.src = data.linkavatar
        }
      })
      .then(updAvatar.close())
      .finally(() => {
        renderLoading(false, popupAvatarUpd, validationConfig)
      })
      .catch(err => console.log(err))
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