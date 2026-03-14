import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res3 = await fetch('https://helpdesk.tecnicolitoral.com/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    });
    console.log('/api-token-auth/ status:', res3.status);
    console.log('/api-token-auth/ body:', await res3.text());
    
  } catch (e) {
    console.error(e);
  }
}
test();
