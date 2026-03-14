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
    console.log('Login status:', loginRes.status);
    
    // Let's try to get cookies
    const cookies = loginRes.headers.raw()['set-cookie'];
    console.log('Cookies:', cookies);
    
  } catch (e) {
    console.error(e);
  }
}
test();
