// cast3.js: paper-sticker cast — pastel flat shapes, a cream die-cut edge around every piece,
// tiny features, no visible neck. Modelled on the paper-cut reference the user supplied.
// Load after summer_kit.js. Keeps the same call surface as the older cast files.
const SK3 = {
  // school uniform: the story's "天蓝色校服", kept pastel so it sits in the sticker palette
  boyCoat: '#A8CBE0', boyCoatDk: '#86AAC2', boyShirt: '#F7F2E6',
  girlCoat: '#B6D4E5', girlCoatDk: '#92B4C8', girlShirt: '#FFFFFF',
  scarf: '#D2675C', scarfDk: '#AE4C44',
  skin: '#F7D2B2', skinDk: '#E3B491',
  hairBoy: '#2C2833', hairGirl: '#2A2530',
  pants: '#3C4049', shoe: '#33323A', shoeGirl: '#8A4E46',
  hat: '#E4CFA4', hatDk: '#C2A578', hatBand: '#7A6448',
  liuCoat: '#7FB2B4', liuCoatDk: '#639496',
  teacherCoat: '#9A8878', teacherCoatDk: '#7E6E60',
  blush: '#EC9B8F', ink: '#4A4148', edge: '#FFFBF0'
};
const K3 = SK3;

// Two passes: a fat cream edge (the die-cut) and then the thin dark line on top.
function sticker(pts, col, o = {}) {
  const sw = o.sw ?? 1;
  paint(pts, { wash: col, ink: SK3.edge, sw: sw + 1.5, curv: o.curv, washOp: o.washOp });
  paint(pts, { wash: col, ink: o.ink || SK3.ink, sw, curv: o.curv, washOp: o.washOp });
}

// A soft egg: wide cheeks, small chin, no neck.
function headPath3(cx, cy, u) {
  return through([
    [cx, cy - u * 1.5],
    [cx + u * 1.12, cy - u * 1.36],
    [cx + u * 1.44, cy - u * .66],
    [cx + u * 1.42, cy + u * .16],
    [cx + u * 1.16, cy + u * .92],
    [cx + u * .66, cy + u * 1.34],
    [cx, cy + u * 1.42],
    [cx - u * .66, cy + u * 1.34],
    [cx - u * 1.16, cy + u * .92],
    [cx - u * 1.42, cy + u * .16],
    [cx - u * 1.44, cy - u * .66],
    [cx - u * 1.12, cy - u * 1.36]
  ], 4);
}

