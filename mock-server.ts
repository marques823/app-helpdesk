import express from 'express';
const app = express();
app.post('/api/auth/login/', (req, res) => {
  res.cookie('sessionid', '123456', { domain: 'helpdesk.tecnicolitoral.com', path: '/', sameSite: 'lax' });
  res.json({ success: true });
});
app.listen(3001, () => console.log('Mock server running on 3001'));
