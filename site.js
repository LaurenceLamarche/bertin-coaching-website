// Shared nav + reveal + mouse FX for all subpages
(function(){
  // NAV
  window.addEventListener('scroll',()=>{
    const n = document.getElementById('nav');
    if(n) n.classList.toggle('scrolled', window.scrollY>20);
  });
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('active'));
    document.addEventListener('click',(e)=>{
      if(!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) mobileMenu.classList.remove('active');
    });
  }

  // REVEAL
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.08, rootMargin:'0px 0px -5% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // MOUSE FOLLOW + PARALLAX
  let mx=50, my=30, tx=50, ty=30;
  window.addEventListener('mousemove',(e)=>{
    tx = (e.clientX/window.innerWidth)*100;
    ty = (e.clientY/window.innerHeight)*100;
  }, {passive:true});
  function raf(){
    mx += (tx-mx)*0.06;
    my += (ty-my)*0.06;
    const bg = document.getElementById('bgFx');
    if(bg){
      bg.style.setProperty('--mx', mx+'%');
      bg.style.setProperty('--my', my+'%');
    }
    const heroPhoto = document.querySelector('.page-hero .hero-photo');
    if(heroPhoto){
      const dx = (mx-50)*0.25;
      const dy = (my-30)*0.2;
      heroPhoto.style.transform = `translate3d(${dx}px,${dy}px,0)`;
    }
    requestAnimationFrame(raf);
  }
  raf();
})();
