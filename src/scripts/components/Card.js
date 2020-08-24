class Card {
  // constructor({data}, templateSelector, handleCardClick) {
  // constructor({ location, link, cardId, userId, likes, handleCardClick, handleLikeClick, handleDelClick }, templateSelector) {
  constructor({ data, handleCardClick, handleLikeClick, handleDelClick }, templateSelector) {
    // this._location = data.location
    // this._link = data.link
    // this._cardId = data.cardId
    // this._userId = data.userId
    // this._likes = data.likes

    this._data = data
    this._location = data.name
    this._link = data.link
    this._cardId = data._id
    this._userId = data.owner._id
    this._likes = parseInt(data.likes.length)
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleLikeClick = handleLikeClick
    this._handleDelClick = handleDelClick
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
    this._likeBtn = this._cardElement.querySelector('.element__like-button')

    this._cardElementImage.src = this._link
    this._cardElementImage.alt = this._location
    this._cardElement.querySelector('.element__title').textContent = this._location
    this._cardElement.querySelector('.element__like-counter').textContent = this._likes

    this._setEventListeners()

    this._data.likes.some(item => {
      if (item._id === 'da648f35949fed3f249f4631') {
        this._likeBtn.classList.add('element__like-button_pressed')
      } else {
        this._likeBtn.classList.remove('element__like-button_pressed')
      }
    })

    if (this._userId !== 'da648f35949fed3f249f4631') {
      // console.log('not my card')
      this._cardElement.querySelector('.element__delete-button')
        .style.display = 'none'
      return this._cardElement  
    } else {
      return this._cardElement
    }

    // if () {

    // }
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__delete-button')
      .addEventListener('click', () => {
        // this._deleteCard()
        this._handleDelClick(this._cardId, this._deleteCard)
      })
    this._cardElement.querySelector('.element__like-button')
      .addEventListener('click', (evt) => {
        this._likeToggle(evt)
        // console.log(this._cardElement)
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
    const likeElement = this._cardElement.querySelector('.element__like-button')
    const likeCounter = this._cardElement.querySelector('.element__like-counter')
    const isLiked = evt.target.classList.contains('element__like-button_pressed')

    this._handleLikeClick(this._cardId, isLiked, likeCounter, likeElement)
  }
}

export { Card }