const popUp = document.querySelector('.popup')
const popUpOpen = document.querySelector('.profile__edit-button')
const popUpClosed = document.querySelector('.popup__close-btn')
//////////////////////////////
let nameInput = document.querySelector('.popup__input_text_name')
let jobInput =  document.querySelector('.popup__input_text_job')
let userName = document.querySelector('.profile__title')
let userJob = document.querySelector('.profile__subtitle')
//////////////////////////////
const popUpToggle = function (event) {
  popUp.classList.toggle('popup_opened')

  nameInput.value = userName.textContent
  jobInput.value = userJob.textContent
}

popUpOpen.addEventListener('click', popUpToggle)
popUpClosed.addEventListener('click', popUpToggle)
//////////////////////////////
const formElement = document.querySelector('.popup__form')

function formSubmitHandler (event) {
  event.preventDefault();

  nameInput.value
  jobInput.value

  userName.textContent = nameInput.value
  userJob.textContent = jobInput.value

  popUpToggle()
}

formElement.addEventListener('submit', formSubmitHandler);