(function(){
  var root=document.documentElement;
  function get(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function set(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  var darkMQ=matchMedia('(prefers-color-scheme: dark)');
  function isDark(){var t=root.getAttribute('data-theme'); return t?t==='dark':darkMQ.matches;}

  var t=get('theme'); if(t) root.setAttribute('data-theme',t);
  var tb=document.getElementById('theme');
  if(tb) tb.addEventListener('click',function(){
    var next=isDark()?'light':'dark'; root.setAttribute('data-theme',next); set('theme',next);
  });

  /* Loops play only while on screen; reduced motion keeps the poster. */
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var vids=document.querySelectorAll('video[data-auto]');
  if(!('IntersectionObserver' in window)){vids.forEach(function(v){v.play().catch(function(){});});return;}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) e.target.play().catch(function(){}); else e.target.pause(); });
  },{threshold:.25});
  vids.forEach(function(v){io.observe(v);});
})();
