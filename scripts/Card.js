import { openPopup } from './utils.js';

class Card {
  constructor(location, link, templateSelector) {
    this._location = location
    this._link = link
    this._templateSelector = templateSelector
  }

  _getTemplateCard() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .children[0]
      .cloneNode(true)

    return this._cardTemplate
  }

  renderNewCard() {
    this._cardElement = this._getTemplateCard()
    this._cardElementImage = this._cardElement.querySelector('.element__image')

    this._cardElementImage.src = this._link
    this._cardElementImage.alt = this._location
    this._cardElement.querySelector('.element__title').textContent = this._location

    this._setEventListeners()

    return this._cardElement
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete-button')
      .addEventListener('click', () => {
        this._deleteCard()
      })
    this._cardElement.querySelector('.element__like-button')
      .addEventListener('click', (evt) => {
        this._likeToggle(evt)
      })
    this._cardElement.querySelector('.element__image')
      .addEventListener('click', (evt) => {
        this._openPhotoPopup(evt)
      })
  }

  _deleteCard() {
    this._cardElement.remove()
    this._cardElement = null
  }

  _likeToggle(evt) {
    evt.target.classList.toggle('element__like-button_pressed')
  }

  _openPhotoPopup(evt) {
    this._photoPopup = document.querySelector('.popup_type_photo')
    this._photoPopupImg = this._photoPopup.querySelector('.popup__image')

    this._photoPopupImg.src = evt.target.src
    this._photoPopupImg.alt = evt.target.alt
    this._photoPopup.querySelector('.popup__description').textContent = evt.target.alt

    openPopup(this._photoPopup)
  }
}

export { Card }