function person3(x, y, u, o = {}) {
  const role = o.role || 'boy';
  const girl = role === 'girl';
  const flip = o.flip ? -1 : 1, view = (o.view || 0) * flip;
  const f = { ...(o.face || FACES.neutral), ...(o.lookX != null ? { lookX: o.lookX } : {}), ...(o.blush != null ? { blush: o.blush } : {}) };
  const gi = Math.round(x), dy = (o.dy || 0) * u, sq = o.sq || 0;
  // every body breathes and sways a little, so people are never paper cut-outs
  const breathe = Math.sin(T * 1.55 + gi * .07) * .006 * u;
  const sway = Math.sin(T * .62 + gi * .11) * .004 * u;
  const aL = o.aL != null ? o.aL : .14, aR = o.aR != null ? o.aR : .14;
  const cy = y - u * 7.9, shY = y - u * 6.45, hipY = y - u * 3.3;
  const half = (girl ? u * 1.02 : u * 1.08) * (o.wide || 1);
  const coat = girl ? SK3.girlCoat : role === 'liu' ? SK3.liuCoat : role === 'teacher' ? SK3.teacherCoat : SK3.boyCoat;
  const coatDk = girl ? SK3.girlCoatDk : role === 'liu' ? SK3.liuCoatDk : role === 'teacher' ? SK3.teacherCoatDk : SK3.boyCoatDk;

  if (o.shadow !== false) {
    boilSeed('k3sh' + gi);
    paint(ellPts(x, y + u * .04, u * 1.42, u * .22, 18), { fill: '#9A8568', fillOp: 46, bleed: .4, ink: null });
  }

  push(); translate(x + sway, y + dy + breathe); scale(flip * (1 + sq * .15), 1 - sq * .18); translate(-x, -y);
  const cx = x + view * u * .1;

  // ---- legs + shoes (short, tucked under the coat) ----
  if (!o.sit) {
    const sw = Math.sin(o.walk || 0) * u * .22;
    for (const s of [-1, 1]) {
      const lx = x + s * u * .42 + (s > 0 ? sw : -sw);
      boilSeed('k3lg' + s + gi);
      sticker(rrPts(lx - u * .24, hipY - u * .1, u * .48, u * 2.85, u * .12, 2), SK3.pants, { sw: .9 });
      sticker(ellPts(lx + s * u * .05, y - u * .2, u * .3, u * .17, 14), girl ? SK3.shoeGirl : SK3.shoe, { sw: .9 });
    }
  } else {
    for (const s of [-1, 1]) {
      boilSeed('k3sit' + s + gi);
      sticker(rrPts(x + s * u * .42 - u * .26, hipY + u * .05, u * 1.0, u * .5, u * .14, 2), SK3.pants, { sw: .9 });
      if (!o.hideLegs) {
        sticker(rrPts(x + s * u * .42 + u * .56, hipY + u * .05, u * .44, u * 1.85, u * .13, 2), SK3.pants, { sw: .9 });
        sticker(ellPts(x + s * u * .42 + u * .78, hipY + u * 1.95, u * .28, u * .16, 14), girl ? SK3.shoeGirl : SK3.shoe, { sw: .9 });
      }
    }
  }

  // ---- arms: drawn under the coat so the sleeves emerge from the body ----
  boilSeed('k3ab' + gi);
  arm3(x + half * .92, shY + u * .5, aR, 1, u, coatDk, girl);
  boilSeed('k3af2' + gi);
  arm3(x - half * .92, shY + u * .5, aL, -1, u, coat, girl);

  // ---- coat ----
  boilSeed('k3ct' + gi);
  sticker([
    [x - half, shY + u * .5], [x - half * .96, shY + u * .04], [x - u * .58, shY - u * .1],
    [x - u * .28, shY - u * .16], [x, shY - u * .17], [x + u * .28, shY - u * .16],
    [x + u * .58, shY - u * .1], [x + half * .96, shY + u * .04], [x + half, shY + u * .5],
    [x + half * 1.02, hipY + u * .1], [x + half * .82, hipY + u * .34], [x, hipY + u * .42],
    [x - half * .82, hipY + u * .34], [x - half * 1.02, hipY + u * .1]
  ], coat, { curv: .38, sw: 1.15 });
  // front seam and buttons (girl) or a zip (boy)
  boilSeed('k3seam' + gi);
  if (girl) {
    inkLine([[cx + u * .2, shY + u * .5], [cx + u * .2, hipY + u * .34]], .7, coatDk, 'inkfine', .1);
    for (const yy of [shY + u * 1.2, shY + u * 1.85]) {
      paint(ellPts(cx + u * .2, yy, u * .075, u * .075, 10), { wash: '#DCCAB0', ink: SK3.ink, sw: .5 });
    }
  } else {
    inkLine([[cx + u * .04, shY + u * .46], [cx + u * .04, hipY + u * .34]], .7, coatDk, 'inkfine', .1);
  }

  // ---- coat neckline: a shallow V with a sliver of shirt, no big white bib ----
  boilSeed('k3sh' + gi);
  sticker([[x - u * .26, shY + u * .02], [x, shY + u * .38], [x + u * .26, shY + u * .02]],
    girl ? SK3.girlShirt : SK3.boyShirt, { curv: .3, sw: .7 });

  // ---- hair behind the head ----
  if (!o.noHair) hairBack3(cx, cy, u, role, gi);

  // ---- head (no cream edge: the die-cut halo would read as a collar across the chest) ----
  boilSeed('k3hd' + gi);
  paint(headPath3(cx, cy, u), { wash: SK3.skin, ink: SK3.ink, sw: 1.1, curv: .4 });
  // ---- ears: hidden by the hair on this cut-paper cast ----

  face3(cx, cy, u, f, role, gi);
  if (!o.noHair) hairFront3(cx, cy, u, role, gi);

  // ---- the red scarf: this boy's signature ----
  if (role === 'boy' && o.scarf !== false) {
    boilSeed('k3sc' + gi);
    // band around the neck
    sticker([[cx - u * .48, shY + u * .02], [cx + u * .48, shY + u * .02], [cx + u * .44, shY + u * .3], [cx - u * .44, shY + u * .3]],
      SK3.scarf, { curv: .3, sw: .85 });
    // one short tail hanging down the chest
    sticker([[cx + u * .08, shY + u * .24], [cx + u * .4, shY + u * .28], [cx + u * .3, shY + u * 1.15], [cx + u * .04, shY + u * 1.1]],
      SK3.scarf, { curv: .4, sw: .85 });
    inkLine([[cx - u * .16, shY + u * .3], [cx + u * .02, shY + u * .84]], .55, SK3.scarfDk, 'inkfine', .2);
  }

  if (o.hat) bucket3(cx, cy, u, o.hat);
  if (o.glasses || role === 'teacher') glasses3(cx, cy, u, gi);
  if (o.sweat) sweatDrop(cx + u * 1.05, cy - u * .95, u * .3, o.sweat);
  pop();
}

