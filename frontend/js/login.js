const toast =
document.getElementById(
'toast'
);

function showToast(
message
) {

toast.textContent =
message;

toast.classList.add(
'show'
);

setTimeout(
() => {
toast.classList.remove(
'show'
);
},
2500
);
}
const form = document.getElementById('login-form');

const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email =
    document.getElementById('email').value;

  const password =
    document.getElementById('password').value;

  try {
    const response = await fetch(
      'http://localhost:3000/auth/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      message.textContent =
        data.message || 'Login failed';

      return;
    }

    localStorage.setItem(
      'token',
      data.token
    );

    showToast('Login Successful!');

    window.location.href =
      './dashboard.html';
  } catch (error) {
    console.error(error);

    message.textContent =
      'Unable to connect to server';
  }
});