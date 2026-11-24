/* Mobile menu: dan e "Menu" button, chaple niche dropdown khule */
(function () {
  function init() {
    var tabs = document.querySelector('.md-tabs');
    var grid = tabs && tabs.querySelector('.md-grid');
    if (!grid || grid.querySelector('.kl-menu-btn')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kl-menu-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'kl-menu-panel');
    btn.innerHTML = 'Menu <span class="kl-menu-icon"><i></i><i></i><i></i></span>';

    var panel = document.createElement('nav');
    panel.className = 'kl-menu-panel';
    panel.id = 'kl-menu-panel';
    panel.hidden = true;
    tabs.querySelectorAll('.md-tabs__item').forEach(function (item) {
      var link = item.querySelector('a');
      if (!link) return;
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      if (item.classList.contains('md-tabs__item--active')) a.className = 'is-active';
      panel.appendChild(a);
    });

    grid.appendChild(btn);
    grid.appendChild(panel);

    function setOpen(open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      tabs.classList.toggle('kl-menu-open', open);
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(panel.hidden);
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
