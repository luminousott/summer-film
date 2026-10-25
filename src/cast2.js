// cast2.js: v4 character models 鈥?slimmer, semi-realistic proportions with a light chibi bias.
// Loaded after summer_kit.js so these declarations replace the v3 cast. Everything is p5.brush only.
const SK2 = {
  boySkin: '#F1C9A2', boySh: '#D9A678',
  girlSkin: '#FCEFE4', girlSh: '#E9CCBA',
  lip: '#C0706A', lipDk: '#9A504D',
  hairBoy: '#2F2733', hairGirl: '#2B2430', hairHi: '#5A4C5E',
  uni: '#8EC3E6', uniDk: '#5B8DB2', uniLt: '#BFE0F2',
  trim: '#FBFDFF', pants: '#39466B', shoe: '#F1E8D6',
  hat: '#DCC79E', hatDk: '#A98B63', hatBand: '#6E5A44'
};

// ---- head geometry helpers ----
function headPath(cx, cy, u) {
  return through([
    [cx, cy - u * 1.06],
    [cx + u * .46, cy - u * 1.0],
    [cx + u * .66, cy - u * .72],
    [cx + u * .70, cy - u * .3],
    [cx + u * .64, cy + u * .12],
    [cx + u * .46, cy + u * .52],
    [cx + u * .2, cy + u * .72],
    [cx, cy + u * .78],
    [cx - u * .2, cy + u * .72],
    [cx - u * .46, cy + u * .52],
    [cx - u * .64, cy + u * .12],
    [cx - u * .70, cy - u * .3],
    [cx - u * .66, cy - u * .72],
    [cx - u * .46, cy - u * 1.0]
  ], 4);
}

