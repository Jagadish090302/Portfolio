const DEFAULTS = {
  siteName: 'JAGADISH.B',
  heroEyebrow: '// SYSTEM PROFILE // STATUS: OPEN TO OPPORTUNITIES',
  name: 'JAGADISH B',
  headline: 'Electronics & Communication Engineering Graduate',
  summary: 'Electronics and Communication Engineering graduate with strong analytical skills, a solid academic foundation, and the ability to adapt quickly to new technologies. Experienced in data research, validation, reporting, quality checks, and process-driven team environments.',
  aboutKicker: '01 // ABOUT',
  aboutTitle: 'BUILDING SKILLS.<br><span>STACKING EXPERIENCE.</span>',
  about: 'A practical, process-oriented profile with experience in financial market data research and quality assurance, backed by engineering education and software testing exposure.',
  degreeYear: '2019 — 2023',
  cgpa: '7.8',
  aboutExp: '2026',
  experienceKicker: '02 // EXPERIENCE',
  experienceTitle: 'FIELD LOG',
  skillsKicker: '03 // SKILLS',
  skillsTitle: 'ARSENAL',
  projectsKicker: '04 // PROJECTS',
  projectsTitle: 'PROJECT ARCHIVE',
  certKicker: '05 // CREDENTIALS',
  certTitle: 'VERIFIED<br><span>MODULES</span>',
  personalKicker: '06 // PERSONAL MODULE',
  personalTitle: 'BEYOND THE<br><span>STACK</span>',
  languagesLabel: 'LANGUAGES',
  languagesDetail: 'Tamil · English',
  hobbiesLabel: 'HOBBIES',
  hobbies: 'Content Creating · Script Writing · Video Editing · Drawing · Reading Books · Investing in Crypto Coins',
  contactKicker: '07 // COMMUNICATION CHANNEL',
  contactTitle: "LET'S CONNECT",
  contactMessage: 'Ready to discuss opportunities, projects, collaboration, or creative work.',
  email: 'jaganjash095@gmail.com',
  phone: '+91-73589 43247',
  languages: 'Tamil · English',
  footerName: 'JAGADISH B'
};

const DEFAULT_EXPERIENCE = [
  {
    title: 'Research Analyst',
    company: 'Exchange Data International · Vellore',
    date: 'April 2026 — Aug 2026',
    label: 'PROFESSIONAL EXPERIENCE',
    bullets: [
      'Researched, validated, and maintained financial market data with high accuracy.',
      'Used Microsoft Excel and Microsoft 365 tools for data processing and reporting.',
      'Collaborated with team members using Microsoft Teams.',
      'Worked on the Columba System to manage, update, and validate financial datasets.',
      'Performed quality checks to ensure data accuracy and consistency.',
      'Followed company SOPs while meeting daily productivity and quality targets.'
    ]
  }
];

const DEFAULT_CURRENT = {
  enabled: true,
  title: 'AI Data Annotation',
  company: 'AI Data Annotation · Tamil & English',
  date: 'Present',
  label: 'LIVE // CURRENT WORK',
  description: 'Currently working on AI data annotation and language-quality tasks focused on Tamil and English, including transcription, QA for AI training data, and Tamil voice collection.',
  bullets: [
    'Transcribe Tamil and English audio accurately for AI training and speech datasets.',
    'Perform QA and validation on transcriptions and annotated AI data.',
    'Collect Tamil voice samples for speech and AI model development.',
    'Check spelling, formatting, consistency, and guideline adherence.'
  ]
};

const DEFAULT_SKILLS = [
  { name:'PROGRAMMING', detail:'Java' },
  { name:'DATABASE', detail:'SQL · MySQL' },
  { name:'DATA & PRODUCTIVITY', detail:'Microsoft Excel · Microsoft 365 · Microsoft Teams · Columba System · Microsoft Outlook' },
  { name:'TESTING', detail:'Manual Testing · Selenium WebDriver · SDLC · STLC · Regression Testing · Functional Testing · Bug Life Cycle' },
  { name:'TOOLS', detail:'Eclipse · MySQL' },
  { name:'PLATFORMS', detail:'Linux Mint · Ubuntu · Kali · Windows' }
];

const DEFAULT_PROJECTS = [
  { title:'Personalized Emotion Recognition and Emotion Prediction System Based on Cloud Computing', desc:'Academic project focused on emotion recognition and prediction using a cloud-computing approach.', label:'ACADEMIC PROJECT' },
  { title:'Containment Zone Alerting Application', desc:'Application project documented through ICT Academy coursework and certification.', label:'ICT ACADEMY' }
];

const DEFAULT_CERTIFICATES = [
  { title:'Software Testing Course – QSpiders', issuer:'QSpiders', date:'', description:'Software Testing Course certificate.', publicUrl:'', file:null },
  { title:'ICT Academy Project - Containment Zone Alerting Application', issuer:'ICT Academy', date:'February 16, 2023', description:'ICT Academy project certificate for the Containment Zone Alerting Application.', publicUrl:'assets/ICTAcademy-PRCAD01EN-Containment-Zone-Certificate.pdf', file:null }
];

const DEFAULT_STATE = {
  ...DEFAULTS,
  experience: DEFAULT_EXPERIENCE,
  currentWork: DEFAULT_CURRENT,
  skills: DEFAULT_SKILLS,
  professionalSkills: 'Data Validation & Quality Assurance · Financial Data Research · Data Analysis · Attention to Detail · Process Compliance · Team Collaboration · Problem Solving',
  projects: DEFAULT_PROJECTS,
  certificates: DEFAULT_CERTIFICATES,
  customSections: [],
  settings: { showContact: true },
};

