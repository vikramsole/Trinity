/* =========================================================
   Trinity Global Impex LLP — site.js
   Mobile nav, launch splash, scroll reveal, FAQ, testimonials,
   quote cart, product filters, unit converter, origin tabs,
   gallery lightbox, contact + newsletter forms, back-to-top.
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Launch splash (unchanged behavior) ---------- */
  var splash=document.getElementById('launchSplash');
  var closeBtn=document.getElementById('closeLaunch');
  var enterBtn=document.getElementById('enterWebsite');
  function closeSplash(){
    if(!splash || splash.classList.contains('is-closing')) return;
    splash.classList.add('is-closing');
    document.body.classList.remove('launch-page');
    setTimeout(function(){ splash && splash.remove(); },700);
  }
  if(splash){
    splash.addEventListener('click',closeSplash);
    closeBtn && closeBtn.addEventListener('click',function(e){e.stopPropagation();closeSplash();});
    enterBtn && enterBtn.addEventListener('click',function(e){e.stopPropagation();closeSplash();});
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeSplash(); });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle=document.getElementById('navToggle');
  var navLinks=document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click',function(){
      var open=navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',open?'true':'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
    window.addEventListener('resize',function(){
      if(window.innerWidth>800){
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  /* ---------- Active nav link highlighting ---------- */
  (function highlightActive(){
    var path=(location.pathname.split('/').pop()||'launchMyTrinity.html');
    document.querySelectorAll('.links a[data-page]').forEach(function(a){
      var href=a.getAttribute('href');
      if(href===path || (path==='' && href==='launchMyTrinity.html')){
        a.classList.add('active');
      }
    });
  })();

  /* ---------- Scroll reveal (single deliberate effect) ---------- */
  var revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    },{threshold:.14});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls=document.querySelectorAll('[data-count]');
  function animateCount(el){
    var target=parseFloat(el.getAttribute('data-count'));
    var suffix=el.getAttribute('data-suffix')||'';
    var dur=900, start=null;
    function step(ts){
      if(!start) start=ts;
      var p=Math.min((ts-start)/dur,1);
      var val=Math.floor(target*(1-Math.pow(1-p,3)));
      el.textContent=val+suffix;
      if(p<1) requestAnimationFrame(step); else el.textContent=target+suffix;
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && statEls.length){
    var statIo=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ animateCount(entry.target); statIo.unobserve(entry.target); }
      });
    },{threshold:.5});
    statEls.forEach(function(el){ statIo.observe(el); });
  } else {
    statEls.forEach(function(el){ el.textContent=el.getAttribute('data-count')+(el.getAttribute('data-suffix')||''); });
  }

  /* ---------- Back to top ---------- */
  var topBtn=document.querySelector('.fab-top');
  if(topBtn){
    window.addEventListener('scroll',function(){
      topBtn.classList.toggle('show', window.scrollY>500);
    });
    topBtn.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }

  /* ---------- Toast helper ---------- */
  var toastEl=document.querySelector('.toast');
  var toastTimer=null;
  function showToast(msg){
    if(!toastEl) return;
    toastEl.textContent=msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){ toastEl.classList.remove('show'); },3200);
  }

  /* ---------- FAQ accordions ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q=item.querySelector('.faq-q');
    var a=item.querySelector('.faq-a');
    if(!q||!a) return;
    q.setAttribute('aria-expanded','false');
    q.addEventListener('click',function(){
      var isOpen=item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function(other){
        if(other!==item){
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight=null;
          other.querySelector('.faq-q').setAttribute('aria-expanded','false');
        }
      });
      if(isOpen){
        item.classList.remove('open');
        a.style.maxHeight=null;
        q.setAttribute('aria-expanded','false');
      } else {
        item.classList.add('open');
        a.style.maxHeight=a.scrollHeight+'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  /* ---------- Testimonial slider ---------- */
  document.querySelectorAll('[data-testimonials]').forEach(function(root){
    var track=root.querySelector('.testimonial-slides');
    var slides=root.querySelectorAll('.testimonial-slide');
    var dotsWrap=root.querySelector('.testimonial-dots');
    var idx=0, timer;
    if(!track||!slides.length) return;
    slides.forEach(function(_,i){
      var b=document.createElement('button');
      if(i===0) b.className='active';
      b.setAttribute('aria-label','Show testimonial '+(i+1));
      b.addEventListener('click',function(){ go(i); reset(); });
      dotsWrap && dotsWrap.appendChild(b);
    });
    function go(i){
      idx=(i+slides.length)%slides.length;
      track.style.transform='translateX(-'+(idx*100)+'%)';
      dotsWrap && dotsWrap.querySelectorAll('button').forEach(function(b,bi){ b.classList.toggle('active',bi===idx); });
    }
    function reset(){ clearInterval(timer); timer=setInterval(function(){ go(idx+1); },6000); }
    reset();
  });

  /* ---------- Origin tabs ---------- */
  document.querySelectorAll('[data-origin-tab]').forEach(function(tab){
    tab.addEventListener('click',function(){
      var target=tab.getAttribute('data-origin-tab');
      document.querySelectorAll('[data-origin-tab]').forEach(function(t){ t.classList.remove('active'); });
      document.querySelectorAll('[data-origin-panel]').forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active');
      var panel=document.querySelector('[data-origin-panel="'+target+'"]');
      panel && panel.classList.add('active');
      document.querySelectorAll('.world-map .pin').forEach(function(pin){
        pin.classList.toggle('active', pin.getAttribute('data-pin')===target);
      });
    });
  });
  document.querySelectorAll('.world-map .pin').forEach(function(pin){
    pin.addEventListener('click',function(){
      var region=pin.getAttribute('data-pin');
      var tabBtn=document.querySelector('[data-origin-tab="'+region+'"]');
      tabBtn && tabBtn.click();
      var panelSection=document.getElementById('origin-panels');
      panelSection && panelSection.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  /* ---------- Coffee product filter ---------- */
  var filterBar=document.querySelector('.filter-tabs');
  if(filterBar){
    var filterButtons=filterBar.querySelectorAll('.filter-tab');
    var products=document.querySelectorAll('[data-category]');
    filterButtons.forEach(function(btn){
      btn.addEventListener('click',function(){
        filterButtons.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var cat=btn.getAttribute('data-filter');
        products.forEach(function(p){
          var match = cat==='all' || p.getAttribute('data-category').split(' ').indexOf(cat)>-1;
          p.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Unit converter (kg / lb / 60kg bag / metric ton) ---------- */
  var converter=document.querySelector('[data-converter]');
  if(converter){
    var amountIn=converter.querySelector('[data-c-amount]');
    var unitIn=converter.querySelector('[data-c-unit-in]');
    var unitOut=converter.querySelector('[data-c-unit-out]');
    var resultEl=converter.querySelector('[data-c-result]');
    var swapBtn=converter.querySelector('[data-c-swap]');
    var toKg={kg:1, lb:0.45359237, bag:60, mt:1000};
    function convert(){
      var amount=parseFloat(amountIn.value);
      if(isNaN(amount) || amount<0){ resultEl.textContent='Enter a valid amount above.'; return; }
      var kg=amount*toKg[unitIn.value];
      var out=kg/toKg[unitOut.value];
      var label={kg:'kg',lb:'lb',bag:'60kg bags',mt:'metric tons (MT)'};
      resultEl.textContent=amount+' '+label[unitIn.value]+' ≈ '+ (Math.round(out*1000)/1000) +' '+label[unitOut.value];
    }
    [amountIn,unitIn,unitOut].forEach(function(el){ el.addEventListener('input',convert); el.addEventListener('change',convert); });
    swapBtn && swapBtn.addEventListener('click',function(){
      var tmp=unitIn.value; unitIn.value=unitOut.value; unitOut.value=tmp; convert();
    });
    convert();
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox=document.querySelector('.lightbox');
  if(lightbox){
    var lbImg=lightbox.querySelector('img');
    var lbCaption=lightbox.querySelector('.lightbox-caption');
    var lbClose=lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.gallery button[data-img]').forEach(function(btn){
      btn.addEventListener('click',function(){
        lbImg.src=btn.getAttribute('data-img');
        lbCaption.textContent=btn.getAttribute('data-caption')||'';
        lightbox.classList.add('open');
      });
    });
    function closeLb(){ lightbox.classList.remove('open'); }
    lbClose && lbClose.addEventListener('click',closeLb);
    lightbox.addEventListener('click',function(e){ if(e.target===lightbox) closeLb(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeLb(); });
  }

  /* =========================================================
     QUOTE CART — persisted in localStorage, shared across pages
     ========================================================= */
  var CART_KEY='trinity_quote_cart';
  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch(e){ return []; } }
  function setCart(items){ localStorage.setItem(CART_KEY,JSON.stringify(items)); renderCart(); updateCartCount(); }
  function addToCart(name){
    var cart=getCart();
    var existing=cart.find(function(i){ return i.name===name; });
    if(existing){ existing.qty+=1; } else { cart.push({name:name,qty:1}); }
    setCart(cart);
    showToast(name+' added to your quote request.');
  }
  function updateCartCount(){
    var count=getCart().reduce(function(sum,i){ return sum+i.qty; },0);
    document.querySelectorAll('[data-cart-count]').forEach(function(el){
      el.textContent=count;
      el.style.display = count>0 ? 'flex' : 'none';
    });
  }
  function renderCart(){
    var body=document.querySelector('[data-cart-body]');
    if(!body) return;
    var cart=getCart();
    body.innerHTML='';
    if(!cart.length){
      body.innerHTML='<p class="quote-empty">Your quote list is empty. Browse <a href="coffee.html">Our Coffee</a> and add products you would like a quote for.</p>';
      return;
    }
    cart.forEach(function(item,i){
      var row=document.createElement('div');
      row.className='quote-line';
      row.innerHTML='<span>'+item.name+'</span>'+
        '<span class="quote-line-qty">'+
          '<button type="button" data-dec="'+i+'" aria-label="Decrease quantity">−</button>'+
          '<span>'+item.qty+'</span>'+
          '<button type="button" data-inc="'+i+'" aria-label="Increase quantity">+</button>'+
        '</span>'+
        '<button type="button" class="quote-line-remove" data-remove="'+i+'">Remove</button>';
      body.appendChild(row);
    });
  }
  document.addEventListener('click',function(e){
    var t=e.target;
    if(t.matches('[data-add-quote]')){
      addToCart(t.getAttribute('data-add-quote'));
      t.classList.add('added');
      var original=t.textContent;
      t.textContent='Added ✓';
      setTimeout(function(){ t.textContent=original; t.classList.remove('added'); },1600);
    }
    if(t.matches('[data-inc]')){
      var cart=getCart(); cart[+t.getAttribute('data-inc')].qty+=1; setCart(cart);
    }
    if(t.matches('[data-dec]')){
      var cart=getCart(); var i=+t.getAttribute('data-dec');
      cart[i].qty-=1; if(cart[i].qty<=0) cart.splice(i,1);
      setCart(cart);
    }
    if(t.matches('[data-remove]')){
      var cart=getCart(); cart.splice(+t.getAttribute('data-remove'),1); setCart(cart);
    }
  });
  var quoteFab=document.querySelector('.fab-quote');
  var quoteDrawer=document.querySelector('.quote-drawer');
  var quoteOverlay=document.querySelector('.quote-overlay');
  function openDrawer(){ quoteDrawer && quoteDrawer.classList.add('open'); quoteOverlay && quoteOverlay.classList.add('show'); }
  function closeDrawer(){ quoteDrawer && quoteDrawer.classList.remove('open'); quoteOverlay && quoteOverlay.classList.remove('show'); }
  quoteFab && quoteFab.addEventListener('click',openDrawer);
  quoteOverlay && quoteOverlay.addEventListener('click',closeDrawer);
  document.querySelectorAll('[data-close-drawer]').forEach(function(b){ b.addEventListener('click',closeDrawer); });
  document.querySelectorAll('[data-send-quote]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var cart=getCart();
      var summary=cart.map(function(i){ return i.qty+' x '+i.name; }).join(', ');
      var url='contact.html'+(summary?('?items='+encodeURIComponent(summary)):'');
      window.location.href=url;
    });
  });
  renderCart();
  updateCartCount();

  /* Pre-fill the contact form message from a quote cart handoff (?items=) */
  (function prefillFromQuote(){
    var textarea=document.querySelector('[data-contact-message]');
    if(!textarea) return;
    var params=new URLSearchParams(window.location.search);
    var items=params.get('items');
    if(items && !textarea.value){
      textarea.value='I would like a quote for: '+items+'.\n\nAdditional details: ';
    }
  })();

  /* =========================================================
     CONTACT FORM — client-side validation + no-backend email
     delivery via FormSubmit.co (AJAX endpoint, no API key
     required). Replace the address in the form action / hidden
     input before launch and confirm the FormSubmit activation
     email sent to that inbox.
     ========================================================= */
  var contactForm=document.querySelector('[data-contact-form]');
  if(contactForm){
    var statusEl=contactForm.querySelector('.form-status');
    function setError(field,msg){
      var wrap=field.closest('.field-wrap');
      if(!wrap) return;
      var errEl=wrap.querySelector('.field-error');
      if(errEl) errEl.textContent=msg||'';
      field.setAttribute('aria-invalid', msg? 'true':'false');
    }
    function validate(){
      var ok=true;
      contactForm.querySelectorAll('[required]').forEach(function(f){
        if(!f.value.trim()){ setError(f,'This field is required.'); ok=false; }
        else if(f.type==='email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)){ setError(f,'Enter a valid email address.'); ok=false; }
        else { setError(f,''); }
      });
      return ok;
    }
    contactForm.querySelectorAll('[required]').forEach(function(f){
      f.addEventListener('blur',function(){ validate(); });
    });
    contactForm.addEventListener('submit',function(e){
      e.preventDefault();
      if(!validate()){
        statusEl.textContent='Please fix the highlighted fields and try again.';
        statusEl.className='form-status show err';
        return;
      }
      var submitBtn=contactForm.querySelector('button[type="submit"]');
      var originalLabel=submitBtn.textContent;
      submitBtn.disabled=true;
      submitBtn.textContent='Sending…';
      statusEl.className='form-status';

      var endpoint=contactForm.getAttribute('action');
      var formData=new FormData(contactForm);

      fetch(endpoint,{
        method:'POST',
        headers:{'Accept':'application/json'},
        body:formData
      }).then(function(res){
        if(res.ok){
          statusEl.textContent='Thank you — your enquiry has been sent. Our team will respond within 1–2 business days.';
          statusEl.className='form-status show ok';
          contactForm.reset();
          localStorage.removeItem(CART_KEY);
          updateCartCount(); renderCart();
        } else {
          throw new Error('Request failed');
        }
      }).catch(function(){
        statusEl.textContent='We could not send your enquiry automatically. Please email info@trinityglobalimpex.com or WhatsApp us directly.';
        statusEl.className='form-status show err';
      }).finally(function(){
        submitBtn.disabled=false;
        submitBtn.textContent=originalLabel;
      });
    });
  }

  /* ---------- Newsletter form ---------- */
  document.querySelectorAll('[data-newsletter]').forEach(function(form){
    var note=form.parentElement.querySelector('[data-newsletter-note]');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var email=form.querySelector('input[type="email"]');
      if(!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){
        if(note){ note.textContent='Please enter a valid email address.'; note.className='form-note err'; }
        return;
      }
      if(note){ note.textContent='Thanks — you are on the list.'; note.className='form-note ok'; }
      form.reset();
    });
  });

})();
