module.exports = async function handler(req, res) {
 const { id } = req.query;
 if (!id) return res.status(400).send('Falta el ID de la cancion');

 try {
 const response = await fetch('https://cobalt.tools/api/json', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
 body: JSON.stringify({ 
 url: 'https://youtube.com/watch?v=' + id, 
 downloadMode: 'audio', 
 audioFormat: 'mp3' 
 })
 });
 
 const data = await response.json();

 
