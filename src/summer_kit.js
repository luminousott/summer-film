// summer_kit.js: the cast, their faces, and the little 2010s Chinese school this film happens in.
// Everything here paints with p5.brush only (paint / inkLine / glow) and is a pure function of t.
const SK = {
  ink: PAL.ink, paper: PAL.paper, cream: PAL.cream,
  skin: '#F3CFA8', skinSh: '#D9A87C', girlSkin: '#FDF0E6', girlSh: '#E8CCBB',
  hair: '#352C38', hairLt: '#5E4F5F', lip: '#C8706B',
  uni: '#8EC3E6', uniDk: '#5D8FB4', uniLt: '#BFE0F2', trim: '#F7FBFD',
  pants: '#3A476B', shoe: '#EFE6D4',
  hat: '#D9C49B', hatDk: '#A98B63', hatBand: '#6F5B45',
  wall: '#E9DCC5', wallDk: '#D2BE9E', wallLt: '#F3E9D6',
  floor: '#C9A87C', floorDk: '#A98558',
  wood: '#C79560', woodDk: '#9A6B40', woodLt: '#E0B486',
  board: '#5C7A61', boardDk: '#47614D',
  glass: '#CFE7F2', glassDk: '#9FC6D8',
  sun: '#F6D07A', leaf: '#7FA35E', leafDk: '#5B7F45',
  navy: '#34405E', rose: '#E27A92', ochre: '#E8AA38', teal: '#3A9C98'
};

// ---------- face presets ----------
const FACES = {
  neutral: { e: 'open', m: 'flat', b: 0, blush: 0 },
  calm:    { e: 'open', m: 'smile', b: 0, blush: 0 },
  happy:   { e: 'happy', m: 'smile', b: -.08, blush: .25 },
  grin:    { e: 'happy', m: 'grin', b: -.06, blush: .3 },
  wonder:  { e: 'wide', m: 'o', b: -.12, blush: .15 },
  stare:   { e: 'wide', m: 'flat', b: -.02, blush: 0 },
  blank:   { e: 'blank', m: 'flat', b: 0, blush: 0 },
  bored:   { e: 'squint', m: 'flat', b: .05, blush: 0 },
  pain:    { e: 'squeeze', m: 'wobble', b: .12, blush: .1 },
  worried: { e: 'open', m: 'wobble', b: .1, blush: 0 },
  smug:    { e: 'narrow', m: 'smirk', b: .03, blush: 0 },
  sly:     { e: 'narrow', m: 'grin', b: .01, blush: .1 },
  shocked: { e: 'wide', m: 'O', b: -.18, blush: 0 },
  shy:     { e: 'open', m: 'smile', b: .04, blush: .55, lookX: -.4 },
  relieved:{ e: 'closed', m: 'smile', b: -.03, blush: .15 },
  effort:  { e: 'squeeze', m: 'teeth', b: .08, blush: .35 },
  dead:    { e: 'blank', m: 'flat', b: .08, blush: 0 },
  curious: { e: 'wide', m: 'flat', b: -.04, blush: 0, lookX: .3 }
};

// faceAt(t, [[time, 'preset'|{...}], ...]): acted changes, one squint at every swap.
function faceAt(t, keys) {
  if (!keys || !keys.length) return FACES.neutral;
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const at = keys[i][0], f = (typeof keys[i][1] === 'string' ? FACES[keys[i][1]] : keys[i][1]) || FACES.neutral;
  if (i === 0 || t - at > .34) return f;
  const u = (t - at) / .34, k = Math.sin(clamp(u) * Math.PI);
  return { ...f, squint: Math.max(f.squint || 0, k) };
}

// stable blink: closed for ~.09 s every 2.4鈥?.4 s
function blinkAt(t, seed = 1) {
  const period = 2.4 + hash(seed * 3.7) * 2.0;
  const p = frac((t + hash(seed * 9.1) * period) / period);
  return p < .032 ? 1 : 0;
}

