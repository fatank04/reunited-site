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
  var WAITLIST_ENDPOINT = ''; // e.g. 'https://formspree.io/f/XXXXXXXX'

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

    if (WAITLIST_ENDPOINT && note) {
      note.innerHTML = 'Goes straight to '
        + '<a href="mailto:support@reunited.day">support@reunited.day</a>. '
        + 'One email when a spot opens, nothing else.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;

      if (!WAITLIST_ENDPOINT) { mailto(v); return; }

      var btn = form.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Joining…';

      fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: v, _subject: 'Reunited beta invite' })
      }).then(function (r) {
        if (!r.ok) throw new Error('endpoint said ' + r.status);
        var done = document.createElement('p');
        done.className = 'waitlist-done';
        done.textContent = "You're on the list. Watch for a TestFlight invite.";
        form.replaceWith(done);
        if (note) note.remove();
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = 'Join the beta';
        mailto(v);
      });
    });
  };
})();
