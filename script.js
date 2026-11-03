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
  title:'Upcoming District 3 Fellowship',
  category:'District fellowship',
  date:'2026-11-07',
  venue:'Location to be announced',
  description:'A day of fellowship, equipping, worship, and connection with the District Three family.',
  schedule:[
    {time:'9:00 AM',name:'Breakfast'},
    {time:'10:00 AM',name:'Breakout Sessions'},
    {time:'12:00 Noon',name:'Worship Service'},
    {time:'Following Service',name:'Dinner Fellowship'}
  ]
}];

/* Verified affiliated church listings only. Example:
 {name:'Church Name',pastor:'Pastor Name',city:'Houston',address:'Street address, Houston, TX',website:'https://example.com'}
*/
const CHURCHES = [];

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
  { kicker:'ONE FAITH. ONE FELLOWSHIP.', title:'Stronger <em>together.</em><br>Further in <em>faith.</em>', description:'A welcoming fellowship for Apostolic pastors and churches, committed to biblical truth, spiritual excellence, and Kingdom advancement.', button:'Explore Pastoral Fellowship', href:'#connect' },
  { kicker:'A PLACE FOR PASTORS TO CONNECT', title:'Your calling.<br><em>Our community.</em>', description:'Find meaningful connection, shared encouragement, and the strength that comes through fellowship with other laborers in the Gospel.', button:'Meet Our Leadership', href:'#leadership' },
  { kicker:'ROOTED IN THE APOSTOLIC FAITH', title:'United in spirit.<br><em>Built for purpose.</em>', description:'Strengthening local churches, supporting dedicated ministers, and advancing the Kingdom of God across Texas.', button:'Discover Our Mission', href:'#mission' }
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
  $('#eventDisclosure').textContent='The fellowship location has not yet been supplied. Contact district leadership for additional details.';
  list.innerHTML=items.map(ev=>{
    const stamp=ev.date?new Date(ev.date+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}):'Date to be announced';
    const schedule=Array.isArray(ev.schedule)?`<div class="event-schedule" aria-label="Event schedule">${ev.schedule.map(slot=>`<span><b>${escapeHTML(slot.time)}</b>${escapeHTML(slot.name)}</span>`).join('')}</div>`:'';
    const venue=ev.venue?escapeHTML(ev.venue):'Venue to be announced';
    const link=ev.link&&/^https?:\/\//.test(ev.link)?`<a class="event-card-link" href="${escapeHTML(ev.link)}" target="_blank" rel="noopener noreferrer">Event Details ↗</a>`:'';
    return `<article class="event-card visual-worship featured-event"><div class="event-card-content"><span class="event-date-corner">${escapeHTML(stamp)}</span><span class="event-type">${escapeHTML(ev.category||'District event')}</span><h3>${escapeHTML(ev.title)}</h3><p>${escapeHTML(ev.description||'')}</p>${schedule}<p class="event-venue">${venue}</p>${link}</div></article>`;
  }).join('');
}
renderEvents();

/* Directory updates with approved listings only. */
const churchSearch=$('#churchSearch');
function renderChurches(){const query=churchSearch.value.trim().toLowerCase();const visible=CHURCHES.filter(ch=>[ch.name,ch.pastor,ch.city,ch.address].join(' ').toLowerCase().includes(query));const target=$('#churchResults');if(!CHURCHES.length){target.innerHTML=`<div class="church-empty"><img class="church-empty-seal" src="assets/district-three-crest.webp" alt="District Three crest"><div><h3>The directory is taking shape.</h3><p>Verified district churches and pastors will be featured here after their listings are approved. Interested in fellowship? We welcome an introduction from your ministry.</p><a href="#connect" class="text-arrow">Introduce your church ↗</a></div></div>`;return}if(!visible.length){target.innerHTML='<div class="church-empty"><div><h3>No churches match your search.</h3><p>Try another church name, pastor, or city.</p></div></div>';return}target.innerHTML=`<div class="church-grid">${visible.map(ch=>`<article class="church-card"><h3>${escapeHTML(ch.name)}</h3><p>${escapeHTML(ch.pastor||'Pastoral leadership to be confirmed')}</p><p>${escapeHTML(ch.address||ch.city||'')}</p>${ch.website&&/^https?:\/\//.test(ch.website)?`<a href="${escapeHTML(ch.website)}" target="_blank" rel="noopener noreferrer">Visit Church ↗</a>`:''}</article>`).join('')}</div>`}
churchSearch.addEventListener('input',renderChurches);renderChurches();

/* Leadership profiles and mission graphic */
$$('[data-leader]').forEach(button=>button.addEventListener('click',()=>{const person=LEADERS[button.dataset.leader];if(!person)return;$('#leaderDialogImage').src=person.image;$('#leaderDialogImage').alt='Portrait of '+person.name;$('#leaderDialogRole').textContent=person.role;$('#leaderDialogTitle').textContent=person.name;$('#leaderDialogText').innerHTML=person.bio.map(p=>`<p>${escapeHTML(p)}</p>`).join('');openDialog($('#leaderDialog'))}));
$('#openMission').addEventListener('click',()=>openDialog($('#missionDialog')));
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog(document.getElementById(button.dataset.close))));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog(dialog)}));

/* A useful form even before a district inbox is authorized. */
const form=$('#inquiryForm');
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const v=k=>String(data.get(k)||'').trim();const subject=`District Three Pastoral Inquiry — ${v('fullName')}`;const body=[
  'District Three · Texas State Council · PCAFI','Attention: District Elder Louise Braziel, Director','','Praise the Lord,','','I would like to learn more about fellowship with District Three.','',`Name: ${v('fullName')}`,`Email: ${v('email')}`,`Church / Ministry: ${v('church')||'Not provided'}`,`City / Location: ${v('city')}`,`Inquiry: ${v('interest')}`,'','About My Ministry:',v('message')||'I would welcome a conversation about fellowship and partnership.','','I understand this inquiry is not an application approval or automatic affiliation.'].join('\n');
  if(SITE_CONFIG.formEndpoint){const button=$('.form-submit',form);button.disabled=true;button.textContent='Sending…';try{const response=await fetch(SITE_CONFIG.formEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'}});if(response.ok){toast('Your inquiry was submitted successfully.');form.reset();return}toast('Unable to send. Your inquiry will be prepared to copy.')}catch{toast('Online delivery unavailable. Your inquiry will be prepared to copy.')}finally{button.disabled=false;button.innerHTML='Prepare My Inquiry <span aria-hidden="true">↗</span>'}}
  $('#preparedInquiry').value='Subject: '+subject+'\n\n'+body;const hasEmail=Boolean(SITE_CONFIG.contactEmail);$('#emailInquiry').hidden=!hasEmail;if(hasEmail){$('#emailInquiry').href='mailto:'+encodeURIComponent(SITE_CONFIG.contactEmail)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);$('#inquiryDialogInstructions').textContent='Your message has not yet been sent. Select “Email District” to open your email application, or copy/download it.'}else{$('#inquiryDialogInstructions').textContent='Your message has been prepared but not sent. Copy or download it to share with approved district leadership.'}openDialog($('#inquiryDialog'))});
$('#copyInquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#preparedInquiry').value);toast('Inquiry copied to clipboard.')}catch{$('#preparedInquiry').focus();$('#preparedInquiry').select();try{document.execCommand('copy');toast('Inquiry selected and copied.')}catch{toast('Select and copy the message using your device.')}}});
$('#downloadInquiry').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([$('#preparedInquiry').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='district-three-pastoral-inquiry.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Inquiry downloaded.')});
