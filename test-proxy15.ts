import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    });
    console.log('/api/auth/token/ status:', res1.status);
    
    const res2 = await fetch('https://helpdesk.tecnicolitoral.com/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    });
    console.log('/api/token/ status:', res2.status);
    
    const res3 = await fetch('https://helpdesk.tecnicolitoral.com/api-token-auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' })
    });
    console.log('/api-token-auth/ status:', res3.status);
    
  } catch (e) {
    console.error(e);
  }
}
test();
