const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const FORM_URLS = {
  appeal: '#forms',
  report: '#forms',
  support: '#forms'
};

function openPanel(id){
  const panel = document.getElementById(id);
  if(!panel) return;
  panel.classList.add('open');
  document.body.classList.add('locked');
}
function closePanels(){
  $$('.overlay.open').forEach(x=>x.classList.remove('open'));
  document.body.classList.remove('locked');
}

$$('[data-menu]').forEach(btn => btn.addEventListener('click', () => {
  const menu = btn.nextElementSibling;
  menu?.classList.toggle('open');
}));

document.addEventListener('click', (e) => {
  if(!e.target.closest('.dropdown')) $$('.dropdown-menu.open').forEach(x=>x.classList.remove('open'));
  const trigger = e.target.closest('[data-open]');
  if(trigger) openPanel(trigger.dataset.open);
  if(e.target.closest('[data-close]')) closePanels();
});

document.addEventListener('keydown', e => { if(e.key === 'Escape') closePanels(); });

$('#protectedAccess')?.addEventListener('submit', e => {
  e.preventDefault();
  const code = $('#resourceCode').value.trim();
  if(code === '2091'){
    closePanels();
    $('#protectedContent')?.classList.add('unlocked');
    $('#resourceLock')?.classList.add('hidden');
    $('#resourceCode').value = '';
    $('#resourceMessage').textContent = 'Protected resources unlocked for this session.';
  } else {
    $('#resourceMessage').textContent = 'Incorrect access code.';
  }
});

$('#adminAccess')?.addEventListener('submit', e => {
  e.preventDefault();
  const code = $('#adminCode').value.trim();
  if(code === 'ADMIN-321098'){
    closePanels();
    $('#adminPanel')?.classList.add('visible');
    $('#adminPanel')?.scrollIntoView({behavior:'smooth', block:'start'});
    $('#adminCode').value = '';
  } else $('#adminMessage').textContent = 'Incorrect administrator code.';
});

$('#eventForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const title = $('#eventTitle').value.trim();
  const date = $('#eventDate').value;
  if(!title || !date) return;
  const list = $('#eventList');
  const item = document.createElement('article');
  item.className = 'event-card';
  item.innerHTML = `<div class="event-date"><strong>${new Date(date+'T12:00:00').toLocaleDateString(undefined,{month:'short'})}</strong><b>${new Date(date+'T12:00:00').getDate()}</b></div><div><span class="tag">COMMUNITY EVENT</span><h3>${title.replace(/[<>]/g,'')}</h3><p>${$('#eventDetails').value.replace(/[<>]/g,'')}</p></div>`;
  list.prepend(item);
  $('#eventForm').reset();
});

$('#announcementForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const text = $('#announcementText').value.trim();
  if(!text) return;
  $('#announcement').querySelector('strong').textContent = text;
  $('#announcementText').value = '';
});

$('#year').textContent = new Date().getFullYear();
