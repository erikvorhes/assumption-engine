(function () {
  function fallback(message) {
    document.documentElement.className = 'no-js';
    console && console.log('Something went wrong: ', message);
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
        fallback(err.message);
      });
  } catch (err) {
    fallback(err.message);
  }
}());
