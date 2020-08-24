import Popup from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({callbackSubmitForm}, popupSelector) {
    super(popupSelector)
    this._callbackSubmitForm = callbackSubmitForm
  }

  _getInputValues() {
    const values = {}
    const inputList = this._popup.querySelectorAll('.popup__input')

    inputList.forEach(input => {
      values[input.name] = input.value
    })
    
    return values
  }

  setEventListeners() {
    super.setEventListeners()

    const form = this._popup.querySelector('.popup__form')
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._callbackSubmitForm(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._popup.querySelector('.popup__form').reset()
  }
}