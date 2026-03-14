import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/meta/companies/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    });
    console.log('/meta/companies/ status:', res1.status);
    console.log('/meta/companies/ content-type:', res1.headers.get('content-type'));
    
    const res2 = await fetch('https://helpdesk.tecnicolitoral.com/mobile/tickets/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    });
    console.log('/mobile/tickets/ status:', res2.status);
    console.log('/mobile/tickets/ content-type:', res2.headers.get('content-type'));
    
  } catch (e) {
    console.error(e);
  }
}
test();
