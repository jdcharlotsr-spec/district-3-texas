document.documentElement.classList.add('js-enabled');
/*
 DISTRICT THREE | EDITABLE WEBSITE SETTINGS
 Configure authorized contact information only after District Three approval.
 For automatic inquiries, set formEndpoint to a verified Formspree endpoint.
 For email-assisted sending, set contactEmail to a verified district address.
*/
const SITE_CONFIG = {
  contactEmail: '',
  formEndpoint: ''
};

/*
 UPCOMING EVENTS: add approved events below, and the site automatically creates
 actual event cards instead of the "dates to be announced" previews.
 Format:
 { title:'Spring District Fellowship', category:'Fellowship',
   date:'2027-03-12', time:'7:00 PM', venue:'Confirmed venue, Houston, TX',
   description:'Short event overview', link:'https://example.org/registration',
   image:'assets/your-event-photo.webp' }
 Dates must be approved before publishing. Keep [] until then.
 */
const UPCOMING_EVENTS = [{
  title:'District 3 Fellowship',
  category:'Worship · Fellowship · Leadership',
  date:'2026-11-07',
  venue:'Greater New Genisis Christian Center',
  address:'110 Hanna St., San Antonio, TX 78210',
  host:'District Elder Louise Braziel',
  hostRole:'Host Pastor & Director',
  speaker:'Elder LaDarius McGee',
  image:'assets/elder-mcgee.webp',
  speakerChurch:'Praise City Church · Longview, TX',
  description:'Come worship, grow, and enjoy warm District fellowship in an Apostolic Pentecostal setting.',
  schedule:[
    {time:'9:00 AM',name:'Breakfast'},
    {time:'10:00 AM',name:'Breakout Sessions'},
    {time:'12:00 Noon',name:'Worship Service'},
    {time:'After Service',name:'Dinner Fellowship'}
  ]
}];

/* District Three church directory, based on the roster supplied for this website.
   A street address or website is not shown unless the district has provided one.
   Additional churches may be added using the same {name, city, pastor} format. */
const CHURCHES = [
  {name:'Rhema Word Apostolic Church', city:'Hempstead, TX', pastor:'Bishop Stephen L. Hamilton, ThD'},
  {name:'Amazing Grace Bible Church', city:'Houston, TX', pastor:'Bishop Emma Okereke'},
  {name:'Pentecostal Powerhouse', city:'San Antonio, TX', pastor:'Pastor Mark Ming'},
  {name:'Praise City Church', city:'Longview, TX', pastor:'Elder LaDarius McGee'},
  {name:'Elim Tabernacle Apostolic Church', city:'Houston, TX', pastor:'Bishop J. D. Charlot, Sr.', pastorRole:'Pastor'}
];

const LEADERS = {
  braziel: {
    name:'District Elder Louise Braziel', role:'Director, District Three', image:'assets/louise-braziel.webp',
    bio:[
      'District Elder Louise Braziel serves as Director of District Three within the Texas State Council of the Pentecostal Churches of the Apostolic Faith International, Inc.',
      'An expanded official biography, including her ministry background and leadership experience, may be added when approved by the district office.'
    ]
  },
  gates: {
    name:'Bishop Lambert W. Gates, Sr.',role:'Diocesan & Presiding Bishop',image:'assets/lambert-gates.webp',
    bio:[
      'Bishop Lambert W. Gates, Sr. serves as Presiding Bishop of the Pentecostal Churches of the Apostolic Faith International, Inc. and provides episcopal leadership for the Texas State Council.',
      'Additional approved biographical information and national leadership resources may be added here. For official organizational resources, visit pcafintl.org.'
    ]
  }
};

