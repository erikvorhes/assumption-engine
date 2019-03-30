(function () {
  function fallback() {
    document.documentElement.className = 'no-js';
  }

  try {
    fetch('assumptions.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Bad network response.');
      })
      .then(json => {
        const assumptions = json.assumptions || false;
        if (!assumptions) {
          throw new Error('No assumptions.');
        }

        let assClone = [];
        const assEl = document.getElementById('told-you');
        const form = document.querySelector('form');
        form.addEventListener('submit', (ev) => {
          ev.preventDefault();
          if (!assClone.length) {
            assClone = assumptions.slice(0);
          }

          const item = Math.floor(Math.random() * assClone.length);
          const assumption = assClone[item];
          assClone.splice(item, 1);

          assEl.innerHTML =  assumption;
        });
      })
      .catch(err => {
        fallback();
        console.log('Something went wrong: ', err.message);
      });
  } catch (err) {
    fallback();
    console && console.log('Something went wrong: ', err.message);
  }
}());
