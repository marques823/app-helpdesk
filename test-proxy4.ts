import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/meta/companies/');
    console.log('/api/meta/companies/ status:', res1.status);
    console.log('/api/meta/companies/ body:', (await res1.text()).substring(0, 200));
    
    const res2 = await fetch('https://helpdesk.tecnicolitoral.com/meta/companies/');
    console.log('/meta/companies/ status:', res2.status);
    console.log('/meta/companies/ body:', (await res2.text()).substring(0, 200));
    
  } catch (e) {
    console.error(e);
  }
}
test();
