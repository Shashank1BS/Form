// Handle form submission, build a formatted card and display it on success
const form = document.getElementById('regForm');
const output = document.getElementById('output');

function serializeForm(form) {
  const fd = new FormData(form);
  const data = {};
  for (const [k, v] of fd.entries()) {
    if (k === 'hobbies') {
      data[k] = data[k] || [];
      data[k].push(v);
    } else {
      // for radios, checkboxes etc the FormData gives last value; handle lists separately
      data[k] = v;
    }
  }
  return data;
}

function validatePasswords(pw, confirm) {
  if (!pw || !confirm) return false;
  return pw === confirm;
}

function createResultCard(data) {
  const card = document.createElement('div');
  card.className = 'result-card';

  const header = document.createElement('div');
  header.className = 'result-row';
  const title = document.createElement('h2');
  title.textContent = 'Registration successful';
  title.style.margin = '0 0 8px 0';
  title.style.fontSize = '1.1rem';
  header.appendChild(title);
  card.appendChild(header);

  // Helper to add rows
  function addRow(label, value) {
    const row = document.createElement('div');
    row.className = 'result-row';

    const lab = document.createElement('div');
    lab.className = 'result-label';
    lab.textContent = label;

    const val = document.createElement('div');
    val.className = 'result-value';
    val.textContent = value || '-';

    row.appendChild(lab);
    row.appendChild(val);
    card.appendChild(row);
  }

  addRow('Full name', data.fullName);
  addRow('Email', data.email);
  addRow('Phone', data.phone);
  addRow('Gender', data.gender);
  addRow('DOB', data.dob);
  addRow('City', data.city);
  addRow('Address', data.address);
  addRow('Hobbies', (data.hobbies || []).join(', '));

  // actions: print
  const actions = document.createElement('div');
  actions.className = 'actions-inline';
  const printBtn = document.createElement('button');
  printBtn.className = 'btn';
  printBtn.textContent = 'Print';
  printBtn.addEventListener('click', () => {
    // open a print window with the card content
    const w = window.open('', '_blank');
    if (!w) return alert('Pop-up blocked. Allow pop-ups or use browser print.');
    w.document.write('<!doctype html><html><head><title>Print</title>');
    w.document.write('<link rel="stylesheet" href="styles.css">');
    w.document.write('</head><body>');
    w.document.write(card.outerHTML);
    w.document.write('</body></html>');
    w.document.close();
    setTimeout(() => w.print(), 300);
  });

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    output.classList.add('hidden');
    output.innerHTML = '';
  });

  actions.appendChild(printBtn);
  actions.appendChild(closeBtn);
  card.appendChild(actions);

  return card;
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = serializeForm(form);

  // collect hobbies from checkboxes (FormData handles this, but ensure array)
  if (!Array.isArray(data.hobbies) && data.hobbies) data.hobbies = [data.hobbies];

  // password validation
  if (!validatePasswords(data.password, data.confirmPassword)) {
    alert('Passwords do not match. Please check and try again.');
    return;
  }

  // Remove sensitive fields from display
  delete data.password;
  delete data.confirmPassword;

  // Display formatted result
  output.innerHTML = '';
  const card = createResultCard(data);
  output.appendChild(card);
  output.classList.remove('hidden');

  // Optionally reset the form but keep the output visible
  // form.reset();
});

// small enhancement: show a tiny toast on reset
form.addEventListener('reset', () => {
  setTimeout(() => {
    output.classList.add('hidden');
    output.innerHTML = '';
  }, 50);
});