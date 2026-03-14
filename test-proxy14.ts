import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/tickets/', {
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' }
    });
    console.log('/api/tickets/ status:', res1.status);
    
    const res2 = await fetch('https://helpdesk.tecnicolitoral.com/api/categories/', {
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' }
    });
    console.log('/api/categories/ status:', res2.status);
    
    const res3 = await fetch('https://helpdesk.tecnicolitoral.com/api/mobile/tickets/', {
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' }
    });
    console.log('/api/mobile/tickets/ status:', res3.status);
    
  } catch (e) {
    console.error(e);
  }
}
test();
