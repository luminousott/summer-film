// summer.js -- CH1 (0:00-2:13), 21 shots on the paper-sticker cast.
// Every shot paints the whole frame and is a pure function of t (see timeline.js).
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));

  // A person seen from behind (over-the-shoulder shot).
  function backView(x, y, u) {
    const cy = y - u * 7.9, shY = y - u * 6.45, hipY = y - u * 3.3, half = u * 1.08;
    sticker([[x - half, shY + u * .5], [x - half * .96, shY + u * .04], [x - u * .6, shY - u * .1],
             [x + u * .6, shY - u * .1], [x + half * .96, shY + u * .04], [x + half, shY + u * .5],
             [x + half, hipY + u * .1], [x - half, hipY + u * .1]], SK3.boyCoat, { curv: .38, sw: 1.1 });
    sticker(ellPts(x, cy, u * 1.44, u * 1.44, 24), SK3.hairBoy, { sw: 1.1 });
    paint(ellPts(x, cy + u * 1.2, u * .5, u * .22, 14), { wash: SK3.skin, ink: null });
  }

  // Face down on the desk: folded arms as a pillow, head resting sideways, desk in front.
  function slumpBoy(x, gy, u) {
    const w = u * 3.6, dh = w * .86, dTop = gy - dh;
    sticker(rrPts(x - u * .9, gy - u * 3.2, u * 1.8, u * 1.2, u * .1, 2), '#C9A176', { sw: 1 });
    sticker([[x - u * 1.14, dTop + u * .2], [x - u * 1.2, dTop - u * .6], [x - u * .5, dTop - u * .95],
             [x + u * .5, dTop - u * .95], [x + u * 1.2, dTop - u * .6], [x + u * 1.14, dTop + u * .2]],
      SK3.boyCoat, { curv: .42, sw: 1.05 });
    sticker(ribbon([[x - u * 1.2, dTop - u * .02], [x - u * .2, dTop - u * .14], [x + u * .9, dTop - u * .02]], u * .4, u * .34),
      SK3.boyCoatDk, { sw: .95 });
    sticker(ellPts(x + u * .82, dTop - u * .1, u * .18, u * .16, 12), SK3.skin, { sw: .85 });
    push(); translate(x - u * .22, dTop - u * .62); rotate(-.3);
    hairBack3(0, 0, u, 'boy', 0);
    paint(headPath3(0, 0, u), { wash: SK3.skin, ink: SK3.ink, sw: 1.1, curv: .4 });
    face3(0, 0, u, { e: 'closed', m: 'flat', blush: .6 }, 'boy', 0);
    hairFront3(0, 0, u, 'boy', 0);
    pop();
    desk(x, gy - u * .05, w);
    sticker(rrPts(x - u * 1.5, dTop - u * .3, u * .8, u * .16, 2, 1), '#EFE3CB', { sw: .7 });
  }

  // A carried desk: top face, front edge, dangling legs.
  function heldDesk(cx, cy, w) {
    const d = w * .18;
    sticker([[cx - w / 2, cy], [cx + w / 2, cy], [cx + w / 2 * .96, cy - d], [cx - w / 2 * .96, cy - d]], '#C9A176', { sw: 1 });
    sticker([[cx - w / 2, cy], [cx + w / 2, cy], [cx + w / 2, cy + d * .8], [cx - w / 2, cy + d * .8]], '#DDBB90', { sw: 1 });
    inkLine([[cx - w * .4, cy + d * .8], [cx - w * .37, cy + d * 1.3]], 7, '#A9805A', 'ink', .05);
    inkLine([[cx + w * .4, cy + d * .8], [cx + w * .37, cy + d * 1.3]], 7, '#A9805A', 'ink', .05);
  }
  function fartPuff(x, y, s, k) {
    if (k <= 0) return;
    const r = s * (.55 + .75 * clamp(k));
    boilSeed('fart' + Math.round(x) + Math.round(k * 6));
    for (let i = 0; i < 3; i++) paint(ellPts(x + (i - 1) * r * .52, y - i * r * .2 - k * s * .45, r * .58, r * .44, 14, r * .1),
      { fill: '#CBDDAE', fillOp: 130 * (1 - k * .5), bleed: .45, tex: .65, ink: null });
    inkLine([[x - r * .55, y], [x - r * .15, y - r * .55], [x + r * .25, y - r * .2], [x + r * .5, y - r * .85]], 1.3, '#6E8C4E', 'inkfine', .5);
  }
  function grumble(x, y, r) {
    boilSeed('grum' + Math.round(x));
    paint(ellPts(x, y, r, r * .6, 16, r * .1), { fill: '#B7B0AC', fillOp: 150, bleed: .3, tex: .5, ink: null });
    paint(ellPts(x + r * .55, y - r * .18, r * .58, r * .44, 14), { fill: '#CEC7C1', fillOp: 120, bleed: .35, ink: null });
    for (let i = 0; i < 3; i++) inkLine([[x - r * .45 + i * r * .45, y + r * .5], [x - r * .55 + i * r * .45, y + r * .95]], 1.2, '#6C6670', 'inkfine', .1);
  }
  function coldMist(x, y, r, a = 1) {
    boilSeed('mist' + Math.round(x) + Math.round(y));
    paint(ellPts(x, y, r, r * .62, 18, r * .1), { fill: '#EAF3F6', fillOp: 120 * a, bleed: .45, tex: .7, ink: null });
    paint(ellPts(x + r * .5, y - r * .28, r * .58, r * .4, 16), { fill: '#FFFFFF', fillOp: 85 * a, bleed: .5, tex: .6, ink: null });
  }
  function bgWash(col, op = 236) {
    paint(rectPts(-200, -200, W + 400, H + 400), { fill: col, fillOp: op, bleed: .3, tex: .5, ink: null });
  }
  function rayBurst(cx, cy, r, n, col, a = 1) {
    boilSeed('ray' + Math.round(cx) + n);
    for (let i = 0; i < n; i++) {
      const th = i / n * TAU + .18, w = .05;
      paint([[cx + Math.cos(th - w) * r * .05, cy + Math.sin(th - w) * r * .05],
             [cx + Math.cos(th) * r * (1 + .14 * hash(i)), cy + Math.sin(th) * r * (1 + .14 * hash(i))],
             [cx + Math.cos(th + w) * r * .05, cy + Math.sin(th + w) * r * .05]],
        { wash: col, washOp: 190 * a, ink: null });
    }
  }

  shots([
    // 1 -- 0.00 a perfectly ordinary summer
    [0.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 560 - 14 * k, 1.0 + .12 * k, 0);
      yardBG(t);
      heatLines(250, 1010, 660, t, 6, .85);
      const walking = lt > .4 && lt < 3.2;
      const x = lerp(330, 735, S(lt, .4, 3.2));
      const o = {
        role: 'boy', view: .3,
        face: faceAt(lt, [[0, 'calm'], [1.3, 'worried'], [2.4, 'pain']]),
        walk: walking ? (x - 330) / (4 * 86) : 0
      };
      if (lt > 2.4) { o.aL = -.55; o.aR = -.45; o.dy = -.03; }
      person(x, 950, 86, o);
      if (lt > 2.5) sweatDrop(x + 100, 330, 14, 1);
      camEnd();
    }],
    // 2 -- 4.60 asking Lao Liu to cover for him
    [4.60, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(lerp(880, 900, k), 600, 1.02 + .1 * k, 0);
      corridorBG(t);
      person(1050, 950, 82, {
        role: 'liu', view: -.2,
        face: faceAt(lt, [[0, 'calm'], [1.2, 'happy'], [2.8, 'smug']]),
        aL: .4, aR: .3
      });
      person(620, 952, 82, {
        role: 'boy', view: .35,
        face: faceAt(lt, [[0, 'pain'], [1.3, 'worried'], [3.1, 'calm']]),
        aL: -.55, aR: lt > 1.1 ? 1.05 : -.4,
        dy: Math.sin(lt * 2.4) * .02
      });
      camEnd();
    }],
    // 3 -- 9.40 back from the toilet: Lao Liu and the teacher are both in the room
    [9.40, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(lerp(1340, 1080, k), 600, lerp(1.06, 1.02, k), 0);
      classroomBG(t, { doorOpen: 1 });
      person(520, 950, 76, { role: 'teacher', face: faceAt(lt, [[0, 'neutral']]), aL: .12, aR: .14 });
      person(800, 950, 76, { role: 'liu', view: .2, face: faceAt(lt, [[0, 'smug'], [1.5, 'happy']]), aL: .2, aR: .5 });
      const x = lerp(1470, 1270, S(lt, .1, 2.6));
      person(x, 950, 80, {
        role: 'boy', view: .3,
        face: faceAt(lt, [[0, 'calm'], [1.1, 'curious']]),
        walk: (1470 - x) / (4 * 80), aL: -.28
      });
      camEnd();
    }],
    // 4 -- 13.90 "teacher, why are you still up here?"
    [13.90, (t, lt, dur) => {
      camBegin(900, 480, 1.1, 0);
      classroomBG(t, { doorOpen: .8 });
      person(640, 950, 84, {
        role: 'teacher',
        face: faceAt(lt, [[0, 'neutral'], [.6, { e: 'open', m: 'o', b: 0 }], [2.3, 'neutral']]),
        aL: .1, aR: .16
      });
      person(890, 950, 84, {
        role: 'liu', view: .25,
        face: faceAt(lt, [[0, 'happy'], [1.9, 'grin']]),
        aL: .25, aR: .55, dy: Math.sin(lt * 3) * .02
      });
      person(1160, 950, 84, {
        role: 'boy', view: -.5,
        face: faceAt(lt, [[0, 'curious'], [1.5, { e: 'open', m: 'flat', b: -.02 }]]),
        aL: .95, aR: .2
      });
      camEnd();
    }],
    // 5 -- 19.00 "a boy or a girl?"
    [19.00, (t, lt, dur) => {
      camBegin(1100, 420, 1.35, 0);
      classroomBG(t, { doorOpen: .6 });
      person(1010, 950, 86, {
        role: 'boy', view: .5, lookX: .9,
        face: faceAt(lt, [[0, 'curious'], [1.5, { e: 'open', m: 'flat', b: -.08 }]]),
        aL: 1.0, aR: .2
      });
      person(1280, 950, 86, {
        role: 'liu', view: -.5, lookX: -1,
        face: faceAt(lt, [[0, 'smug'], [1.3, 'grin'], [3.3, 'sly']]),
        aL: .2, aR: .9
      });
      camEnd();
    }],
    // 6 -- 24.40 "of course I know this old pervert"
    [24.40, (t, lt, dur) => {
      camBegin(1070, 420, 1.32, 0);
      classroomBG(t, { doorOpen: .5 });
      person(900, 950, 86, {
        role: 'boy', view: .3, lookX: .9,
        face: faceAt(lt, [[0, 'dead'], [1.2, 'bored']]),
        aL: .12, aR: .14
      });
      person(1240, 950, 86, {
        role: 'liu', view: -.35, lookX: -.6,
        face: faceAt(lt, [[0, 'sly'], [2.1, 'smug']]),
        aL: 2.45, aR: 2.55, dy: Math.sin(lt * 2.2) * .02
      });
      sweatDrop(930, 340, 12, 1);
      camEnd();
    }],
    // 7 -- 28.90 face down on the desk
    [28.90, (t, lt, dur) => {
      camBegin(960, 640, lerp(1.3, 1.44, S(t, 0, dur)), 0);
      classroomBG(t, { doorOpen: .5 });
      slumpBoy(960, 960, 92);
      heatLines(760, 540, 300, t, 4, .5);
      camEnd();
    }],
    // 8 -- 33.20 Lao Liu's eyes light up, urging him to look back
    [33.20, (t, lt, dur) => {
      camBegin(1180, 430, 1.45, 0);
      classroomBG(t, { doorOpen: .5 });
      person(1180, 950, 92, {
        role: 'liu', view: -.15, lookX: -1,
        face: faceAt(lt, [[0, 'stare'], [1.0, 'smug'], [2.6, 'sly']]),
        aL: 1.9, aR: .3,
        dy: -Math.abs(Math.sin(lt * 2.6)) * .04
      });
      boilSeed('s8lines');
      for (let i = 0; i < 3; i++) {
        const k2 = frac(lt * 1.6 + i * .33);
        inkLine([[1310 + i * 26 + k2 * 40, 470 + i * 46], [1390 + i * 26 + k2 * 40, 470 + i * 46]], 1.4, SK.ink, 'inkfine', .1);
      }
      sparkle(1290, 350, 22, t, 3);
      camEnd();
    }],
    // 9 -- 37.60 our first meeting: she stands in the lit back door
    [37.60, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(lerp(1060, 1180, k), 600, lerp(1.0, 1.16, k), 0);
      classroomBG(t, { doorOpen: 1 });
      person(1700, 880, 58, {
        role: 'girl', hat: 'bucket', view: -.2,
        face: faceAt(lt, [[0, 'calm']]), aL: .1, aR: .12
      });
      camEnd();
    }],
    // 10 -- 43.50 "she was so white she looked like she'd stepped out of a freezer"
    [43.50, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 500, 1.36 + .1 * k, 0);
      bgWash('#D8E3E8');
      glow(1480, 220, 520, '#DCEEF8', .45);
      for (let i = 0; i < 5; i++) coldMist(560 + i * 210 + Math.sin(t * .7 + i) * 22, 890 - hash(i) * 90, 130 + hash(i + 3) * 50, .9);
      person(960, 1290, 104, {
        role: 'girl', hat: 'bucket', view: .12,
        face: faceAt(lt, [[0, 'calm'], [2.5, 'neutral']]),
        aL: .12, aR: .1
      });
      camEnd();
    }],
    // 11 -- 49.80 thin, and the uniform hangs loose on her
    [49.80, (t, lt, dur) => {
      camBegin(lerp(1180, 1240, S(t, 0, dur)), 610, 1.04, 0);
      classroomBG(t, { doorOpen: 1 });
      person(1700, 880, 58, {
        role: 'girl', hat: 'bucket', wide: .96, view: .3,
        face: faceAt(lt, [[0, 'neutral'], [2.2, 'calm']]), aL: .1, aR: .12
      });
      camEnd();
    }],
    // 12 -- 59.30 pretending to walk over and say hi
    [59.30, (t, lt, dur) => {
      const w = S(lt, .15, 3.0);
      const x = lerp(880, 1355, w);
      camBegin(lerp(1130, 1420, w), 610, 1.12, 0);
      classroomBG(t, { doorOpen: 1 });
      person(1700, 880, 58, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]), aL: .1, aR: .12 });
      person(x, 950, 82, {
        role: 'boy', view: .6,
        face: faceAt(lt, [[0, 'worried'], [2.7, 'shy']]),
        walk: (x - 880) / (4 * 82),
        aR: lt > 2.7 ? 1.6 : .14, aL: .16
      });
      camEnd();
    }],
    // 13 -- 63.90 "hi, hi!" / "hello~"
    [63.90, (t, lt, dur) => {
      camBegin(1520, 400, 1.3, 0);
      classroomBG(t, { doorOpen: .85 });
      person(1385, 952, 86, {
        role: 'boy', view: .7, lookX: lt < 1.7 ? .9 : -.9,
        face: faceAt(lt, [[0, 'shy'], [1.6, 'worried'], [3.3, 'shy']]),
        aR: 1.55, aL: .2
      });
      person(1670, 950, 86, {
        role: 'girl', hat: 'bucket', view: -.7, blush: .4,
        face: faceAt(lt, [[0, 'calm'], [1.5, 'shy']]), aL: .1, aR: .12
      });
      camEnd();
    }],
    // 14 -- 70.60 after all that, still no idea what she looks like
    [70.60, (t, lt, dur) => {
      const w = S(lt, .1, 2.8);
      const x = lerp(1330, 1040, w);
      camBegin(lerp(1350, 1150, w), 560, 1.15, 0);
      classroomBG(t, { doorOpen: 1 });
      person(1690, 880, 58, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]), aL: .1, aR: .12 });
      person(x, 950, 84, {
        role: 'boy', flip: true, view: .5,
        face: faceAt(lt, [[0, 'pain'], [1.1, 'worried'], [2.6, 'bored']]),
        walk: (1330 - x) / (4 * 84), aR: 2.55, aL: .14,
        dy: Math.sin(lt * 7) * .015
      });
      grumble(x + 20, 300, 60);
      sweatDrop(x - 96, 360, 12, 1);
      camEnd();
    }],
    // 15 -- 77.10 and then Lao Liu makes his grand entrance
    [77.10, (t, lt, dur) => {
      camBegin(1100, 520, 1.15, 0);
      classroomBG(t, { doorOpen: 1 });
      rayBurst(860, 470, 640, 16, '#FFF0BE', .75);
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * TAU + .4;
        sparkle(860 + Math.cos(a) * 300, 385 + Math.sin(a) * 185, 19 + hash(i) * 10, t, i);
      }
      person(860, 950, 86, {
        role: 'liu', view: .3, lookX: .8,
        face: faceAt(lt, [[0, 'smug'], [1.3, 'sly'], [4.3, 'happy']]),
        aL: 2.2, aR: 2.3, dy: Math.sin(lt * 3) * .02
      });
      person(1190, 950, 86, {
        role: 'boy', view: -.6, lookX: -1,
        face: faceAt(lt, [[0, 'blank'], [2.4, 'curious'], [4.7, 'wonder']]),
        aL: .16, aR: .2
      });
      camEnd();
    }],
    // 16 -- 86.85 his eyes light up: a reason to get close to her!
    [86.85, (t, lt, dur) => {
      camBegin(1080, 470, 1.6, 0);
      classroomBG(t, { doorOpen: .7 });
      person(1080, 1220, 96, {
        role: 'boy', view: .2,
        face: faceAt(lt, [[0, 'blank'], [1.0, 'grin'], [3.0, 'happy']]),
        aL: .2, aR: 1.9
      });
      for (let i = 0; i < 4; i++) sparkle(1080 + (i - 1.5) * 132, 300 + (i % 2) * 92, 22, t, 10 + i);
      camEnd();
    }],
    // 17 -- 91.29 off to the storeroom to carry desks
    [91.29, (t, lt, dur) => {
      camBegin(lerp(1180, 1080, S(t, 0, dur)), 560, 1.1, 0);
      storeBG(t);
      const bend = lt > 2.0;
      person(880, 950, 82, {
        role: 'liu', view: .3,
        face: faceAt(lt, [[0, 'smug'], [2.1, 'happy'], [6.8, 'dead']]),
        aL: .3, aR: bend ? .7 : .5
      });
      person(1180, 950, 82, {
        role: 'boy', view: .3,
        face: faceAt(lt, [[0, 'worried'], [2.3, 'effort'], [6.6, 'pain']]),
        aL: bend ? .8 : .16, aR: bend ? -.2 : .16,
        dy: bend ? -.05 : 0, sq: bend ? .05 : 0
      });
      if (bend) { heldDesk(1020, 612, 290); handsOn(1020, 612, 290); }
      if (lt > 7.0) { sweatDrop(1250, 330, 12, 1); sweatDrop(1310, 370, 9, 1); }
      camEnd();
    }],
    // 18 -- 102.64 one step, one fart
    [102.64, (t, lt, dur) => {
      const step = 1.62, s = lt / step, i = Math.floor(s), f = frac(s);
      const x = 420 + 118 * (i + ease(f));
      camBegin(x + 340, 600, 1.12, 0);
      corridorBG(t);
      person(x - 250, 952, 82, {
        role: 'liu', face: faceAt(lt, [[0, 'smug'], [2.3, 'dead'], [3.9, 'worried']]),
        aL: .2, aR: .3, walk: (x - 420) / (4 * 82)
      });
      person(x, 950, 82, {
        role: 'boy', view: .2,
        face: faceAt(lt, [[0, 'dead'], [2.2, 'pain']]),
        aR: .8, aL: .18,
        dy: -Math.abs(Math.sin(i * Math.PI + f * Math.PI)) * .04
      });
      heldDesk(x + 100, 566, 250); handsOn(x + 100, 566, 250);
      fartPuff(x - 96, 856, 44, f < .5 ? f / .5 : 0);
      camEnd();
    }],
    // 19 -- 107.50 "first time I've seen anyone play the kazoo with his arse"
    [107.50, (t, lt, dur) => {
      camBegin(1020, 400, 1.35, 0);
      corridorBG(t);
      person(1050, 950, 86, {
        role: 'liu', view: .2,
        face: faceAt(lt, [[0, 'dead'], [1.4, 'worried'], [3.2, 'smirk']]),
        aL: 1.35, aR: .2, dy: Math.sin(lt * 1.7) * .02
      });
      if (lt > 3.2) sparkle(1210, 320, 14, t, 21);
      camEnd();
    }],
    // 20 -- 113.09 finally at the back door of the classroom
    [113.09, (t, lt, dur) => {
      camBegin(lerp(1540, 1500, S(t, 0, dur)), 420, 1.2, 0);
      classroomBG(t, { doorOpen: 1 });
      person(1640, 950, 82, {
        role: 'liu', view: .3,
        face: faceAt(lt, [[0, 'happy'], [2.2, 'calm'], [3.8, 'smug']]),
        aL: .3, aR: .55
      });
      person(1310, 950, 82, {
        role: 'boy', view: -.4,
        face: faceAt(lt, [[0, 'effort'], [2.4, 'relieved'], [4.6, 'pain']]),
        aL: .2, aR: .18, dy: Math.sin(lt * 4) * .02
      });
      desk(1330, 950, 230); handsOn(1330, 950 - 230 * .86, 230);
      if (lt > 4.6) { sweatDrop(1370, 350, 12, 1); sweatDrop(1430, 390, 9, 1); }
      camEnd();
    }],
    // 21 -- 122.09 red face / she smiles and thanks him / he finally sees her / "gorgeous!"
    [122.09, (t, lt, dur) => {
      if (lt < 3.0) {
        camBegin(1500, 400, 1.25, 0);
        classroomBG(t, { doorOpen: 1 });
        person(1330, 950, 84, {
          role: 'boy', view: .4, blush: .9,
          face: faceAt(lt, [[0, 'effort'], [1.6, 'pain']]),
          aL: .1, aR: .12, dy: Math.sin(lt * 5) * .02
        });
        person(1690, 950, 84, { role: 'girl', hat: 'bucket', view: -.5, face: faceAt(lt, [[0, 'calm']]), aL: .1, aR: .12 });
        desk(1480, 950, 210); handsOn(1480, 950 - 210 * .86, 210);
      } else if (lt < 5.86) {
        camBegin(1520, 390, 1.35, 0);
        classroomBG(t, { doorOpen: 1 });
        person(1330, 950, 84, {
          role: 'boy', view: .4, blush: .7,
          face: faceAt(lt, [[0, 'pain'], [1.4, 'relieved']]),
          aL: .1, aR: .12
        });
        person(1680, 950, 84, {
          role: 'girl', hat: 'bucket', view: -.55, blush: .45,
          face: faceAt(lt, [[0, 'happy']]), aL: .1, aR: .12, dy: .012
        });
        for (let i = 0; i < 3; i++) sparkle(1560 + i * 90, 310 + (i % 2) * 60, 15, t, 30 + i);
      } else if (lt < 8.99) {
        camBegin(1420, 440, 1.5, 0);
        classroomBG(t, { doorOpen: 1 });
        person(1420, 1220, 96, {
          role: 'boy', blush: .45,
          face: faceAt(lt, [[0, 'shocked'], [1.1, 'wonder']])
        });
      } else {
        camBegin(960, 470, 1.2, 0);
        bgWash('#F7EEDC');
        glow(960, 380, 720, '#FFEFC0', .7);
        person(960, 1330, 100, {
          role: 'girl', hat: 'bucket', blush: .6,
          face: faceAt(lt, [[0, 'happy']])
        });
        for (let i = 0; i < 7; i++) {
          const a = i / 7 * TAU + .5;
          sparkle(960 + Math.cos(a) * 330, 400 + Math.sin(a) * 210, 17 + hash(i) * 12, t, 40 + i);
        }
      }
      camEnd();
    }]
  ]);
})();