function person2(x, y, u, o = {}) {
  const role = o.role || 'boy';
  const girl = role === 'girl', teacher = role === 'teacher';
  const flip = o.flip ? -1 : 1, view = (o.view || 0) * flip;
  const face = o.face || FACES.neutral;
  const f = { ...face, ...(o.lookX != null ? { lookX: o.lookX } : {}), ...(o.blush != null ? { blush: o.blush } : {}) };
  const skin = girl ? SK2.girlSkin : SK2.boySkin;
  const skinSh = girl ? SK2.girlSh : SK2.boySh;
  const gi = Math.round(x), dy = (o.dy || 0) * u, sq = o.sq || 0;
  const aL = o.aL != null ? o.aL : .16, aR = o.aR != null ? o.aR : .16;
  const hipY = y - u * 4.3, shY = y - u * 7.45, headC = y - u * 8.86;
  const tw = (girl ? u * 1.28 : u * 1.42) * (o.wide || 1);

  if (o.shadow !== false) { boilSeed('p2sh' + gi); paint(ellPts(x, y + u * .04, u * 1.55, u * .22, 18), { fill: '#8A7358', fillOp: 48, bleed: .4, ink: null }); }

  push(); translate(x, y + dy); scale(flip * (1 + sq * .16), 1 - sq * .18); translate(-x, -y);
  const cx = x + view * u * .1;

  // ---- legs ----
  if (!o.sit) {
    const sw = Math.sin(o.walk || 0) * u * .2;
    for (const s of [-1, 1]) {
      const lx = x + s * u * .4 + (s > 0 ? sw : -sw);
      boilSeed('p2leg' + s + gi);
      paint([[lx - u * .26, hipY], [lx + u * .26, hipY], [lx + u * .2, y - u * .3], [lx + u * .17, y - u * .12],
             [lx - u * .19, y - u * .12], [lx - u * .21, y - u * .3]], { wash: SK2.pants, ink: SK.ink, sw: .75, curv: .3 });
      paint(ellPts(lx + s * u * .04, y - u * .1, u * .3, u * .14, 14), { wash: SK2.shoe, ink: SK.ink, sw: .65 });
    }
  } else {
    for (const s of [-1, 1]) {
      boilSeed('p2sit' + s + gi);
      paint(rrPts(x + s * u * .4 - u * .28, hipY + u * .05, u * 1.15, u * .48, u * .14, 2), { wash: SK2.pants, ink: SK.ink, sw: .75 });
      paint(rrPts(x + s * u * .4 + u * .62, hipY + u * .05, u * .44, u * 2.1, u * .13, 2), { wash: SK2.pants, ink: SK.ink, sw: .75 });
    }
  }

  // ---- neck (behind the jacket, under the head) ----
  boilSeed('p2n' + gi);
  paint([[cx - u * .21, headC + u * .95], [cx + u * .21, headC + u * .95], [cx + u * .26, shY + u * .08], [cx - u * .26, shY + u * .08]], { wash: skinSh, ink: SK.ink, sw: .45, curv: .2 });

  // ---- far arm ----
  boilSeed('p2af' + gi);
  arm2(x + tw * .78, shY + u * .05, aR, 1, u, skin, 1);

  // ---- torso: fitted track jacket ----
  boilSeed('p2to' + gi);
  paint([
    [x - tw * .88, shY - u * .02], [x - u * .3, shY - u * .18], [x, shY - u * .2], [x + u * .3, shY - u * .18],
    [x + tw * .88, shY - u * .02], [x + tw, shY + u * .95], [x + tw * .8, hipY + u * .25], [x + u * .3, hipY + u * .45],
    [x, hipY + u * .5], [x - u * .3, hipY + u * .45], [x - tw * .8, hipY + u * .25], [x - tw, shY + u * .95]
  ], { wash: SK2.uni, ink: SK.ink, sw: .95, curv: .4 });
  // chest stripe + zip + cuffs
  boilSeed('p2st' + gi);
  inkLine([[x - tw * .84, shY + u * .55], [x, shY + u * .68], [x + tw * .84, shY + u * .55]], 1.4, SK2.trim, 'inkfine', .3);
  inkLine([[x + u * .02, shY + u * .1], [x + u * .02, hipY + u * .42]], .75, SK2.uniDk, 'inkfine', .1);
  // white crew tee showing at the collar
  boilSeed('p2co' + gi);
  paint(ellPts(x, shY + u * .06, u * .42, u * .17, 18), { wash: SK2.trim, ink: SK.ink, sw: .55 });
  paint([[x - u * .5, shY - u * .02], [x - u * .12, shY + u * .16], [x - u * .44, shY + u * .3]], { wash: SK2.uniLt, ink: SK.ink, sw: .5, curv: .4 });
  paint([[x + u * .5, shY - u * .02], [x + u * .12, shY + u * .16], [x + u * .44, shY + u * .3]], { wash: SK2.uniLt, ink: SK.ink, sw: .5, curv: .4 });
  // ---- near arm ----
  boilSeed('p2an' + gi);
  arm2(x - tw * .78, shY + u * .05, aL, -1, u, skin, 0);


  // ---- hair behind + head ----
  if (!o.noHair) hairBack2(cx, headC, u, role, gi);
  boilSeed('p2h' + gi);
  paint(headPath(cx, headC, u), { wash: skin, ink: SK.ink, sw: .85, curv: .35 });
  // ears
  boilSeed('p2e' + gi);
  for (const s of [-1, 1]) paint(ellPts(cx + s * u * .685, headC - u * .05, u * .1, u * .16, 12), { wash: skin, ink: SK.ink, sw: .5 });

  face2(cx, headC, u, f, role, gi);
  if (!o.noHair) hairFront2(cx, headC, u, role, gi);
  if (o.hat) bucket2(cx, headC, u, o.hat);
  if (o.glasses || teacher) glasses2(cx, headC, u, gi);
  if (o.sweat) sweatDrop(cx + u * 1.02, headC - u * .95, u * .3, o.sweat);
  pop();
}

function arm2(sx, sy, a, side, u, skin, dark) {
  const len = u * 3.15, ex = sx + side * Math.sin(a) * len, ey = sy + Math.cos(a) * len;
  const mx = sx + side * Math.sin(a * .45) * len * .5, my = sy + Math.cos(a * .45) * len * .5;
  paint(ribbon([[sx, sy], [mx, my], [ex, ey]], u * .5, u * .34), { wash: dark ? SK2.uniDk : SK2.uni, ink: SK.ink, sw: .8 });
  paint(ellPts(ex + side * u * .02, ey + u * .08, u * .17, u * .16, 12), { wash: skin, ink: SK.ink, sw: .55 });
}

function hairBack2(cx, headC, u, role, gi) {
  boilSeed('p2hb' + gi);
  if (role === 'girl') {
    paint([[cx - u * .98, headC - u * .55], [cx - u * 1.08, headC + u * .7], [cx - u * 1.1, headC + u * 1.95],
           [cx - u * .8, headC + u * 2.15], [cx - u * .62, headC + u * .85], [cx + u * .62, headC + u * .85],
           [cx + u * .8, headC + u * 2.15], [cx + u * 1.1, headC + u * 1.95], [cx + u * 1.08, headC + u * .7],
           [cx + u * .98, headC - u * .55], [cx, headC - u * .7]], { wash: SK2.hairGirl, ink: SK.ink, sw: .75, curv: .5 });
  } else {
    paint(ellPts(cx, headC - u * .42, u * .74, u * .62, 20, u * .03), { wash: SK2.hairBoy, ink: SK.ink, sw: .75 });
  }
}

