// ===== SHARED SUPABASE DATA LOADER — CV RAZKA PRATAMA MANDIRI =====
// Include this at the end of any page's <script> block

(function(){
const SB_URL='https://ncidonlsvxndynssback.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaWRvbmxzdnhuZHluc3NiYWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5Njg0NjgsImV4cCI6MjEwMDU0NDQ2OH0.yqEsaE7tu14lrYa4gleyLLVfyhlw7UB2HfAIUYkzgD0';

let _sb=null;

// Try local vendor bundle first, then CDN fallback
function loadSupabase(){
return new Promise(r=>{
if(window.supabase&&window.supabase.createClient){r(true);return}
const s=document.createElement('script');
s.src='vendor/supabase.min.js';
let done=false;
let cdnTimer=null;
const t=setTimeout(()=>{
if(done)return;
console.warn('Local supabase bundle not found, trying CDN...');
const s2=document.createElement('script');
s2.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
cdnTimer=setTimeout(()=>{if(!done){done=true;r(false)}},6000);
s2.onload=()=>{if(!done){done=true;if(cdnTimer)clearTimeout(cdnTimer);r(true)}};
s2.onerror=()=>{if(!done){done=true;if(cdnTimer)clearTimeout(cdnTimer);r(false)}};
document.head.appendChild(s2);
},2000);
s.onload=()=>{if(!done){done=true;clearTimeout(t);if(cdnTimer)clearTimeout(cdnTimer);r(true)}};
s.onerror=()=>{console.warn('Local supabase not found (404), waiting for CDN fallback...')};
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

async function getPracticeAreas(){
if(!_sb)return[];
try{const{data}=await _sb.from('practice_areas').select('*').order('sort_order');return data||[]}
catch(e){return[]}
}

async function getClients(){
if(!_sb)return[];
try{const{data}=await _sb.from('clients').select('*').order('sort_order');return data||[]}
catch(e){return[]}
}

async function getHotspots(){
if(!_sb)return[];
try{const{data}=await _sb.from('hotspots').select('*').order('sort_order');return data||[]}
catch(e){return[]}
}

async function getArticles(){
if(!_sb)return[];
try{const{data}=await _sb.from('articles').select('*').order('created_at',{ascending:false});return data||[]}
catch(e){return[]}
}

// Update footer + navbar company info on all pages
function updateFooter(company){
if(!company)return;
const name=company.name||'CV RAZKA PRATAMA MANDIRI';
const short=company.short||'RAZKA PRATAMA';
const wa=company.whatsapp||'6282234613934';
const email=company.email||'pratamamandiri945@gmail.com';
const year=company.year||'2016';// Update navbar brand
document.querySelectorAll('.navbar-brand').forEach(el=>{
const icon=el.querySelector('.brand-icon');
if(icon)el.innerHTML=icon.outerHTML+' CV <span>'+short.replace(/^CV /,'')+'</span>';
});
// Update footer brand name
document.querySelectorAll('.footer-brand h3').forEach(el=>{
if(el.innerHTML.includes('RAZKA'))el.innerHTML='CV <span>'+short.replace(/^CV /,'')+'</span>';
});
// Update footer contact links
document.querySelectorAll('.footer-col a[href*="wa.me"]').forEach(a=>{
a.href=`https://wa.me/${wa.replace(/[^0-9]/g,'')}`;
});
document.querySelectorAll('.footer-col a[href*="mailto"]').forEach(a=>{
a.href=`mailto:${email}`;
a.innerHTML=`<i class="fas fa-envelope"></i> ${email}`;
});
// Update copyright year
document.querySelectorAll('.footer-bottom p').forEach(p=>{
if(p.textContent.includes('202'))p.innerHTML=p.innerHTML.replace(/\d{4}/,new Date().getFullYear());
});
// Update WA float links
document.querySelectorAll('.wa-float').forEach(a=>{
const cleanWa=wa.replace(/[^0-9]/g,'');
const text=a.getAttribute('href')?.includes('konsultasi')?'konsultasi%20proyek':'';
a.href=`https://wa.me/${cleanWa}?text=Halo%20${encodeURIComponent(name)}%2C%20saya%20ingin%20${text}`;
});
}

// Render services on any page
function renderServices(services){
const grid=document.querySelector('.services-grid');
if(!grid||!services.length)return;
const icons=['drafting-compass','paint-roller','pencil-ruler','tools','hard-hat','ruler-combined'];
grid.innerHTML=services.map((s,i)=>{
const icon=s.icon||icons[i%icons.length];
return `<div class="service-card reveal reveal-delay-${(i%4)+1}">
<span class="service-number">${String(i+1).padStart(2,'0')}</span>
<div class="service-icon"><i class="fas fa-${icon}"></i></div>
<h3>${s.name}</h3>
<p>${s.description||''}</p>
<a href="layanan.html#${(s.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}" class="service-link">Selengkapnya <i class="fas fa-arrow-right"></i></a>
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
grid.innerHTML=items.map((p,i)=>`<div class="portfolio-card reveal reveal-delay-${(i%4)+1}" data-category="${p.category||'residensial'}">
<div class="portfolio-bg" style="background-image:url('${p.image_url||'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'}')"></div>
<div class="portfolio-overlay"></div>
<div class="portfolio-info">
<div class="portfolio-icon" style="background:${catBgColors[p.category]||catBgColors.residensial};color:${catColors[p.category]||catColors.residensial}"><i class="fas fa-${icons[p.category]||icons.residensial}"></i></div>
<h3>${p.name}</h3>
<p>${p.description||''}</p>
<span class="portfolio-tag" style="color:${catColors[p.category]||catColors.residensial};background:${catBgColors[p.category]||catBgColors.residensial}">${p.location||'Banyuwangi'}${p.year?', '+p.year:''}</span>
</div></div>`).join('');
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
// Re-init carousel
initTestimonialCarousel();
}

// Render articles on index.html
function renderArticles(items){
const grid=document.querySelector('.articles-grid');
if(!grid||!items.length)return;
globalThis._articlesData=items;
grid.innerHTML=items.map((a,i)=>`<div class="article-card reveal reveal-delay-${(i%3)+1}" onclick="openArtModal(${i})" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openArtModal(${i})">
${a.image_url?`<div class="article-img" style="background-image:url('${a.image_url}')"></div>`:''}
<div class="article-body">
<span class="article-date">${a.date||''}</span>
<h3>${a.title}</h3>
<p>${a.content?((a.content.length>120?a.content.slice(0,120)+'...':a.content)):''}</p>
${a.status==='published'?'<span class="article-tag">Artikel</span>':''}
</div></div>`).join('');
}

// Open article modal
function openArtModal(idx){
const data=globalThis._articlesData;
if(!data||!data[idx])return;
const a=data[idx];
const overlay=document.getElementById('artModalOverlay');
const img=document.getElementById('artModalImg');
const date=document.getElementById('artModalDate');
const title=document.getElementById('artModalTitle');
const content=document.getElementById('artModalContent');
const shareFb=document.getElementById('shareFb');
const shareWa=document.getElementById('shareWa');
const shareTw=document.getElementById('shareTw');
const shareLink=document.getElementById('shareLink');
if(!overlay)return;
if(img)img.style.backgroundImage=`url('${a.image_url||'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80'}')`;
if(date)date.querySelector('span').textContent=a.date||'';
if(title)title.textContent=a.title||'';
if(content){
// Support basic HTML formatting
let html=(a.content||'').replace(/\n/g,'<br>');
// Convert **bold** to <strong>
html=html.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
// Convert *italic* to <em>
html=html.replace(/\*(.*?)\*/g,'<em>$1</em>');
content.innerHTML='<p>'+html+'</p>';
}
// Set share URLs
const pageUrl=encodeURIComponent(window.location.href.split('?')[0]);
const shareText=encodeURIComponent(a.title||'Artikel CV RAZKA PRATAMA MANDIRI');
if(shareFb)shareFb.href=`https://facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;
if(shareWa)shareWa.href=`https://api.whatsapp.com/send?text=${shareText}%20-%20${pageUrl}`;
if(shareTw)shareTw.href=`https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`;
if(shareLink){
shareLink.onclick=function(e){
e.preventDefault();
navigator.clipboard.writeText(window.location.href.split('?')[0]).then(()=>{
const orig=this.innerHTML;
this.innerHTML='<i class="fas fa-check"></i>';
setTimeout(()=>this.innerHTML=orig,2000);
}).catch(()=>{});
};
}
overlay.classList.add('open');
document.body.style.overflow='hidden';
}

// Close article modal
function closeArtModal(){
const overlay=document.getElementById('artModalOverlay');
if(!overlay)return;
overlay.classList.remove('open');
document.body.style.overflow='';
}

// Close on Escape key
document.addEventListener('keydown',function(e){
if(e.key==='Escape')closeArtModal();
});

// Expose modal functions globally for onclick handlers
window.openArtModal=openArtModal;
window.closeArtModal=closeArtModal;
window.openPAModal=window.openPAModal||function(i){
if(!window._paData||!window._paData[i])return;
var p=window._paData[i];
var overlay=document.querySelector('.pa-modal-overlay');
if(!overlay)return;
overlay.querySelector('.pa-modal-img').style.backgroundImage="url('"+(p.image_url||'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80')+"')";
overlay.querySelector('.pa-modal-tag').textContent=p.tag||'Keahlian';
overlay.querySelector('h2').innerHTML='<span class="pm-icon" style="background:'+(p.icon_color||'#e63946')+';color:#fff"><i class="'+p.icon+'"></i></span> '+p.title;
overlay.querySelector('.pm-desc').textContent=p.description||'';
if(p.features&&p.features.length){
overlay.querySelector('.pm-features').innerHTML=p.features.map(function(f){return '<li><i class="fas fa-check-circle" style="color:'+(p.icon_color||'#e63946')+'"></i> '+f+'</li>'}).join('');
}
if(p.stats&&p.stats.length){
overlay.querySelector('.pm-stats').innerHTML=p.stats.map(function(s){return '<div class="pm-stat"><h4 style="color:'+(p.icon_color||'#e63946')+'">'+s.value+'</h4><p>'+s.label+'</p></div>'}).join('');
}
overlay.classList.add('open');
document.body.style.overflow='hidden';
};
window.closePAModal=window.closePAModal||function(){
var overlay=document.querySelector('.pa-modal-overlay');
if(overlay){overlay.classList.remove('open');document.body.style.overflow='';}
};

// Init testimonial carousel
function initTestimonialCarousel(){
const track=document.getElementById('testimonialTrack');
const dotsContainer=document.getElementById('testDots');
if(!track)return;
const slides=track.querySelectorAll('.testimonial-slide');
if(slides.length<2)return;
let idx=0,autoTimer=null;
function goTo(i){
idx=(i+slides.length)%slides.length;
track.style.transform=`translateX(-${idx*100}%)`;
document.querySelectorAll('.testimonial-dot').forEach((d,j)=>d.classList.toggle('active',j===idx));
}
function nextSlide(){goTo(idx+1)}
function prevSlide(){goTo(idx-1)}
// Wire up controls
document.querySelectorAll('.testimonial-btn.prev').forEach(b=>b.addEventListener('click',prevSlide));
document.querySelectorAll('.testimonial-btn.next').forEach(b=>b.addEventListener('click',nextSlide));
document.querySelectorAll('.testimonial-dot').forEach((d,i)=>d.addEventListener('click',()=>goTo(i)));
// Auto-play
function startAuto(){stopAuto();autoTimer=setInterval(nextSlide,5000)}
function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null}}
track.parentElement.addEventListener('mouseenter',stopAuto);
track.parentElement.addEventListener('mouseleave',startAuto);
startAuto();
}

// Apply hero overlay opacity
function applyHeroOverlay(opacity){
const overlay=document.querySelector('.hero-bg-overlay');
if(!overlay)return;
const o=parseFloat(opacity)||.88;
const isMobile=window.innerWidth<=480;
const angle=isMobile?'0deg':'135deg';
overlay.style.background=`linear-gradient(${angle},rgba(8,14,26,${o}) 0%,rgba(8,14,26,${Math.min(o-.28,.6)}) 40%,rgba(8,14,26,${Math.min(o-.58,.3)}) 70%,transparent 100%),linear-gradient(0deg,rgba(8,14,26,${o}) 0%,transparent 50%)`;
}

// Apply SEO keywords
function applySeoKeywords(keywords){
if(!keywords)return;
const kw=document.querySelector('meta[name="keywords"]');
if(kw)kw.content=keywords;
}

// Apply company year to hero stats
function applyCompanyYear(year){
if(!year)return;
const currentYear=new Date().getFullYear();
const exp=currentYear-parseInt(year);
if(exp>0){
document.querySelectorAll('.hero-stat .counter').forEach(el=>{
const idx=Array.from(el.closest('.hero-stat').parentElement.children).indexOf(el.closest('.hero-stat'));
if(idx===0&&el.dataset.target)el.dataset.target=exp;
});
}
}

// Render service detail on layanan.html
function renderServiceDetail(services){
const container=document.querySelector('#serviceDetailContent');
if(!container||!services.length)return;
const icons=['drafting-compass','paint-roller','pencil-ruler','tools','hard-hat','ruler-combined'];
const images=['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80','https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80'];
container.innerHTML=services.map((s,i)=>{
const reverse=i%2===1?' reverse':'';
const img=s.image_url||images[i%images.length];
const anchor=(s.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
return `<div class="service-detail-grid${reverse} reveal" id="${anchor}">
<div class="service-detail-text">
<span class="section-label">${String(i+1).padStart(2,'0')}</span>
<h2 class="section-title">${s.name}</h2>
<p>${s.description||''}</p>
<ul class="service-features">
<li><i class="fas fa-check"></i> Konsultasi awal gratis</li>
<li><i class="fas fa-check"></i> Tenaga ahli berpengalaman</li>
<li><i class="fas fa-check"></i> Material berkualitas</li>
<li><i class="fas fa-check"></i> Tepat waktu & transparan</li>
</ul>
</div>
<div class="service-detail-img"><img src="${img}" alt="${s.name}"></div>
</div>`;
}).join('');
}

// Render company profile on tentang.html
function renderCompanyProfile(company){
if(!company)return;
const name=company.name||'CV RAZKA PRATAMA MANDIRI';
const address=company.address||'';
const year=company.year||'2016';
const wa=company.whatsapp||'6282234613934';
// Update about page company info
const profileSection=document.querySelector('#companyProfile');
if(profileSection){
const h2=profileSection.querySelector('h2');
if(h2)h2.innerHTML=name.replace('CV ','').replace(' MANDIRI','').trim()+' <span class="highlight">MANDIRI</span>';
const paragraphs=profileSection.querySelectorAll('p');
if(paragraphs.length>0){
paragraphs[0].innerHTML=name+' adalah perusahaan kontraktor bangunan dan infrastruktur yang berdomisili di '+(address||'Banyuwangi, Jawa Timur')+'.';
}
if(paragraphs.length>2){
paragraphs[2].innerHTML='Berdiri sejak tahun '+year+', kami telah berpengalaman dalam menangani berbagai proyek konstruksi, mulai dari pekerjaan sipil, renovasi bangunan, hingga infrastruktur pemerintah. Kami berkomitmen untuk mewujudkan konstruksi yang solid, presisi, dan tepat waktu.';
}
}
}

// Render practice areas on index.html
function hexToRgba(hex,alpha){
if(!hex||!hex.startsWith('#'))return 'rgba(230,57,70,'+alpha+')';
const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
return 'rgba('+r+','+g+','+b+','+alpha+')';
}

function renderPracticeAreas(items){
const grid=document.querySelector('.pa-grid');
if(!grid||!items.length)return;
grid.innerHTML=items.map((p,i)=>`
<div class="pa-card reveal reveal-delay-${(i%4)+1}" onclick="openPAModal(${i})" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openPAModal(${i})">
<div class="pa-img" style="background-image:url('${p.image_url||'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80'}');background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#0c1525"></div>
<div class="pa-body">
<div class="pa-icon" style="color:${p.icon_color||'#e63946'};background:${hexToRgba(p.icon_color,'.15')}"><i class="${p.icon||'fas fa-landmark'}"></i></div>
<h3>${p.title}</h3>
<p>${p.description||''}</p>
<span class="pa-tag" style="color:${p.tag_color||'#e63946'};background:${hexToRgba(p.tag_color,'.1')}">${p.tag||'Keahlian'}</span>
</div></div>
`).join('');
// Update PA modal data
window._paData=items;
}

// Render hotspots on index.html
function renderHotspots(items){
const wrapper=document.querySelector('.hotspot-wrapper .hotspot-img-placeholder');
if(!wrapper||!items.length)return;
// Remove existing hotspot dots
wrapper.querySelectorAll('.hotspot-dot').forEach(d=>d.remove());
items.forEach((h,i)=>{
const dot=document.createElement('div');
dot.className='hotspot-dot hotspot-dot-'+(i+1);
dot.style.top=h.position_top+'%';
dot.style.left=h.position_left+'%';
if(i>0)dot.style.animationDelay=(i*.5)+'s';
dot.innerHTML='<i class="fas fa-plus"></i><div class="hotspot-tooltip"><h4>'+h.title+'</h4><p>'+(h.description||'')+'</p></div>';
wrapper.appendChild(dot);
});
}

// Render clients on index.html
function renderClients(items){
const grid=document.querySelector('.clients-grid');
if(!grid||!items.length)return;
grid.innerHTML=items.map(c=>`
<div class="client-card">
<div class="client-icon"><i class="${c.icon_class||'fas fa-building'}"></i></div>
<span>${c.name||''}</span>
</div>
`).join('');
}

// Render marquee on index.html
function renderMarquee(items){
const track=document.querySelector('.marquee-track');
if(!track||!items||!items.length)return;
const name='CV RAZKA PRATAMA MANDIRI';
const itemsHtml=items.map(text=>`<div class="marquee-item"><span class="dot"></span>${text}</div>`).join('');
track.innerHTML=`<div class="marquee-item"><span class="dot"></span><strong>${name}</strong> — Kontraktor Bangunan & Infrastruktur Pemerintah Terpercaya</div>${itemsHtml}${itemsHtml}`;
}

// Render before/after on index.html
function renderBeforeAfter(ba){
if(!ba)return;
const wrapper=document.getElementById('baWrapper');
if(!wrapper)return;
const before=wrapper.querySelector('.ba-before');
const after=wrapper.querySelector('.ba-after');
if(before&&ba.before_url)before.style.backgroundImage=`url('${ba.before_url}')`;
if(after&&ba.after_url)after.style.backgroundImage=`url('${ba.after_url}')`;
const labels=wrapper.querySelectorAll('.ba-label');
if(labels.length>0&&ba.label_before)labels[0].textContent=ba.label_before;
if(labels.length>1&&ba.label_after)labels[1].textContent=ba.label_after;
}

// ===== MAIN DATA LOADER =====
async function loadData(){
const ok=await initSB();
if(!ok)return;
// Fetch all settings in parallel
const[company,hero,seo,overlay]=await Promise.all([
getSetting('company'),getSetting('hero'),getSetting('seo'),getSetting('overlay')
]);
// Update footer + navbar with company info
updateFooter(company);
// Apply hero settings on index.html
if(hero){
const bg=document.getElementById('heroBg');
if(bg&&hero.bg_url){
bg.style.backgroundImage=`url('${hero.bg_url}')`;
bg.style.backgroundPosition='center center';
}
const badge=document.querySelector('.hero-badge');
if(badge&&hero.badge)badge.innerHTML=`<i class="fas fa-hard-hat"></i> ${hero.badge}`;
const h1=document.querySelector('.hero h1');
if(h1&&hero.title){
const parts=hero.title.split(/(Terpercaya|Banyuwangi)/);
if(parts.length>1)h1.innerHTML=`${parts[0]}<br><span class="highlight">${parts[1]}</span>${parts.slice(2).join('')}`;
else h1.innerHTML=hero.title;
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
// Apply hero overlay opacity
if(hero.overlay_opacity!=null)applyHeroOverlay(hero.overlay_opacity);
}
// Apply SEO settings
if(seo){
if(seo.title)document.title=seo.title;
const desc=document.querySelector('meta[name="description"]');
if(desc&&seo.description)desc.content=seo.description;
if(seo.keywords)applySeoKeywords(seo.keywords);
const ogTitle=document.querySelector('meta[property="og:title"]');
if(ogTitle&&seo.title)ogTitle.content=seo.title;
const ogDesc=document.querySelector('meta[property="og:description"]');
if(ogDesc&&seo.description)ogDesc.content=seo.description;
const ogImg=document.querySelector('meta[property="og:image"]');
if(ogImg&&seo.og_image)ogImg.content=seo.og_image;
}
// Apply company year to hero stats
if(company&&company.year)applyCompanyYear(company.year);
// Fetch and render services
const services=await getServices();
renderServices(services);
renderServiceDetail(services);
// Fetch and render portfolio
const portfolio=await getPortfolio();
renderPortfolio(portfolio,'portfolioGrid');
// Re-init portfolio filter buttons
document.querySelectorAll('.portfolio-filter-btn').forEach(btn=>{
btn.addEventListener('click',function(){
document.querySelectorAll('.portfolio-filter-btn').forEach(b=>b.classList.remove('active'));
this.classList.add('active');
const f=this.dataset.filter;
document.querySelectorAll('.portfolio-card').forEach(c=>{
if(f==='all'||c.dataset.category===f){c.classList.remove('hidden')}
else{c.classList.add('hidden')}
});
});
});
// Fetch and render testimonials
const testimonials=await getTestimonials();
renderTestimonials(testimonials);
// Fetch and render practice areas
const practiceAreas=await getPracticeAreas();
renderPracticeAreas(practiceAreas);

// Fetch and render clients
const clients=await getClients();
renderClients(clients);

// Fetch marquee & beforeafter settings
const[marquee,beforeafter]=await Promise.all([
getSetting('marquee'),getSetting('beforeafter')
]);
renderMarquee(marquee);
renderBeforeAfter(beforeafter);

// Fetch and render articles
const articles=await getArticles();
renderArticles(articles);
// Apply overlay settings (practice-area section)
if(overlay){
const paSection=document.querySelector('.practice-area')||document.querySelector('.pa-section');
if(paSection){
const bg=paSection.querySelector('.pa-bg')||paSection.querySelector('.hero-bg');
if(overlay.bg_url&&bg)bg.style.backgroundImage=`url('${overlay.bg_url}')`;
const label=paSection.querySelector('.section-label');
if(label&&overlay.title)label.innerHTML=`<i class="fas fa-briefcase"></i> ${overlay.title}`;
const subtitle=paSection.querySelector('.section-subtitle');
if(subtitle&&overlay.description)subtitle.textContent=overlay.description;
}
}
// Render company profile on tentang.html
renderCompanyProfile(company);
// Update contact page company info
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
// Re-observe reveal elements after dynamic rendering
const obs=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

// Auto-run after page load
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadData);
else loadData();
})();