const DATA_KEY = 'jagadishCyberpunkPortfolioV3';
const PASS_KEY = 'jagadishCyberpunkPortfolioPassHashV3';
const DB_NAME = 'jagadishCyberpunkPortfolioAssets';
const DB_STORE = 'files';
const DEFAULT_PASS_HASH = '54ba29a59c1a80dd7ce4efeb45f3605dad0c670e78c1f620e902e0a385e27368'; // Jaga@2026

let state = normalizeState(loadState());
let adminUnlocked = false;
let saveTimer = null;
let unsavedChanges = 0;
let assetUrls = new Map();

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }
function normalizeState(raw){
  const s = { ...deepClone(DEFAULT_STATE), ...(raw || {}) };
  s.experience = Array.isArray(raw?.experience) ? raw.experience : deepClone(DEFAULT_EXPERIENCE);
  s.currentWork = { ...deepClone(DEFAULT_CURRENT), ...(raw?.currentWork || {}) };
  s.skills = Array.isArray(raw?.skills) ? raw.skills : deepClone(DEFAULT_SKILLS);
  s.projects = Array.isArray(raw?.projects) ? raw.projects : deepClone(DEFAULT_PROJECTS);
  s.certificates = Array.isArray(raw?.certificates) ? raw.certificates : deepClone(DEFAULT_CERTIFICATES);
  s.customSections = Array.isArray(raw?.customSections) ? raw.customSections : [];
  s.settings = { ...deepClone(DEFAULT_STATE.settings), ...(raw?.settings || {}) };
  return s;
}

function loadState(){
  try { return JSON.parse(localStorage.getItem(DATA_KEY) || 'null'); } catch { return null; }
}
function markDirty(){
  unsavedChanges += 1;
  updateEditorStatus();
  clearTimeout(saveTimer);
  // Keep a quiet autosave so a tab crash does not erase edits, without re-rendering
  // the editor while the user is typing. The explicit SAVE ALL CHANGES button
  // remains the main publish-in-this-browser action.
  saveTimer = setTimeout(() => { localStorage.setItem(DATA_KEY, JSON.stringify(state)); }, 1200);
}
function updateEditorStatus(){
  const el = $('#editorStatus');
  if (el) el.textContent = unsavedChanges ? `UNSAVED // ${unsavedChanges} CHANGE${unsavedChanges===1?'':'S'}` : 'ALL SYSTEMS SAVED';
}