function hairFront2(cx, headC, u, role, gi) {
  boilSeed('p2hf' + gi);
  if (role === 'girl') {
    // center part, soft curtains; forehead stays open
    paint([[cx, headC - u * 1.08], [cx - u * .5, headC - u * 1.02], [cx - u * .88, headC - u * .72], [cx - u * .94, headC - u * .25],
           [cx - u * .66, headC - u * .32], [cx - u * .44, headC - u * .62], [cx - u * .18, headC - u * .82],
           [cx, headC - u * .55], [cx + u * .18, headC - u * .82], [cx + u * .44, headC - u * .62], [cx + u * .66, headC - u * .32],
           [cx + u * .94, headC - u * .25], [cx + u * .88, headC - u * .72], [cx + u * .5, headC - u * 1.02]], { wash: SK2.hairGirl, ink: SK.ink, sw: .75, curv: .45 });
    for (const s of [-1, 1]) {
      paint([[cx + s * u * .9, headC - u * .35], [cx + s * u * 1.04, headC + u * .35], [cx + s * u * .96, headC + u * 1.45],
             [cx + s * u * .8, headC + u * 1.5], [cx + s * u * .74, headC + u * .4], [cx + s * u * .78, headC - u * .35]],
            { wash: SK2.hairGirl, ink: SK.ink, sw: .6, curv: .5 });
    }
    inkLine([[cx - u * .44, headC - u * .88], [cx - u * .06, headC - u * .96], [cx + u * .34, headC - u * .9]], .5, SK2.hairHi, 'inkfine', .3);
  } else if (role === 'liu') {
    paint([[cx - u * .9, headC - u * .35], [cx - u * .94, headC - u * .7], [cx - u * .48, headC - u * .95],
           [cx + u * .28, headC - u * .97], [cx + u * .9, headC - u * .8], [cx + u * .94, headC - u * .4],
           [cx + u * .58, headC - u * .48], [cx, headC - u * .52], [cx - u * .58, headC - u * .46]], { wash: SK2.hairBoy, ink: SK.ink, sw: .65, curv: .4 });
  } else if (role === 'teacher') {
    paint([[cx - u * .94, headC - u * .35], [cx - u * .98, headC - u * .72], [cx - u * .64, headC - u * .96],
           [cx + u * .18, headC - u * 1.02], [cx + u * .9, headC - u * .86], [cx + u * .94, headC - u * .42],
           [cx + u * .58, headC - u * .6], [cx + u * .08, headC - u * .64], [cx - u * .56, headC - u * .5]], { wash: SK2.hairBoy, ink: SK.ink, sw: .65, curv: .5 });
  } else {
    // boy: side-parted crop; the fringe sweeps right and leaves a little forehead
    paint([[cx - u * .92, headC - u * .3], [cx - u * .96, headC - u * .68], [cx - u * .72, headC - u * 1.0],
           [cx - u * .2, headC - u * 1.14], [cx + u * .42, headC - u * 1.08], [cx + u * .9, headC - u * .84],
           [cx + u * .94, headC - u * .38], [cx + u * .82, headC - u * .22], [cx + u * .55, headC - u * .5],
           [cx + u * .28, headC - u * .66], [cx - u * .06, headC - u * .58], [cx - u * .34, headC - u * .34],
           [cx - u * .62, headC - u * .24]], { wash: SK2.hairBoy, ink: SK.ink, sw: .8, curv: .4 });
    inkLine([[cx - u * .42, headC - u * .9], [cx - u * .02, headC - u * 1.0], [cx + u * .36, headC - u * .94]], .5, SK2.hairHi, 'inkfine', .25);
  }
}

