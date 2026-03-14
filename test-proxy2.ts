import fetch from 'node-fetch';

async function test() {
  console.log('Testing proxy login...');
  try {
    const loginRes = await fetch('http://localhost:3000/api/auth/login/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ username: 'admin', password: 'password' }) // guessing a wrong password to see the headers
    });
    
    const cookies = loginRes.headers.raw()['set-cookie'];
    console.log('Cookies:', cookies);
    
    const cookieHeader = cookies ? cookies.map(c => c.split(';')[0]).join('; ') : '';
    
    console.log('Testing getCompanies...');
    const compRes = await fetch('http://localhost:3000/api/meta/companies/', {
      headers: {
        'Cookie': cookieHeader,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    console.log('Companies status:', compRes.status);
    console.log('Companies body:', await compRes.text());
    
    console.log('Testing getTickets...');
    const tickRes = await fetch('http://localhost:3000/api/mobile/tickets/', {
      headers: {
        'Cookie': cookieHeader,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    console.log('Tickets status:', tickRes.status);
    console.log('Tickets body:', await tickRes.text());
    
  } catch (e) {
    console.error(e);
  }
}
test();