function esc(str=''){ return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function linkifyText(text=''){ return esc(text).replace(/\n/g,'<br>'); }
function safeId(text){ return String(text).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'section'; }

function render(){
  document.title = `${state.siteName} // CYBERPUNK PORTFOLIO`;
  $('#brandLink').textContent = state.siteName;
  $('#brandLink').dataset.text = state.siteName;
  renderNav();
  const root = $('#siteRoot');
  root.innerHTML = '';
  root.appendChild(renderHero());
  root.appendChild(renderAbout());
  root.appendChild(renderExperience());
  root.appendChild(renderSkills());
  root.appendChild(renderProjects());
  root.appendChild(renderCertificates());
  root.appendChild(renderPersonal());
  state.customSections.forEach((section, index) => root.appendChild(renderCustomSection(section, index)));
  if (state.settings.showContact) root.appendChild(renderContact());
  root.appendChild(renderFooter());
  bindPublicInteractions();
  renderAdminEditors();
}

function section(el, id){ el.id = id; el.classList.add('section-pad','reveal'); return el; }
function addSectionTitle(kicker, title){
  const wrap = document.createElement('div'); wrap.className='section-heading';
  wrap.innerHTML = `<div><p class="section-kicker">${esc(kicker)}</p><h2>${title}</h2></div><span class="section-code">SYSTEM // ONLINE</span>`;
  return wrap;
}

function renderHero(){
  const el = section(document.createElement('section'),'hero');
  el.innerHTML = `
    <div class="hero-grid">
      <div>
        <p class="eyebrow">${esc(state.heroEyebrow)}</p>
        <h1 class="hero-title"><span class="name">${esc(state.name)}</span><span class="caret">_</span></h1>
        <p class="hero-role">${esc(state.headline)}</p>
        <p class="hero-summary">${linkifyText(state.summary)}</p>
        <div class="hero-cta">
          <a href="#projects" class="cyber-btn primary">VIEW PROJECTS</a>
          <a href="#contact" class="cyber-btn">CONTACT ME</a>
        </div>
        <div class="status-row"><span class="status-dot"></span>${['JAVA','SQL','EXCEL','TESTING','LINUX'].map(x=>`<span>${x}</span>`).join('')}</div>
      </div>
      <aside class="terminal-card cyber-frame tilt">
        <div class="terminal-head" style="display:flex;justify-content:space-between;padding:13px 16px;border-bottom:1px solid rgba(0,255,213,.14);color:#7b929c;font:800 10px/1 'Orbitron',sans-serif;"><span>root@jagadish:~$</span><span>● ● ●</span></div>
        <div class="terminal-body">
          <div class="terminal-line" style="animation-delay:.08s">booting portfolio...</div>
          <div class="terminal-line" style="animation-delay:.22s"><span class="green">[OK]</span> identity loaded</div>
          <div class="terminal-line" style="animation-delay:.36s"><span class="green">[OK]</span> skill matrix indexed</div>
          <div class="terminal-line" style="animation-delay:.50s"><span class="green">[OK]</span> credential archive mounted</div>
          <div class="terminal-line" style="animation-delay:.64s"><span class="yellow">[INFO]</span> current-work module online</div>
          <div class="terminal-line" style="animation-delay:.78s"><span style="color:var(--pink)">[LINK]</span> human → machine interface</div>
          <div class="terminal-line" style="animation-delay:.92s;margin-top:28px;color:var(--pink)">$ <span class="caret">_</span></div>
        </div>
      </aside>
    </div>`;
  return el;
}

function renderAbout(){
  const el = section(document.createElement('section'),'about');
  el.innerHTML = `<div class="split-section"><div><p class="section-kicker">${esc(state.aboutKicker)}</p><h2 class="split-title">${state.aboutTitle}</h2></div><div class="panel about-panel tilt"><p class="about-copy">${linkifyText(state.about)}</p><div class="mini-stats"><div><strong>${esc(state.degreeYear)}</strong><span>ENGINEERING</span></div><div><strong>${esc(state.cgpa)}</strong><span>CGPA</span></div><div><strong>${esc(state.aboutExp)}</strong><span>WORK EXP.</span></div></div></div></div>`;
  return el;
}

function renderExperience(){
  const el = section(document.createElement('section'),'experience');
  const list = [...state.experience];
  if (state.currentWork.enabled) list.push(state.currentWork);
  el.appendChild(addSectionTitle(state.experienceKicker,state.experienceTitle));
  const wrap=document.createElement('div'); wrap.className='timeline-wrap';
  const listEl=document.createElement('div'); listEl.className='timeline-list';
  list.forEach((item,index)=>{
    const card=document.createElement('article'); card.className='timeline-card panel tilt reveal';
    if (item===state.currentWork) card.classList.add('current-card');
    card.innerHTML = `<div class="timeline-marker">${String(index+1).padStart(2,'0')}</div><div><div class="timeline-top"><div><span class="tag ${item===state.currentWork?'hot':''}">${esc(item.label || 'EXPERIENCE')}</span><h3 class="item-title">${esc(item.title)}</h3><p class="company">${esc(item.company)}</p></div><div class="date">${esc(item.date)}</div></div>${item===state.currentWork&&item.description?`<p class="about-copy" style="margin-top:20px">${linkifyText(item.description)}</p>`:''}<div class="bullet-grid">${(item.bullets||[]).filter(Boolean).map(b=>`<p>${linkifyText(b)}</p>`).join('')}</div></div>`;
    listEl.appendChild(card);
  });
  wrap.appendChild(listEl); el.appendChild(wrap); return el;
}

function renderSkills(){
  const el=section(document.createElement('section'),'skills');
  el.appendChild(addSectionTitle(state.skillsKicker,state.skillsTitle));
  const grid=document.createElement('div'); grid.className='skill-grid';
  state.skills.forEach((skill,i)=>{ const card=document.createElement('article'); card.className='skill-card panel tilt reveal'; card.innerHTML=`<span class="skill-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(skill.name)}</h3><p>${linkifyText(skill.detail)}</p>`; grid.appendChild(card); });
  el.appendChild(grid);
  const soft=document.createElement('div'); soft.className='soft-skills panel tilt reveal'; soft.innerHTML=`<div><span class="tag">PROFESSIONAL SKILLS</span><h3 class="item-title" style="font-size:18px">HUMAN + PROCESS LAYER</h3></div><p class="soft-copy">${linkifyText(state.professionalSkills)}</p>`; el.appendChild(soft);
  return el;
}

function renderProjects(){
  const el=section(document.createElement('section'),'projects'); el.appendChild(addSectionTitle(state.projectsKicker,state.projectsTitle));
  const grid=document.createElement('div'); grid.className='project-grid';
  state.projects.forEach((p,i)=>{ const card=document.createElement('article'); card.className='project-card panel tilt reveal'; card.innerHTML=`<span class="project-id">PX-${String(i+1).padStart(2,'0')}</span><h3>${esc(p.title)}</h3><p>${linkifyText(p.desc)}</p><div class="project-footer"><span>${esc(p.label||'PROJECT')}</span><span>→</span></div>`; grid.appendChild(card); });
  el.appendChild(grid); return el;
}

function renderCertificates(){
  const el=section(document.createElement('section'),'certifications'); el.appendChild(addSectionTitle(state.certKicker,state.certTitle));
  const grid=document.createElement('div'); grid.className='cert-grid';
  if (!state.certificates.length){ const empty=document.createElement('div'); empty.className='no-cert'; empty.textContent='NO CREDENTIALS LOADED // OPEN EDIT MODE TO ADD A CERTIFICATE'; el.appendChild(empty); return el; }
  state.certificates.forEach((c,i)=>{
    const card=document.createElement('article'); card.className='cert-card panel tilt reveal'; card.dataset.certIndex=i; card.tabIndex=0;
    card.innerHTML=`<span class="cert-index">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(c.title)}</h3><p class="cert-meta">${esc(c.issuer||'Certificate')} ${c.date?`· ${esc(c.date)}`:''}</p></div><span class="cert-arrow">↗</span>`;
    card.addEventListener('click',()=>openCertificate(i)); card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCertificate(i);}});
    grid.appendChild(card);
  });
  el.appendChild(grid); return el;
}

