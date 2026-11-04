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
  venue:'Greater New Genesis Christian Center',
  address:'110 Hanna St., San Antonio, TX 78210',
  host:'District Elder Louise Braziel Benson',
  hostRole:'Host Pastor & Director',
  speaker:'Elder LaDarius McGee',
  image:'assets/elder-mcgee.webp',
  speakerChurch:'Praise City Church · Longview, TX',
  description:'Join us for a day of worship, encouragement, and fellowship as we grow deeper in God and wider for the Kingdom.',
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
  {name:'Elim Tabernacle Apostolic Church', city:'Houston, TX', pastor:'Bishop J. D. Charlot, Sr.', pastorRole:'Pastor', firstLady:'Elder Latosha Charlot', serviceLocation:'Houston service location: To Be Announced', serviceTimes:'Sunday Worship · 4:00 PM | Tuesday Virtual Gathering · 7:30 PM', website:'https://www.elimtab.org'},
  {name:'Greater New Genesis Christian Center', city:'San Antonio, TX', pastor:'District Elder Louise Braziel Benson', pastorRole:'Pastor', assistants:'Elders Ronald & Precious Taylor', address:'110 Hanna Street, San Antonio, TX 78210', phoneDisplay:'(210) 338-5338', phone:'2103385338', email:'newgenesiscc@aol.com'},
  {name:'Kingdom Life Family Worship Center', city:'Fort Worth, TX', pastor:'Bishop Vernal E. Simms, Sr.', address:'5508 Brentwood Stair Road, Fort Worth, TX 76112', phoneDisplay:'(214) 256-8179', phone:'2142568179'}
];

const LEADERS = {
  braziel: {
    name:'District Elder Louise Braziel Benson', role:'District Director · Texas State Council, PCAFI', image:'assets/louise-braziel.webp',
    subtitle:'Apostle / Pastor Louise Braziel Benson',
    quote:'God does not call the qualified; He qualifies the called.',
    bio:[
      'Apostle/Pastor Louise Braziel Benson is a devoted servant of God, visionary leader, educator, mentor, and an anointed preacher of the Gospel of Jesus Christ. With more than 30 years of faithful ministry, she has dedicated her life to winning souls, equipping believers, developing leaders, and advancing the Kingdom of God. Her ministry is marked by a passion for spiritual transformation, Christian education, and empowering individuals to fulfill their God-given purpose.',
      "A native of the ministry field and a seasoned educator, Apostle Benson possesses an extensive academic background, including an Associate Degree in Criminal Justice, a Bachelor of Arts in Social Services, a Master of Arts in Special Education, a second Master's Degree in Education Administration, and a Doctoral Degree in Psychology and Behavioral Science.",
      'Her professional career spans more than three decades in education, during which she has served as an administrator, district coordinator in special education, and adjunct professor with the Alamo Community College District. She currently serves as a Special Education Advocate in Texas and Superintendent of Safe Haven Christian Academy, a Christian homeschool academy committed to academic excellence and Christian values. Additionally, she honorably served eight years in the United States Air Force Reserve.',
      "Following several years of evangelistic ministry, Apostle Benson answered the call to pastoral leadership and, in May 2003, founded Greater New Genesis Christian Center in San Antonio, Texas. Established upon the foundation of God's Word and the mandate of Luke 4:18, the ministry continues its mission of proclaiming the Gospel, restoring lives, developing disciples, and fostering an atmosphere of powerful praise and worship.",
      "Throughout her distinguished ministry, Apostle Benson has served in several leadership capacities within the Pentecostal Assemblies of the World (PAW), including Chairwoman of the Bay District Council and President of the Women's Ministry, a position she held for eight years.",
      'She presently serves within the Pentecostal Churches of the Apostolic Faith International, Inc. (PCAFI) as District Elder and District Director of District Three, as well as Auxiliary Director of Missions and Evangelism for the Texas State Council.',
      'Additionally, she is the visionary founder and overseer of Divine Destiny Ministries, a fellowship of churches extending from Florida to California. Through this fellowship, she provides spiritual oversight, pastoral mentorship, leadership development, and encouragement to ministries across the nation.',
      "Her commitment to cultivating the gifts and talents of others has inspired the establishment of several ministries, including Men of Valor Mime Ministry (MOV), A Perfect Praise Dance Ministry (APP), Women of Worth (WOW), and God's Men Ministry (G-Men). Each reflects her conviction that every believer has a meaningful assignment in the Kingdom of God.",
      'Beyond her ecclesiastical and professional responsibilities, Apostle Benson is a devoted mother and family woman. She is the widow of the late Deacon Lonnie Benson and the proud mother of five children, four sons and one daughter. She lovingly honors the memory of her beloved son who has transitioned from labor to reward.',
      'Apostle/Pastor Louise Braziel Benson continues to travel throughout the United States, proclaiming the Gospel, strengthening churches, mentoring leaders, and encouraging believers to pursue a deeper relationship with Jesus Christ.',
      "Her life exemplifies steadfast faith, perseverance, servant leadership, and an unwavering commitment to fulfilling the Great Commission. Whether serving in the pulpit, classroom, community, or broader body of Christ, she remains committed to making a lasting difference in the lives of God's people."
    ],
    closing:'Her passion is winning souls. Her assignment is equipping people. Her mandate is advancing the Kingdom of God—one soul at a time.'
  },
  gates: {
    name:'Bishop Lambert W. Gates, Sr.',role:'Diocesan & Presiding Bishop',image:'assets/lambert-gates.webp',
    bio:[
      'Bishop Lambert W. Gates, Sr. serves as senior pastor of Kingdom Apostolic Ministries, a multicampus ministry with campuses in Atlanta, Detroit, and Indianapolis, and a Global Campus. He also serves as presiding bishop of the Pentecostal Churches of the Apostolic Faith International.',
      'An exceptional teacher and internationally sought-after speaker, Bishop Gates has devoted his life to sharing the gospel and advancing the Kingdom of God around the world.'
    ]
  }
};