// ---------- small painted marks ----------
function sweatDrop(x, y, s, k = 1) {
  boilSeed('sweat' + Math.round(x));
  const p = [[x, y - s], [x + s * .42, y - s * .2], [x + s * .34, y + s * .55], [x, y + s * .8], [x - s * .34, y + s * .55], [x - s * .42, y - s * .2]];
  paint(p, { wash: '#BFE3F2', ink: SK.uniDk, sw: .7, curv: .9 });
}
function sparkle(x, y, r, t, seed = 0) {
  boilSeed('spark' + seed);
  glow(x, y, r * 2.4, '#FFE9A8', .8);
  paint(starPts(x, y, r * (0.8 + .2 * Math.sin(t * 6 + seed)), .28, 4), { wash: '#FFF3C8', ink: SK.ochre, sw: .6 });
}
function puff(x, y, r, a = 1) {
  boilSeed('puff' + Math.round(x) + Math.round(y));
  paint(ellPts(x, y, r, r * .72, 18, r * .12), { fill: '#E8DEC9', fillOp: 130 * a, bleed: .3, tex: .7, ink: null });
  paint(ellPts(x + r * .5, y - r * .25, r * .6, r * .48, 16), { fill: '#F2EAD8', fillOp: 90 * a, bleed: .4, tex: .6, ink: null });
}
function heatLines(x, y, w, t, n = 5, a = 1) {
  for (let i = 0; i < n; i++) {
    boilSeed('heat' + i);
    const xx = x + (i - (n - 1) / 2) * w * .16, yy = y + Math.sin(t * 1.6 + i) * 8;
    const pts = []; for (let k = 0; k <= 4; k++) pts.push([xx + Math.sin(t * 2 + k * 1.4 + i) * 7, yy - k * w * .09]);
    inkLine(pts, .7, SK.cream, 'dry', .9);
  }
}

// ---------- props ----------
function desk(x, y, w, o = {}) {
  boilSeed('desk' + Math.round(x) + Math.round(y));
  const h = o.h || w * .86, top = y - h, d = o.d || w * .18;
  paint(rrPts(x - w / 2, top, w, d * .9, 6, 3), { wash: SK.wood, ink: SK.ink, sw: 1.1 });
  paint(rrPts(x - w / 2 + 4, top + d * .8, w - 8, h - d, 4, 3), { wash: o.front || SK.woodLt, ink: SK.ink, sw: 1 });
  paint(rrPts(x - w / 2 + 2, top + h * .55, w - 4, h * .3, 3, 2), { wash: SK.woodDk, washOp: 90, ink: null });
  inkLine([[x - w * .4, y - 4], [x - w * .4, y + 2]], 2.2, SK.ink, 'ink', 0);
  inkLine([[x + w * .4, y - 4], [x + w * .4, y + 2]], 2.2, SK.ink, 'ink', 0);
}
function chair(x, y, w) {
  boilSeed('chair' + Math.round(x));
  paint(rrPts(x - w * .16, y - w * .52, w * .32, w * .5, 4, 2), { wash: SK.woodLt, ink: SK.ink, sw: .9 });
  paint(rrPts(x - w * .22, y - w * .08, w * .44, w * .1, 3, 2), { wash: SK.wood, ink: SK.ink, sw: .9 });
  inkLine([[x - w * .18, y - 2], [x - w * .2, y + w * .18]], 2, SK.ink, 'ink', 0);
  inkLine([[x + w * .18, y - 2], [x + w * .2, y + w * .18]], 2, SK.ink, 'ink', 0);
}
function cardboardBox(x, y, w, h) {
  boilSeed('box' + Math.round(x) + Math.round(y));
  paint(rrPts(x - w / 2, y - h, w, h, 3, 3), { wash: '#D8B784', ink: SK.ink, sw: .9 });
  inkLine([[x - w / 2 + 4, y - h * .68], [x + w / 2 - 4, y - h * .68]], 1.2, SK.ink, 'ink', .1);
  paint(rrPts(x - w * .16, y - h * .9, w * .32, h * .16, 2, 2), { wash: '#EBD3A6', washOp: 200, ink: null });
}

