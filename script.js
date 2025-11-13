// script.js - admin features using localStorage
(function(){
  // Utilities
  function el(id){return document.getElementById(id)}
  function saveConfigToStorage(cfg){
    localStorage.setItem('bk_config', JSON.stringify(cfg));
  }
  function loadConfigFromStorage(){
    try{
      return JSON.parse(localStorage.getItem('bk_config')||'{}');
    }catch(e){return {}}
  }

  // Merge config.js defaults with saved config
  const defaultCfg = window.BK_CONFIG || {};
  const storedCfg = loadConfigFromStorage();
  const cfg = Object.assign({}, defaultCfg, storedCfg);

  // Apply initial contact info to UI
  function applyConfigToUI(){
    el('contact-email').textContent = cfg.contactEmail || 'Belum diatur';
    el('contact-wa').textContent = cfg.contactWhatsApp || 'Belum diatur';
    el('contact-ig').textContent = (cfg.contactInstagram ? '@'+cfg.contactInstagram : 'Belum diatur');

    el('cfg-email').value = cfg.contactEmail || '';
    el('cfg-wa').value = cfg.contactWhatsApp || '';
    el('cfg-ig').value = cfg.contactInstagram || '';
  }
  applyConfigToUI();

  // Contact form (demo: save message to localStorage)
  el('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    const msg = {
      name: el('sender-name').value,
      kelas: el('sender-class').value,
      message: el('sender-message').value,
      time: new Date().toISOString()
    };
    const msgs = JSON.parse(localStorage.getItem('bk_messages')||'[]');
    msgs.push(msg);
    localStorage.setItem('bk_messages', JSON.stringify(msgs));
    el('message-out').textContent = 'Pesan tersimpan (demo). Untuk menerima via email, ikuti panduan deploy di README.';
    el('contact-form').reset();
  });

  // Save config from Admin UI
  el('save-config').addEventListener('click', function(){
    cfg.contactEmail = el('cfg-email').value.trim();
    cfg.contactWhatsApp = el('cfg-wa').value.trim();
    cfg.contactInstagram = el('cfg-ig').value.trim();
    saveConfigToStorage(cfg);
    applyConfigToUI();
    alert('Konfigurasi kontak tersimpan di browser (localStorage). Untuk perubahan permanen, edit config.js sebelum deploy.');
  });

  // Poster management (store posters as data URL in localStorage)
  function loadPosters(){
    try{
      return JSON.parse(localStorage.getItem('bk_posters')||'[]');
    }catch(e){return []}
  }
  function savePosters(arr){
    localStorage.setItem('bk_posters', JSON.stringify(arr));
  }

  function renderPosterLists(){
    const posters = loadPosters();
    const target = el('poster-list');
    const adminList = el('admin-poster-list');
    target.innerHTML = '';
    adminList.innerHTML = '';
    if(posters.length===0){
      target.innerHTML = '<p class="hint">Belum ada poster yang diunggah.</p>';
      adminList.innerHTML = '<p class="hint">Belum ada poster.</p>';
      return;
    }
    posters.forEach((p, idx)=>{
      // frontend poster view
      const div = document.createElement('div'); div.className='poster-item';
      const img = document.createElement('img'); img.src = p.data; img.alt = p.name;
      const caption = document.createElement('div'); caption.textContent = p.name;
      div.appendChild(img); div.appendChild(caption);
      target.appendChild(div);
      // admin controls
      const a = document.createElement('div'); a.className='admin-poster-row';
      a.innerHTML = '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><img src="'+p.data+'" style="width:80px;height:50px;object-fit:cover;border-radius:6px"/><div style="flex:1"><strong>'+p.name+'</strong><div class="small">'+(new Date(p.time)).toLocaleString()+'</div></div><div><button data-idx="'+idx+'" class="del-btn">Hapus</button></div></div>';
      adminList.appendChild(a);
    });
    // attach delete handlers
    adminList.querySelectorAll('.del-btn').forEach(btn=>{
      btn.addEventListener('click', function(){
        const i = parseInt(this.getAttribute('data-idx'));
        if(confirm('Hapus poster ini?')){ const arr = loadPosters(); arr.splice(i,1); savePosters(arr); renderPosterLists(); }
      });
    });
  }
  renderPosterLists();

  // Clear all posters
  el('clear-posters').addEventListener('click', function(){
    if(confirm('Hapus semua poster?')){ localStorage.removeItem('bk_posters'); renderPosterLists(); }
  });

  // Dropzone handlers
  const dropzone = el('dropzone');
  const fileInput = el('file-input');

  function handleFiles(files){
    const arr = loadPosters();
    Array.from(files).forEach(file=>{
      if(!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = function(ev){
        arr.push({name: file.name, data: ev.target.result, time: new Date().toISOString()});
        savePosters(arr);
        renderPosterLists();
      };
      reader.readAsDataURL(file);
    });
  }

  dropzone.addEventListener('click', ()=>fileInput.click());
  fileInput.addEventListener('change', (e)=> handleFiles(e.target.files));

  dropzone.addEventListener('dragover', function(e){ e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', function(e){ dropzone.classList.remove('dragover'); });
  dropzone.addEventListener('drop', function(e){
    e.preventDefault(); dropzone.classList.remove('dragover');
    if(e.dataTransfer && e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  });

  // Initial note: allow site title override from config
  if(defaultCfg && defaultCfg.siteTitle){
    document.title = defaultCfg.siteTitle;
    const h = document.querySelector('.brand h1');
    if(h) h.textContent = defaultCfg.siteTitle;
  }

})();
