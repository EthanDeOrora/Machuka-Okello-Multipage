/* =============================================
   PROGRESS BAR
============================================= */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = (docH > 0 ? scrollTop / docH * 100 : 0) + '%';
});

/* =============================================
   NAVBAR
============================================= */
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
});

/* =============================================
   ACTIVE NAV LINK (by current page)
============================================= */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links-center a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
    if (href === 'about.html'    && page === 'about.html')    a.classList.add('active');
    if (href === 'practice.html' && page === 'practice.html') a.classList.add('active');
    if (href === 'team.html'     && page === 'team.html')     a.classList.add('active');
    if (href === 'insights.html' && page === 'insights.html') a.classList.add('active');
    if (href === 'contact.html'  && page === 'contact.html')  a.classList.add('active');
  });
})();

/* =============================================
   MOBILE MENU
============================================= */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-nav');
  const btn  = document.getElementById('nav-hamburger');
  if (menu) menu.classList.toggle('open');
  if (btn)  btn.classList.toggle('open');
}

/* =============================================
   SCROLL ANIMATIONS
============================================= */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up, .fade-left, .fade-right, .stagger').forEach(el => {
  animObserver.observe(el);
});

/* =============================================
   MODAL HELPERS
============================================= */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOnBackdrop(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-bg.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* =============================================
   TOAST
============================================= */
function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* =============================================
   NEWSLETTER
============================================= */
function subscribeNewsletter() {
  const input = document.getElementById('nl-email');
  if (!input || !input.value || !input.value.includes('@')) {
    showToast('Please enter a valid email address.');
    return;
  }
  input.value = '';
  showToast('Subscribed! You\'ll receive our next legal update.');
}

/* =============================================
   CONTACT FORM
============================================= */
function submitContactForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<svg class="spin-anim" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...';
  setTimeout(() => {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').classList.add('show');
    showToast('Message received! We\'ll respond within 24 hours.');
  }, 1600);
}

/* =============================================
   PRACTICE AREA MODAL DATA
============================================= */
const practiceData = [
  {
    title: "Corporate & Commercial Law",
    sub: "We advise businesses at every stage — from inception through growth, restructuring, and exit — ensuring robust legal frameworks that protect and advance commercial interests.",
    list: ["Company incorporations, restructuring & winding up","Mergers, acquisitions & due diligence","Joint ventures & shareholder agreements","Corporate governance & compliance frameworks","Regulatory advisory & licensing","Commercial contracts & negotiations"],
    why: "Our corporate team has advised on some of East Africa's most significant transactions. We combine deep legal knowledge with commercial acumen to deliver solutions that work in practice."
  },
  {
    title: "Litigation & Dispute Resolution",
    sub: "We represent clients across all tiers of court and in alternative dispute resolution forums, pursuing outcomes with strategic precision and tenacious advocacy.",
    list: ["Civil & commercial litigation in all courts","Arbitration (local & international)","Mediation & conciliation","Constitutional & judicial review proceedings","Enforcement of judgments & awards","Class actions & multi-party disputes"],
    why: "Our litigators have an exceptional track record before the High Court, Court of Appeal, and Supreme Court of Kenya, as well as in international arbitration under ICC and LCIA rules."
  },
  {
    title: "Real Estate & Conveyancing",
    sub: "From residential purchases to large-scale commercial developments, we guide clients through every aspect of property law with precision and local expertise.",
    list: ["Sale & purchase transactions","Title searches & due diligence","Mortgage & charge documentation","Lease negotiations & registration","Land dispute resolution","Real estate development advisory"],
    why: "We have completed thousands of property transactions across Kenya. Our deep understanding of National Land Commission processes ensures efficient, risk-free transactions every time."
  },
  {
    title: "Family & Succession Law",
    sub: "We handle sensitive family matters with the discretion, empathy, and expertise they deserve — protecting your interests and those of your loved ones.",
    list: ["Divorce & matrimonial property division","Child custody, maintenance & adoption","Drafting & registration of wills","Probate & letters of administration","Trust formation & administration","Prenuptial & cohabitation agreements"],
    why: "Our family law team understands that every matter is deeply personal. We combine legal precision with genuine compassion, seeking resolution without unnecessary conflict."
  },
  {
    title: "Employment & Labour Law",
    sub: "We assist both employers and employees in navigating Kenya's evolving employment landscape, ensuring fair, compliant, and productive workplace relationships.",
    list: ["Drafting employment contracts & policies","Disciplinary & grievance procedures","Redundancy & retrenchment advisory","Employment & Industrial Court representation","Work permit & immigration advisory","HR audits & compliance reviews"],
    why: "We advise over 120 corporate clients on employment matters. Our team stays at the forefront of labour law developments, ensuring clients are always ahead of regulatory changes."
  },
  {
    title: "Intellectual Property",
    sub: "We protect your creative and commercial assets across East Africa and internationally, enabling you to build, enforce, and monetize your IP portfolio.",
    list: ["Trademark registration & prosecution","Patent filing & protection","Copyright registration & enforcement","IP licensing & commercialization","Domain name disputes","Anti-counterfeiting enforcement"],
    why: "Our IP practice covers the full lifecycle of intellectual assets. We work closely with KIPI and maintain relationships with IP offices across the East African Community."
  },
  {
    title: "Banking & Finance",
    sub: "We advise financial institutions, borrowers, and investors on the full range of financing transactions, from straightforward facilities to complex structured finance.",
    list: ["Loan facility documentation","Project & structured finance","Security creation & registration","Regulatory compliance & CBK advisory","Financial restructuring & insolvency","Capital markets & securities law"],
    why: "Our banking team has extensive experience working with commercial banks, development finance institutions, and private equity firms across East Africa."
  },
  {
    title: "International Trade Law",
    sub: "We advise importers, exporters, and multinationals on the legal dimensions of cross-border commerce, investment, and dispute resolution in East Africa and beyond.",
    list: ["Import & export documentation","Trade finance & letters of credit","EAC & COMESA regulatory compliance","Foreign investment structuring","International commercial arbitration","Anti-dumping & trade remedy proceedings"],
    why: "As East Africa continues to integrate, our international trade practice is ideally positioned. We have represented clients in cross-border disputes under WTO, COMESA, and bilateral investment treaties."
  }
];

