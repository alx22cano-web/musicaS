export default async function handler(req, res) {
 const { id } = req.query;
 if (!id) return res.status(400).send('Falta el ID de la cancion');

 try {
 // Consultamos al extractor público en tiempo real para no saturar tu Vercel
 const response = await fetch('https://cobalt.tools', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
 body: JSON.stringify({ url: `https://youtube.com{id}`, downloadMode: 'audio', audioFormat: 'mp3' })
 });
 
 const data = await response.json();
 
 // ¡Magia! Redireccionamos el reproductor del celular directo al flujo de audio de Google
 if (data.url) {
 return res.redirect(302, data.url);
 } else {
 return res.status(500).send('Error en la extraccion de audio');
 }
 } catch (error) {
 return res.status(500).send('Error interno del servidor puente');
 }
}
