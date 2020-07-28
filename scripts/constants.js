export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const initialCards = [
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

export const popupEditProfile = document.querySelector('.popup_type_edit-profile')
export const popupAddCard = document.querySelector('.popup_type_add-card')
export const popupPhoto = document.querySelector('.popup_type_photo')

export const editProfileBtn = document.querySelector('.profile__edit-button')
export const addCardBtn = document.querySelector('.profile__add-button')

export const popupEditProfileCloseBtn = popupEditProfile.querySelector('.popup__close-btn')
export const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close-btn')
export const popupPhotoCloseBtn = popupPhoto.querySelector('.popup__close-btn')

export const profileForm = popupEditProfile.querySelector('.popup__form')
export const addCardForm = popupAddCard.querySelector('.popup__form')

export const profileTitle = document.querySelector('.profile__title')
export const profileSubtitle = document.querySelector('.profile__subtitle')

export const inputName = document.querySelector('.popup__input_text_name')
export const inputAbout = document.querySelector('.popup__input_text_job')
export const inputLocation = document.querySelector('.popup__input_text_location')
export const inputLink = document.querySelector('.popup__input_text_link')

export const cardList = document.querySelector('.elements__list')