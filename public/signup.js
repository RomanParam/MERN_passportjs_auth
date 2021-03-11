/**
 * Выдает ошибку при неверной регистрации
 * @param {HTMLFormElement} signupForm Форма регистрации
 */
function failSignup(signupForm) {
  signupForm.name.setCustomValidity('Вероятно, что вы уже зарегистрированы.');
  signupForm.name.reportValidity();
}

const signupForm = document.forms.signupForm;
signupForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;
  let response;
  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    });
  } catch (err) {
    return failSignup(event.target);
  }
  if (response.status !== 200) {
    return failSignup(event.target);
  }
  return window.location.assign('/private');
});

// Очищаем кастомные сообщения об ошибках при новом вводе
signupForm?.addEventListener('input', (event) => {
  event.target.setCustomValidity('');
  event.target.checkValidity();
});
