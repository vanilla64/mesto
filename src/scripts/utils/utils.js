export function renderLoading(isLoading, popUp, config) {
  const submitBtn = popUp.querySelector(config.submitButtonSelector)

  if (isLoading) {
    submitBtn.textContent = 'Сохранение...'
  } else if (!isLoading) {
    submitBtn.textContent = 'Сохранить'
  }
}