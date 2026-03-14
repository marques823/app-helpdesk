import fetch from 'node-fetch';

async function test() {
  const res = await fetch('https://helpdesk.tecnicolitoral.com/api/mobile/tickets/');
  console.log(res.status);
  console.log(await res.text());
}
test();