function arm3(sx, sy, a, side, u, coat, girl) {
  const len = u * 1.8, ex = sx + side * Math.sin(a) * len, ey = sy + Math.cos(a) * len;
  const mx = sx + side * Math.sin(a * .5) * len * .5, my = sy + Math.cos(a * .5) * len * .5;
  // no cream edge: sleeves are part of the body's die-cut, not a separate sticker
  paint(ribbon([[sx, sy], [mx, my], [ex, ey]], u * .52, u * .42), { wash: coat, ink: SK3.ink, sw: .9 });
  paint(ellPts(ex + side * u * .03, ey + u * .1, u * .2, u * .19, 12), { wash: SK3.skin, ink: SK3.ink, sw: .85 });
}

function hairBack3(cx, cy, u, role, gi) {
  boilSeed('k3hb' + gi);
  if (role === 'girl') {
    sticker([[cx - u * 1.36, cy - u * 1.0], [cx - u * 1.52, cy + u * .7], [cx - u * 1.5, cy + u * 2.75],
             [cx - u * 1.24, cy + u * 2.9], [cx - u * 1.02, cy + u * 1.5], [cx + u * 1.02, cy + u * 1.5],
             [cx + u * 1.24, cy + u * 2.9], [cx + u * 1.5, cy + u * 2.75], [cx + u * 1.52, cy + u * .7],
             [cx + u * 1.36, cy - u * 1.0], [cx, cy - u * 1.2]],
      SK3.hairGirl, { curv: .5, sw: .95 });
  } else {
    sticker(ellPts(cx, cy - u * .55, u * 1.46, u * 1.05, 22, u * .03), SK3.hairBoy, { sw: .95 });
  }
}

