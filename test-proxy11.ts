import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/meta/companies/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    });
    console.log('/api/meta/companies/ status:', res1.status);
    console.log('/api/meta/companies/ content-type:', res1.headers.get('content-type'));
    console.log('/api/meta/companies/ body:', (await res1.text()).substring(0, 200));
    
    const res2 = await fetch('https://helpdesk.tecnicolitoral.com/api/mobile/tickets/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    });
    console.log('/api/mobile/tickets/ status:', res2.status);
    console.log('/api/mobile/tickets/ content-type:', res2.headers.get('content-type'));
    
  } catch (e) {
    console.error(e);
  }
}
test();
