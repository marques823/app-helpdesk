import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/mobile/tickets/');
    console.log('/mobile/tickets/ status:', res1.status);
    console.log('/mobile/tickets/ body:', (await res1.text()).substring(0, 200));
    
  } catch (e) {
    console.error(e);
  }
}
test();
