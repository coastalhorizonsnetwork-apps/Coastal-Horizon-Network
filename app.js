const CONFIG={
  // Replace with your Discord OAuth2 client ID and deployed callback URL when wiring a real backend.
  discordClientId:'YOUR_DISCORD_CLIENT_ID',
  discordRedirectUri:window.location.origin+'/#dashboard'
};

const $=s=>document.querySelector(s);
const dashboardLink=$('#dashboardLink');
const dashboard=$('#dashboard');
const loginButtons=[$('#loginButton'),$('#heroLogin')];

function getMember(){
  try{return JSON.parse(localStorage.getItem('chn_member')||'null')}catch{return null}
}
function setMember(member){localStorage.setItem('chn_member',JSON.stringify(member));renderSession()}
function clearMember(){localStorage.removeItem('chn_member');renderSession()}
function renderSession(){
  const member=getMember();
  dashboardLink.classList.toggle('hidden',!member);
  dashboard.classList.toggle('hidden',!member);
  $('#loginButton').textContent=member?'Member Portal':'Login with Discord';
  if(member){
    $('#memberName').textContent=member.global_name||member.username||'Member';
    $('#memberTag').textContent=member.username?`@${member.username}`:'Discord Member';
  }
}
function beginLogin(){
  // GitHub Pages is static; a real Discord OAuth exchange requires a serverless/backend endpoint to keep the client secret safe.
  // This demo mode lets the UI be previewed immediately without pretending authentication succeeded.
  const isConfigured=CONFIG.discordClientId && CONFIG.discordClientId!=='YOUR_DISCORD_CLIENT_ID';
  if(isConfigured){
    const params=new URLSearchParams({client_id:CONFIG.discordClientId,redirect_uri:CONFIG.discordRedirectUri,response_type:'code',scope:'identify'});
    window.location.href=`https://discord.com/oauth2/authorize?${params.toString()}`;
    return;
  }
  const username=prompt('Preview mode: enter a display name to open the Member Dashboard.');
  if(username?.trim()) setMember({username:username.trim(),global_name:username.trim()});
}

loginButtons.forEach(btn=>btn?.addEventListener('click',beginLogin));
$('#logoutButton')?.addEventListener('click',clearMember);
window.addEventListener('hashchange',()=>{if(location.hash==='#dashboard'&&getMember()) dashboard.scrollIntoView({behavior:'smooth'})});
renderSession();
