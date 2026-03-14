import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/tickets/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    });
    console.log('/api/tickets/ status:', res1.status);
    console.log('/api/tickets/ content-type:', res1.headers.get('content-type'));
    
  } catch (e) {
    console.error(e);
  }
}
test();
