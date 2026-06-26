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


const searchInput =
  document.getElementById('search-input');

let allLinks = [];

const token = localStorage.getItem('token');

if (!token) {
  window.location.href = './login.html';
}

const totalLinks =
  document.getElementById('total-links');

const totalClicks =
  document.getElementById('total-clicks');

const avgClicks =
  document.getElementById('avg-clicks');

const topLink =
  document.getElementById('top-link');

const recentLinks =
  document.getElementById('recent-links');

const logoutBtn =
  document.getElementById('logout-btn');

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = './login.html';
});

function renderLinks(links) {

  recentLinks.innerHTML = '';

  links.forEach((link) => {

    recentLinks.innerHTML += `
      <tr>

        <td>
          ${link.title || 'Untitled'}
        </td>

        <td>
          http://localhost:3000/${link.short_code}
        </td>

        <td>
          ${link.original_url || '-'}
        </td>

        <td>
          ${link.clicks}
        </td>

        <td>

          <button
            class="copy-btn"
            data-code="${link.short_code}"
          >
            Copy
          </button>

          <button
            class="edit-btn"
            data-id="${link.id}"
            data-title="${link.title || ''}"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            data-id="${link.id}"
          >
            Delete
          </button>

          <button
            class="analytics-btn"
            data-id="${link.id}"
          >
            Analytics
          </button>

        </td>

      </tr>
    `;
  });

  attachButtonEvents();
}

const loadDashboard = async () => {
  try {

    const response = await fetch(
      'http://localhost:3000/dashboard/overview',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    allLinks = data.recentLinks;

    totalLinks.textContent =
      data.totalLinks;

    totalClicks.textContent =
      data.totalClicks;

    avgClicks.textContent =
      data.averageClicksPerLink;

    if (data.topLink) {
      topLink.textContent =
        `${data.topLink.short_code} (${data.topLink.clicks} clicks)`;
    }

    renderLinks(allLinks);

  } catch (error) {
    console.error(error);
  }
};

const attachButtonEvents = () => {

  document
    .querySelectorAll('.copy-btn')
    .forEach((button) => {

      button.addEventListener(
        'click',
        () => {

          const shortUrl =
            `http://localhost:3000/${button.dataset.code}`;

          navigator.clipboard.writeText(
            shortUrl
          );

          showToast('Link copied!');
        }
      );
    });

  document
    .querySelectorAll('.delete-btn')
    .forEach((button) => {

      button.addEventListener(
        'click',
        async () => {

          const confirmed =
            confirm(
              'Delete this link?'
            );

          if (!confirmed) {
            return;
          }

          try {

            const response =
              await fetch(
                `http://localhost:3000/links/${button.dataset.id}`,
                {
                  method: 'DELETE',

                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              );

            if (!response.ok) {
              throw new Error();
            }

            showToast('Link deleted!');

            loadDashboard();

          } catch (error) {

            console.error(error);

            showToast('Unable to Delete link!');
          }
        }
      );
    });

  document
    .querySelectorAll('.edit-btn')
    .forEach((button) => {

      button.addEventListener(
        'click',
        async () => {

          const title = prompt(
            'Enter new title',
            button.dataset.title
          );

          if (title === null) {
            return;
          }

          try {

            const response =
              await fetch(
                `http://localhost:3000/links/${button.dataset.id}`,
                {
                  method: 'PUT',

                  headers: {
                    'Content-Type':
                      'application/json',

                    Authorization:
                      `Bearer ${token}`,
                  },

                  body: JSON.stringify({
                    title,
                  }),
                }
              );

            if (!response.ok) {
              throw new Error();
            }

            showToast('Link updated!');

            loadDashboard();

          } catch (error) {

            console.error(error);

            showToast('Unable to update link!');
          }
        }
      );
    });

  document
    .querySelectorAll('.analytics-btn')
    .forEach((button) => {

      button.addEventListener(
        'click',
        () => {

          window.location.href =
            `./analytics.html?id=${button.dataset.id}`;

        }
      );
    });
};

searchInput.addEventListener(
  'keyup',
  () => {

    const value =
      searchInput.value
        .toLowerCase();

    const filtered =
      allLinks.filter(
        (link) => {

          return (
            (link.title || '')
              .toLowerCase()
              .includes(value)

            ||

            link.short_code
              .toLowerCase()
              .includes(value)

            ||

            (link.original_url || '')
              .toLowerCase()
              .includes(value)
          );
        }
      );

    renderLinks(filtered);
  }
);

loadDashboard();
