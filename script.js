/*
  DISTRICT 3 WEBSITE — EDITABLE SETTINGS
  To enable direct inquiries, provide ONE of:
  1. contactEmail: 'verified-address@example.org' (opens the visitor's email application), or
  2. formEndpoint: 'https://formspree.io/f/...' (sends form data via hosted service).
  Do not publish an address until District 3 authorizes it.
*/
const SITE_CONFIG = {
  contactEmail: '',
  formEndpoint: ''
};

/* Church listings. Add ONLY verified District 3 churches in this format:
  { name: 'Church Name', pastor: 'Pastor Full Name', city: 'Houston',
    address: 'Full address, TX', website: 'https://example.org' },
  Address and website may be blank strings. No placeholder churches are published.
*/
const CHURCHES = [];

/* Replace these biography texts with approved leadership biographies when ready. */
const LEADERS = {
  braziel: {
    name: 'District Elder Louise Braziel',
    role: 'Director, District 3',
    paragraphs: [
      'District Elder Louise Braziel serves as Director of District 3 within the Texas State Council of the Pentecostal Churches of the Apostolic Faith International, Inc.',
      'An expanded official biography, including ministry history and leadership experience, may be added here when provided by the District 3 office.'
    ]
  },
  gates: {
    name: 'Bishop Lambert W. Gates, Sr.',
    role: 'Diocesan & Presiding Bishop',
    paragraphs: [
      'Bishop Lambert W. Gates, Sr. serves as Presiding Bishop of the Pentecostal Churches of the Apostolic Faith International, Inc. and Senior Pastor of Kingdom Apostolic Ministries.',
      'He provides episcopal leadership for the Texas State Council. For his national profile and current leadership resources, visit pcafintl.org.'
    ]
  }
};

const qs = selector => document.querySelector(selector);
const qsa = selector => Array.from(document.querySelectorAll(selector));
const escapeHTML = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer;
function toast(message) {
  const el = qs('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
}
function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('dialog-open');
}
function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
  if (!qsa('dialog[open]').length) document.body.classList.remove('dialog-open');
}

// Scroll effects and responsive navigation.
const navToggle = qs('#navToggle');
const navMenu = qs('#navMenu');
function setMenu(open) {
  navMenu.classList.toggle('open', open);
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
navToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
qsa('.main-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => {
  if (navMenu.classList.contains('open') && !event.target.closest('.nav-wrap')) setMenu(false);
});
const backToTop = qs('#backToTop');
function updateScroll() {
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  qs('#scrollProgress').style.width = `${Math.min(100, scrollY / max * 100)}%`;
  qs('#siteHeader').classList.toggle('scrolled', scrollY > 30);
  backToTop.classList.toggle('visible', scrollY > 550);
}
window.addEventListener('scroll', updateScroll, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
backToTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
qs('#currentYear').textContent = String(new Date().getFullYear());
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
    });
  }, {threshold: .08, rootMargin: '0px 0px -25px 0px'});
  qsa('.reveal').forEach(el => revealObserver.observe(el));
  const navLinks = qsa('.main-nav a[href^="#"]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, {rootMargin: '-22% 0px -65% 0px'});
  qsa('main section[id]').forEach(section => sectionObserver.observe(section));
} else qsa('.reveal').forEach(el => el.classList.add('visible'));

// Leadership portraits: only display if the file really exists.
qsa('img[data-fallback]').forEach(img => {
  img.addEventListener('load', () => {
    if (img.naturalWidth > 0) {img.classList.add('loaded'); qs(`#${img.dataset.fallback}`).style.display = 'none';}
  });
  img.addEventListener('error', () => img.style.display = 'none');
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
    qs(`#${img.dataset.fallback}`).style.display = 'none';
  }
});

// Mission infographic lightbox, leadership biography modals.
qs('#openPoster').addEventListener('click', () => openDialog(qs('#posterDialog')));
qsa('[data-bio]').forEach(button => button.addEventListener('click', () => {
  const person = LEADERS[button.dataset.bio];
  if (!person) return;
  qs('#bioTitle').textContent = person.name;
  qs('#bioRole').textContent = person.role;
  qs('#bioText').innerHTML = person.paragraphs.map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join('');
  openDialog(qs('#bioDialog'));
}));
qsa('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(qs(`#${button.dataset.close}`))));
qsa('dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {if (event.target === dialog) closeDialog(dialog);});
  dialog.addEventListener('close', () => { if (!qsa('dialog[open]').length) document.body.classList.remove('dialog-open'); });
});

