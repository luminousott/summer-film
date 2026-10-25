// Download the Google Fonts used by the film into assets/fonts/ and write a local @font-face CSS.
const fs = require('fs');
const path = require('path');
const https = require('https');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const URLS = [
  'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap',
  'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap',
  'https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@800&display=swap'
];

const get = (url) => new Promise((res, rej) => {
  https.get(url, { headers: { 'User-Agent': UA } }, r => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return get(r.headers.location).then(res, rej);
    const chunks = [];
    r.on('data', c => chunks.push(c));
    r.on('end', () => res(Buffer.concat(chunks)));
  }).on('error', rej);
});

(async () => {
  const dir = 'assets/fonts';
  fs.mkdirSync(dir, { recursive: true });
  let css = '';
  const seen = new Map();
  for (const u of URLS) {
    const buf = await get(u);
    let text = buf.toString('utf8');
    const urls = [...text.matchAll(/url\((https:\/\/[^)]+)\)/g)].map(m => m[1]);
    for (const fu of urls) {
      if (!seen.has(fu)) {
        const ext = fu.includes('.woff2') ? 'woff2' : 'woff';
        const name = 'f' + seen.size + '.' + ext;
        const data = await get(fu);
        fs.writeFileSync(path.join(dir, name), data);
        seen.set(fu, 'fonts/' + name);
        console.log('saved', name, data.length);
      }
      text = text.split(fu).join(seen.get(fu));
    }
    css += text + '\n';
  }
  fs.writeFileSync('assets/fonts.css', css, 'utf8');
  console.log('fonts', seen.size, 'css bytes', css.length);
})();