function renderPersonal(){
  const el=section(document.createElement('section'),'personal'); el.innerHTML=`<div class="split-section"><div><p class="section-kicker">${esc(state.personalKicker)}</p><h2 class="split-title">${state.personalTitle}</h2></div><div class="panel about-panel tilt"><p><span class="tag">${esc(state.languagesLabel)}</span></p><p class="about-copy" style="font-size:16px">${linkifyText(state.languagesDetail)}</p><p style="margin-top:24px"><span class="tag">${esc(state.hobbiesLabel)}</span></p><p class="about-copy" style="font-size:16px">${linkifyText(state.hobbies)}</p></div></div>`; return el;
}

function renderCustomSection(sectionData,index){
  const el=section(document.createElement('section'),`custom-${safeId(sectionData.title)}-${index+1}`); el.classList.add('custom-section');
  el.innerHTML=`<div class="split-section"><div><p class="section-kicker">${esc(sectionData.kicker||`CUSTOM ${String(index+1).padStart(2,'0')}`)}</p><h2 class="split-title">${esc(sectionData.title)}${sectionData.subtitle?`<br><span>${esc(sectionData.subtitle)}</span>`:''}</h2></div><div class="panel content-panel tilt"><p>${linkifyText(sectionData.content||'')}</p></div></div>`; return el;
}

function renderContact(){
  const el=section(document.createElement('section'),'contact'); el.innerHTML=`<div class="contact-wrap"><div class="contact-card panel tilt"><p class="section-kicker">${esc(state.contactKicker)}</p><h2>${esc(state.contactTitle)}<span class="caret">_</span></h2><p class="contact-copy">${linkifyText(state.contactMessage)}</p><div class="contact-grid"><a class="contact-item" href="mailto:${esc(state.email)}"><span>EMAIL</span><strong>${esc(state.email)}</strong></a><a class="contact-item" href="tel:${esc(state.phone.replace(/[^+\d]/g,''))}"><span>PHONE</span><strong>${esc(state.phone)}</strong></a><div class="contact-item"><span>LANGUAGES</span><strong>${esc(state.languages)}</strong></div></div></div></div>`; return el;
}
function renderFooter(){ const el=document.createElement('footer'); el.className='footer'; el.innerHTML=`<div>© ${new Date().getFullYear()} ${esc(state.footerName)}</div><div>BUILT // CYBERPUNK UI // EDITABLE CORE</div>`; return el; }
function renderNav(){
  const nav=$('#navLinks'); const items=[['ABOUT','about'],['EXPERIENCE','experience'],['SKILLS','skills'],['PROJECTS','projects'],['CERTS','certifications'],['PERSONAL','personal']];
  state.customSections.forEach((s,i)=>items.push([String(s.title||`CUSTOM ${i+1}`).slice(0,14).toUpperCase(),`custom-${safeId(s.title)}-${i+1}`]));
  if (state.settings.showContact) items.push(['CONTACT','contact']);
  nav.innerHTML=items.map(([label,id])=>`<a href="#${id}">${esc(label)}</a>`).join('');
}