// ---------- the person ----------
// u = 1/10 of body height. Feet at (x, y). ~7 heads tall: a teenager, not a mascot.
// o: { role, dy, view, flip, aL, aR, sit, walk, face, lookX, lookY, blush, hat, glasses, shadow }
function person(x, y, u, o = {}) {
  const role = o.role || 'boy';
  const flip = o.flip ? -1 : 1;
  const view = (o.view || 0) * flip;
  const face = o.face || FACES.neutral;
  const dy = (o.dy || 0) * u;
  const sq = o.sq || 0;
  const f = { ...face, ...(o.lookX != null ? { lookX: o.lookX } : {}), ...(o.blush != null ? { blush: o.blush } : {}) };
  const girl = role === 'girl', liu = role === 'liu', teacher = role === 'teacher';
  const skin = girl ? SK.girlSkin : SK.skin, skinSh = girl ? SK.girlSh : SK.skinSh;
  const gi = Math.round(x);
  const legPhase = o.walk || 0;
  const aL = o.aL != null ? o.aL : .2, aR = o.aR != null ? o.aR : .2;
  const shY = y - u * 7.55, hipY = y - u * 4.35, headC = y - u * 8.8, hx = u * .78;
  const tw = (girl ? u * 1.2 : u * 1.34) * (o.wide || 1);

  push(); translate(x, y + dy); scale(flip * (1 + sq * .18), 1 - sq * .2); translate(-x, -y);
  const cx = x + view * u * .14;

  if (o.shadow !== false) { boilSeed('psh' + gi); paint(ellPts(x, y + u * .04, u * 1.8, u * .25, 18), { fill: '#8A7358', fillOp: 50, bleed: .4, ink: null }); }

  // ---- legs ----
  if (!o.sit) {
    const sw = Math.sin(legPhase) * u * .24;
    for (const s of [-1, 1]) {
      const lx = x + s * u * .43 + (s > 0 ? sw : -sw);
      boilSeed('leg' + s + gi);
      paint(rrPts(lx - u * .24, hipY - u * .05, u * .48, u * 4.42, u * .14, 2), { wash: SK.pants, ink: SK.ink, sw: .8 });
      paint(ellPts(lx + s * u * .03, y - u * .1, u * .31, u * .15, 14), { wash: SK.shoe, ink: SK.ink, sw: .7 });
    }
  } else {
    for (const s of [-1, 1]) {
      boilSeed('sitleg' + s + gi);
      paint(rrPts(x + s * u * .42 - u * .46, hipY + u * .1, u * 1.25, u * .52, u * .16, 2), { wash: SK.pants, ink: SK.ink, sw: .8 });
      paint(rrPts(x + s * u * .42 + u * .68, hipY + u * .1, u * .48, u * 2.2, u * .14, 2), { wash: SK.pants, ink: SK.ink, sw: .8 });
    }
  }

  // ---- far arm ----
  boilSeed('armfar' + gi);
  drawArm(x + tw * .82, shY - u * .05, aR, 1, u, skin, 1);

  // ---- torso: baggy sky-blue school jacket ----
  boilSeed('torso' + gi);
  const torso = [
    [x - tw * .92, shY - u * .06], [x - u * .4, shY - u * .26], [x, shY - u * .3], [x + u * .4, shY - u * .26],
    [x + tw * .92, shY - u * .06], [x + tw, shY + u * .9], [x + tw * .92, hipY + u * .4], [x + tw * .5, hipY + u * .68],
    [x, hipY + u * .78], [x - tw * .5, hipY + u * .68], [x - tw * .92, hipY + u * .4], [x - tw, shY + u * .9]
  ];
  paint(torso, { wash: SK.uni, ink: SK.ink, sw: 1.05, curv: .42 });
  // collar V + white tee under it
  boilSeed('vneck' + gi);
  paint([[x - u * .5, shY - u * .2], [x - u * .16, shY + u * .22], [x, shY + u * .3], [x + u * .16, shY + u * .22], [x + u * .5, shY - u * .2]], { wash: SK.trim, ink: SK.ink, sw: .55, curv: .5 });
  inkLine([[x + u * .04, shY + u * .3], [x + u * .04, hipY + u * .5]], .9, SK.uniDk, 'inkfine', .2);
  // jacket hem
  inkLine([[x - tw * .8, hipY + u * .5], [x - u * .3, hipY + u * .7], [x + u * .3, hipY + u * .7], [x + tw * .8, hipY + u * .5]], .9, SK.ink, 'ink', .4);
  // ---- near arm ----
  boilSeed('armnear' + gi);
  drawArm(x - tw * .82, shY - u * .05, aL, -1, u, skin, 0);

  // ---- neck + head ----
  boilSeed('neck' + gi);
  paint(rrPts(cx - u * .23, headC + u * .74, u * .46, u * .6, u * .12, 1.2), { wash: skinSh, ink: SK.ink, sw: .5 });
  if (!o.noHair) drawHairBack(cx, headC, u, role, gi);
  boilSeed('head' + gi);
  const headShape = through([
    [cx - hx * .92, headC + u * .15], [cx - hx * 1.02, headC - u * .2], [cx - hx * .92, headC - u * .62], [cx - hx * .5, headC - u * .94], [cx, headC - u * 1.03],
    [cx + hx * .5, headC - u * .94], [cx + hx * .92, headC - u * .62], [cx + hx * 1.02, headC - u * .2], [cx + hx * .92, headC + u * .15],
    [cx + hx * (girl ? .6 : .7), headC + u * .8], [cx + hx * (girl ? .28 : .4), headC + u * 1.02], [cx, headC + u * 1.06],
    [cx - hx * (girl ? .28 : .4), headC + u * 1.02], [cx - hx * (girl ? .6 : .7), headC + u * .8]
  ], 4);
  paint(headShape, { wash: skin, ink: SK.ink, sw: .95, curv: .35 });
  // ears
  boilSeed('ear' + gi);
  paint(ellPts(cx - hx * .99, headC + u * .1, u * .13, u * .19, 12), { wash: skin, ink: SK.ink, sw: .55 });
  paint(ellPts(cx + hx * .99, headC + u * .1, u * .13, u * .19, 12), { wash: skin, ink: SK.ink, sw: .55 });
  // face
  drawFace(cx, headC, u, f, role, o, gi);
  drawHairFront(cx, headC, u, role, gi);
  if (o.hat) drawBucket(cx, headC, u, o.hat);
  if (o.glasses || teacher) drawGlasses(cx, headC, u, gi);
  if (o.sweat) sweatDrop(cx + u * 1.15, headC - u * 1.1, u * .3 * o.sweat);
  pop();
}