const HERO_SLIDES = [
  { kicker:'DISTRICT THREE · TEXAS STATE COUNCIL', title:'Deeper in <em>God.</em><br>Wider for the <em>Kingdom.</em>', description:'A place to worship, grow in faith, and find encouragement. Come experience meaningful fellowship as we pursue a deeper walk with God and a wider impact for His Kingdom.', button:'Connect With Us', href:'#connect' },
  { kicker:'COME WORSHIP WITH US', title:'Growing in <em>grace.</em><br>Connected in <em>fellowship.</em>', description:'Come share in heartfelt worship, loving fellowship, and the joy of growing in faith together.', button:'Discover Our District', href:'#about' },
  { kicker:'FAITH · FELLOWSHIP · PURPOSE', title:'A welcoming <em>family.</em><br>A shared <em>purpose.</em>', description:'We welcome you to a fellowship that values worship, relationships, and serving our communities with purpose.', button:'Meet Our Leadership', href:'#leadership' }
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
  $('#eventDisclosure').textContent='District 3 Fellowship · Saturday, November 7, 2026 · Greater New Genesis Christian Center, San Antonio, TX.';
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

/*
 FLYERS: Add an approved flyer by uploading an image to assets/ and adding
 {kind:'image',src:'assets/your-flyer.webp',title:'Event name',alt:'Description'}
 below. The two starter posters use verified District 3 Fellowship details.
 No additional event dates or prices are assumed.
*/
const EVENT_FLYERS = [
  {kind:'speaker',title:'District 3 Fellowship',subtitle:'Saturday, November 7, 2026',image:'assets/elder-mcgee.webp'},
  {kind:'agenda',title:'District 3 Fellowship — Order of the Day',subtitle:'November 7, 2026'}
];

/* Replace or add approved photographs by editing the array below. */
const DISTRICT_PHOTOS = [
  {src:'assets/worship-close.webp',title:'Together in Fellowship',caption:'A gathering of leaders and friends.'},
  {src:'assets/worship-moment.webp',title:'Worship & the Word',caption:'A moment of preaching and encouragement.'},
  {src:'assets/mission-worship.webp',title:'Prayer & Praise',caption:'A moment of heartfelt worship.'}
];

function renderFlyers(){
  const track=$('#flyerTrack');
  track.innerHTML=EVENT_FLYERS.map((flyer,i)=>{
    if(flyer.kind==='image' && typeof flyer.src==='string' && flyer.src.startsWith('assets/')){
      return `<article class="flyer-slide flyer-image-card" aria-label="Flyer ${i+1}: ${escapeHTML(flyer.title||'District announcement')}"><img src="${escapeHTML(flyer.src)}" alt="${escapeHTML(flyer.alt||flyer.title||'District event flyer')}" loading="lazy"><span class="flyer-image-label">${escapeHTML(flyer.title||'District announcement')}</span></article>`;
    }
    if(flyer.kind==='speaker'){
      return `<article class="flyer-slide flyer-poster speaker-poster" aria-label="District 3 Fellowship speaker flyer"><div class="poster-top"><span>DISTRICT THREE</span><span>TEXAS STATE COUNCIL</span></div><p class="poster-eyebrow">YOU'RE INVITED</p><h4>District 3<br><em>Fellowship</em></h4><p class="poster-date">SATURDAY · NOVEMBER 7, 2026</p><div class="poster-photo"><img src="${escapeHTML(flyer.image)}" alt="Guest speaker Elder LaDarius McGee" loading="lazy"></div><div class="poster-bottom"><span>GUEST SPEAKER</span><strong>Elder LaDarius McGee</strong><small>Praise City Church · Longview, TX</small></div></article>`;
    }
    return `<article class="flyer-slide flyer-poster agenda-poster" aria-label="District 3 Fellowship schedule flyer"><div class="poster-top"><span>DISTRICT THREE</span><span>NOVEMBER 7, 2026</span></div><p class="poster-eyebrow">A DAY OF FELLOWSHIP</p><h4>Gather.<br><em>Grow.</em><br>Worship.</h4><div class="poster-agenda"><div><b>9:00 AM</b><span>Breakfast</span></div><div><b>10:00 AM</b><span>Breakout Sessions</span></div><div><b>12 NOON</b><span>Worship Service</span></div><div><b>AFTER WORSHIP</b><span>Dinner Fellowship</span></div></div><div class="poster-venue"><b>GREATER NEW GENESIS CHRISTIAN CENTER</b><span>110 Hanna Street · San Antonio, Texas</span></div></article>`;
  }).join('');
}
function renderPhotos(){
  const track=$('#galleryTrack');
  track.innerHTML=DISTRICT_PHOTOS.map((photo,i)=>`<button type="button" class="gallery-photo" data-gallery-index="${i}" aria-label="Enlarge ${escapeHTML(photo.title)}"><img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.caption)}" loading="lazy"><span class="gallery-photo-caption"><strong>${escapeHTML(photo.title)}</strong><small>${escapeHTML(photo.caption)}</small></span><span class="gallery-enlarge" aria-hidden="true">↗</span></button>`).join('');
}
renderFlyers(); renderPhotos();

function setupMediaRail(trackSelector,prevSelector,nextSelector){
  const track=$(trackSelector),prev=$(prevSelector),next=$(nextSelector);
  function state(){const max=track.scrollWidth-track.clientWidth;prev.disabled=track.scrollLeft<=5;next.disabled=track.scrollLeft>=max-5 || max<=5;}
  function move(direction){const card=track.firstElementChild;const gap=Number.parseFloat(getComputedStyle(track).columnGap)||18;const width=(card?card.getBoundingClientRect().width:track.clientWidth)+gap;track.scrollBy({left:direction*width,behavior:reducedMotion.matches?'auto':'smooth'});}
  prev.addEventListener('click',()=>move(-1)); next.addEventListener('click',()=>move(1));
  track.addEventListener('scroll',state,{passive:true});
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
  addEventListener('resize',state,{passive:true});
  requestAnimationFrame(state);
}
setupMediaRail('#flyerTrack','#flyerPrev','#flyerNext');
setupMediaRail('#galleryTrack','#galleryPrev','#galleryNext');
$('#galleryTrack').addEventListener('click',e=>{
  const trigger=e.target.closest('[data-gallery-index]');if(!trigger)return;
  const photo=DISTRICT_PHOTOS[Number(trigger.dataset.galleryIndex)];if(!photo)return;
  $('#galleryDialogImage').src=photo.src;
  $('#galleryDialogImage').alt=photo.caption;
  $('#galleryDialogTitle').textContent=photo.title;
  $('#galleryDialogCaption').textContent=photo.caption;
  openDialog($('#galleryDialog'));
});

/* Directory updates with approved listings only. */
const churchSearch=$('#churchSearch');
function renderChurches(){
  const query=churchSearch.value.trim().toLowerCase();
  const visible=CHURCHES.filter(ch=>[ch.name,ch.pastor,ch.city,ch.address,ch.assistants,ch.firstLady,ch.serviceLocation,ch.serviceTimes,ch.phoneDisplay,ch.email].join(' ').toLowerCase().includes(query));
  const target=$('#churchResults');
  if(!CHURCHES.length){
    target.innerHTML=`<div class="church-empty"><img class="church-empty-seal" src="assets/district-three-crest.webp" alt="District Three crest"><div><h3>The directory is taking shape.</h3><p>District churches and pastors will be featured here.</p><a href="#connect" class="text-arrow">Connect with our district ↗</a></div></div>`;
    return;
  }
  if(!visible.length){
    target.innerHTML='<div class="church-empty"><div><h3>No churches match your search.</h3><p>Try another church name, pastor, city, or contact detail.</p></div></div>';
    return;
  }
  target.innerHTML=`<div class="church-results-meta"><span>${visible.length} ${visible.length===1?'Church':'Churches'} ${query?'found':'in District Three directory'}</span><span>TEXAS STATE COUNCIL · DISTRICT THREE</span></div><div class="church-grid">${visible.map(ch=>{
    const assistantInfo=ch.assistants?`<div class="church-assistant"><span class="church-pastor-label">ASSISTANT PASTORS</span><p>${escapeHTML(ch.assistants)}</p></div>`:'';
    const firstLadyInfo=ch.firstLady?`<div class="church-assistant"><span class="church-pastor-label">FIRST LADY</span><p>${escapeHTML(ch.firstLady)}</p></div>`:'';
    const locationInfo=ch.serviceLocation?`<div class="church-service"><span class="church-pastor-label">SERVICE LOCATION & TIMES</span><p>${escapeHTML(ch.serviceLocation)}</p>${ch.serviceTimes?`<p>${escapeHTML(ch.serviceTimes)}</p>`:''}</div>`:'';
    const contact=[
      ch.address?`<div class="church-detail"><span class="church-detail-icon" aria-hidden="true">⌖</span><span>${escapeHTML(ch.address)}</span></div>`:'',
      ch.phone&&/^\d{10}$/.test(ch.phone)?`<a class="church-detail" href="tel:+1${ch.phone}"><span class="church-detail-icon" aria-hidden="true">☎</span><span>${escapeHTML(ch.phoneDisplay||ch.phone)}</span></a>`:'',
      ch.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ch.email)?`<a class="church-detail" href="mailto:${escapeHTML(ch.email)}"><span class="church-detail-icon" aria-hidden="true">✉</span><span>${escapeHTML(ch.email)}</span></a>`:''
    ].filter(Boolean).join('');
    return `<article class="church-card"><div class="church-card-heading"><span class="church-city">${escapeHTML(ch.city||'Texas')}</span><span class="church-decor" aria-hidden="true">✦</span></div><h3>${escapeHTML(ch.name)}</h3><div class="church-card-footer"><span class="church-pastor-label">PASTORAL LEADERSHIP</span><p>${escapeHTML(ch.pastor||'Pastoral leadership to be confirmed')}${ch.pastorRole?` <span class="church-role">· ${escapeHTML(ch.pastorRole)}</span>`:''}</p>${assistantInfo}${firstLadyInfo}${locationInfo}${contact?`<div class="church-contact">${contact}</div>`:''}</div>${ch.website&&/^https?:\/\//.test(ch.website)?`<a href="${escapeHTML(ch.website)}" target="_blank" rel="noopener noreferrer">Visit Church ↗</a>`:''}</article>`;
  }).join('')}</div>`;
}
churchSearch.addEventListener('input',renderChurches);renderChurches();

/* Leadership profiles and mission graphic */
$$('[data-leader]').forEach(button=>button.addEventListener('click',()=>{const person=LEADERS[button.dataset.leader];if(!person)return;$('#leaderDialogImage').src=person.image;$('#leaderDialogImage').alt='Portrait of '+person.name;$('#leaderDialogRole').textContent=person.role;$('#leaderDialogTitle').textContent=person.name;$('#leaderDialogText').innerHTML=(person.subtitle?`<p class="leader-bio-subtitle">${escapeHTML(person.subtitle)}</p>`:'')+(person.quote?`<blockquote class="leader-bio-quote">“${escapeHTML(person.quote)}”</blockquote>`:'')+person.bio.map(p=>`<p>${escapeHTML(p)}</p>`).join('')+(person.closing?`<p class="leader-bio-closing">${escapeHTML(person.closing)}</p>`:'');openDialog($('#leaderDialog'))}));
$('#openMission').addEventListener('click',()=>openDialog($('#missionDialog')));
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog(document.getElementById(button.dataset.close))));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog(dialog)}));

/* A useful form even before a district inbox is authorized. */
const form=$('#inquiryForm');
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const v=k=>String(data.get(k)||'').trim();const subject=`District Three Connection — ${v('fullName')}`;const body=[
  'District Three · Texas State Council · PCAFI','Attention: District Elder Louise Braziel Benson, Director','','Praise the Lord,','','I would like to connect with District Three.','',`Name: ${v('fullName')}`,`Email: ${v('email')}`,`Church / Ministry: ${v('church')||'Not provided'}`,`City / Location: ${v('city')}`,`Inquiry: ${v('interest')}`,'','My Message:',v('message')||'I would welcome a conversation about worship, fellowship, and District Three.','','I understand this inquiry is not an application approval or automatic affiliation.'].join('\n');
  if(SITE_CONFIG.formEndpoint){const button=$('.form-submit',form);button.disabled=true;button.textContent='Sending…';try{const response=await fetch(SITE_CONFIG.formEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'}});if(response.ok){toast('Your inquiry was submitted successfully.');form.reset();return}toast('Unable to send. Your inquiry will be prepared to copy.')}catch{toast('Online delivery unavailable. Your inquiry will be prepared to copy.')}finally{button.disabled=false;button.innerHTML='Prepare My Message <span aria-hidden="true">↗</span>'}}
  $('#preparedInquiry').value='Subject: '+subject+'\n\n'+body;const hasEmail=Boolean(SITE_CONFIG.contactEmail);$('#emailInquiry').hidden=!hasEmail;if(hasEmail){$('#emailInquiry').href='mailto:'+encodeURIComponent(SITE_CONFIG.contactEmail)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);$('#inquiryDialogInstructions').textContent='Your message has not yet been sent. Select “Email District” to open your email application, or copy/download it.'}else{$('#inquiryDialogInstructions').textContent='Your message has been prepared but not sent. Copy or download it to share with approved district leadership.'}openDialog($('#inquiryDialog'))});
$('#copyInquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#preparedInquiry').value);toast('Inquiry copied to clipboard.')}catch{$('#preparedInquiry').focus();$('#preparedInquiry').select();try{document.execCommand('copy');toast('Inquiry selected and copied.')}catch{toast('Select and copy the message using your device.')}}});
$('#downloadInquiry').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([$('#preparedInquiry').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='district-three-connection.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Inquiry downloaded.')});
