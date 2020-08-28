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
const initialCardsReverse = initialCards.reverse()

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

api.getInitialCards()
  .then(data => {
    console.log(data)
    ///////// render initial cards
    const initialCards = data.reverse()
    const itemRenderer = new Section({
      items: initialCards,
      renderer: (item) => {
        console.log(item)
        const newCard = new Card({
          // location: item.name,
          // link: item.link,
          // cardId: item._id,
          // userId: item.owner._id,
          // likes: parseInt(item.likes.length),
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
          handleDelClick: (id) => {
            console.log(id)

            // popupConfirm.setSubmitAction(() => {
            //   api.deleteCard(id)
            //   .then(() => {
            //     popupConfirm.close()
            //   })
            // })
            // popupConfirm.open()
          }
        }, '#card-template')
        itemRenderer.addItem(newCard.renderNewCard())
      }
    },
      cardList)

    itemRenderer.renderItems()

    ///////// confirm popup



    ///////// addcard popup
    const handleAddCard = new PopupWithForm({
      callbackSubmitForm: (data) => {
        renderLoading(true, popupAddCard, validationConfig)

        api.createCard(data.location, data.link)
        .then(res => {
          const newCard = new Card({
            // location: data.location,
            // link: data.link,
            // cardId: res._id,
            // userId: res.owner._id,
            // likes: parseInt(res.likes.length),

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
            handleDelClick: () => {

            }
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
  .catch(err => console.error(err))

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about)
    profileAvatar.src = data.avatar
  })
  .catch(err => console.error(err))

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
    // const submitBtn = popupAvatarUpd.querySelector(validationConfig.submitButtonSelector)
    // submitBtn.textContent = 'Сохранение...'
    console.log(data.linkavatar);
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

const popupConfirm = new PopupWithSubmit({
  callbackSubmitForm: () => {
    
  }
}, popupConfirmDelete)
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
////////////////////////////// open popup add card
// addCardBtn.addEventListener('click', () => {

//   validateAddCardForm.resetForm(
//     validationConfig,
//     popupAddCard.querySelector(validationConfig.submitButtonSelector)
//   )
  
//   handleAddCard.open()
// })

// fetch(`${cardUrl}`, {
//   headers: {
//     authorization: token,
//     'Content-Type': 'application/json'
//   }
// })
// .then(res => res.json())
//   .then(res => res.forEach(item => 
//     console.log(item.likes)))