function bindPublicInteractions(){
  setupReveal(); setupTilt();
  $$('.cyber-btn, .icon-btn').forEach(btn=> btn.addEventListener('pointermove',e=>{
    const r=btn.getBoundingClientRect(); btn.style.setProperty('--mx', `${e.clientX-r.left}px`); btn.style.setProperty('--my', `${e.clientY-r.top}px`);
  }));
}
function setupReveal(){
  const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in'); obs.unobserve(entry.target);}}),{threshold:.08});
  $$('.reveal').forEach(el=>obs.observe(el));
}
function setupTilt(){
  if (window.matchMedia('(pointer: coarse)').matches) return;
  $$('.tilt').forEach(card=>{
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5; card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*4}deg) translateY(-3px)`;});
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

function renderAdminEditors(){ renderGlobalEditor(); renderExperienceEditor(); renderSkillsEditor(); renderProjectsEditor(); renderCertificatesEditor(); renderCustomSectionsEditor(); syncSettingsEditor(); }

function addField(parent,label,key,value,type='input'){
  const wrap=document.createElement('label'); wrap.className='field'+(type==='textarea'?' field-full':'');
  wrap.innerHTML=`<span>${esc(label)}</span>`;
  const input=document.createElement(type==='textarea'?'textarea':'input'); input.className=type==='textarea'?'editor-textarea':'editor-input'; input.value=value ?? ''; input.dataset.key=key; input.addEventListener('input',()=>{state[key]=input.value; markDirty();});
  wrap.appendChild(input); parent.appendChild(wrap);
}
function renderGlobalEditor(){
  const root=$('#globalEditor'); root.innerHTML='';
  [['SITE NAME','siteName'],['HERO EYEBROW','heroEyebrow'],['NAME','name'],['HEADLINE','headline'],['ABOUT KICKER','aboutKicker'],['DEGREE YEARS','degreeYear'],['CGPA','cgpa'],['WORK EXP. LABEL','aboutExp'],['EXPERIENCE KICKER','experienceKicker'],['SKILLS KICKER','skillsKicker'],['PROJECTS KICKER','projectsKicker'],['CERTIFICATION KICKER','certKicker'],['PERSONAL KICKER','personalKicker'],['LANGUAGES LABEL','languagesLabel'],['LANGUAGES','languages'],['HOBBIES LABEL','hobbiesLabel'],['EMAIL','email'],['PHONE','phone'],['FOOTER NAME','footerName']].forEach(([l,k])=>addField(root,l,k,state[k]));
  addField(root,'ABOUT TITLE (HTML ALLOWED)','aboutTitle',state.aboutTitle,'textarea');
  addField(root,'ABOUT CONTENT','about',state.about,'textarea');
  addField(root,'SKILLS TITLE','skillsTitle',state.skillsTitle);
  addField(root,'PROJECTS TITLE','projectsTitle',state.projectsTitle);
  addField(root,'CERTIFICATION TITLE (HTML ALLOWED)','certTitle',state.certTitle,'textarea');
  addField(root,'PERSONAL TITLE (HTML ALLOWED)','personalTitle',state.personalTitle,'textarea');
  addField(root,'LANGUAGES DETAIL','languagesDetail',state.languagesDetail,'textarea');
  addField(root,'HOBBIES','hobbies',state.hobbies,'textarea');
  addField(root,'CONTACT KICKER','contactKicker',state.contactKicker);
  addField(root,'CONTACT TITLE','contactTitle',state.contactTitle);
  addField(root,'CONTACT MESSAGE','contactMessage',state.contactMessage,'textarea');
  addField(root,'HERO SUMMARY','summary',state.summary,'textarea');
}
function renderExperienceEditor(){
  const root=$('#experienceEditor'); root.innerHTML='';
  const current=document.createElement('div'); current.className='repeat-card';
  current.innerHTML=`<div class="repeat-card-head"><strong>CURRENT WORK MODULE</strong><span class="tag hot">${state.currentWork.enabled?'VISIBLE':'HIDDEN'}</span></div><div class="editor-grid"></div>`;
  const cg=$('.editor-grid',current);
  addEditorInput(cg,'ROLE / TITLE','title',state.currentWork.title,v=>{state.currentWork.title=v;markDirty();});
  addEditorInput(cg,'COMPANY / PROJECT','company',state.currentWork.company,v=>{state.currentWork.company=v;markDirty();});
  addEditorInput(cg,'DATE','date',state.currentWork.date,v=>{state.currentWork.date=v;markDirty();});
  addEditorInput(cg,'LABEL','label',state.currentWork.label,v=>{state.currentWork.label=v;markDirty();});
  addEditorTextarea(cg,'DESCRIPTION','description',state.currentWork.description,v=>{state.currentWork.description=v;markDirty();});
  addEditorTextarea(cg,'BULLETS (one per line)','bullets',(state.currentWork.bullets||[]).join('\n'),v=>{state.currentWork.bullets=v.split('\n').map(x=>x.trim()).filter(Boolean);markDirty();});
  root.appendChild(current);
  state.experience.forEach((item,i)=>root.appendChild(makeExperienceEditor(item,i)));
}
function makeExperienceEditor(item,i){
  const card=document.createElement('div'); card.className='repeat-card'; card.innerHTML=`<div class="repeat-card-head"><strong>EXPERIENCE ${String(i+1).padStart(2,'0')}</strong><div class="mini-actions"><button class="mini-btn danger" type="button">REMOVE</button></div></div><div class="editor-grid"></div>`;
  const grid=$('.editor-grid',card); addEditorInput(grid,'ROLE','title',item.title,v=>{item.title=v;markDirty();}); addEditorInput(grid,'COMPANY','company',item.company,v=>{item.company=v;markDirty();}); addEditorInput(grid,'DATE','date',item.date,v=>{item.date=v;markDirty();}); addEditorInput(grid,'LABEL','label',item.label,v=>{item.label=v;markDirty();});
  addEditorTextarea(grid,'BULLETS (one per line)','bullets',(item.bullets||[]).join('\n'),v=>{item.bullets=v.split('\n').map(x=>x.trim()).filter(Boolean);markDirty();});
  $('.danger',card).addEventListener('click',()=>{state.experience.splice(i,1);render();markDirty();}); return card;
}
function addEditorInput(grid,label,key,value,onChange){ const wrap=document.createElement('label'); wrap.className='field'; wrap.innerHTML=`<span>${esc(label)}</span><input class="editor-input" value="${esc(value||'')}" />`; const input=$('input',wrap); input.addEventListener('input',e=>onChange(e.target.value)); grid.appendChild(wrap); }
function addEditorTextarea(grid,label,key,value,onChange){ const wrap=document.createElement('label'); wrap.className='field field-full'; wrap.innerHTML=`<span>${esc(label)}</span><textarea class="editor-textarea">${esc(value||'')}</textarea>`; const input=$('textarea',wrap); input.addEventListener('input',e=>onChange(e.target.value)); grid.appendChild(wrap); }

function renderSkillsEditor(){
  const root=$('#skillsEditor'); root.innerHTML='';
  state.skills.forEach((item,i)=>{ const card=document.createElement('div'); card.className='repeat-card'; card.innerHTML=`<div class="repeat-card-head"><strong>SKILL ${String(i+1).padStart(2,'0')}</strong><button class="mini-btn danger" type="button">REMOVE</button></div><div class="editor-grid"></div>`; const g=$('.editor-grid',card); addEditorInput(g,'CATEGORY','name',item.name,v=>{item.name=v;markDirty();}); addEditorTextarea(g,'DETAIL','detail',item.detail,v=>{item.detail=v;markDirty();}); $('.danger',card).onclick=()=>{state.skills.splice(i,1);render();markDirty();}; root.appendChild(card); });
}
function renderProjectsEditor(){
  const root=$('#projectsEditor'); root.innerHTML='';
  state.projects.forEach((item,i)=>{ const card=document.createElement('div'); card.className='repeat-card'; card.innerHTML=`<div class="repeat-card-head"><strong>PROJECT ${String(i+1).padStart(2,'0')}</strong><button class="mini-btn danger" type="button">REMOVE</button></div><div class="editor-grid"></div>`; const g=$('.editor-grid',card); addEditorInput(g,'TITLE','title',item.title,v=>{item.title=v;markDirty();}); addEditorInput(g,'LABEL','label',item.label,v=>{item.label=v;markDirty();}); addEditorTextarea(g,'DESCRIPTION','desc',item.desc,v=>{item.desc=v;markDirty();}); $('.danger',card).onclick=()=>{state.projects.splice(i,1);render();markDirty();}; root.appendChild(card); });
}

function renderCertificatesEditor(){
  const root=$('#certificatesEditor'); root.innerHTML='';
  state.certificates.forEach((item,i)=>root.appendChild(makeCertificateEditor(item,i)));
}
function makeCertificateEditor(item,i){
  const card=document.createElement('div'); card.className='repeat-card';
  card.innerHTML=`<div class="repeat-card-head"><strong>CERTIFICATE ${String(i+1).padStart(2,'0')}</strong><div class="mini-actions"><button class="mini-btn" data-preview>PREVIEW</button><button class="mini-btn danger" data-remove>REMOVE</button></div></div><div class="editor-grid"></div>`;
  const g=$('.editor-grid',card);
  addEditorInput(g,'TITLE','title',item.title,v=>{item.title=v;markDirty();});
  addEditorInput(g,'ISSUER','issuer',item.issuer,v=>{item.issuer=v;markDirty();});
  addEditorInput(g,'DATE','date',item.date||'',v=>{item.date=v;markDirty();});
  addEditorInput(g,'PUBLIC CERTIFICATE URL (optional)','publicUrl',item.publicUrl||'',v=>{item.publicUrl=v;markDirty();});
  addEditorTextarea(g,'DESCRIPTION','description',item.description||'',v=>{item.description=v;markDirty();});
  const upload=document.createElement('div'); upload.className='field field-full file-field'; upload.innerHTML=`<span>UPLOAD CERTIFICATE FILE</span><label class="cyber-btn file-btn">CHOOSE IMAGE / PDF<input class="file-input-hidden" type="file" accept="image/*,application/pdf" /></label><small style="color:var(--muted)" data-file-status>${item.file?.name?`LOCAL FILE: ${esc(item.file.name)}`:'No local file uploaded.'}</small><div data-thumb></div>`; g.appendChild(upload);
  const input=$('input',upload); input.addEventListener('change',async e=>{const file=e.target.files?.[0]; if(!file)return; if(file.size>10*1024*1024){ alert('Please keep certificate files under 10 MB.'); input.value=''; return; } const assetId=item.file?.id || `cert-${crypto.randomUUID()}`; await saveAsset(assetId,file); item.file={id:assetId,name:file.name,type:file.type||'application/octet-stream',size:file.size}; item.publicUrl=''; $('[data-file-status]',upload).textContent=`LOCAL FILE: ${file.name}`; markDirty(); await renderCertificateThumb(item,upload); });
  if(item.file) renderCertificateThumb(item,upload);
  $('[data-preview]',card).onclick=()=>openCertificate(i);
  $('[data-remove]',card).onclick=async()=>{await deleteAsset(i);state.certificates.splice(i,1);render();markDirty();};
  return card;
}
async function renderCertificateThumb(item,upload){ const holder=$('[data-thumb]',upload); if(!holder)return; holder.innerHTML=''; const src=item.publicUrl || await getAssetUrl(item.file?.id); if(!src)return; const type=(item.file?.type||'').toLowerCase(); if(type.includes('pdf') || String(src).toLowerCase().split('?')[0].endsWith('.pdf')){ const badge=document.createElement('div'); badge.className='pdf-thumb'; badge.innerHTML='<strong>PDF</strong><span>READY TO VIEW</span>'; holder.appendChild(badge); return; } const img=document.createElement('img'); img.className='cert-thumb'; img.src=src; img.alt='Certificate preview'; holder.appendChild(img); }

function renderCustomSectionsEditor(){
  const root=$('#customSectionsEditor'); root.innerHTML='';
  state.customSections.forEach((item,i)=>{ const card=document.createElement('div'); card.className='repeat-card'; card.innerHTML=`<div class="repeat-card-head"><strong>CUSTOM SECTION ${String(i+1).padStart(2,'0')}</strong><button class="mini-btn danger" type="button">REMOVE</button></div><div class="editor-grid"></div>`; const g=$('.editor-grid',card); addEditorInput(g,'KICKER','kicker',item.kicker||`CUSTOM ${String(i+1).padStart(2,'0')}`,v=>{item.kicker=v;markDirty();}); addEditorInput(g,'TITLE','title',item.title,v=>{item.title=v;markDirty();}); addEditorInput(g,'SUBTITLE','subtitle',item.subtitle||'',v=>{item.subtitle=v;markDirty();}); addEditorTextarea(g,'CONTENT','content',item.content||'',v=>{item.content=v;markDirty();}); $('.danger',card).onclick=()=>{state.customSections.splice(i,1);render();markDirty();}; root.appendChild(card); });
}
function syncSettingsEditor(){ $('#settingsCurrentWork').value=String(state.currentWork.enabled); $('#settingsContact').value=String(state.settings.showContact); }

function openEditor(){ adminUnlocked=true; $('#editorPanel').classList.add('open'); $('#editorPanel').setAttribute('aria-hidden','false'); document.body.classList.add('locked'); document.body.classList.add('editing'); $('#saveBtn').classList.remove('hidden'); $('#editBtn').classList.add('hidden'); }
function closeEditor(){ saveAll(false); $('#editorPanel').classList.remove('open'); $('#editorPanel').setAttribute('aria-hidden','true'); document.body.classList.remove('locked','editing'); $('#saveBtn').classList.add('hidden'); $('#editBtn').classList.remove('hidden'); }
function saveAll(closeAfter=true){ localStorage.setItem(DATA_KEY, JSON.stringify(state)); if(closeAfter) closeEditor(); unsavedChanges=0; updateEditorStatus(); render(); }
function resetAll(){ if(!adminUnlocked) return showAuth(); if(!confirm('Reset portfolio to the original resume-based content? This removes local edits and certificate files.'))return; localStorage.removeItem(DATA_KEY); localStorage.removeItem(PASS_KEY); state=normalizeState(DEFAULT_STATE); clearAllAssets().then(()=>{unsavedChanges=0;render();alert('PORTFOLIO RESET // SYSTEM RESTORED');}); }

async function hashPasscode(value){ const data=new TextEncoder().encode(value); const digest=await crypto.subtle.digest('SHA-256',data); return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join(''); }
function showAuth(){ const m=$('#authModal'); m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('locked'); $('#authError').textContent=''; $('#passcodeInput').value=''; setTimeout(()=>$('#passcodeInput').focus(),50); }
function hideModal(id){ const m=$(`#${id}`); if(!m)return; m.classList.remove('open'); m.setAttribute('aria-hidden','true'); if(!$$('.modal.open').length && !$('#editorPanel').classList.contains('open')) document.body.classList.remove('locked'); }

async function tryLogin(e){ e.preventDefault(); const pass=$('#passcodeInput').value; const hash=await hashPasscode(pass); const expected=localStorage.getItem(PASS_KEY)||DEFAULT_PASS_HASH; if(hash===expected){ adminUnlocked=true; hideModal('authModal'); openEditor(); } else { $('#authError').textContent='ACCESS DENIED // INVALID PASSCODE'; $('#passcodeInput').select(); } }

async function openCertificate(index){
  const item=state.certificates[index]; if(!item)return;
  $('#certificateViewerTitle').textContent=item.title;
  $('#certificateViewerMeta').textContent=[item.issuer,item.date].filter(Boolean).join(' · ');
  const body=$('#certificateViewerBody'); body.innerHTML='<div class="viewer-loading">LOADING CREDENTIAL // PLEASE WAIT...</div>';
  const src=item.publicUrl || await getAssetUrl(item.file?.id);
  body.innerHTML='';
  if(src){
    const type=(item.file?.type||'').toLowerCase();
    const isPdf=type.includes('pdf') || String(src).toLowerCase().split('?')[0].endsWith('.pdf');
    if(isPdf){ const iframe=document.createElement('iframe'); iframe.src=src; iframe.title=item.title; iframe.loading='lazy'; iframe.setAttribute('allow','fullscreen'); body.appendChild(iframe); }
    else { const img=document.createElement('img'); img.src=src; img.alt=item.title; body.appendChild(img); }
  } else {
    const box=document.createElement('div'); box.className='viewer-placeholder'; box.innerHTML=`<h3 style="font:800 20px/1.2 'Orbitron',sans-serif">CERTIFICATE FILE NOT ATTACHED</h3><p>${esc(item.description||'Add an image/PDF in EDIT MODE or provide a public URL.')}</p>`; body.appendChild(box);
  }
  const modal=$('#certificateModal'); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('locked');
}

function openTab(tab){ $$('.editor-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab)); $$('.editor-pane').forEach(p=>p.classList.toggle('active',p.dataset.pane===tab)); }

// IndexedDB certificate storage
function dbOpen(){ return new Promise((resolve,reject)=>{ const req=indexedDB.open(DB_NAME,1); req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(DB_STORE))req.result.createObjectStore(DB_STORE);}; req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error); }); }
async function saveAsset(id,file){ const db=await dbOpen(); return new Promise((resolve,reject)=>{ const tx=db.transaction(DB_STORE,'readwrite'); tx.objectStore(DB_STORE).put(file,id.toString()); tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error); }); }
async function getAsset(id){
  if(!id)return null;
  const db=await dbOpen();
  const readKey=(key)=>new Promise((resolve,reject)=>{
    const tx=db.transaction(DB_STORE,'readonly');
    const req=tx.objectStore(DB_STORE).get(String(key));
    req.onsuccess=()=>resolve(req.result||null);
    req.onerror=()=>reject(req.error);
  });
  let blob=await readKey(id);
  // V3 stored some files under the certificate array index while metadata used cert-N.
  if(!blob && typeof id==='string' && id.startsWith('cert-')) {
    const legacyIndex=id.slice(5);
    if(/^\d+$/.test(legacyIndex)) blob=await readKey(legacyIndex);
  }
  return blob;
}
async function getAssetUrl(id){ if(!id)return null; if(assetUrls.has(id))return assetUrls.get(id); const blob=await getAsset(id); if(!blob)return null; const url=URL.createObjectURL(blob); assetUrls.set(id,url); return url; }
async function deleteAsset(index){ const id=state.certificates[index]?.file?.id || `cert-${index}`; try{ const db=await dbOpen(); await new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,'readwrite');tx.objectStore(DB_STORE).delete(id.toString());tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);}); if(assetUrls.has(id)){URL.revokeObjectURL(assetUrls.get(id)); assetUrls.delete(id);} }catch{} }
async function clearAllAssets(){ try{const db=await dbOpen(); await new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,'readwrite');tx.objectStore(DB_STORE).clear();tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}catch{} }