function drawArm(sx, sy, a, side, u, skin, dark) {
  const len = u * 3.3;
  const ex = sx + side * Math.sin(a) * len, ey = sy + Math.cos(a) * len;
  const mx = sx + side * Math.sin(a * .5) * len * .55, my = sy + Math.cos(a * .5) * len * .52;
  paint(ribbon([[sx, sy], [mx, my], [ex, ey]], u * .62, u * .44), { wash: dark ? SK.uniDk : SK.uni, ink: SK.ink, sw: .85 });
  paint(ellPts(ex + side * u * .02, ey + u * .09, u * .2, u * .19, 12), { wash: skin, ink: SK.ink, sw: .6 });
}

function drawHairBack(cx, headC, u, role, gi) {
  boilSeed('hairb' + gi);
  if (role === 'girl') {
    paint([[cx - u * 1.04, headC - u * .5], [cx - u * 1.12, headC + u * .7], [cx - u * 1.14, headC + u * 2.1],
           [cx - u * .86, headC + u * 2.3], [cx - u * .68, headC + u * .9], [cx + u * .68, headC + u * .9],
           [cx + u * .86, headC + u * 2.3], [cx + u * 1.14, headC + u * 2.1], [cx + u * 1.12, headC + u * .7],
           [cx + u * 1.04, headC - u * .5], [cx, headC - u * .62]], { wash: SK.hair, ink: SK.ink, sw: .8, curv: .5 });
  } else {
    paint(ellPts(cx, headC - u * .28, u * .78, u * .62, 20, u * .03), { wash: SK.hair, ink: SK.ink, sw: .8 });
  }
}
function drawHairFront(cx, headC, u, role, gi) {
  boilSeed('hairf' + gi);
  if (role === 'girl') {
    // soft cap with a middle part; the hairline stays well above the brows
    paint([[cx - u * 1.03, headC - u * .34], [cx - u * 1.07, headC - u * .74], [cx - u * .66, headC - u * 1.08],
           [cx, headC - u * 1.16], [cx + u * .66, headC - u * 1.08], [cx + u * 1.07, headC - u * .74],
           [cx + u * 1.03, headC - u * .34], [cx + u * .66, headC - u * .46], [cx + u * .22, headC - u * .4],
           [cx, headC - u * .5], [cx - u * .22, headC - u * .4], [cx - u * .66, headC - u * .46]], { wash: SK.hair, ink: SK.ink, sw: .8, curv: .45 });
    for (const s of [-1, 1]) {
      paint([[cx + s * u * 1.0, headC - u * .36], [cx + s * u * 1.1, headC + u * .4], [cx + s * u * 1.02, headC + u * 1.55],
             [cx + s * u * .86, headC + u * 1.62], [cx + s * u * .78, headC + u * .5], [cx + s * u * .84, headC - u * .36]],
            { wash: SK.hair, ink: SK.ink, sw: .7, curv: .5 });
    }
    inkLine([[cx - u * .52, headC - u * .92], [cx - u * .1, headC - u * 1.0], [cx + u * .3, headC - u * .94]], .55, SK.hairLt, 'inkfine', .3);
  } else if (role === 'liu') {
    paint([[cx - u * .96, headC - u * .3], [cx - u * 1.0, headC - u * .72], [cx - u * .52, headC - u * 1.0],
           [cx + u * .3, headC - u * 1.02], [cx + u * .94, headC - u * .84], [cx + u * 1.0, headC - u * .36],
           [cx + u * .6, headC - u * .46], [cx, headC - u * .5], [cx - u * .6, headC - u * .44]], { wash: SK.hair, ink: SK.ink, sw: .7, curv: .4 });
  } else if (role === 'teacher') {
    paint([[cx - u * 1.0, headC - u * .3], [cx - u * 1.05, headC - u * .74], [cx - u * .7, headC - u * 1.0],
           [cx + u * .2, headC - u * 1.07], [cx + u * .94, headC - u * .9], [cx + u * 1.0, headC - u * .38],
           [cx + u * .62, headC - u * .62], [cx + u * .1, headC - u * .66], [cx - u * .6, headC - u * .5]], { wash: SK.hair, ink: SK.ink, sw: .7, curv: .5 });
  } else {
    // clean short crop with a broken fringe, sitting just above the brows
    const boyHair = [
      [cx - u * .8, headC - u * .06], [cx - u * .86, headC - u * .56], [cx - u * .66, headC - u * 1.0],
      [cx - u * .12, headC - u * 1.16], [cx + u * .54, headC - u * 1.08], [cx + u * .84, headC - u * .58],
      [cx + u * .8, headC - u * .12], [cx + u * .64, headC - u * .36], [cx + u * .38, headC - u * .34],
      [cx + u * .18, headC - u * .46], [cx - u * .04, headC - u * .32], [cx - u * .24, headC - u * .46],
      [cx - u * .46, headC - u * .34], [cx - u * .66, headC - u * .38]
    ];
    paint(boyHair, { wash: SK.hair, ink: SK.ink, sw: .9, curv: .25 });
    inkLine([[cx - u * .2, headC - u * 1.0], [cx + u * .1, headC - u * .9], [cx + u * .45, headC - u * .76]], .55, SK.hairLt, 'inkfine', .2);
  }
}

