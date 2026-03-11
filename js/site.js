
(function(){
  const hamburger = document.querySelector('[data-hamburger]');
  const mobile = document.querySelector('[data-mobile]');
  if(hamburger && mobile){
    hamburger.addEventListener('click', () => {
      const open = mobile.getAttribute('data-open') === 'true';
      mobile.setAttribute('data-open', (!open).toString());
      mobile.style.display = open ? 'none' : 'block';
      hamburger.setAttribute('aria-expanded', (!open).toString());
    });
    // start closed
    mobile.style.display = 'none';
    mobile.setAttribute('data-open','false');
  }

  const toast = document.querySelector('[data-toast]');
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(()=> toast.style.display='none', 2600);
  }

  document.querySelectorAll('form[data-pretend-submit]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Got it — message received. We’ll reach out soon.');
      form.reset();
    });
  });

  // Active nav highlighting
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === path) a.classList.add('active');
  });
})();
