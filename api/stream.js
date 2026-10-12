body: JSON.stringify({ 
 url: `https://youtube.com{id}`, 
 downloadMode: 'audio', 
 audioFormat: 'mp3',module.exports = async function handler(req, res) {
const { id } = req.query;
if (!id) return res.status(400).send('Falta el ID de la cancion');

try {
// Usamos un motor de resolución directa alternativo que no bloquea apps
const response = await fetch('https://lunes.host', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
},
 audioBitrate: '128'
 })
 });
 
 const data = await response.json();
 
 // Si el puente alternativo nos da el enlace de Google, redirigimos
 if (data && data.url) {
 return res.redirect(302, data.url);
 } else {
 // Si falla el primero, usamos un plan de respaldo directo a flujo plano
 const fallbackUrl = `https://vercel.app{id}&type=audio`;
 return res.redirect(302, fallbackUrl);
 }
 } catch (error) {
 // Tercer escudo protector en caso de caída extrema de red
 const emergencyUrl = `https://allorigins.win{encodeURIComponent('https://vercel.app' + id + '&type=audio')}`;
 return res.redirect(302, emergencyUrl);
 }
};