function hairFront3(cx, cy, u, role, gi) {
  boilSeed('k3hf' + gi);
  if (role === 'girl') {
    // straight curtains, center-ish part, a soft bang
    sticker([[cx, cy - u * 1.54], [cx - u * .86, cy - u * 1.44], [cx - u * 1.36, cy - u * .96], [cx - u * 1.46, cy - u * .3],
             [cx - u * 1.2, cy - u * .5], [cx - u * .96, cy - u * .92], [cx - u * .46, cy - u * 1.16],
             [cx - u * .04, cy - u * 1.2], [cx + u * .04, cy - u * .96], [cx + u * .46, cy - u * 1.16],
             [cx + u * .96, cy - u * .92], [cx + u * 1.2, cy - u * .5], [cx + u * 1.46, cy - u * .3],
             [cx + u * 1.36, cy - u * .96], [cx + u * .86, cy - u * 1.44]],
      SK3.hairGirl, { curv: .45, sw: .95 });
    for (const s of [-1, 1]) sticker([[cx + s * u * 1.4, cy - u * .34], [cx + s * u * 1.52, cy + u * .6],
             [cx + s * u * 1.38, cy + u * 1.5], [cx + s * u * 1.24, cy + u * 1.18], [cx + s * u * 1.24, cy + u * .3],
             [cx + s * u * 1.3, cy - u * .34]], SK3.hairGirl, { curv: .45, sw: .8 });
  } else if (role === 'liu') {
    // bowl cut: a full round cap with a low, straight fringe
    sticker([[cx - u * 1.46, cy - u * .16], [cx - u * 1.5, cy - u * .86], [cx - u * 1.16, cy - u * 1.4],
             [cx - u * .4, cy - u * 1.62], [cx + u * .4, cy - u * 1.62], [cx + u * 1.16, cy - u * 1.4],
             [cx + u * 1.5, cy - u * .86], [cx + u * 1.46, cy - u * .14], [cx + u * 1.14, cy - u * .34],
             [cx + u * .62, cy - u * .44], [cx, cy - u * .4], [cx - u * .62, cy - u * .44],
             [cx - u * 1.14, cy - u * .34]], SK3.hairBoy, { curv: .45, sw: 1 });
  } else if (role === 'teacher') {
    sticker([[cx - u * 1.4, cy - u * .34], [cx - u * 1.44, cy - u * .92], [cx - u * 1.02, cy - u * 1.4],
             [cx + u * .18, cy - u * 1.48], [cx + u * 1.26, cy - u * 1.26], [cx + u * 1.42, cy - u * .66],
             [cx + u * 1.38, cy - u * .28], [cx + u * .88, cy - u * .56], [cx + u * .1, cy - u * .64],
             [cx - u * .72, cy - u * .52]], SK3.hairBoy, { curv: .45, sw: .95 });
  } else {
    // boy: smooth cap, straight fringe just above the eyes, two strand tips on top
    sticker([[cx - u * 1.42, cy - u * .3], [cx - u * 1.46, cy - u * .9], [cx - u * 1.12, cy - u * 1.4],
             [cx - u * .46, cy - u * 1.56], [cx + u * .3, cy - u * 1.56], [cx + u * 1.02, cy - u * 1.36],
             [cx + u * 1.42, cy - u * .86], [cx + u * 1.44, cy - u * .26], [cx + u * 1.18, cy - u * .42],
             [cx + u * .9, cy - u * .5], [cx + u * .5, cy - u * .46], [cx + u * .1, cy - u * .52],
             [cx - u * .34, cy - u * .44], [cx - u * .76, cy - u * .5], [cx - u * 1.14, cy - u * .38]],
      SK3.hairBoy, { curv: .45, sw: 1 });
  }
}

function face3(cx, cy, u, f, role, gi) {
  const girl = role === 'girl';
  const ey = cy + u * .18, ex = u * .64;
  const lookX = (f.lookX || 0) * u * .07, lookY = (f.lookY || 0) * u * .06;
  const open = 1 - Math.max(f.squint || 0, blinkAt(T, gi * .37 + 2));
  for (const s of [-1, 1]) {
    const kind = open < .32 ? 'closed' : (f.e || 'open');
    eye3(cx + s * ex, ey, u, kind, s, lookX, lookY, role);
    // short brow, so a small figure still reads as a face
    const by = ey - u * .34 + u * (f.b || 0);
    const sl = (f.e === 'squeeze' || f.m === 'wobble') ? u * .05 : 0;
    inkLine([[cx + s * ex - u * .19, by + u * .03 + sl], [cx + s * ex, by - u * .04 + sl], [cx + s * ex + u * .17, by + sl]],
      1.2, SK3.ink, 'inkfine', .2);
  }
  mouth3(cx, ey + u * .52, u, f.m || 'flat', role);
  const bl = f.blush || .55;
  if (bl > .05) {
    boilSeed('k3bl' + gi);
    for (const s of [-1, 1]) paint(ellPts(cx + s * u * .82, ey + u * .28, u * .17, u * .085, 14),
      { wash: SK3.blush, washOp: 120 * bl, ink: null });
  }
}