function drawFace(cx, headC, u, f, role, o, gi) {
  const ey = headC + u * .15;
  const lookX = (f.lookX || 0) * u * .1, lookY = (f.lookY || 0) * u * .08;
  const squint = f.squint || 0;
  const blink = blinkAt(T, gi * .37 + 2);
  const eyeOpen = 1 - Math.max(squint, blink);
  const ex = u * (role === 'girl' ? .33 : .32);
  for (const s of [-1, 1]) {
    const x = cx + s * ex;
    const kind = (eyeOpen < .32) ? 'closed' : (f.e || 'open');
    drawEye(x, ey, u, kind, s, lookX, lookY, role, eyeOpen);
    // brows are thin ink lines 鈥?a fat stroke here reads as a black patch
    const by = ey - u * (role === 'girl' ? .3 : .33) + u * (f.b || 0);
    const sl = (f.e === 'squeeze' || f.m === 'wobble') ? u * .04 : 0;
    const browCol = (role === 'girl') ? '#3E2F38' : SK.ink;
    inkLine([[x - s * u * .19, by + sl], [x, by - u * .03], [x + s * u * .19, by + u * .01 + sl]], role === 'girl' ? 1.6 : 1.7, browCol, 'inkfine', .1);
  }
  // nose: one tiny hook
  inkLine([[cx, ey + u * .16], [cx + u * .02, ey + u * .22]], 1.1, role === 'girl' ? SK.girlSh : SK.skinSh, 'inkfine', .1);
  // mouth
  drawMouth(cx, ey + u * .34, u, f.m || 'flat', role);
  // blush
  const bl = (f.blush || 0);
  if (bl > .05) {
    boilSeed('blush' + gi);
    for (const s of [-1, 1]) paint(ellPts(cx + s * u * .44, ey + u * .2, u * .18, u * .09, 14), { wash: SK.rose, washOp: 85 * bl, ink: null });
  }
}

function drawEye(x, y, u, kind, s, lx, ly, role, openK) {
  const w = (role === 'girl' ? u * .225 : u * .205), h = (role === 'girl' ? u * .19 : u * .128);
  boilSeed('eye' + Math.round(x) + kind);
  const dark = role === 'girl' ? '#3C3040' : '#332A35';
  if (kind === 'closed') { inkLine([[x - w, y], [x, y + u * .05], [x + w, y]], 1.4, dark, 'ink', .1); return; }
  if (kind === 'happy') { inkLine([[x - w, y + u * .04], [x, y - u * .06], [x + w, y + u * .04]], 1.4, dark, 'ink', .1); return; }
  if (kind === 'narrow') { inkLine([[x - w, y], [x + w, y + u * .008]], 1.3, dark, 'ink', .1); return; }
  if (kind === 'squint') { inkLine([[x - w, y + u * .02], [x, y - u * .03], [x + w, y + u * .02]], 1.3, dark, 'ink', .1); return; }
  if (kind === 'blank') { paint(ellPts(x + lx * .4, y, u * .045, u * .055, 10), { wash: dark, ink: null }); return; }
  if (kind === 'squeeze') { inkLine([[x - w, y - u * .03], [x, y + u * .04], [x + w, y - u * .03]], 1.4, dark, 'ink', .1); return; }
  const sc = kind === 'wide' ? 1.14 : 1;
  const white = role === 'girl' ? '#FFFBF4' : '#FFF8EB';
  paint(ellPts(x, y, w * sc, h * sc, 16, u * .006), { wash: white, ink: '#4A3A44', sw: .4 });
  paint(ellPts(x + lx * .55, y + u * .01 + ly * .5, w * .47, h * .6, 14), { wash: '#6B4A37', ink: null });
  paint(ellPts(x + lx * .55, y + u * .012 + ly * .5, w * .27, h * .36, 12), { wash: '#2A2029', ink: null });
  paint(ellPts(x + lx * .9 - u * .04, y - u * .03 + ly * .6, u * .032, u * .038, 8), { wash: '#FFFFFF', ink: null });
  if (role === 'girl') inkLine([[x - w * .97, y - u * .085], [x, y - u * .125], [x + w * .97, y - u * .07]], 1.1, dark, 'ink', .1);
}

