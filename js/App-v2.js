// app-v2.js — site interactions, projects loader, theme toggle, animations

// Projects data (customize these to your real projects)
const projects = [
    {title: 'Review Analyzer', desc: 'NLP pipeline extracting sentiment and topics from reviews', tags: ['React','Python','FastAPI'], url: '#'},
    {title: 'TaskFlow', desc: 'Realtime task manager for teams', tags: ['Next.js','Node','Postgres'], url: '#'},
    {title: 'LandingKit', desc: 'Component library & templates for marketing sites', tags: ['React','Storybook'], url: '#'},
    {title: 'Metrics API', desc: 'High-throughput metrics ingestion service', tags: ['Node','Redis','AWS'], url: '#'},
    {title: 'AutoDoc', desc: 'Generates docs from code samples', tags: ['Python','OpenAI'], url: '#'},
    {title: 'StreamViz', desc: 'Realtime charting dashboard', tags: ['D3','TypeScript'], url: '#'}
];

// Render projects into grid
function renderProjects(){
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    projects.forEach(p => {
        const card = document.createElement('article');
        card.className = 'project';
        card.innerHTML = `
      <div style="min-height:110px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));">
        <strong>${p.title}</strong>
      </div>
      <p class="muted">${p.desc}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.6rem">
        <div>${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <a href="${p.url}" class="btn-outline">Details</a>
      </div>
    `;
        grid.appendChild(card);
    });
}

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if(menuBtn){
    menuBtn.addEventListener('click', ()=>{
        const open = mobileMenu.style.display === 'block';
        mobileMenu.style.display = open ? 'none' : 'block';
        menuBtn.setAttribute('aria-expanded', String(!open));
        mobileMenu.setAttribute('aria-hidden', String(open));
    });
}

// Theme toggle (simple, stores preference in localStorage)
const themeToggle = document.getElementById('theme-toggle');
function setTheme(light){
    if(light){
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fa-regular fa-moon"></i>';
        themeToggle.setAttribute('aria-pressed','true');
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
        themeToggle.setAttribute('aria-pressed','false');
    }
    localStorage.setItem('light-mode', String(light));
}
if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
        const isLight = document.body.classList.contains('light-mode');
        setTheme(!isLight);
    });
}

// Contact form submit (demo) — replace with real endpoint for production
function submitContact(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){ alert('Please fill all fields'); return }
    // TODO: send to server or form service (Formspree, Netlify forms, etc.)
    alert('Thanks, ' + name + '! This demo does not send messages.');
    e.target.reset();
}
function resetForm(){ document.getElementById('contact-form').reset(); }

// Init animations (AOS & GSAP subtle) and render
window.addEventListener('DOMContentLoaded', ()=>{
    renderProjects();
    // AOS
    if(window.AOS){ AOS.init({duration:700,once:true}); }
    // GSAP hero subtle animation
    if(window.gsap){
        try{
            gsap.from('.hero-title',{y:20,opacity:0,duration:0.8,delay:0.15});
            gsap.from('.hero-card',{scale:0.98,opacity:0,duration:0.6,delay:0.25});
        }catch(e){console.warn(e)}
    }
    // restore theme preference
    const preferred = localStorage.getItem('light-mode') === 'true';
    setTheme(preferred);
    // insert year
    const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
});

// Export functions for inline calls
window.submitContact = submitContact;
window.resetForm = resetForm;

// Email obfuscation - reveals email on click
document.getElementById('email-display')?.addEventListener('click', function() {
    const user = 'konateallamanhamed';
    const domain = 'gmail.com';
    this.textContent = user + '@' + domain;
    this.style.cursor = 'text';
});
