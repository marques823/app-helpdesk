import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/meta/companies/');
    console.log('/api/meta/companies/ status:', res1.status);
    
    const res2 = await fetch('https://helpdesk.tecnicolitoral.com/meta/companies/');
    console.log('/meta/companies/ status:', res2.status);
    
    const res3 = await fetch('https://helpdesk.tecnicolitoral.com/api/auth/login/');
    console.log('/api/auth/login/ status:', res3.status);
  } catch (e) {
    console.error(e);
  }
}
test();
