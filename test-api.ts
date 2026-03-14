import fetch from 'node-fetch';

async function test() {
  console.log('Testing login...');
  const loginRes = await fetch('https://helpdesk.tecnicolitoral.com/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'test', password: 'password' })
  });
  console.log('Login status:', loginRes.status);
  const cookies = loginRes.headers.raw()['set-cookie'];
  console.log('Cookies:', cookies);
  
  console.log('Testing tickets...');
  const ticketsRes = await fetch('https://helpdesk.tecnicolitoral.com/api/mobile/tickets/', {
    headers: {
      'Cookie': cookies ? cookies.map(c => c.split(';')[0]).join('; ') : ''
    }
  });
  console.log('Tickets status:', ticketsRes.status);
  const text = await ticketsRes.text();
  console.log('Tickets body:', text.substring(0, 200));
}

test();
