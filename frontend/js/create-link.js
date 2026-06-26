const token = localStorage.getItem('token');

if (!token) {
  window.location.href = './login.html';
}

const form = document.getElementById(
  'create-link-form'
);

const message =
  document.getElementById('message');

const result =
  document.getElementById('result');

const dashboardBtn =
  document.getElementById('dashboard-btn');

dashboardBtn.addEventListener('click', () => {
  window.location.href = './dashboard.html';
});

form.addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    const title =
      document.getElementById('title').value;

    const originalUrl =
      document.getElementById(
        'original-url'
      ).value;

    try {
      const response = await fetch(
        'http://localhost:3000/links',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            originalUrl,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        message.textContent =
          data.message ||
          'Unable to create link';

        return;
      }

      message.textContent =
        'Link created successfully';

      result.style.display = 'block';

result.innerHTML = `
  <div class="result-card">
    <p>
      <strong>Short Code:</strong>
      ${data.link.short_code}
    </p>
  </div>
`;

      form.reset();
    } catch (error) {
      console.error(error);

      message.textContent =
        'Server error';
    }
  }
);