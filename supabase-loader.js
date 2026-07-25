// ===== SHARED SUPABASE DATA LOADER — CV RAZKA PRATAMA MANDIRI =====
// Include this at the end of any page's <script> block

(function(){
const SB_URL='https://ncidonlsvxndynssback.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaWRvbmxzdnhuZHluc3NiYWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5Njg0NjgsImV4cCI6MjEwMDU0NDQ2OH0.yqEsaE7tu14lrYa4gleyLLVfyhlw7UB2HfAIUYkzgD0';

let _sb=null;

function loadSupabase(){
return new Promise(r=>{
if(window.supabase&&window.supabase.createClient){r(true);return}
const s=document.createElement('script');
s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
let done=false;
const t=setTimeout(()=>{if(!done){done=true;r(false)}},4000);
s.onload=()=>{if(!done){done=true;clearTimeout(t);r(true)}};
s.onerror=()=>{if(!done){done=true;clearTimeout(t);r(false)}};
document.head.appendChild(s);
});
}

async function initSB(){
const ok=await loadSupabase();
if(!ok)return false;
try{_sb=window.supabase.createClient(SB_URL,SB_KEY);return true}
catch(e){return false}
}

async function getSetting(key){
if(!_sb)return null;
try{const{data}=await _sb.from('settings').select('value').eq('key',key).single();return data?.value||null}
catch(e){return null}
}

async function getServices(){
if(!_sb)return[];
try{const{data}=await _sb.from('services').select('*').order('sort_order');return data||[]}
catch(e){return[]}
}

async function getPortfolio(){
if(!_sb)return[];
try{const{data}=await _sb.from('portfolio').select('*').order('sort_order');return data||[]}
catch(e){return[]}
}

async function getTestimonials(){
if(!_sb)return[];
try{const{data}=await _sb.from('testimonials').select('*').order('sort_order');return data||[]}
catch(e){return[]}
}

// Update footer company info on all pages
function updateFooter(company){
if(!company)return;
const name=company.name||'CV RAZKA PRATAMA MANDIRI';
const short=company.short||'RAZKA PRATAMA';
const wa=company.whatsapp||'6282234613934';
const email=company.email||'pratamamandiri945@gmail.com';
const year=company.year||'2016';
// Update footer brand name
document.querySelectorAll('.footer-brand h3').forEach(el=>{
if(el.innerHTML.includes('RAZKA'))el.innerHTML=name.replace('CV ','CV <span>').replace(' MANDIRI','</span> MANDIRI')||el.innerHTML;
});
// Update footer contact links
document.querySelectorAll('.footer-col a[href*="wa.me"]').forEach(a=>{
a.href=`https://wa.me/${wa.replace(/[^0-9]/g,'')}`;
const txt=a.textContent.replace(/[\d\s\-]+$/,'').trim();
a.innerHTML=`<i class="fab fa-whatsapp"></i> ${wa.replace(/(\d{4})(\d{4})(\d{4})/,'$1 $2 $3')}`;
});
document.querySelectorAll('.footer-col a[href*="mailto"]').forEach(a=>{
a.href=`mailto:${email}`;
a.innerHTML=`<i class="fas fa-envelope"></i> ${email}`;
});
// Update copyright year
document.querySelectorAll('.footer-bottom p').forEach(p=>{
if(p.textContent.includes('202'))p.innerHTML=p.innerHTML.replace(/\d{4}/,new Date().getFullYear());
});
// Update WA float links on all pages
document.querySelectorAll('.wa-float, .hero-actions a[href*="wa.me"], a.btn-3d[href*="wa.me"]').forEach(a=>{
const cleanWa=wa.replace(/[^0-9]/g,'');
const text=a.getAttribute('href')?.includes('konsultasi')?'konsultasi%20proyek':'';
a.href=`https://wa.me/${cleanWa}?text=Halo%20${encodeURIComponent(name)}%2C%20saya%20ingin%20${text}`;
});
}

// Render services on index.html
function renderServices(services){
const grid=document.querySelector('.services-grid');
if(!grid||!services.length)return;
grid.innerHTML=services.map((s,i)=>{
const icons=['drafting-compass','paint-roller','pencil-ruler','tools','hard-hat','ruler-combined'];
const icon=s.icon||icons[i%icons.length];
return `<div class="service-card reveal reveal-delay-${(i%4)+1}">
<span class="service-number">${String(i+1).padStart(2,'0')}</span>
<div class="service-icon"><i class="fas fa-${icon}"></i></div>
<h3>${s.name}</h3>
<p>${s.description||''}</p>
<a href="layanan.html" class="service-link">Selengkapnya <i class="fas fa-arrow-right"></i></a>
</div>`;
}).join('');
}

// Render portfolio on index or portofolio.html
function renderPortfolio(items,gridId){
const grid=document.getElementById(gridId||'portfolioGrid');
if(!grid||!items.length)return;
const catColors={pemerintah:'#34d399',komersial:'#60a5fa',residensial:'#e63946'};
const catBgColors={pemerintah:'rgba(16,185,129,.15)',komersial:'rgba(59,130,246,.15)',residensial:'rgba(230,57,70,.15)'};
const icons={pemerintah:'landmark',komersial:'warehouse',residensial:'home'};
const isSubpage=!!document.querySelector('.portfolio-section');
grid.innerHTML=items.map((p,i)=>`<div class="portfolio-card reveal reveal-delay-${(i%4)+1}" data-category="${p.category||'residensial'}"${isSubpage?'':' data-index="'+i+'"'}>
<div class="portfolio-bg" style="background-image:url('${p.image_url||'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'}')"></div>
<div class="portfolio-overlay"></div>
<div class="portfolio-info">
<div class="portfolio-icon" style="background:${catBgColors[p.category]||catBgColors.residensial};color:${catColors[p.category]||catColors.residensial}"><i class="fas fa-${icons[p.category]||icons.residensial}"></i></div>
<h3>${p.name}</h3>
<p>${p.description||''}</p>
<span class="portfolio-tag" style="color:${catColors[p.category]||catColors.residensial};background:${catBgColors[p.category]||catBgColors.residensial}">${p.location||'Banyuwangi'}${p.year?', '+p.year:''}</span>
</div>
</div>`).join('');
}

// Render testimonials on index.html
function renderTestimonials(items){
const track=document.getElementById('testimonialTrack');
const dots=document.getElementById('testDots');
if(!track||!items.length)return;
track.innerHTML=items.map(m=>`<div class="testimonial-slide">
<div class="testimonial-card"><div class="quote">"</div>
<blockquote>${m.quote}</blockquote>
<div class="testimonial-author"><div class="avatar">${(m.client_name||'??').split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
<div class="info"><h4>${m.client_name}</h4><p>${m.position||'Klien'}</p></div></div></div></div>
`).join('');
if(dots)dots.innerHTML=items.map((_,i)=>`<span class="testimonial-dot${i===0?' active':''}"></span>`).join('');
}

// Main data loader for all pages
async function loadData(){
const ok=await initSB();
if(!ok)return;
// Fetch settings
const[company,hero,seo]=await Promise.all([
getSetting('company'),getSetting('hero'),getSetting('seo')
]);
// Update footer with company info
updateFooter(company);
// Update hero section on index.html
if(hero){
const bg=document.getElementById('heroBg');
if(bg&&hero.bg_url)bg.style.backgroundImage=`url('${hero.bg_url}')`;
const badge=document.querySelector('.hero-badge');
if(badge&&hero.badge)badge.innerHTML=`<i class="fas fa-hard-hat"></i> ${hero.badge}`;
const h1=document.querySelector('.hero h1');
if(h1&&hero.title){
const parts=hero.title.split(/(Terpercaya|Banyuwangi)/);
if(parts.length>1)h1.innerHTML=`${parts[0]}<br><span class="highlight">${parts[1]}</span>${parts.slice(2).join('')}`;
}
const subLine=document.querySelector('.hero h1 .sub-line');
if(subLine&&hero.subtitle)subLine.textContent=hero.subtitle;
const desc=document.querySelector('.hero p');
if(desc&&hero.description)desc.innerHTML=hero.description.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
const ctaBtn=document.querySelector('.hero-actions .btn-primary');
if(ctaBtn&&hero.cta){
const wa=(company?.whatsapp||'6282234613934').replace(/[^0-9]/g,'');
const text=encodeURIComponent(ctaBtn.getAttribute('href')?.split('?text=')[1]||'');
ctaBtn.innerHTML=`<i class="fab fa-whatsapp"></i> ${hero.cta}`;
ctaBtn.href=`https://wa.me/${wa}?text=${text}`;
}
// Update meta tags
if(seo){
if(seo.title)document.title=seo.title;
const desc=document.querySelector('meta[name="description"]');
if(desc&&seo.description)desc.content=seo.description;
const ogTitle=document.querySelector('meta[property="og:title"]');
if(ogTitle&&seo.title)ogTitle.content=seo.title;
const ogDesc=document.querySelector('meta[property="og:description"]');
if(ogDesc&&seo.description)ogDesc.content=seo.description;
const ogImg=document.querySelector('meta[property="og:image"]');
if(ogImg&&seo.og_image)ogImg.content=seo.og_image;
}
}
// Fetch and render services (index.html)
const services=await getServices();
renderServices(services);
// Fetch and render portfolio
const portfolio=await getPortfolio();
renderPortfolio(portfolio,'portfolioGrid');
// Re-init filter buttons on portofolio page
document.querySelectorAll('.portfolio-filter-btn').forEach(btn=>{
btn.addEventListener('click',function(){
document.querySelectorAll('.portfolio-filter-btn').forEach(b=>b.classList.remove('active'));
this.classList.add('active');
const f=this.dataset.filter;
document.querySelectorAll('.portfolio-card').forEach(c=>{
if(f==='all'||c.dataset.category===f){c.classList.remove('hidden');c.classList.add('visible')}
else{c.classList.add('hidden');c.classList.remove('visible')}
});
});
});
// Fetch and render testimonials (index.html)
const testimonials=await getTestimonials();
renderTestimonials(testimonials);
// Update contact page info
if(company){
document.querySelectorAll('.contact-item').forEach(item=>{
const label=item.querySelector('h4')?.textContent||'';
if(label.includes('Alamat')&&company.address){
const p=item.querySelector('p');
if(p)p.innerHTML=company.address.replace(/,/g,',<br>');
}
if(label.includes('WhatsApp')&&company.whatsapp){
const wa=company.whatsapp.replace(/[^0-9]/g,'');
item.querySelectorAll('a[href*="wa.me"]').forEach(a=>{
a.href=`https://wa.me/${wa}`;
});
}
if(label.includes('Email')&&company.email){
const a=item.querySelector('a');
if(a){a.href=`mailto:${company.email}`;a.textContent=company.email}
}
if(label.includes('Jam')&&company.hours){
const p=item.querySelector('p');
if(p)p.innerHTML=company.hours.replace(/\n/g,'<br>');
}
});
}
}

// Auto-run after page load
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadData);
else loadData();
})();