function exportBackup(){
  const payload={version:3,generatedAt:new Date().toISOString(),state}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='jagadish-portfolio-backup.json'; a.click(); URL.revokeObjectURL(a.href);
}
async function importBackup(file){ try{ const raw=JSON.parse(await file.text()); if(!raw.state)throw new Error('Invalid backup'); state=normalizeState(raw.state); render(); markDirty(); alert('BACKUP IMPORTED // SAVE TO APPLY'); }catch(e){ alert('IMPORT FAILED // INVALID JSON BACKUP'); } }

function setupParticles(){ const field=$('#particleField'); for(let i=0;i<28;i++){ const p=document.createElement('span'); p.className='particle'; p.style.left=`${Math.random()*100}%`; p.style.animationDuration=`${9+Math.random()*15}s`; p.style.animationDelay=`-${Math.random()*18}s`; p.style.opacity=`${.25+Math.random()*.55}`; field.appendChild(p); } }
function setupCursor(){ const orb=$('#cursorOrb'); let x=0,y=0,tx=0,ty=0; document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;}); function tick(){x += (tx-x)*.11; y += (ty-y)*.11; orb.style.left=x+'px'; orb.style.top=y+'px'; requestAnimationFrame(tick);} tick(); }

// Events
$('#editBtn').addEventListener('click',showAuth);
$('#saveBtn').addEventListener('click',()=>saveAll(true));
$('#resetBtn').addEventListener('click',resetAll);
$('#authForm').addEventListener('submit',tryLogin);
$$('[data-close-modal]').forEach(btn=>btn.addEventListener('click',()=>hideModal(btn.dataset.closeModal)));
$('#closeEditorBtn').addEventListener('click',closeEditor);
$('#previewExitBtn').addEventListener('click',closeEditor);
$('#editorSaveBtn').addEventListener('click',()=>saveAll(false));
$('.editor-tabs').addEventListener('click',e=>{ const b=e.target.closest('.editor-tab'); if(b)openTab(b.dataset.tab); });
$('#addExperienceBtn').addEventListener('click',()=>{state.experience.push({title:'New Role',company:'Company / Organization',date:'Present',label:'PROFESSIONAL EXPERIENCE',bullets:['Describe your responsibility here.']});render();markDirty();openTab('experience');});
$('#addSkillBtn').addEventListener('click',()=>{state.skills.push({name:'NEW SKILL',detail:'Add skill details here.'});render();markDirty();openTab('skills');});
$('#addProjectBtn').addEventListener('click',()=>{state.projects.push({title:'New Project',desc:'Describe this project here.',label:'PROJECT'});render();markDirty();openTab('projects');});
$('#addCertificateBtn').addEventListener('click',()=>{state.certificates.push({title:'New Certificate',issuer:'Issuer',date:'',description:'Describe the certificate.',publicUrl:'',file:null});render();markDirty();openTab('certificates');});
$('#addCustomSectionBtn').addEventListener('click',()=>{state.customSections.push({kicker:`CUSTOM ${String(state.customSections.length+1).padStart(2,'0')}`,title:'New Section',subtitle:'Subtitle',content:'Add your content here.'});render();markDirty();openTab('sections');});
$('#settingsCurrentWork').addEventListener('change',e=>{state.currentWork.enabled=e.target.value==='true';markDirty();render();openTab('settings');});
$('#settingsContact').addEventListener('change',e=>{state.settings.showContact=e.target.value==='true';markDirty();render();openTab('settings');});
$('#settingsPasscode').addEventListener('change',async e=>{const v=e.target.value.trim(); if(!v)return; localStorage.setItem(PASS_KEY,await hashPasscode(v)); e.target.value=''; markDirty(); alert('ADMIN PASSCODE UPDATED FOR THIS BROWSER');});
$('#exportBtn').addEventListener('click',exportBackup);
$('#importInput').addEventListener('change',e=>{const f=e.target.files?.[0];if(f)importBackup(f);e.target.value='';});
$('#downloadCertsBtn').addEventListener('click',()=>{const lines=state.certificates.map((c,i)=>`${i+1}. ${c.title} | Public URL: ${c.publicUrl||'not set'} | Local file: ${c.file?.name||'none'}`).join('\n'); const blob=new Blob([lines],{type:'text/plain'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='certificate-info.txt';a.click();URL.revokeObjectURL(a.href);});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){ if($('#certificateModal').classList.contains('open'))hideModal('certificateModal'); else if($('#authModal').classList.contains('open'))hideModal('authModal'); else if($('#editorPanel').classList.contains('open'))closeEditor(); }});

setupParticles(); setupCursor(); render();
