import Popup from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({handleOpenPopup, callbackSubmitForm}, popupSelector) {
    super(popupSelector)
    this._callback = callbackSubmitForm
    this._handleOpenPopup = handleOpenPopup
  }

  _getInputValues() {
    const values = {}
    const inputList = this._popup.querySelectorAll('.popup__input')

    inputList.forEach(input => {
      values[input.name] = input.value
    })
    
    return values
  }

  resetInputError(validClass, config) {
    const inputList = Array.from(this._popup.querySelectorAll(config.inputSelector))
    const form = this._popup.querySelector('.popup__form')
  
    inputList.forEach(input => {
      validClass.hideInputError(form, input, config)
    })
  }

  setEventListeners() {
    super.setEventListeners()

    const form = this._popup.querySelector('.popup__form')
    form.addEventListener('submit', this._callback)
  }

  open() {
    super.open()
    this._handleOpenPopup()
  }

  close() {
    super.close()
    this._popup.querySelector('.popup__form').reset()
  }
}