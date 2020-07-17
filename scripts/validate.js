const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const formInputTextError = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.add(config.inputErrorClass)
  formInputTextError.classList.add(config.errorClass)
  formInputTextError.textContent = errorMessage
}

function hideInputError(formElement, inputElement, config) {
  const formInputTextError = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.remove(config.inputErrorClass)
  formInputTextError.classList.remove(config.errorClass)
  formInputTextError.textContent = ''
}

function resetInputError(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  inputList.forEach((input) => {
    hideInputError(formElement, input, config)
  })
}

function isValid(formElement, inputElement, config) {
  if (!inputElement.checkValidity()) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.checkValidity()
  })
}

function buttonStateToggle(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass)
    button.setAttribute('disabled', 'disabled')
  } else {
    button.classList.remove(config.inactiveButtonClass)
    button.removeAttribute('disabled')
  }
}

function setEventListener(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))
  const submitButton = form.querySelector(config.submitButtonSelector)
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config)
      buttonStateToggle(inputList, submitButton, config)
    })
  })
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListener(form, config)
  })
}

enableValidation(validationConfig)