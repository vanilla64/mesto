export class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    
    this._setEventListener(this._form, this._config)
  }

  _setEventListener(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector))
    const submitButton = form.querySelector(config.submitButtonSelector)

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(form, input, config)
        this._buttonStateToggle(inputList, submitButton, config)
      })
    })
  }

  _isValid(formElement, inputElement, config) {
    if (!inputElement.checkValidity()) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
      this._hideInputError(formElement, inputElement, config)
    }
  }

  _showInputError(formElement, inputElement, errorMessage, config) {
    const formInputTextError = formElement.querySelector(`#${inputElement.id}-error`)

    inputElement.classList.add(config.inputErrorClass)
    formInputTextError.classList.add(config.errorClass)
    formInputTextError.textContent = errorMessage
  }

  _hideInputError(formElement, inputElement, config) {
    const formInputTextError = formElement.querySelector(`#${inputElement.id}-error`)

    inputElement.classList.remove(config.inputErrorClass)
    formInputTextError.classList.remove(config.errorClass)
    formInputTextError.textContent = ''
  }

  _buttonStateToggle(inputList, button, config) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(config.inactiveButtonClass)
      button.setAttribute('disabled', 'disabled')
    } else {
      button.classList.remove(config.inactiveButtonClass)
      button.removeAttribute('disabled')
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.checkValidity()
    })
  }

  _resetInputError(config, inputList) {
    inputList.forEach(input => {
      this._hideInputError(this._form, input, config)
    })
  }

  resetForm(config, button) {
    const inputList = Array.from(this._form.querySelectorAll(config.inputSelector))
    this._resetInputError(config, inputList)
    this._buttonStateToggle(inputList, button, config)
  }
}