const HERO_SLIDES = [
  { kicker:'WELCOME TO DISTRICT THREE', title:'Rooted in <em>Apostolic faith.</em><br>Warm in <em>fellowship.</em>', description:'District Three is Apostolic Pentecostal in faith, with a welcoming spirit for those who desire worship, fellowship, and connection.', button:'Connect With Us', href:'#connect' },
  { kicker:'YOU ARE WELCOME HERE', title:'Come worship.<br><em>Come connect.</em>', description:'Pastors, church families, ministry leaders, and guests are welcome to share in worship, fellowship, and encouragement with District Three.', button:'Meet Our Leadership', href:'#leadership' },
  { kicker:'HONORING OUR ROOTS. SHARING OUR WELCOME.', title:'Firm in doctrine.<br><em>Gracious in spirit.</em>', description:'District Three proudly belongs to PCAFI. We remain true to the Apostolic Pentecostal faith while offering a sincere and gracious welcome.', button:'Discover Our Mission', href:'#mission' }
];

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
const escapeHTML = (s)=>String(s??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let toastTimeout;
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('show'),3200)}
function openDialog(d){if(!d)return;if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');}
function closeDialog(d){if(!d)return;if(typeof d.close==='function')d.close();else d.removeAttribute('open');}

/* A compact sticky scrolling header, reading progress, and active section */
const header=$('#siteHeader'),progress=$('#scrollProgress'),topButton=$('#backToTop'),menuToggle=$('#menuToggle'),menu=$('#mainNav');
function setMenu(open){menu.classList.toggle('open',open);menuToggle.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')}
menuToggle.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('click',event=>{if(menu.classList.contains('open')&&!event.target.closest('.nav-inner'))setMenu(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
$('#currentYear').textContent=new Date().getFullYear();
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion.matches?'auto':'smooth'}));

/* Parallax transform (avoids mobile background-attachment:fixed issues) */
const parallaxElements=$$('[data-parallax]');let scrollFrame=false;
function applyScroll(){const y=window.scrollY||0;const height=Math.max(document.documentElement.scrollHeight-innerHeight,1);progress.style.width=`${Math.min(100,y/height*100)}%`;header.classList.toggle('scrolled',y>45);topButton.classList.toggle('visible',y>600);
  if(!reducedMotion.matches&&window.innerWidth>700){
    parallaxElements.forEach(el=>{const container=el.parentElement;const r=container.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const speed=Number(el.dataset.parallax)||.1;const relative=(r.top+r.height/2-innerHeight/2);el.style.transform=`translate3d(0,${(-relative*speed).toFixed(1)}px,0)`})
  }else{parallaxElements.forEach(el=>el.style.transform='none')}
  scrollFrame=false;
}
function requestScroll(){if(!scrollFrame){scrollFrame=true;requestAnimationFrame(applyScroll)}}
addEventListener('scroll',requestScroll,{passive:true});addEventListener('resize',requestScroll,{passive:true});applyScroll();

if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});
  $$('.reveal').forEach(el=>observer.observe(el));
  const links=$$('.main-nav a[href^="#"]');
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('is-current',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-22% 0px -65% 0px'});
  $$('main section[id]').forEach(s=>activeObserver.observe(s));
}else{$$('.reveal').forEach(el=>el.classList.add('is-visible'))}

/* Scroll-friendly, accessible rotating header content */
let slideIndex=0,slidePaused=false,slideInterval;
const slideCopy=$('#heroSlideCopy');
function showSlide(index){slideIndex=(index+HERO_SLIDES.length)%HERO_SLIDES.length;const s=HERO_SLIDES[slideIndex];slideCopy.classList.add('changing');setTimeout(()=>{$('#slideKicker').textContent=s.kicker;$('#slideTitle').innerHTML=s.title;$('#slideDescription').textContent=s.description;$('#slideButton').firstChild.textContent=s.button+' ';$('#slideButton').href=s.href;$('#slideCounter').textContent=`${String(slideIndex+1).padStart(2,'0')} / ${String(HERO_SLIDES.length).padStart(2,'0')}`;$$('.hero-dot').forEach((dot,i)=>{dot.classList.toggle('is-active',i===slideIndex);dot.setAttribute('aria-pressed',String(i===slideIndex))});slideCopy.classList.remove('changing')},150)}
function startSlides(){clearInterval(slideInterval);if(!slidePaused&&!reducedMotion.matches)slideInterval=setInterval(()=>showSlide(slideIndex+1),7500)}
$('#heroPrev').addEventListener('click',()=>{showSlide(slideIndex-1);startSlides()});$('#heroNext').addEventListener('click',()=>{showSlide(slideIndex+1);startSlides()});$$('.hero-dot').forEach(dot=>dot.addEventListener('click',()=>{showSlide(Number(dot.dataset.slide));startSlides()}));
$('#slidePause').addEventListener('click',()=>{slidePaused=!slidePaused;$('#slidePause').textContent=slidePaused?'▶':'Ⅱ';$('#slidePause').setAttribute('aria-label',slidePaused?'Resume rotating messages':'Pause rotating messages');startSlides()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(slideInterval);else startSlides()});startSlides();