function drawMouth(cx, y, u, kind, role) {
  boilSeed('mouth' + Math.round(cx) + kind);
  const w = u * .17, dark = role === 'girl' ? '#8E4F4B' : '#4A3432';
  if (kind === 'smile') { inkLine([[cx - w, y - u * .01], [cx, y + u * .07], [cx + w, y - u * .01]], 1.3, dark, 'ink', .1); return; }
  if (kind === 'flat') { inkLine([[cx - w * .6, y], [cx, y + u * .006], [cx + w * .6, y]], 1.2, dark, 'ink', .1); return; }
  if (kind === 'smirk') { inkLine([[cx - w * .7, y + u * .02], [cx, y], [cx + w * .7, y - u * .03]], 1.3, dark, 'ink', .1); return; }
  if (kind === 'grin' || kind === 'open' || kind === 'laugh' || kind === 'teeth') {
    const h = kind === 'teeth' ? u * .14 : u * .19;
    paint([[cx - w * 1.05, y - u * .02], [cx, y + h], [cx + w * 1.05, y - u * .02]], { wash: '#68343C', ink: dark, sw: .8, curv: .35 });
    if (kind === 'teeth' || kind === 'grin') paint(rrPts(cx - w * .68, y - u * .01, w * 1.36, h * .38, 1, 1), { wash: '#FFF9EE', ink: null });
    return;
  }
  if (kind === 'o' || kind === 'O') { paint(ellPts(cx, y + u * .03, u * .065, u * .09, 12), { wash: '#68343C', ink: dark, sw: .8 }); return; }
  if (kind === 'wobble') { inkLine([[cx - w, y], [cx - w * .35, y + u * .04], [cx + w * .25, y - u * .03], [cx + w, y + u * .02]], 1.3, dark, 'ink', .1); return; }
  if (kind === 'frown') { inkLine([[cx - w, y + u * .05], [cx, y - u * .02], [cx + w, y + u * .05]], 1.3, dark, 'ink', .1); return; }
  inkLine([[cx - w * .6, y], [cx + w * .6, y]], 1.2, dark, 'ink', .1);
}

function drawBucket(cx, headC, u, kind) {
  boilSeed('hat' + Math.round(cx));
  if (kind === 'cap') {
    paint(ellPts(cx, headC - u * .8, u * .9, u * .44, 20), { wash: '#C9D8E4', ink: SK.ink, sw: .8 });
    paint(rrPts(cx - u * 1.06, headC - u * .8, u * 1.9, u * .16, u * .07, 2), { wash: '#A9BECF', ink: SK.ink, sw: .7 });
    return;
  }
  paint(ellPts(cx, headC - u * .92, u * 1.34, u * .27, 24, u * .02), { wash: SK.hatDk, ink: SK.ink, sw: .85 });
  paint([[cx - u * .84, headC - u * .96], [cx - u * .74, headC - u * 1.48], [cx - u * .18, headC - u * 1.6], [cx + u * .38, headC - u * 1.57], [cx + u * .74, headC - u * 1.24], [cx + u * .84, headC - u * .96]], { wash: SK.hat, ink: SK.ink, sw: .9, curv: .45 });
  paint([[cx - u * .83, headC - u * 1.15], [cx + u * .83, headC - u * 1.15], [cx + u * .81, headC - u * 1.0], [cx - u * .81, headC - u * 1.0]], { wash: SK.hatBand, ink: SK.ink, sw: .7 });
}
function drawGlasses(cx, headC, u, gi) {
  boilSeed('gl' + gi);
  const y = headC + u * .1;
  for (const s of [-1, 1]) paint(rrPts(cx + s * u * .27 - u * .19, y - u * .14, u * .38, u * .27, u * .09, 1), { wash: '#FFFFFF', washOp: 30, ink: SK.ink, sw: .65 });
  inkLine([[cx - u * .09, y - u * .02], [cx + u * .09, y - u * .02]], .7, SK.ink, 'ink', .2);
}

// ---------- environments ----------
function skyWash(top, bot, y0 = -80, y1 = 660) {
  paint(rectPts(-200, -200, W + 400, y1 + 200), { fill: top, fillOp: 220, bleed: .35, tex: .5, ink: null });
  paint(rectPts(-200, y0, W + 400, y1 - y0), { fill: bot, fillOp: 120, bleed: .5, tex: .6, ink: null });
}

