import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/meta/companies/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    console.log('/api/meta/companies/ status:', res1.status);
    console.log('/api/meta/companies/ body:', (await res1.text()).substring(0, 200));
    
  } catch (e) {
    console.error(e);
  }
}
test();
