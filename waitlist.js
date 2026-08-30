// The beta waitlist, shared by the landing CTA and the support page.
//
// Two modes, decided by WAITLIST_ENDPOINT:
//
// - Set to a Formspree form URL: submission happens in-page. POST the
//   contact, swap the form for a success line, done. If the POST fails for
//   any reason (offline, endpoint gone, quota), fall through to mailto so a
//   real person's attempt to reach us never dies in a spinner.
// - Empty: straight to mailto. The visitor's own mail app composes the
//   message to support@reunited.day, so the site holds nothing.
//
// The note under each form describes whichever mode is actually live, so the
// privacy sentence on screen is true in both states — the same rule the app
// follows with its own disclosures.
(function () {
  var WAITLIST_ENDPOINT = 'https://formspree.io/f/moealzez';

  // Deliberately loose. The field takes an email OR a phone number, and the
  // job here is to catch a typo or a stray word before it costs someone their
  // invite — not to adjudicate what a valid address looks like. Anything with
  // a plausible shape gets through; RFC 5322 is not our business.
  function looksLikeContact(v) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return true;
    var digits = v.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  function mailto(v) {
    location.href = 'mailto:support@reunited.day'
      + '?subject=' + encodeURIComponent('Reunited beta invite')
      + '&body=' + encodeURIComponent(
          'Please add me to the Reunited beta.\n\nReach me at: ' + v
          + '\n\n(If you use TestFlight with a different email, say so here.)');
  }

  window.reunitedWaitlist = function (formId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var input = form.querySelector('input');
    var note = form.parentElement.querySelector('.waitlist-note');
    var error = form.parentElement.querySelector('.waitlist-error');

    function showError(msg) {
      if (!error) return;
      error.textContent = msg;
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    }
    function clearError() {
      if (!error) return;
      error.hidden = true;
      error.textContent = '';
      input.removeAttribute('aria-invalid');
    }

    // Clear on the next keystroke rather than on submit. Leaving the warning
    // up while someone is actively fixing the thing it complains about is
    // just nagging.
    input.addEventListener('input', clearError);

    if (WAITLIST_ENDPOINT && note) {
      note.innerHTML = 'Goes straight to '
        + '<a href="mailto:support@reunited.day">support@reunited.day</a>. '
        + 'One email when a spot opens, nothing else.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) { input.focus(); return; }

      if (!looksLikeContact(v)) {
        showError('That does not look like an email or a phone number.');
        input.focus();
        input.select();
        return;
      }
      clearError();

      if (!WAITLIST_ENDPOINT) { mailto(v); return; }

      var btn = form.querySelector('button');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'Joining…';

      fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: v, _subject: 'Reunited beta invite' })
      }).then(function (r) {
        if (!r.ok) throw new Error('endpoint said ' + r.status);
        var done = document.createElement('p');
        done.className = 'waitlist-done';
        // Announced, not just shown: the form vanishes on success, and a
        // screen-reader user gets no other signal that anything happened.
        done.setAttribute('role', 'status');
        done.textContent = "You're on the list. Watch for a TestFlight invite.";
        form.replaceWith(done);
        if (note) note.remove();
        if (error) error.remove();
      }).catch(function () {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.textContent = 'Join the beta';
        // Say what is about to happen. The mailto hands the visitor off to
        // another app, and an unexplained jump reads as the site breaking.
        showError('Could not reach us just now. Opening your mail app instead.');
        mailto(v);
      });
    });
  };
})();