function openPracticeModal(index) {
  const d = practiceData[index];
  document.getElementById('pm-title').textContent = d.title;
  document.getElementById('pm-sub').textContent   = d.sub;
  document.getElementById('pm-why').textContent   = d.why;
  document.getElementById('pm-list').innerHTML = d.list.map(i => `<li>${i}</li>`).join('');
  openModal('practice-modal');
}

/* =============================================
   TEAM MODAL DATA
============================================= */
const teamData = [
  {
    name: "James Machuka", role: "Managing Partner", spec: "Corporate & Commercial Law",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    bio: "James Machuka is the founding Managing Partner of Machuka Okello Advocates and one of East Africa's foremost corporate lawyers. With over 10 years of practice, he has advised on landmark transactions across telecommunications, energy, financial services, and real estate. Recognized by leading legal directories as a Band 1 practitioner, James brings a pragmatic, business-first perspective honed as in-house General Counsel for two listed corporations.",
    areas: ["Corporate M&A", "Joint Ventures & Partnerships", "Corporate Governance", "Regulatory & Compliance", "Capital Markets"],
    edu: ["LLM (Commercial Law), University of London","LLB (Hons), University of Nairobi","Advocate of the High Court of Kenya","Fellow, Chartered Institute of Arbitrators"]
  },
  {
    name: "Grace Akinyi", role: "Senior Partner", spec: "Litigation & Dispute Resolution",
    photo: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=300&q=80",
    bio: "Grace Akinyi is widely regarded as one of Kenya's most gifted courtroom advocates. In over 18 years of practice, she has appeared in every tier of the Kenyan judiciary — from the Magistrates' Court to the Supreme Court — as well as in international arbitration proceedings. She is a two-time recipient of the Kenya Bar Association's Outstanding Advocate Award.",
    areas: ["Commercial Litigation", "Constitutional & Public Law", "International Arbitration", "Employment Disputes", "Judicial Review"],
    edu: ["LLM (Dispute Resolution), Harvard Law School","LLB (Hons), Moi University","Advocate of the High Court of Kenya","Accredited Mediator, CEDR"]
  },
  {
    name: "Daniel Okello", role: "Partner", spec: "Real Estate & Conveyancing",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    bio: "Daniel Okello heads the firm's Real Estate practice and has been instrumental in structuring some of Kenya's most significant property transactions over the past 15 years. His deep knowledge of Kenya's land tenure systems, combined with longstanding relationships at the land registry and county government level, ensures swift and effective outcomes.",
    areas: ["Commercial & Residential Conveyancing","Real Estate Development","Property Finance & Security","Land Dispute Resolution","Lease Management"],
    edu: ["LLB (Hons), Kenyatta University","Post-Graduate Diploma in Law, Kenya School of Law","Advocate of the High Court of Kenya","Member, LSK Property Law Committee"]
  },
  {
    name: "Amina Wanjiku", role: "Associate Partner", spec: "Family & Succession Law",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    bio: "Amina Wanjiku brings exceptional empathy and legal precision to sensitive family matters. With 12 years focused exclusively on family law and succession, she has guided hundreds of clients through divorce, custody disputes, estate administration, and succession planning. She is a trained collaborative lawyer and mediator.",
    areas: ["Divorce & Matrimonial Property","Child Custody & Maintenance","Estate Planning & Wills","Probate & Administration","Trusts & Guardianship"],
    edu: ["LLB (Hons), University of Nairobi","Post-Graduate Diploma in Law, Kenya School of Law","Advocate of the High Court of Kenya","Collaborative Law Practitioner Certificate, IACP"]
  }
];

