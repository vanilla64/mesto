export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupKeyEscape)
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupKeyEscape)
}

function closePopupKeyEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(openedPopup)
  }
}

export function closeOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup)
  }
}

export function resetInputsValues(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))
  inputList.forEach((input) => {
    input.value = ''
  })
}

export function resetInputError(form, validClass, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))
  inputList.forEach(input => {
    validClass.hideInputError(form, input, config)
  })
}