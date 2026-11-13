(function () {
  var cfg = window.NUTRILEAN || {};
  var form = document.getElementById('booking-form');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.step'));
  var prevBtn = form.querySelector('[data-prev]');
  var nextBtn = form.querySelector('[data-next]');
  var bar = form.querySelector('.progress__bar');
  var stepLabel = form.querySelector('[data-step-label]');
  var stepName = form.querySelector('[data-step-name]');
  var current = 0;

  var NEXT_LABEL = 'Submit &amp; next <svg class="icon"><use href="#i-arrow"/></svg>';
  var FINAL_LABEL = 'Book consultation <svg class="icon"><use href="#i-arrow"/></svg>';

  function showStep(i) {
    steps.forEach(function (s, idx) { s.hidden = idx !== i; });
    current = i;
    prevBtn.hidden = i === 0;
    nextBtn.innerHTML = i === steps.length - 1 ? FINAL_LABEL : NEXT_LABEL;
    bar.style.width = ((i + 1) / steps.length * 100) + '%';
    stepLabel.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    stepName.textContent = steps[i].dataset.name;
  }

  // ---------- Validation ----------
  function setError(input, msg) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.toggle('has-error', !!msg);
    var err = field.querySelector('.field__error');
    if (err) err.textContent = msg || '';
  }

  function validateDetails() {
    var ok = true;
    var name = form.elements.name;
    var city = form.elements.city;
    var contact = form.elements.contact;
    var age = form.elements.age;
    var genderInput = form.querySelector('input[name="gender"]');

    if (name.value.trim().length < 2) { setError(name, 'Please enter your name'); ok = false; } else setError(name);
    if (city.value.trim().length < 2) { setError(city, 'Please enter your city'); ok = false; } else setError(city);
    if (!/^[6-9]\d{9}$/.test(contact.value.trim())) { setError(contact, 'Enter a valid 10-digit mobile number'); ok = false; } else setError(contact);
    if (!form.querySelector('input[name="gender"]:checked')) { setError(genderInput, 'Please select your gender'); ok = false; } else setError(genderInput);
    var ageVal = parseInt(age.value, 10);
    if (!(ageVal >= 12 && ageVal <= 100)) { setError(age, 'Enter your age (12–100)'); ok = false; } else setError(age);

    if (!ok) {
      var firstErr = form.querySelector('.has-error input');
      if (firstErr) firstErr.focus();
    }
    return ok;
  }

  function validateGroup(step) {
    var group = step.dataset.group;
    var checked = step.querySelectorAll('input[name="' + group + '"]:checked');
    var err = step.querySelector('.step__error');
    if (!checked.length) {
      err.textContent = 'Please select at least one option';
      return false;
    }
    var other = step.querySelector('input[data-other]');
    var otherInput = step.querySelector('.other-field input');
    if (other && other.checked && !otherInput.value.trim()) {
      err.textContent = 'Please mention what else you have tried';
      otherInput.focus();
      return false;
    }
    err.textContent = '';
    return true;
  }

  function validateSlot(step) {
    var err = step.querySelector('.step__error');
    if (!form.querySelector('input[name="slotTime"]:checked')) {
      err.textContent = 'Please choose a day and time for your consultation';
      return false;
    }
    err.textContent = '';
    return true;
  }

  function validateStep(i) {
    if (steps[i].dataset.group) return validateGroup(steps[i]);
    if ('slot' in steps[i].dataset) return validateSlot(steps[i]);
    return validateDetails();
  }

  // ---------- Consultation slots ----------
  var slotCfg = cfg.slots || { schedule: [] };
  var slotDays = form.querySelector('[data-slot-days]');
  var slotTimes = form.querySelector('[data-slot-times]');
  var slotsByDate = {};

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  // Stable pseudo-random number in [0, 1) for a string, so the same date
  // always shows the same "booked" slots
  function seeded(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967296;
  }

  function formatTime(t) {
    var p = t.split(':'), h = +p[0];
    return (h % 12 || 12) + ':' + p[1] + ' ' + (h < 12 ? 'AM' : 'PM');
  }

  function slotsFor(date) {
    var day = date.getDay();
    var plan = (slotCfg.schedule || []).filter(function (s) { return s.days.indexOf(day) !== -1; })[0];
    if (!plan) return null;
    var key = dateKey(date);
    var soon = new Date(Date.now() + 60 * 60 * 1000);
    var slots = plan.times.map(function (t) {
      var p = t.time.split(':');
      var at = new Date(date.getFullYear(), date.getMonth(), date.getDate(), +p[0], +p[1]);
      return { time: t.time, label: formatTime(t.time), booked: at < soon ? 'Booked' : (t.booked || '') };
    });
    var open = slots.filter(function (s) { return !s.booked; }).length;
    slots.forEach(function (s) {
      if (s.booked || open <= (slotCfg.minOpen || 0)) return;
      if (seeded(key + s.time) < (slotCfg.randomBooked || 0)) { s.booked = 'Booked'; open--; }
    });
    return slots;
  }

  function renderSlotTimes(key) {
    var slots = slotsByDate[key] || [];
    slotTimes.innerHTML = slots.map(function (s) {
      return '<label class="slot-time"><input type="radio" name="slotTime" value="' + s.time + '"' + (s.booked ? ' disabled' : '') + '>' +
        '<span>' + s.label + (s.booked ? '<small>' + s.booked + '</small>' : '') + '</span></label>';
    }).join('');
  }

  function renderSlotDays() {
    if (!slotDays) return;
    var html = '';
    var first = null;
    var today = new Date();
    for (var i = 0; i < (slotCfg.daysAhead || 14); i++) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      var slots = slotsFor(d);
      if (!slots) continue;
      var key = dateKey(d);
      var open = slots.filter(function (s) { return !s.booked; }).length;
      slotsByDate[key] = slots;
      if (open && !first) first = key;
      html += '<label class="slot-day"><input type="radio" name="slotDate" value="' + key + '"' + (open ? '' : ' disabled') + '>' +
        '<span><small>' + d.toLocaleDateString('en-IN', { weekday: 'short' }) + '</small>' +
        '<strong>' + d.getDate() + '</strong>' +
        '<small>' + d.toLocaleDateString('en-IN', { month: 'short' }) + '</small>' +
        '<em>' + (open ? open + ' open' : 'Full') + '</em></span></label>';
    }
    slotDays.innerHTML = html;
    if (first) {
      slotDays.querySelector('input[value="' + first + '"]').checked = true;
      renderSlotTimes(first);
    }
  }

  function chosenSlot() {
    var date = form.querySelector('input[name="slotDate"]:checked');
    var time = form.querySelector('input[name="slotTime"]:checked');
    if (!date || !time) return '';
    var p = date.value.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) + ', ' + formatTime(time.value);
  }

  // Live-clear errors once the user corrects them
  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('has-error')) setError(e.target);
  });

  // Digits only for phone
  form.elements.contact.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });

  // "None" / "Never tried" deselect the others, and vice versa; "Other" shows a text field
  form.addEventListener('change', function (e) {
    var input = e.target;
    if (input.type === 'radio' && input.name === 'gender') setError(input);
    if (input.name === 'slotDate') renderSlotTimes(input.value);
    if (input.name === 'slotDate' || input.name === 'slotTime') {
      input.closest('.step').querySelector('.step__error').textContent = '';
    }
    if (input.type !== 'checkbox') return;

    var step = input.closest('.step');
    var siblings = step.querySelectorAll('input[name="' + input.name + '"]');
    if (input.checked) {
      Array.prototype.forEach.call(siblings, function (s) {
        if (s === input) return;
        if (input.hasAttribute('data-exclusive') || s.hasAttribute('data-exclusive')) s.checked = false;
      });
    }
    var other = step.querySelector('input[data-other]');
    var otherField = step.querySelector('.other-field');
    if (other && otherField) {
      otherField.hidden = !other.checked;
      if (other.checked && input === other) otherField.querySelector('input').focus();
    }
    var err = step.querySelector('.step__error');
    if (err && step.querySelector('input:checked')) err.textContent = '';
  });

  function goTo(i) {
    showStep(i);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  prevBtn.addEventListener('click', function () {
    if (current > 0) goTo(current - 1);
  });

  // ---------- Submit ----------
  function collect() {
    function values(name) {
      return Array.prototype.map.call(form.querySelectorAll('input[name="' + name + '"]:checked'), function (i) { return i.value; });
    }
    var tried = values('tried');
    var otherText = form.elements.triedOther.value.trim();
    if (otherText) tried = tried.map(function (v) { return v === 'Other' ? 'Other: ' + otherText : v; });

    return {
      name: form.elements.name.value.trim(),
      city: form.elements.city.value.trim(),
      contact: '+91' + form.elements.contact.value.trim(),
      gender: (form.querySelector('input[name="gender"]:checked') || {}).value || '',
      age: form.elements.age.value.trim(),
      goal: values('goal').join(', '),
      conditions: values('conditions').join(', '),
      tried: tried.join(', '),
      slot: chosenSlot(),
      submittedAt: new Date().toISOString(),
      page: location.href
    };
  }

  function whatsappMessage(d) {
    return [
      'Hi ' + (cfg.coachName || '') + ', I want to book a consultation (nutrilean.in).',
      '',
      'Name: ' + d.name,
      'City: ' + d.city,
      'Contact: ' + d.contact,
      'Gender: ' + d.gender,
      'Age: ' + d.age,
      'Goal: ' + d.goal,
      'Health conditions: ' + d.conditions,
      'Tried before: ' + d.tried,
      'Preferred slot: ' + d.slot
    ].join('\n');
  }

  function showSuccess(d) {
    form.hidden = true;
    var success = document.querySelector('.success');
    var firstName = d.name.split(/\s+/)[0];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    success.querySelector('[data-success-name]').textContent = firstName;
    success.querySelector('[data-success-phone]').textContent = d.contact.replace(/^\+91(\d{5})(\d{5})$/, '+91 $1 $2');
    success.querySelector('[data-success-slot]').textContent = d.slot;
    success.querySelector('[data-success-whatsapp]').href =
      'https://wa.me/' + cfg.whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage(d));
    success.hidden = false;
    document.querySelector('.book__inner').classList.add('is-done');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    launchConfetti(success.querySelector('.confetti'));
  }

  function launchConfetti(container) {
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colors = ['#38bdf8', '#0284c7', '#ffd166', '#ff7a1a', '#7dd3fc', '#ffffff'];
    for (var i = 0; i < 80; i++) {
      var piece = document.createElement('i');
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = Math.random() * 0.6 + 's';
      piece.style.animationDuration = 2.2 + Math.random() * 1.8 + 's';
      piece.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
      piece.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
      container.appendChild(piece);
    }
    setTimeout(function () { container.innerHTML = ''; }, 4800);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep(current)) return;
    if (current < steps.length - 1) { goTo(current + 1); return; }

    var data = collect();
    nextBtn.disabled = true;
    nextBtn.textContent = 'Booking…';

    var send = cfg.formEndpoint
      ? fetch(cfg.formEndpoint, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(data) }).catch(function () {})
      : Promise.resolve();

    send.then(function () { showSuccess(data); });
  });

  renderSlotDays();
  showStep(0);
})();
