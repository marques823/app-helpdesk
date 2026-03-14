import fetch from 'node-fetch';

async function test() {
  const loginRes = await fetch('https://helpdesk.tecnicolitoral.com/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'password' }) // guessing a wrong password to see the headers
  });
  console.log('Login status:', loginRes.status);
  console.log('Headers:', loginRes.headers.raw());
}
test();
