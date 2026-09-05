const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const modal=$('#authModal'),status=$('#authStatus');
const showStatus=(message,type='')=>{status.textContent=message;status.className='auth-status '+type};
const openAuth=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeAuth=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
$$('[data-open-auth]').forEach(b=>b.addEventListener('click',openAuth));
$$('[data-close-auth]').forEach(b=>b.addEventListener('click',closeAuth));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAuth()});
function tab(name){$$('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));$$('[data-panel]').forEach(p=>p.classList.toggle('active',p.dataset.panel===name));showStatus('')}
$$('[data-tab]').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.tab)));
$$('[data-toggle-password]').forEach(b=>b.addEventListener('click',()=>{const i=$('#'+b.dataset.togglePassword);i.type=i.type==='password'?'text':'password';b.textContent=i.type==='password'?'Show':'Hide'}));
async function api(action,payload){
  if(!CHN_CONFIG.apiBaseUrl) throw new Error('The Google Sheets backend is not connected yet. Add your deployed API URL in config.js.');
  const res=await fetch(CHN_CONFIG.apiBaseUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload})});
  if(!res.ok) throw new Error('The authentication service returned an error.');
  return res.json();
}
function previewAccount(member){localStorage.setItem('chn_member',JSON.stringify(member));window.location.href='dashboard.html'}
$('#loginForm').addEventListener('submit',async e=>{e.preventDefault();showStatus('Authenticating...');const email=$('#loginEmail').value.trim(),password=$('#loginPassword').value;try{const result=await api('login',{email,password});if(!result.success)throw new Error(result.message||'Invalid email or password.');previewAccount(result.member)}catch(err){showStatus(err.message,'error')}});
$('#signupForm').addEventListener('submit',async e=>{e.preventDefault();showStatus('Creating your account...');const payload={firstName:$('#firstName').value.trim(),lastName:$('#lastName').value.trim(),email:$('#signupEmail').value.trim(),password:$('#signupPassword').value};try{const result=await api('signup',payload);if(!result.success)throw new Error(result.message||'Unable to create account.');showStatus('Account created. You can now log in.','success');$('#loginEmail').value=payload.email;$('#loginPassword').value='';setTimeout(()=>tab('login'),900)}catch(err){showStatus(err.message,'error')}});
$('#discordLogin').addEventListener('click',()=>{if(!CHN_CONFIG.discordEnabled){showStatus('Discord login is ready for integration, but it has not been configured yet.','error');return}showStatus('Discord authentication endpoint is not configured.')});
