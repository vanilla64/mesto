import Popup from './Popup.js'

export class PopupWithSubmit extends Popup {
  // constructor({ callbackSubmitForm }, popupSelector) {
  constructor(popupSelector) {
    super(popupSelector)
    // this._callbackSubmitForm = callbackSubmitForm
  }

  setSubmitAction(actions) {
    this._submit = actions
  }

  setEventListeners() {
    super.setEventListeners()

    const form = this._popup.querySelector('.popup__form')
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      // this._callbackSubmitForm()

      this._submit()
      // this._setSubmitAction()
    })
  }
}