function yardBG(t) {
  skyWash('#BBD9EA', '#EFE3C6', 120, 660);
  boilSeed('sun');
  glow(1500, 180, 400, '#FFE3A0', .7);
  paint(ellPts(1500, 180, 110, 110, 24), { wash: '#FBE3AE', ink: null });
  boilSeed('trees');
  for (let i = 0; i < 7; i++) {
    const x = 120 + i * 270, yy = 540 + hash(i) * 40, r = 130 + hash(i + 4) * 90;
    paint(ellPts(x, yy, r, r * .8, 18, 8), { fill: mixCol(SK.leaf, SK.leafDk, .2 + hash(i) * .4), fillOp: 200, bleed: .25, tex: .55, ink: null });
    inkLine([[x, yy + r * .5], [x - 6, yy + r * 1.5]], 10, '#8B6A46', 'dry', .3);
  }
  boilSeed('school');
  paint(rectPts(140, 250, 1250, 330), { wash: '#EADFC6', ink: SK.ink, sw: 1.4 });
  paint(rectPts(140, 250, 1250, 52), { wash: '#CDB896', ink: SK.ink, sw: 1 });
  for (let r = 0; r < 2; r++) for (let c = 0; c < 9; c++) {
    boilSeed('win' + r + '_' + c);
    paint(rectPts(190 + c * 130, 330 + r * 120, 86, 78, 2), { wash: SK.glass, ink: SK.ink, sw: .9 });
  }
  paint(rectPts(-200, 580, W + 400, 560), { fill: '#D9C39C', fillOp: 230, bleed: .3, tex: .5, ink: null });
  paint(ellPts(1050, 660, 900, 60, 26), { fill: '#C9B084', fillOp: 120, bleed: .4, ink: null });
  boilSeed('rail');
  inkLine([[100, 600], [1750, 600]], 5, '#7A6E63', 'ink', .1);
  for (let x = 140; x < 1750; x += 150) inkLine([[x, 600], [x, 668]], 4, '#7A6E63', 'ink', .1);
  boilSeed('pole');
  inkLine([[860, 600], [860, 190]], 8, '#B9B0A4', 'ink', .05);
  paint([[868, 200], [1010, 232], [868, 286]], { wash: '#D8544E', ink: SK.ink, sw: 1, curv: .4 });
  heatLines(400, 760, 500, t);
}

function corridorBG(t, o = {}) {
  const warm = o.warm != null ? o.warm : 1;
  skyWash('#E8D9BE', '#DCC9A8', -50, 500);
  paint(rectPts(-200, -100, W + 400, 760), { fill: '#EADCC3', fillOp: 235, bleed: .25, tex: .4, ink: null });
  for (let i = 0; i < 4; i++) {
    boilSeed('cw' + i);
    const x = 1130 + i * 210, w = 150;
    paint(rectPts(x, 210, w, 300), { wash: SK.glass, ink: SK.ink, sw: 1.2 });
    paint(rectPts(x + 8, 218, w - 16, 130), { fill: '#EAF5EE', fillOp: 130 * warm, bleed: .3, ink: null });
    inkLine([[x + w / 2, 212], [x + w / 2, 508]], 1.2, SK.ink, 'ink', 0);
  }
  for (let i = 0; i < 3; i++) {
    boilSeed('cd' + i);
    const x = 180 + i * 300;
    paint(rectPts(x, 250, 200, 360), { wash: '#C9A97C', ink: SK.ink, sw: 1.4 });
    paint(rectPts(x + 22, 300, 156, 250), { wash: '#E0C79F', washOp: 180, ink: null });
    paint(ellPts(x + 172, 470, 7, 12, 10), { wash: SK.ink, ink: null });
  }
  paint(rectPts(-200, 620, W + 400, 560), { fill: SK.floor, fillOp: 240, bleed: .15, tex: .35, ink: null });
  boilSeed('flline');
  for (let i = 0; i < 5; i++) inkLine([[220 - i * 40, 640 + i * 90], [1900, 620 + i * 100]], 1.2, SK.floorDk, 'dry', .4);
  paint(rectPts(-200, 606, W + 400, 20), { wash: SK.wallDk, washOp: 160, ink: null });
}