function eye3(x, y, u, kind, s, lx, ly, role) {
  const inkc = SK3.ink;
  boilSeed('k3ey' + Math.round(x) + kind);
  if (kind === 'closed') { inkLine([[x - u * .13, y], [x, y + u * .045], [x + u * .13, y]], 1.2, inkc, 'inkfine', .1); return; }
  if (kind === 'happy' || kind === 'smile') { inkLine([[x - u * .14, y + u * .05], [x, y - u * .05], [x + u * .14, y + u * .05]], 1.3, inkc, 'inkfine', .1); return; }
  if (kind === 'narrow') { inkLine([[x - u * .13, y + u * .01], [x + u * .13, y + u * .015]], 1.2, inkc, 'inkfine', .1); return; }
  if (kind === 'squint') { inkLine([[x - u * .12, y + u * .03], [x, y - u * .03], [x + u * .12, y + u * .03]], 1.2, inkc, 'inkfine', .1); return; }
  if (kind === 'squeeze') { inkLine([[x - u * .13, y - u * .04], [x, y + u * .05], [x + u * .13, y - u * .04]], 1.3, inkc, 'inkfine', .1); return; }
  const big = kind === 'wide' || kind === 'stare';
  const w = u * (big ? .15 : .13), h = u * (big ? .19 : .16);
  paint(ellPts(x + lx * .4, y + ly * .4, w, h, 14), { wash: inkc, ink: null });
  paint(ellPts(x + lx * .4 + u * .03, y - u * .04 + ly * .4, u * .026, u * .03, 8), { wash: '#FFFFFF', ink: null });
  if (big) inkLine([[x - w * 1.5, y - u * .13], [x, y - u * .18], [x + w * 1.5, y - u * .12]], 1.1, inkc, 'inkfine', .2);
}

function mouth3(cx, y, u, kind, role) {
  const dark = SK3.ink;
  boilSeed('k3mo' + Math.round(cx) + kind);
  const w = u * .12;
  if (kind === 'smile') { inkLine([[cx - w, y - u * .02], [cx, y + u * .045], [cx + w, y - u * .02]], 1.2, dark, 'inkfine', .1); return; }
  if (kind === 'flat') { inkLine([[cx - w * .6, y], [cx, y + u * .01], [cx + w * .6, y]], 1.1, dark, 'inkfine', .1); return; }
  if (kind === 'smirk') { inkLine([[cx - w * .7, y + u * .02], [cx, y - u * .005], [cx + w * .7, y - u * .025]], 1.1, dark, 'inkfine', .1); return; }
  if (kind === 'grin' || kind === 'open' || kind === 'laugh' || kind === 'teeth') {
    const h = kind === 'teeth' ? u * .09 : u * .12;
    paint([[cx - w, y - u * .015], [cx, y + h], [cx + w, y - u * .015]], { wash: '#7A4348', ink: dark, sw: .5, curv: .35 });
    return;
  }
  if (kind === 'o' || kind === 'O') { paint(ellPts(cx, y + u * .02, u * .05, u * .07, 12), { wash: '#7A4348', ink: dark, sw: .5 }); return; }
  if (kind === 'wobble') { inkLine([[cx - w, y], [cx - w * .3, y + u * .035], [cx + w * .3, y - u * .015], [cx + w, y + u * .015]], 1.1, dark, 'inkfine', .1); return; }
  if (kind === 'frown') { inkLine([[cx - w, y + u * .04], [cx, y - u * .015], [cx + w, y + u * .04]], 1.2, dark, 'inkfine', .1); return; }
  inkLine([[cx - w * .6, y], [cx + w * .6, y]], 1.1, dark, 'inkfine', .1);
}

