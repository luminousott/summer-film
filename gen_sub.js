const fs = require('fs');
const src = 'E:/video/《那个让人怀念的夏天》/converted.lrc';
const lines = fs.readFileSync(src, 'utf8').split(/\r?\n/);
const rows = [];
for (const ln of lines) {
  const m = ln.match(/^\[(\d+):(\d+\.\d+)\](.*)$/);
  if (!m) continue;
  const t = (+m[1]) * 60 + parseFloat(m[2]);
  const txt = m[3].trim();
  if (!txt) continue;
  rows.push([Math.round(t * 100) / 100, txt]);
}
const q = s => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const body = rows.map(([t, s]) => `  [${t.toFixed(2)}, ${q(s)}]`).join(',\n');
const out = `// subtitles.js: the narration captions, painted on the 2D compositor above the paper grain.
// Every line of the source LRC (assets/voice.lrc), ${rows.length} lines, 0:00 to ${rows[rows.length-1][0]}s.
const NARR = [
${body}
];
const SFONT = '"Ma Shan Zheng", "Kaiti SC", "STKaiti", "Songti SC", serif';
window.EXTRA_FONTS = [[\`56px \${SFONT}\`, NARR.map(l => l[1]).join('')]];

window.overlayHook = (c, t) => {
  // a line stays up until the next one starts, so fast narration never blinks out between lines
  let i = -1;
  for (let k = 0; k < NARR.length; k++) if (t >= NARR[k][0]) i = k;
  if (i < 0) return;
  const [a, txt] = NARR[i];
  const b = i + 1 < NARR.length ? NARR[i + 1][0] : DUR;
  if (t >= b) return;
  let shown = txt;
  // long narrative lines are split in two so the capsule never runs off the frame
  const MAX = 22;
  const sub = shown.length > MAX ? [shown.slice(0, Math.ceil(shown.length / 2)), shown.slice(Math.ceil(shown.length / 2))] : [shown];
  const age = t - a;
  const pop = backOut(clamp(age / .18));
  const out = 1 - ease(clamp((t - (b - .12)) / .12));
  const alpha = Math.min(pop, out);
  if (alpha <= .01) return;
  const size = 56;
  c.save();
  c.font = \`\${size}px \${SFONT}\`;
  c.textAlign = 'center'; c.textBaseline = 'middle';
  const widest = Math.max(...sub.map(s => c.measureText(s).width));
  c.translate(960, 1004 + (1 - pop) * 14);
  c.scale(.985 + .015 * pop, .985 + .015 * pop);
  c.globalAlpha = .52 * alpha;
  c.fillStyle = PAL.ink;
  c.beginPath();
  c.ellipse(0, 6, widest / 2 + 54, 40 + (sub.length - 1) * 26, 0, 0, Math.PI * 2);
  c.fill();
  c.globalAlpha = alpha;
  c.lineJoin = 'round';
  c.lineWidth = 7; c.strokeStyle = 'rgba(43,34,51,.92)';
  for (let k = 0; k < sub.length; k++) c.strokeText(sub[k], 0, (k - (sub.length - 1) / 2) * 64);
  c.fillStyle = '#FFF6E1';
  for (let k = 0; k < sub.length; k++) c.fillText(sub[k], 0, (k - (sub.length - 1) / 2) * 64);
  c.restore();
};
`;
fs.writeFileSync('src/subtitles.js', out, 'utf8');
console.log('lines', rows.length, 'last', rows[rows.length-1][0]);
