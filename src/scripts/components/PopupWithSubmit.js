import Popup from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  setSubmitAction(actions) {
    this._submit = actions
  }

  setEventListeners() {
    super.setEventListeners()

    const form = this._popup.querySelector('.popup__form')
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submit()
    })
  }
}