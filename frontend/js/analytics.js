const token =
  localStorage.getItem('token');

if (!token) {
  window.location.href =
    './login.html';
}

const params =
  new URLSearchParams(
    window.location.search
  );

const linkId =
  params.get('id');

const totalClicks =
  document.getElementById(
    'total-clicks'
  );

const dailyChart =
  document.getElementById(
    'daily-chart'
  );

const referrerChart =
  document.getElementById(
    'referrer-chart'
  );

const loadAnalytics = async () => {
  try {

    const response =
      await fetch(
        `http://localhost:3000/links/analytics/${linkId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    // TOTAL CLICKS

    totalClicks.textContent =
      data.totalClicks;

    // DAILY CLICKS LINE CHART

    const labels =
      data.dailyClicks.map(
        item => item.date
      );

    const values =
      data.dailyClicks.map(
        item => Number(
          item.count
        )
      );

    new Chart(
      dailyChart,
      {
        type: 'line',

        data: {
          labels,

          datasets: [
            {
              label:
                'Daily Clicks',

              data:
                values,

              borderColor:
                '#8b5cf6',

              backgroundColor:
                'rgba(139,92,246,0.2)',

              borderWidth: 3,

              tension: 0.4,

              fill: true,
            },
          ],
        },

        options: {
          responsive: true,

          plugins: {
            legend: {
              labels: {
                color:
                  'white',
              },
            },
          },

          scales: {

            x: {
              ticks: {
                color:
                  'white',
              },

              grid: {
                color:
                  '#334155',
              },
            },

            y: {
              beginAtZero:
                true,

              ticks: {
                color:
                  'white',
              },

              grid: {
                color:
                  '#334155',
              },
            },

          },
        },
      }
    );

    // REFERRER PIE CHART

    const referrerLabels =
      data.referrers.map(
        item =>
          item.referrer
      );

    const referrerValues =
      data.referrers.map(
        item =>
          Number(
            item.count
          )
      );

    new Chart(
      referrerChart,
      {
        type: 'pie',

        data: {
          labels:
            referrerLabels,

          datasets: [
            {
              data:
                referrerValues,

              backgroundColor: [
                '#8b5cf6',
                '#3b82f6',
                '#10b981',
                '#f59e0b',
                '#ef4444',
                '#06b6d4',
                '#ec4899',
              ],
            },
          ],
        },

        options: {
          responsive:
            true,

          plugins: {

            legend: {
              position:
                'bottom',

              labels: {
                color:
                  'white',
              },
            },

          },
        },
      }
    );

  } catch (error) {

    console.error(
      error
    );

  }
};

loadAnalytics();
