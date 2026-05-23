export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\//, '') || 'model.glb';
    const object = await env.BUCKET.get(key);
    if (!object) {
      return new Response(JSON.stringify({error:'Not found', key}), {
        status: 404,
        headers: {...cors, 'Content-Type':'application/json'}
      });
    }
    const h = new Headers(cors);
    h.set('Content-Type', 'model/gltf-binary');
    h.set('Cache-Control', 'public, max-age=31536000');
    return new Response(object.body, { headers: h });
  }
};
