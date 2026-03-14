import fetch from 'node-fetch';

async function test() {
  console.log('Testing direct backend...');
  try {
    const res1 = await fetch('https://helpdesk.tecnicolitoral.com/api/');
    console.log('/api/ status:', res1.status);
    console.log('/api/ body:', (await res1.text()).substring(0, 500));
    
  } catch (e) {
    console.error(e);
  }
}
test();