// Searchable church directory (will populate as verified churches are added to CHURCHES).
const churchSearch = qs('#churchSearch');
const cityFilter = qs('#cityFilter');
const directoryResults = qs('#directoryResults');
function renderDirectory() {
  const query = churchSearch.value.trim().toLowerCase();
  const city = cityFilter.value;
  const entries = CHURCHES.filter(church => {
    const matchingText = [church.name, church.pastor, church.city, church.address].join(' ').toLowerCase().includes(query);
    return matchingText && (city === 'all' || church.city === city);
  }).sort((a,b) => a.name.localeCompare(b.name));
  if (!CHURCHES.length) {
    directoryResults.innerHTML = `<div class="directory-empty"><div class="empty-symbol" aria-hidden="true"><span>✝</span></div><div><h3>Our church directory is taking shape.</h3><p>Verified congregations and their pastoral leadership will be featured here as listings are approved by District 3. Are you a pastor interested in connecting with the fellowship? We would love to hear from you.</p><a href="#connect">Introduce your ministry →</a></div></div>`;
    return;
  }
  if (!entries.length) {
    directoryResults.innerHTML = '<div class="directory-empty"><div class="empty-symbol" aria-hidden="true"><span>⌕</span></div><div><h3>No matching churches found.</h3><p>Try a different church name, pastor, or Texas city.</p></div></div>';
    return;
  }
  directoryResults.innerHTML = `<p class="directory-count">Showing ${entries.length} of ${CHURCHES.length} ${CHURCHES.length === 1 ? 'church' : 'churches'}</p><div class="directory-grid">${entries.map(church => {
    const safeURL = /^https?:\/\//i.test(church.website || '') ? escapeHTML(church.website) : '';
    return `<article class="church-card"><div class="church-emblem" aria-hidden="true">✝</div><h3>${escapeHTML(church.name)}</h3><p class="church-pastor">${escapeHTML(church.pastor || 'Pastoral leadership to be announced')}</p><p class="church-place">${escapeHTML(church.address || church.city)}</p>${safeURL ? `<a href="${safeURL}" target="_blank" rel="noopener noreferrer">Visit Church Website ↗</a>` : ''}</article>`;
  }).join('')}</div>`;
}
const cities = [...new Set(CHURCHES.map(church => church.city).filter(Boolean))].sort();
cities.forEach(city => { const option = document.createElement('option'); option.value = city; option.textContent = city; cityFilter.append(option); });
churchSearch.addEventListener('input', renderDirectory);
cityFilter.addEventListener('change', renderDirectory);
renderDirectory();

// Pastoral inquiry: no claim of transmission without a configured delivery method.
const form = qs('#inquiryForm');
let inquiryBody = '';
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fd = new FormData(form);
  const get = key => String(fd.get(key) || '').trim();
  const subject = `District 3 Pastoral Inquiry — ${get('fullName')}`;
  inquiryBody = [
    'To: District Elder Louise Braziel, Director — District 3',
    'Texas State Council · Pentecostal Churches of the Apostolic Faith International, Inc.',
    '',
    'Praise the Lord,',
    '',
    'I would like to express my interest in learning more about fellowship with District 3.',
    '',
    `Name: ${get('fullName')}`,
    `Email: ${get('email')}`,
    `Church / Ministry: ${get('church') || 'Not provided'}`,
    `City / Location: ${get('city')}`,
    `Phone: ${get('phone') || 'Not provided'}`,
    `Ministry Situation: ${get('ministryStage')}`,
    '',
    'Additional Message:',
    get('message') || 'I would welcome an opportunity to learn more about your fellowship.',
    '',
    'I understand this inquiry is not automatic church affiliation or credential approval.',
    '',
    'Thank you for your consideration.'
  ].join('\n');
  if (SITE_CONFIG.formEndpoint.trim()) {
    const button = form.querySelector('[type=submit]');
    button.disabled = true; button.textContent = 'Sending Inquiry…';
    try {
      const response = await fetch(SITE_CONFIG.formEndpoint, {method: 'POST', body: fd, headers: {'Accept': 'application/json'}});
      if (response.ok) {
        toast('Your inquiry was submitted successfully.');
        form.reset();
        button.innerHTML = 'Prepare My Inquiry <span aria-hidden="true">↗</span>';
        button.disabled = false;
        return;
      }
      toast('Direct delivery failed. Your inquiry is available to copy.');
    } catch {toast('Unable to send online. Your inquiry is available to copy.');}
    finally {button.innerHTML = 'Prepare My Inquiry <span aria-hidden="true">↗</span>'; button.disabled = false;}
  }
  qs('#inquiryText').value = `Subject: ${subject}\n\n${inquiryBody}`;
  const hasEmail = !!SITE_CONFIG.contactEmail.trim();
  qs('#emailInquiry').hidden = !hasEmail;
  if (hasEmail) {
    qs('#emailInquiry').href = `mailto:${encodeURIComponent(SITE_CONFIG.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryBody)}`;
    qs('#inquiryInstructions').textContent = 'Your inquiry has been prepared but has not been sent. Select “Email District 3” to open your email application, or copy/download a copy.';
  } else {
    qs('#inquiryInstructions').textContent = 'Your inquiry has been prepared but has not been sent. Copy or download it to share with district leadership once contact information is available.';
  }
  openDialog(qs('#inquiryDialog'));
});
qs('#copyInquiry').addEventListener('click', async () => {
  const text = qs('#inquiryText').value;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else {qs('#inquiryText').select();document.execCommand('copy');}
    toast('Your inquiry was copied.');
  } catch {qs('#inquiryText').select();toast('Select the text and copy it using your device.');}
});
qs('#downloadInquiry').addEventListener('click', () => {
  const text = qs('#inquiryText').value;
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = 'district-3-pastoral-inquiry.txt';
  document.body.append(anchor);anchor.click();anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('Inquiry downloaded.');
});