/* Upcoming events: empty state is deliberately clear to avoid fabricated dates. */
function renderEvents(){
  const today = new Date(); today.setHours(0,0,0,0);
  const items=UPCOMING_EVENTS.filter(ev=>!ev.date||new Date(ev.date+'T23:59:59')>=today).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const list=$('#eventsContainer');
  list.classList.toggle('single-event',items.length===1);
  if(!items.length){
    $('#eventDisclosure').textContent='Check back for forthcoming District Three gatherings and announcements.';
    list.innerHTML=`<article class="event-card visual-worship"><div class="event-card-content"><span class="event-date-corner">DATES TO BE ANNOUNCED</span><span class="event-type">District fellowship</span><h3>Stay connected with District Three</h3><p>Future district gatherings will be announced here.</p></div></article>`;
    return;
  }
  $('#eventDisclosure').textContent='District 3 Fellowship · Saturday, November 7, 2026 · Greater New Genisis Christian Center, San Antonio, TX.';
  list.innerHTML=items.map(ev=>{
    const stamp=ev.date?new Date(ev.date+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}):'Date to be announced';
    const schedule=Array.isArray(ev.schedule)?`<div class="event-schedule" aria-label="Event schedule">${ev.schedule.map(slot=>`<span><b>${escapeHTML(slot.time)}</b>${escapeHTML(slot.name)}</span>`).join('')}</div>`:'';
    const venue=ev.venue?escapeHTML(ev.venue):'Venue to be announced';
    const location=ev.address?`<span class="event-address">${escapeHTML(ev.address)}</span>`:'';
    const host=ev.host?`<div class="event-person"><span class="event-person-label">HOST PASTOR & DIRECTOR</span><strong>${escapeHTML(ev.host)}</strong>${ev.hostRole&&ev.hostRole!=='Host Pastor & Director'?`<small>${escapeHTML(ev.hostRole)}</small>`:''}</div>`:'';
    const speaker=ev.speaker?`<div class="event-person"><span class="event-person-label">GUEST SPEAKER</span><strong>${escapeHTML(ev.speaker)}</strong>${ev.speakerChurch?`<small>${escapeHTML(ev.speakerChurch)}</small>`:''}</div>`:'';
    const link=ev.link&&/^https?:\/\//.test(ev.link)?`<a class="event-card-link" href="${escapeHTML(ev.link)}" target="_blank" rel="noopener noreferrer">Event Details ↗</a>`:'';
    const photo=ev.image || 'assets/worship-moment.webp';
    const caption=ev.speaker?`<figcaption class="event-speaker-caption"><span>GUEST SPEAKER</span><strong>${escapeHTML(ev.speaker)}</strong><small>${escapeHTML(ev.speakerChurch||'')}</small></figcaption>`:'';
    return `<article class="event-card visual-worship featured-event"><div class="event-card-content"><span class="event-date-corner">${escapeHTML(stamp)}</span><span class="event-type">${escapeHTML(ev.category||'District event')}</span><h3>${escapeHTML(ev.title)}</h3><p class="event-intro">${escapeHTML(ev.description||'')}</p><div class="event-details-layout"><div class="event-schedule-holder"><p class="event-group-heading">ORDER OF THE DAY</p>${schedule}</div><div class="event-location-block"><p class="event-group-heading">LOCATION & LEADERSHIP</p><strong class="event-venue">${venue}</strong>${location}<div class="event-people">${host}${speaker}</div></div></div>${link}</div><figure class="event-image-panel"><img src="${photo}" alt="Portrait supplied for guest speaker ${escapeHTML(ev.speaker||'')}" loading="lazy">${caption}</figure></article>`;
  }).join('');
}
renderEvents();

