// ch4.js -- CH4 (5:27-7:15): the old iPhone, the stairwell, and the first chat.
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));

  // A phone in a hand, screen towards us.
  function phoneInHand(cx, cy, w, o = {}) {
    sticker(ellPts(cx, cy + w * 1.12, w * .5, w * .34, 14), SK3.skin, { sw: 1 });
    stPhone(cx, cy, w, o);
    for (let i = 0; i < 2; i++) sticker(ellPts(cx + (i ? w * .54 : -w * .54), cy + w * .5, w * .16, w * .12, 10), SK3.skin, { sw: .8 });
    if (o.glow) glow(cx, cy, w * 2.2, '#CDE8F5', o.glow);
  }
  function wifi(cx, cy, r, k) {
    for (let i = 0; i < 3; i++) {
      const rr = r * (1 + i * .55);
      inkLine(ellPts(cx, cy, rr, rr * .55, 24), 2.2 * k, '#8FB6C6', 'inkfine', .2);
    }
  }
  function bus(x, y, w) {
    sticker(rrPts(x - w / 2, y - w * .5, w, w * .42, w * .05, 2), '#D9CBB2', { sw: 1.2 });
    for (let i = 0; i < 4; i++) sticker(rrPts(x - w * .42 + i * w * .24, y - w * .42, w * .16, w * .16, 2, 1), '#BED8E4', { sw: .7 });
    for (const s of [-1, 1]) sticker(ellPts(x + s * w * .28, y - w * .06, w * .1, w * .1, 12), '#4A434E', { sw: .8 });
  }

  shots([
    // 1 -- 5:27 home, straight to the phone
    [327.30, (t, lt, dur) => {
      camBegin(960, 560, 1.06, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#EADFCC', fillOp: 235, bleed: .3, tex: .4, ink: null });
      paint(rectPts(-200, 780, W + 400, 460), { fill: '#C9AE8C', fillOp: 220, ink: null });
      person(700, 950, 84, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'happy'], [2.0, 'wonder']]), aR: 1.4 });
      phoneInHand(1180, 520, 240, { msgs: 2, glow: .5 });
      camEnd();
    }],
    // 2 -- 5:29 an iPhone 6S, passed down through the whole family
    [332.00, (t, lt, dur) => {
      camBegin(960, 540, 1.2, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F0E6D4', fillOp: 235, ink: null });
      const k = S(t, 0, dur);
      for (let i = 0; i < 3; i++) {
        const a = 1 - (i + 1) * .18, xx = 700 + i * 240 + (1 - k) * 60;
        phoneInHand(xx, 520 - i * 40, 210 * a, { msgs: 1 });
      }
      person(1600, 950, 80, { role: 'boy', view: -.4, face: faceAt(lt, [[0, 'wonder']]) });
      camEnd();
    }],
    // 3 -- 5:34 no SIM card, only wifi
    [337.50, (t, lt, dur) => {
      camBegin(960, 540, 1.5, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#DCE6EA', fillOp: 230, ink: null });
      stPhone(960, 520, 380, { msgs: 0 });
      wifi(960, 300, 40, 1);
      wifi(1260, 300, 40, .5);
      camEnd();
    }],
    // 4 -- 5:36 the wifi lives in my parents' room
    [341.50, (t, lt, dur) => {
      camBegin(960, 560, 1.04, 0);
      corridorBG(t);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E7D6BE', fillOp: 60, ink: null });
      paint(rectPts(760, 240, 300, 460), { wash: '#C9A97C', ink: '#6E5A44', sw: 1.6 });
      for (let i = 0; i < 3; i++) inkLine(ellPts(910, 420, 90 + i * 70, 40 + i * 34, 24), 2, '#9FC6D8', 'inkfine', .2);
      person(560, 950, 82, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'wonder'], [2.4, 'bored']]), aR: 1.5 });
      camEnd();
    }],
    // 5 -- 5:42 my room is upstairs, the signal never reaches
    [345.50, (t, lt, dur) => {
      camBegin(960, 540, 1.1, 0);
      stStair(t, .25);
      person(760, 900, 84, { role: 'boy', view: -.3, face: faceAt(lt, [[0, 'bored']]) });
      phoneInHand(1120, 520, 220, { msgs: 0 });
      inkLine([[1120, 420], [1140, 380]], 3, '#C25B4E', 'ink', .1);
      camEnd();
    }],
    // 6 -- 5:44.58 the only spot with signal is by the stairs
    [350.50, (t, lt, dur) => {
      camBegin(960, 560, 1.0, 0);
      stStair(t, .8);
      person(880, 940, 88, { role: 'boy', view: .2, sit: true, face: faceAt(lt, [[0, 'calm'], [2.6, 'happy']]), aR: 1.1 });
      phoneInHand(1120, 600, 200, { msgs: 2, glow: .55 });
      camEnd();
    }],
    // 7 -- 5:48 I sent the request. no reply.
    [354.00, (t, lt, dur) => {
      camBegin(960, 540, 1.4, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E9E0CE', fillOp: 235, ink: null });
      stPhone(960, 520, 420, { msgs: 1 });
      const d = Math.floor(lt * 3) % 4;
      for (let i = 0; i < 3; i++) {
        const a = d === i ? 1 : .3;
        paint(ellPts(1120 + i * 44, 880, 12, 12, 10), { wash: '#8C8478', washOp: 220 * a, ink: null });
      }
      camEnd();
    }],
    // 8 -- 5:50 her home is far: four or five hours by coach
    [360.00, (t, lt, dur) => {
      camBegin(960, 540, 1.02, 0);
      paint(rectPts(-200, -200, W + 400, 800), { fill: '#F0D9BC', fillOp: 235, ink: null });
      paint(rectPts(-200, 640, W + 400, 560), { fill: '#B9A488', fillOp: 220, ink: null });
      for (let i = 0; i < 7; i++) {
        boilSeed('ch4h' + i);
        paint(rectPts(80 + i * 260, 420 + hash(i) * 120, 180, 240), { wash: '#CDB08C', washOp: 170, ink: null });
      }
      const bx = lerp(300, 1600, S(lt, 0, 6));
      bus(bx, 780, 300);
      paint(rectPts(-200, 900, W + 400, 300), { fill: '#8E8478', fillOp: 200, ink: null });
      camEnd();
    }],
    // 9 -- 5:57 the only way to kill time... homework
    [366.00, (t, lt, dur) => {
      camBegin(960, 560, 1.24, 0);
      stStair(t, .55);
      person(880, 950, 88, { role: 'boy', view: .2, sit: true, face: faceAt(lt, [[0, 'bored'], [2.2, 'calm']]) });
      sticker(rrPts(700, 700, 420, 260, 4, 3), '#FBF6E8', { sw: 1.4 });
      for (let i = 0; i < 4; i++) inkLine([[740, 770 + i * 46], [1080, 766 + i * 46]], 3, '#B3A28C', 'dry', .3);
      camEnd();
    }],
    // 10 -- 6:06 the stairwell is pitch dark, only a sensor lamp
    [372.00, (t, lt, dur) => {
      camBegin(960, 540, 1.04, 0);
      stStair(t, lt > 1.6 ? .05 : .8);
      person(880, 950, 88, { role: 'boy', view: .2, sit: true, face: faceAt(lt, [[0, 'calm'], [1.6, 'blank']]) });
      camEnd();
    }],
    // 11 -- 6:11 I shout "AH!" and the light comes back
    [379.00, (t, lt, dur) => {
      camBegin(960, 540, 1.1, 0);
      const on = lt > .5 ? 1 : .05;
      stStair(t, on);
      person(880, 950, 88, {
        role: 'boy', view: .2, sit: true,
        face: faceAt(lt, [[0, 'blank'], [.5, 'shocked'], [1.4, 'happy']])
      });
      for (let i = 0; i < 4; i++) {
        const k = clamp((lt - .4) / .5);
        if (k <= 0) continue;
        inkLine([[980 + i * 40, 420 - i * 30], [1020 + i * 40, 380 - i * 30]], 2.4 * k, '#FFF3CE', 'inkfine', .1);
      }
      camEnd();
    }],
    // 12 -- 6:22 dad has had enough and storms up
    [388.00, (t, lt, dur) => {
      camBegin(960, 520, 1.06, 0);
      stStair(t, .9);
      const dy = lerp(-160, 0, S(lt, 0, 1.2));
      person(1180, 700 + dy, 92, { role: 'teacher', view: -.3, face: faceAt(lt, [[0, 'dead'], [1.2, 'smug']]), aL: 2.0 });
      person(820, 950, 86, { role: 'boy', view: .3, sit: true, face: faceAt(lt, [[0, 'shocked'], [1.6, 'calm']]) });
      camEnd();
    }],
    // 13 -- 6:28 "it just feels right doing homework here!"
    [396.00, (t, lt, dur) => {
      camBegin(1000, 520, 1.16, 0);
      stStair(t, .9);
      person(1220, 760, 88, { role: 'teacher', view: -.4, face: faceAt(lt, [[0, 'dead'], [2.0, 'bored']]) });
      person(880, 950, 88, {
        role: 'boy', view: .3, sit: true,
        face: faceAt(lt, [[0, 'happy'], [1.8, 'grin']]),
        aR: 1.6
      });
      camEnd();
    }],
    // 14 -- 6:36 it became a habit: homework on the stairs or nowhere
    [405.00, (t, lt, dur) => {
      camBegin(960, 540, 1.02, 0);
      stStair(t, .85);
      for (let i = 0; i < 3; i++) {
        const a = 1 - i * .22;
        person(560 + i * 300, 900 + i * 40, 72 * a, { role: 'boy', view: .2, sit: true, face: faceAt(lt, [[0, 'calm']]) });
      }
      camEnd();
    }],
    // 15 -- 6:39 the phone buzzes: she accepted
    [414.00, (t, lt, dur) => {
      camBegin(960, 520, 1.3, 0);
      stStair(t, .5);
      phoneInHand(960, 500, 300, { msgs: 2, glow: 1 });
      for (let i = 0; i < 6; i++) sparkle(700 + i * 100, 260 + (i % 2) * 80, 16, t, 160 + i);
      camEnd();
    }],
    // 16 -- 6:45 "hello!" "hello hello~"
    [420.00, (t, lt, dur) => {
      camBegin(960, 540, 1.16, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E9E2D2', fillOp: 235, ink: null });
      stPhone(960, 520, 460, { msgs: 4 });
      glow(960, 520, 420, '#CDE8F5', .35);
      letter('哈喽！', 1120, 300, 30, '#2E2A33', { font: '30px "Ma Shan Zheng", serif', ink: false, screen: true });
      letter('哈喽哈喽~', 810, 440, 30, '#2E2A33', { font: '30px "Ma Shan Zheng", serif', ink: false, screen: true });
      letter('你笑啥？', 1100, 580, 30, '#2E2A33', { font: '30px "Ma Shan Zheng", serif', ink: false, screen: true });
      letter('你好可爱呀！', 800, 720, 30, '#2E2A33', { font: '30px "Ma Shan Zheng", serif', ink: false, screen: true });
      camEnd();
    }],
    // 17 -- 6:53 "you're so cute!" he turns red
    [426.00, (t, lt, dur) => {
      camBegin(760, 480, 1.5, 0);
      stStair(t, .7);
      person(760, 1180, 100, {
        role: 'boy', blush: .95,
        face: faceAt(lt, [[0, 'shy'], [2.2, 'happy']])
      });
      phoneInHand(1180, 620, 200, { msgs: 3, glow: .7 });
      camEnd();
    }],
    // 18 -- 7:02 she's kind, gentle, always laughing
    [431.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 500, 1.1 + .06 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F4E8D2', fillOp: 235, ink: null });
      glow(1180, 300, 560, '#FFE9C0', .5);
      person(960, 1290, 100, { role: 'girl', view: .1, blush: .5, face: faceAt(lt, [[0, 'happy']]) });
      for (let i = 0; i < 5; i++) sparkle(700 + i * 130, 300 + (i % 2) * 80, 14, t, 170 + i);
      camEnd();
    }]
  ]);
})();
