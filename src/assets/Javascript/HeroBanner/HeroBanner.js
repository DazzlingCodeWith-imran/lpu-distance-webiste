const slidesEl = document.getElementById('slides');
  const dotsEl   = document.getElementById('dots');
  const slides   = slidesEl.querySelectorAll('.slide');
  const total    = slides.length;
  let index      = 0;
  let timer;
 
  for(let i=0;i<total;i++){
    const b = document.createElement('button');
    b.role = 'tab';
    b.setAttribute('aria-label', 'Go to slide '+(i+1));
    if(i===0) b.classList.add('active');
    b.addEventListener('click', ()=>goTo(i));
    dotsEl.appendChild(b);
  }
 
  function render(){
    slidesEl.style.transform = `translate3d(-${index*100}%,0,0)`;
    [...dotsEl.children].forEach((d,i)=>d.classList.toggle('active', i===index));
  }
  function goTo(i){ index=(i+total)%total; render(); resetTimer(); }
  function next(){ goTo(index+1); }
  function prev(){ goTo(index-1); }
  function resetTimer(){ clearInterval(timer); timer=setInterval(next, 5500); }
 
  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);
 
  render();
  resetTimer();
 
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    clearInterval(timer);
    document.getElementById('heroContent').style.animation = 'none';
    document.querySelectorAll('.eyebrow,.hero-title,.hero-subtitle,.cta-row,.badge-strip').forEach(el=>{
      el.style.opacity = 1; el.style.transform = 'none'; el.style.animation = 'none';
    });
  }