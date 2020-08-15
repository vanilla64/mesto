class Card {
  // constructor({data}, templateSelector, handleCardClick) {
  constructor({ location, link, handleCardClick }, templateSelector) {
    this._location = location
    this._link = link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
  }

  _getTemplateCard() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
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
      .addEventListener('click', () => {
        this._handleCardClick()
      })
  }

  _deleteCard() {
    this._cardElement.remove()
    this._cardElement = null
  }

  _likeToggle(evt) {
    evt.target.classList.toggle('element__like-button_pressed')
  }
}

export { Card }