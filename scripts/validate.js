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

  inputSelector.classList.add('popup__input_type_error')
  formInputTextError.classList.add('popup__error_visible')
  formInputTextError.textContent = errorMessage
}

function hideInputError(formSelector, inputSelector) {
  const formInputTextError = formSelector.querySelector(`#${inputSelector.id}-error`)

  inputSelector.classList.remove('popup__input_type_error')
  formInputTextError.classList.remove('popup__error_visible')
  formInputTextError.textContent = ''
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
    submitButtonSelector.classList.add('popup__btn_disabled')
    submitButtonSelector.setAttribute('disabled', 'disabled')
  } else {
    submitButtonSelector.classList.remove('popup__btn_disabled')
    submitButtonSelector.removeAttribute('disabled', 'disabled')
  }
}

function checkInputValidity(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'))
  return inputList.some((input) => {
    return input.value == ''
  })
}

function actualButtonState(form) {
  if (checkInputValidity(form)) {
    form.querySelector('.popup__btn').setAttribute('disabled', 'disabled')
    form.querySelector('.popup__btn').classList.add('popup__btn_disabled')
  } else {
    form.querySelector('.popup__btn').removeAttribute('disabled', 'disabled')
    form.querySelector('.popup__btn').classList.remove('popup__btn_disabled')
  }
}

function setEventListener(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'))
  const submitButton = formSelector.querySelector('.popup__btn')
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
      buttonStateToggle(inputList, submitButton)
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListener(formSelector)
  })
}

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__btn',
//   inactiveButtonClass: 'popup__btn_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// })











///////////////////////////
// formInput.addEventListener('input', () => {
//   isValid(popupAddCard, formInput)
// })