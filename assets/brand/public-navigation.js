/* Presentation only. Does not change forms, identities, permissions or lead endpoints. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('publicNav');
  if (!toggle || !nav) return;
  const disclosures = [...nav.querySelectorAll('[data-dropdown]')];
  const finePointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1101px)');
  let hoverTimer;
  const savedFocus = new WeakMap();
  function setPanel(button, open) {
    const panel = document.getElementById(button.dataset.dropdown);
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }
  function closePanels() {
    clearTimeout(hoverTimer);
    disclosures.forEach(button => setPanel(button, false));
  }
  function openPanel(button) { closePanels(); setPanel(button, true); }
  function closeNav() {
    closePanels(); toggle.setAttribute('aria-expanded','false'); nav.classList.remove('is-open');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    closePanels(); toggle.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open);
  });
  disclosures.forEach(button => {
    const group = button.closest('.nav-group');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closePanels(); setPanel(button, open);
    });
    // Hover only discloses navigation; dialogs always need an explicit action.
    group.addEventListener('pointerenter', event => {
      if (!finePointer.matches || event.pointerType !== 'mouse' || document.querySelector('dialog[open]')) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => openPanel(button), 140);
    });
    group.addEventListener('pointerleave', () => {
      clearTimeout(hoverTimer);
      if (finePointer.matches && !group.contains(document.activeElement)) {
        hoverTimer = setTimeout(() => setPanel(button,false), 220);
      }
    });
    group.addEventListener('focusout', () => {
      setTimeout(() => { if (!group.contains(document.activeElement)) setPanel(button,false); },0);
    });
  });
  nav.addEventListener('click', event => { if(event.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', event => {
    if(event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
    const expanded = disclosures.find(button => button.getAttribute('aria-expanded') === 'true');
    if(expanded) { closePanels(); expanded.focus(); return; }
    if(toggle.getAttribute('aria-expanded') === 'true') { closeNav(); toggle.focus(); }
  });
  document.addEventListener('click', event => { if(!event.target.closest('.nav')) closeNav(); });
  finePointer.addEventListener('change', closeNav);

  function openDialog(dialog, opener) {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const returnTarget = opener.closest('.nav-group')?.querySelector('[data-dropdown]') || opener;
    closePanels();
    savedFocus.set(dialog, returnTarget);
    dialog.showModal();
    document.body.classList.add('dialog-is-open');
    dialog.scrollTop = 0;
    dialog.querySelector('h2')?.focus({preventScroll:true});
  }
  document.querySelectorAll('.public-dialog').forEach(dialog => {
    dialog.addEventListener('keydown', event => {
      if(event.key !== 'Tab') return;
      const controls = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')]
        .filter(node => node.getClientRects().length > 0);
      if(!controls.length) { event.preventDefault(); dialog.querySelector('h2')?.focus(); return; }
      const first = controls[0], last = controls[controls.length-1];
      if(event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if(!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
    dialog.addEventListener('close', () => {
      if(!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-is-open');
      const opener = savedFocus.get(dialog);
      if(opener?.isConnected) opener.focus({preventScroll:true});
    });
    dialog.addEventListener('click', event => {
      if(event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close-dialog]');
    if(close) { close.closest('dialog')?.close(); return; }
    const go = event.target.closest('[data-dialog-go]');
    if(go) {
      event.preventDefault();
      const destination = document.querySelector(go.getAttribute('href'));
      document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      setTimeout(() => {
        location.hash = go.getAttribute('href');
        const focus = destination?.querySelector('h1,h2');
        if(focus) { focus.setAttribute('tabindex','-1'); focus.focus({preventScroll:true}); }
      },0);
      return;
    }
    const upcoming = event.target.closest('[data-upcoming]');
    if(upcoming) {
      document.getElementById('upcomingTitle').textContent = upcoming.dataset.upcoming;
      document.getElementById('upcomingDescription').textContent = upcoming.dataset.note || 'Este contenido está en preparación. Puedes solicitar información a ADVPER.';
      openDialog(document.getElementById('upcomingDialog'), upcoming);
      return;
    }
    const opener = event.target.closest('[data-dialog]');
    if(opener) openDialog(document.getElementById(opener.dataset.dialog), opener);
  });
})();
