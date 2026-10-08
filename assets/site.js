(function(){
  /* Loops play only while on screen; reduced motion keeps the poster. */
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var vids=document.querySelectorAll('video[data-auto]');
  if(!('IntersectionObserver' in window)){vids.forEach(function(v){v.play().catch(function(){});});return;}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) e.target.play().catch(function(){}); else e.target.pause(); });
  },{threshold:.25});
  vids.forEach(function(v){io.observe(v);});
})();