/* Directory updates with approved listings only. */
const churchSearch=$('#churchSearch');
function renderChurches(){const query=churchSearch.value.trim().toLowerCase();const visible=CHURCHES.filter(ch=>[ch.name,ch.pastor,ch.city,ch.address].join(' ').toLowerCase().includes(query));const target=$('#churchResults');if(!CHURCHES.length){target.innerHTML=`<div class="church-empty"><img class="church-empty-seal" src="assets/district-three-crest.webp" alt="District Three crest"><div><h3>The directory is taking shape.</h3><p>Verified district churches and pastors will be featured here after their listings are approved. Interested in connecting? We welcome your interest and would be glad to help you learn more about District Three.</p><a href="#connect" class="text-arrow">Connect with our district ↗</a></div></div>`;return}if(!visible.length){target.innerHTML='<div class="church-empty"><div><h3>No churches match your search.</h3><p>Try another church name, pastor, or city.</p></div></div>';return}target.innerHTML=`<div class="church-results-meta"><span>${visible.length} ${visible.length===1?'Church':'Churches'} ${query?'found':'in District Three directory'}</span><span>TEXAS STATE COUNCIL · DISTRICT THREE</span></div><div class="church-grid">${visible.map(ch=>`<article class="church-card"><div class="church-card-heading"><span class="church-city">${escapeHTML(ch.city||'Texas')}</span><span class="church-decor" aria-hidden="true">✦</span></div><h3>${escapeHTML(ch.name)}</h3><div class="church-card-footer"><span class="church-pastor-label">PASTORAL LEADERSHIP</span><p>${escapeHTML(ch.pastor||'Pastoral leadership to be confirmed')}${ch.pastorRole?` <span class="church-role">· ${escapeHTML(ch.pastorRole)}</span>`:''}</p></div>${ch.website&&/^https?:\/\//.test(ch.website)?`<a href="${escapeHTML(ch.website)}" target="_blank" rel="noopener noreferrer">Visit Church ↗</a>`:''}</article>`).join('')}</div>`}
churchSearch.addEventListener('input',renderChurches);renderChurches();

/* Leadership profiles and mission graphic */
$$('[data-leader]').forEach(button=>button.addEventListener('click',()=>{const person=LEADERS[button.dataset.leader];if(!person)return;$('#leaderDialogImage').src=person.image;$('#leaderDialogImage').alt='Portrait of '+person.name;$('#leaderDialogRole').textContent=person.role;$('#leaderDialogTitle').textContent=person.name;$('#leaderDialogText').innerHTML=person.bio.map(p=>`<p>${escapeHTML(p)}</p>`).join('');openDialog($('#leaderDialog'))}));
$('#openMission').addEventListener('click',()=>openDialog($('#missionDialog')));
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog(document.getElementById(button.dataset.close))));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog(dialog)}));

/* A useful form even before a district inbox is authorized. */
const form=$('#inquiryForm');
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const v=k=>String(data.get(k)||'').trim();const subject=`District Three Connection — ${v('fullName')}`;const body=[
  'District Three · Texas State Council · PCAFI','Attention: District Elder Louise Braziel, Director','','Praise the Lord,','','I would like to connect with District Three.','',`Name: ${v('fullName')}`,`Email: ${v('email')}`,`Church / Ministry: ${v('church')||'Not provided'}`,`City / Location: ${v('city')}`,`Inquiry: ${v('interest')}`,'','My Message:',v('message')||'I would welcome a conversation about worship, fellowship, and District Three.','','I understand this inquiry is not an application approval or automatic affiliation.'].join('\n');
  if(SITE_CONFIG.formEndpoint){const button=$('.form-submit',form);button.disabled=true;button.textContent='Sending…';try{const response=await fetch(SITE_CONFIG.formEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'}});if(response.ok){toast('Your inquiry was submitted successfully.');form.reset();return}toast('Unable to send. Your inquiry will be prepared to copy.')}catch{toast('Online delivery unavailable. Your inquiry will be prepared to copy.')}finally{button.disabled=false;button.innerHTML='Prepare My Message <span aria-hidden="true">↗</span>'}}
  $('#preparedInquiry').value='Subject: '+subject+'\n\n'+body;const hasEmail=Boolean(SITE_CONFIG.contactEmail);$('#emailInquiry').hidden=!hasEmail;if(hasEmail){$('#emailInquiry').href='mailto:'+encodeURIComponent(SITE_CONFIG.contactEmail)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);$('#inquiryDialogInstructions').textContent='Your message has not yet been sent. Select “Email District” to open your email application, or copy/download it.'}else{$('#inquiryDialogInstructions').textContent='Your message has been prepared but not sent. Copy or download it to share with approved district leadership.'}openDialog($('#inquiryDialog'))});
$('#copyInquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#preparedInquiry').value);toast('Inquiry copied to clipboard.')}catch{$('#preparedInquiry').focus();$('#preparedInquiry').select();try{document.execCommand('copy');toast('Inquiry selected and copied.')}catch{toast('Select and copy the message using your device.')}}});
$('#downloadInquiry').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([$('#preparedInquiry').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='district-three-connection.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Inquiry downloaded.')});
