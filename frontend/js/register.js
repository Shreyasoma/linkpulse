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
const form = document.getElementById('register-form');

const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;

  const email = document.getElementById('email').value;

  const password =
    document.getElementById('password').value;

  try {
    const response = await fetch(
      'http://localhost:3000/auth/register',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      message.textContent =
        data.message || 'Registration failed';

      return;
    }

    showToast('Registration succesful!');
    window.location.href = './login.html';
  } catch (error) {
    console.error(error);

    message.textContent =
      'Unable to connect to server';
  }
});