function face2(cx, headC, u, f, role, gi) {
  const girl = role === 'girl';
  const ey = headC - u * .02, ex = u * .42;
  const lookX = (f.lookX || 0) * u * .09, lookY = (f.lookY || 0) * u * .07;
  const squint = f.squint || 0;
  const blink = blinkAt(T, gi * .37 + 2);
  const open = 1 - Math.max(squint, blink);
  for (const s of [-1, 1]) {
    const x = cx + s * ex;
    const kind = (open < .32) ? 'closed' : (f.e || 'open');
    eye2(x, ey, u, kind, s, lookX, lookY, role);
    const by = ey - u * .34 + u * (f.b || 0);
    const sl = (f.e === 'squeeze' || f.m === 'wobble') ? u * .04 : 0;
    inkLine([[x - s * u * .24, by + u * .05 + sl], [x - s * u * .02, by - u * .02 + sl], [x + s * u * .22, by + u * .01 + sl]],
      girl ? 1.5 : 1.7, girl ? '#4A3842' : SK.ink, 'inkfine', .15);
  }
  // nose: one soft shadow hook
  inkLine([[cx + u * .02, ey + u * .38], [cx - u * .03, ey + u * .47]], 1.0, skinSh(role), 'inkfine', .1);
  // mouth
  mouth2(cx, ey + u * .6, u, f.m || 'flat', role);
  // blush
  const bl = f.blush || 0;
  if (bl > .05) {
    boilSeed('p2bl' + gi);
    for (const s of [-1, 1]) paint(ellPts(cx + s * u * .46, ey + u * .36, u * .17, u * .085, 14), { wash: SK.rose, washOp: 80 * bl, ink: null });
  }
}
function skinSh(role) { return role === 'girl' ? SK2.girlSh : SK2.boySh; }

function eye2(x, y, u, kind, s, lx, ly, role) {
  const girl = role === 'girl';
  const w = girl ? u * .26 : u * .24, h = girl ? u * .235 : u * .175;
  const inkc = '#3A2E39';
  boilSeed('p2ey' + Math.round(x) + kind);
  if (kind === 'closed') { inkLine([[x - w, y], [x, y + u * .06], [x + w, y]], 1.5, inkc, 'ink', .1); return; }
  if (kind === 'happy') { inkLine([[x - w, y + u * .07], [x, y - u * .06], [x + w, y + u * .07]], 1.5, inkc, 'ink', .1); return; }
  if (kind === 'narrow') { inkLine([[x - w, y + u * .01], [x + w, y + u * .02]], 1.4, inkc, 'ink', .1); return; }
  if (kind === 'squint') { inkLine([[x - w, y + u * .03], [x, y - u * .04], [x + w, y + u * .03]], 1.4, inkc, 'ink', .1); return; }
  if (kind === 'blank') { paint(ellPts(x + lx * .3, y, u * .05, u * .06, 10), { wash: inkc, ink: null }); return; }
  if (kind === 'squeeze') { inkLine([[x - w, y - u * .02], [x, y + u * .07], [x + w, y - u * .02]], 1.5, inkc, 'ink', .1); return; }

  const white = girl ? '#FFFCF6' : '#FFFAF0';
  // almond eye white
  paint(ellPts(x, y, w, h, 18, u * .005), { wash: white, ink: null });
  // iris
  paint(ellPts(x + lx * .5, y + u * .015 + ly * .45, w * .62, h * .74, 16), { wash: '#8A6444', ink: null });
  paint(ellPts(x + lx * .5, y + u * .015 + ly * .45, w * .42, h * .56, 14), { wash: '#4A3524', ink: null });
  paint(ellPts(x + lx * .5, y + u * .015 + ly * .45, w * .2, h * .34, 12), { wash: '#221A24', ink: null });
  paint(ellPts(x + lx * .8 - u * .03, y - u * .06 + ly * .5, u * .045, u * .052, 8), { wash: '#FFFFFF', ink: null });
  paint(ellPts(x + lx * .3 + u * .04, y + u * .07 + ly * .5, u * .022, u * .026, 8), { wash: '#FFFFFF', washOp: 200, ink: null });
  // lids
  inkLine([[x - w * 1.02, y - u * .015], [x - w * .1, y - u * .17], [x + w * .92, y - u * .03]], girl ? 1.9 : 1.5, inkc, 'ink', .3);
  inkLine([[x - w * .9, y + u * .09], [x + w * .8, y + u * .07]], .5, inkc, 'inkfine', .2);
  if (girl) {
    inkLine([[x - w * 1.0, y - u * .06], [x - w * 1.16, y - u * .14]], 1.5, inkc, 'ink', .1);
    inkLine([[x + w * .95, y - u * .03], [x + w * 1.12, y - u * .11]], 1.5, inkc, 'ink', .1);
  }
}

