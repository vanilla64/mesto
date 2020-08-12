export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
    this.open = this.open.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)

    this._popup.addEventListener('mousedown', this._handleOverlayClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt)
    })

    const closeBtn = this._popup.querySelector('.popup__close-btn')
    closeBtn.addEventListener('click', () => {
      this.close()
    })
  }
}