function openTeamModal(index) {
  const d = teamData[index];
  document.getElementById('tm-photo').src   = d.photo;
  document.getElementById('tm-photo').alt   = d.name;
  document.getElementById('tm-name').textContent  = d.name;
  document.getElementById('tm-role').textContent  = d.role;
  document.getElementById('tm-spec').textContent  = d.spec;
  document.getElementById('tm-bio').textContent   = d.bio;
  document.getElementById('tm-areas').innerHTML = d.areas.map(a => `<li>${a}</li>`).join('');
  document.getElementById('tm-edu').innerHTML   = d.edu.map(e => `<li>${e}</li>`).join('');
  openModal('team-modal');
}

/* =============================================
   INSIGHTS — EXPANDABLE
============================================= */
function toggleInsight(id, btn) {
  const body  = document.getElementById(id);
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  btn.classList.toggle('open', !isOpen);
  const textNode = btn.childNodes[0];
  if (textNode) textNode.textContent = isOpen ? 'Read More ' : 'Read Less ';
}

/* =============================================
   HOME: SMOOTH SCROLL
============================================= */
function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}

/* =============================================
   TESTIMONIALS
============================================= */
const testimonials = [
  { text: "Machuka Okello Advocates have been our trusted legal advisors for over a decade. Their expertise in corporate law is unmatched, and their dedication to our company's interests has been instrumental in our growth across the region.", name: "Dr. Eunice Machuka", title: "Animal Researcher" },
  { text: "I was facing a complex land dispute that had been ongoing for years. The team at Machuka Okello resolved it efficiently and professionally. Their knowledge of property law and court procedures is truly exceptional.", name: "Janet Wafula", title: "Business Owner" },
  { text: "From setting up our company structure to navigating complex regulatory frameworks, the firm has been an invaluable partner. They combine deep legal knowledge with practical business sense.", name: "Nancy Marube", title: "CEO, Lekurkuki Ltd" },
  { text: "Machuka Okello Advocates handled my case with professionalism and precision. I felt supported every step of the way.", name: "Phyllis Mwnago", title: "Business Owner" },
  { text: "Their attention to detail and commitment to justice truly sets them apart. Highly recommended.", name: "Abigael Nyanduko", title: "Medical Doctor" }
];
let currentT = 0;

function renderTestimonial() {
  const t = testimonials[currentT];
  const bq = document.querySelector('blockquote');
  const nm = document.getElementById('t-name');
  const ti = document.getElementById('t-title');

  [bq, nm, ti].forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; });

  setTimeout(() => {
    bq.textContent = t.text;
    nm.textContent = t.name;
    ti.textContent = t.title;
    [bq, nm, ti].forEach(el => { el.style.transition = 'opacity .4s ease, transform .4s ease'; el.style.opacity = '1'; el.style.transform = 'none'; });
  }, 300);

  document.getElementById('t-dots').innerHTML = testimonials
    .map((_, i) => `<button class="t-ctrl-dot ${i === currentT ? 'active' : ''}" onclick="goToTestimonial(${i})" aria-label="Testimonial ${i+1}"></button>`)
    .join('');
}

function nextTestimonial() { currentT = (currentT + 1) % testimonials.length; renderTestimonial(); }
function prevTestimonial() { currentT = (currentT - 1 + testimonials.length) % testimonials.length; renderTestimonial(); }
function goToTestimonial(i) { currentT = i; renderTestimonial(); }

renderTestimonial();
setInterval(nextTestimonial, 7000);

/* =============================================
   PAGE TRANSITION EFFECTS
============================================= */