function mouth2(cx, y, u, kind, role) {
  const girl = role === 'girl';
  const w = u * .17, dark = girl ? SK2.lipDk : '#5B3B38';
  boilSeed('p2mo' + Math.round(cx) + kind);
  if (kind === 'smile') {
    inkLine([[cx - w, y - u * .02], [cx, y + u * .07], [cx + w, y - u * .02]], 1.5, dark, 'ink', .1);
    if (girl) paint(ellPts(cx, y + u * .06, w * .5, u * .045, 12), { wash: SK2.lip, washOp: 120, ink: null });
    return;
  }
  if (kind === 'flat') { inkLine([[cx - w * .55, y], [cx, y + u * .01], [cx + w * .55, y]], 1.3, dark, 'ink', .1); return; }
  if (kind === 'smirk') { inkLine([[cx - w * .65, y + u * .02], [cx, y - u * .005], [cx + w * .68, y - u * .03]], 1.4, dark, 'ink', .1); return; }
  if (kind === 'grin' || kind === 'open' || kind === 'laugh' || kind === 'teeth') {
    const h = kind === 'teeth' ? u * .13 : u * .17;
    paint([[cx - w * 1.0, y - u * .02], [cx, y + h], [cx + w * 1.0, y - u * .02]], { wash: '#6A343B', ink: dark, sw: .7, curv: .35 });
    if (kind === 'teeth' || kind === 'grin') paint(rrPts(cx - w * .62, y - u * .01, w * 1.24, h * .36, 1, 1), { wash: '#FFF9EE', ink: null });
    return;
  }
  if (kind === 'o' || kind === 'O') { paint(ellPts(cx, y + u * .02, u * .058, u * .08, 12), { wash: '#6A343B', ink: dark, sw: .7 }); return; }
  if (kind === 'wobble') { inkLine([[cx - w, y], [cx - w * .3, y + u * .04], [cx + w * .3, y - u * .02], [cx + w, y + u * .02]], 1.4, dark, 'ink', .1); return; }
  if (kind === 'frown') { inkLine([[cx - w, y + u * .05], [cx, y - u * .02], [cx + w, y + u * .05]], 1.4, dark, 'ink', .1); return; }
  inkLine([[cx - w * .55, y], [cx + w * .55, y]], 1.3, dark, 'ink', .1);
}

function bucket2(cx, headC, u, kind) {
  boilSeed('p2hat' + Math.round(cx));
  if (kind === 'cap') {
    paint(ellPts(cx, headC - u * .82, u * .86, u * .4, 20), { wash: '#C9D8E4', ink: SK.ink, sw: .8 });
    paint(rrPts(cx - u * 1.0, headC - u * .82, u * 1.8, u * .15, u * .07, 2), { wash: '#A9BECF', ink: SK.ink, sw: .7 });
    return;
  }
  paint([[cx - u * 1.02, headC - u * .95], [cx - u * .9, headC - u * 1.5], [cx - u * .2, headC - u * 1.66],
         [cx + u * .44, headC - u * 1.62], [cx + u * .9, headC - u * 1.28], [cx + u * 1.02, headC - u * .95]],
        { wash: SK2.hat, ink: SK.ink, sw: .85, curv: .45 });
  paint(ellPts(cx, headC - u * .95, u * 1.42, u * .24, 26, u * .02), { wash: SK2.hatDk, ink: SK.ink, sw: .85 });
  paint([[cx - u * 1.02, headC - u * 1.16], [cx + u * 1.02, headC - u * 1.16], [cx + u * 1.0, headC - u * 1.0], [cx - u * 1.0, headC - u * 1.0]], { wash: SK2.hatBand, ink: SK.ink, sw: .6 });
}

function glasses2(cx, headC, u, gi) {
  boilSeed('p2gl' + gi);
  const y = headC - u * .02;
  for (const s of [-1, 1]) paint(rrPts(cx + s * u * .42 - u * .24, y - u * .2, u * .48, u * .36, u * .1, 1), { wash: '#FFFFFF', washOp: 26, ink: SK.ink, sw: .55 });
  inkLine([[cx - u * .16, y - u * .05], [cx + u * .16, y - u * .05]], .7, SK.ink, 'ink', .1);
}

// make all scene calls use the v4 cast
function person(x, y, u, o = {}) { person2(x, y, u, o); }
function drawArm(sx, sy, a, side, u, skin, dark) { arm2(sx, sy, a, side, u, skin, dark); }
function drawHairBack(cx, headC, u, role, gi) { hairBack2(cx, headC, u, role, gi); }
function drawHairFront(cx, headC, u, role, gi) { hairFront2(cx, headC, u, role, gi); }
function drawFace(cx, headC, u, f, role, o, gi) { face2(cx, headC, u, f, role, gi); }
function drawBucket(cx, headC, u, kind) { bucket2(cx, headC, u, kind); }
function drawGlasses(cx, headC, u, gi) { glasses2(cx, headC, u, gi); }