// classroom, seen from the front: blackboard left, warm windows right, open back door far right.
function classroomBG(t, o = {}) {
  const doorOpen = o.doorOpen != null ? o.doorOpen : 1;
  paint(rectPts(-200, -100, W + 400, 900), { fill: SK.wall, fillOp: 240, bleed: .25, tex: .45, ink: null });
  paint(rectPts(-200, -100, W + 400, 180), { fill: SK.wallLt, fillOp: 220, bleed: .2, ink: null });
  boilSeed('fan');
  const fa = t * 3.2;
  inkLine([[760, 120], [760, 190]], 7, '#8A8078', 'ink', .1);
  for (let i = 0; i < 3; i++) {
    const a = fa + i * TAU / 3;
    paint(rrPts(760 + Math.cos(a) * 60 - 80, 190 + Math.sin(a) * 12 - 16, 190, 30, 14, 2), { wash: '#CFC6B8', ink: SK.ink, sw: .7 });
  }
  boilSeed('board');
  paint(rrPts(120, 230, 720, 330, 10, 4), { wash: SK.board, ink: SK.ink, sw: 1.6 });
  paint(rectPts(120, 548, 720, 26), { wash: SK.wood, ink: SK.ink, sw: 1 });
  for (let i = 0; i < 4; i++) inkLine([[220 + i * 150, 330 + i * 40], [340 + i * 150, 360 + i * 35]], 4, '#DDE7D8', 'dry', .5);
  for (let i = 0; i < 3; i++) {
    boilSeed('cw' + i);
    const x = 950 + i * 285, w = 235;
    paint(rectPts(x, 210, w, 350), { wash: SK.glass, ink: SK.ink, sw: 1.3 });
    paint(rectPts(x + 8, 218, w - 16, 160), { fill: '#F4F7E4', fillOp: 150, bleed: .3, ink: null });
    inkLine([[x + w / 2, 212], [x + w / 2, 558]], 1.3, SK.ink, 'ink', 0);
    const sh = 1 + i * .12;
    paint([[x + 16, 560 - 80 * sh], [x + 40, 360], [x + w - 10, 560 - 60 * sh]], { fill: '#8FB978', fillOp: 60, bleed: .5, ink: null });
  }
  const dx = 1560, dw = 260;
  boilSeed('door');
  paint(rectPts(dx - 16, 150, dw + 32, 700), { wash: SK.wallDk, ink: SK.ink, sw: 1.6 });
  const glowK = .55 + .45 * doorOpen;
  paint(rectPts(dx, 180, dw, 640), { fill: '#FFF6D8', fillOp: 230 * glowK, bleed: .25, tex: .3, ink: null });
  glow(dx + dw / 2, 520, 420 * glowK, '#FFE9AE', .55 * glowK);
  paint(rectPts(dx - 30, 140, 34, 730), { wash: SK.wall, ink: SK.ink, sw: 1.3 });
  paint(rectPts(dx + dw - 6, 140, 34, 730), { wash: SK.wall, ink: SK.ink, sw: 1.3 });
  paint(rectPts(dx - 40, 140, dw + 80, 50), { wash: SK.wall, ink: SK.ink, sw: 1.3 });
  paint(rectPts(-200, 800, W + 400, 400), { fill: SK.floor, fillOp: 240, bleed: .1, tex: .3, ink: null });
  boilSeed('flboard');
  paint(rectPts(-200, 792, W + 400, 18), { wash: SK.wallDk, washOp: 180, ink: null });
  for (let c = 0; c < 4; c++) desk(300 + c * 300, 960, 190, { front: mixCol(SK.woodLt, SK.wall, .25) });
}

function storeBG(t) {
  paint(rectPts(-200, -100, W + 400, 1000), { fill: '#CDB894', fillOp: 235, bleed: .3, tex: .5, ink: null });
  paint(rectPts(-200, 700, W + 400, 500), { fill: '#A98C64', fillOp: 220, bleed: .2, tex: .5, ink: null });
  boilSeed('shaft');
  paint([[1250, 120], [1750, 120], [1240, 1000], [900, 1000]], { fill: '#FFF1C4', fillOp: 60, bleed: .5, ink: null });
  glow(1520, 320, 380, '#FFE7A6', .5);
  for (let i = 0; i < 3; i++) {
    boilSeed('shelf' + i);
    const x = 120 + i * 300;
    paint(rectPts(x, 260, 250, 20), { wash: SK.woodDk, ink: SK.ink, sw: 1 });
    paint(rectPts(x, 520, 250, 20), { wash: SK.woodDk, ink: SK.ink, sw: 1 });
    paint(rectPts(x, 250, 16, 300), { wash: SK.wood, ink: SK.ink, sw: 1 });
    paint(rectPts(x + 234, 250, 16, 300), { wash: SK.wood, ink: SK.ink, sw: 1 });
    for (let j = 0; j < 3; j++) cardboardBox(x + 70 + (j % 2) * 80, 500 - (j % 2) * 20, 90, 90 + j * 20);
  }
  for (let i = 0; i < 3; i++) desk(1560, 940 - i * 30, 230, { front: SK.woodLt });
  for (let i = 0; i < 12; i++) {
    boilSeed('dust' + i);
    const x = 1000 + hash(i) * 700, y = 200 + hash(i + 9) * 500 + Math.sin(t * .8 + i) * 14;
    paint(ellPts(x, y, 4 + hash(i + 2) * 4, 4 + hash(i + 2) * 4, 8), { wash: '#FFF6D8', washOp: 120, ink: null });
  }
}

function doorLight(x, y, w, h, k = 1) {
  paint(rectPts(x - 60, y - 60, w + 120, h + 120), { fill: '#FFF3CE', fillOp: 120 * k, bleed: .5, tex: .25, ink: null });
  glow(x + w / 2, y + h * .55, 360, '#FFEAB4', .5 * k);
}