function bucket3(cx, cy, u, kind) {
  boilSeed('k3ht' + Math.round(cx));
  if (kind === 'cap') {
    sticker(ellPts(cx, cy - u * 1.28, u * 1.32, u * .56, 20), '#D3DEE7', { sw: .9 });
    sticker(rrPts(cx - u * 1.52, cy - u * 1.28, u * 2.8, u * .17, u * .08, 2), '#B4C4D0', { sw: .85 });
    return;
  }
  sticker([[cx - u * 1.4, cy - u * 1.34], [cx - u * 1.22, cy - u * 2.0], [cx - u * .16, cy - u * 2.18],
           [cx + u * .76, cy - u * 2.06], [cx + u * 1.26, cy - u * 1.7], [cx + u * 1.4, cy - u * 1.34]],
    SK3.hat, { curv: .45, sw: 1 });
  sticker(ellPts(cx, cy - u * 1.32, u * 1.72, u * .28, 26, u * .02), SK3.hatDk, { sw: 1 });
  sticker([[cx - u * 1.34, cy - u * 1.58], [cx + u * 1.34, cy - u * 1.58], [cx + u * 1.31, cy - u * 1.4], [cx - u * 1.31, cy - u * 1.4]],
    SK3.hatBand, { sw: .8 });
}

function glasses3(cx, cy, u, gi) {
  boilSeed('k3gl' + gi);
  const y = cy + u * .18;
  for (const s of [-1, 1]) {
    const p = rrPts(cx + s * u * .64 - u * .2, y - u * .17, u * .4, u * .34, u * .1, 1);
    paint(p, { ink: '#5C5054', sw: 1 });
    inkLine([[cx + s * u * .84, y - u * .04], [cx + s * u * 1.0, y - u * .1]], .8, '#5C5054', 'inkfine', .1);
    paint(ellPts(cx + s * u * .64 - u * .06, y - u * .1, u * .05, u * .035, 10), { wash: '#FFFFFF', washOp: 120, ink: null });
  }
  inkLine([[cx - u * .12, y - u * .02], [cx + u * .12, y - u * .02]], .7, '#4A4048', 'inkfine', .1);
}

// ---------- same call surface as the v3/v4 cast ----------
// Two hands gripping the top edges of a carried desk.
function handsOn(cx, cy, w) {
  for (const s of [-1, 1]) {
    paint(ellPts(cx + s * w * .44, cy + w * .02, w * .06, w * .05, 10), { wash: SK3.skin, ink: SK3.ink, sw: .8 });
  }
}

function person(x, y, u, o = {}) { person3(x, y, u, o); }
function drawArm(sx, sy, a, side, u, skin, dark) { arm3(sx, sy, a, side, u, dark ? SK3.boyCoatDk : SK3.boyCoat, false); }
function drawHairBack(cx, cy, u, role, gi) { hairBack3(cx, cy, u, role, gi); }
function drawHairFront(cx, cy, u, role, gi) { hairFront3(cx, cy, u, role, gi); }
function drawFace(cx, cy, u, f, role, o, gi) { face3(cx, cy, u, f, role, gi); }
function drawBucket(cx, cy, u, kind) { bucket3(cx, cy, u, kind); }
function drawGlasses(cx, cy, u, gi) { glasses3(cx, cy, u, gi); }
// scenes/summer.js calls these directly
function face2(cx, cy, u, f, role, gi) { face3(cx, cy, u, f, role, gi); }
function hairBack2(cx, cy, u, role, gi) { hairBack3(cx, cy, u, role, gi); }
function hairFront2(cx, cy, u, role, gi) { hairFront3(cx, cy, u, role, gi); }
function headPath(cx, cy, u) { return headPath3(cx, cy, u); }
