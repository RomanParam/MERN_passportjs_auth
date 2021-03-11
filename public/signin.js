/**
 * Выдает ошибку при неверной аутентификации
 * @param {HTMLFormElement} signinForm Форма входа
 */
function failSignin(signinForm) {
  signinForm.name.setCustomValidity('Неверные имя пользователя и/или пароль.');
  signinForm.name.reportValidity();
}
const signinForm = document.forms.signinForm;

signinForm?.addEventListener('submit', async (event) => {
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
        password: event.target.password.value,
      }),
    });
  } catch (err) {
    return failSignin(event.target);
  }
  if (response.status !== 200) {
    return failSignin(event.target);
  }
  return window.location.assign('/private');
});

// Очищаем кастомные сообщения об ошибках при новом вводе

signinForm?.addEventListener('input', (event) => {
  event.target.setCustomValidity('');
  event.target.checkValidity();
});


// if (document.forms.signinForm) {
//   [
//     document.forms.signinForm.name,
//     document.forms.signinForm.password,
//   ].forEach((input) => input.addEventListener('input', (event) => {
//     event.target.setCustomValidity('');
//     event.target.checkValidity();
//   }));
// }
