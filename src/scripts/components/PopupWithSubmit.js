import Popup from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor({ callbackSubmitForm }, popupSelector) {
    super(popupSelector)
    this._callbackSubmitForm = callbackSubmitForm
  }

  setSubmitAction(action) {
    action
  }

  setEventListeners() {
    super.setEventListeners()

    const form = this._popup.querySelector('.popup__form')
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._callbackSubmitForm()
    })
  }
}