const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(formSelector, inputSelector, errorMessage) {
  const formInputTextError = formSelector.querySelector(`#${inputSelector.id}-error`)

  inputSelector.classList.add(validationConfig.inputErrorClass)
  formInputTextError.classList.add(validationConfig.errorClass)
  formInputTextError.textContent = errorMessage
}

function hideInputError(formSelector, inputSelector) {
  const formInputTextError = formSelector.querySelector(`#${inputSelector.id}-error`)

  inputSelector.classList.remove(validationConfig.inputErrorClass)
  formInputTextError.classList.remove(validationConfig.errorClass)
  formInputTextError.textContent = ''
}

function resetInputError(form) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
  inputList.forEach((input) => {
    hideInputError(form, input)
  })
}

function isValid(formSelector, inputSelector) {
  if (!inputSelector.checkValidity()) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage)
  } else {
    hideInputError(formSelector, inputSelector)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.checkValidity()
  })
}

function buttonStateToggle(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass)
    submitButtonSelector.setAttribute('disabled', 'disabled')
  } else {
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass)
    submitButtonSelector.removeAttribute('disabled', 'disabled')
  }
}

function checkInputValidity(form) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
  return inputList.some((input) => {
    return input.value == ''
  })
}

function setEventListener(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector))
  const submitButton = formSelector.querySelector(validationConfig.submitButtonSelector)
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
      buttonStateToggle(inputList, submitButton)
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListener(formSelector)
  })
}

enableValidation(validationConfig)