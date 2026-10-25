// ch5.js -- CH5 (7:15-8:15): meeting her at the coach station, and the first held hand.
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));

  function plush(x, y, s) {
    boilSeed('ch5pl' + Math.round(x));
    sticker(ellPts(x, y, s * .62, s * .56, 18), '#E2C39C', { sw: 1.2 });
    sticker(ellPts(x, y - s * .46, s * .44, s * .4, 18), '#E2C39C', { sw: 1.2 });
    for (const sx of [-1, 1]) sticker(ellPts(x + sx * s * .34, y - s * .78, s * .17, s * .17, 12), '#C9A87F', { sw: 1 });
    paint(ellPts(x - s * .12, y - s * .5, s * .055, s * .06, 8), { wash: SK3.ink, ink: null });
    paint(ellPts(x + s * .12, y - s * .5, s * .055, s * .06, 8), { wash: SK3.ink, ink: null });
    inkLine([[x - s * .1, y - s * .34], [x, y - s * .3], [x + s * .1, y - s * .34]], 1.2, SK3.ink, 'inkfine', .1);
  }
  // two hands, left and right, meeting in the middle
  function hands(cx, cy, u, k, o = {}) {
    const d = u * (.78 - .44 * k);
    // forearms come in from the left and right, cuffs at the wrists
    sticker([[cx - u * 3.4, cy - u * .62], [cx - u * 1.02, cy - u * .34],
             [cx - u * 1.02, cy + u * .34], [cx - u * 3.4, cy + u * .82]],
      SK3.boyCoat, { curv: .3, sw: 1.1 });
    sticker([[cx + u * 3.4, cy - u * .66], [cx + u * 1.02, cy - u * .36],
             [cx + u * 1.02, cy + u * .32], [cx + u * 3.4, cy + u * .78]],
      SK3.girlCoat, { curv: .3, sw: 1.1 });
    sticker(rrPts(cx - u * 1.24, cy - u * .5, u * .28, u * 1.02, u * .1, 2), SK3.boyShirt, { sw: .9 });
    sticker(rrPts(cx + u * .96, cy - u * .52, u * .28, u * 1.0, u * .1, 2), SK3.girlShirt, { sw: .9 });
    // two hands, palm to palm
    sticker(ellPts(cx - d, cy + u * .05, u * .52, u * .42, 20), SK3.skin, { sw: 1.2 });
    sticker(ellPts(cx + d, cy - u * .03, u * .5, u * .4, 20), SK3.skin, { sw: 1.2 });
    for (let i = 0; i < 3; i++) {
      const yy = cy - u * .12 + i * u * .18;
      inkLine([[cx - u * .3, yy + u * .01], [cx + u * .3, yy - u * .02]], 1.1, '#D9A87C', 'inkfine', .2);
    }
    if (o.glow) glow(cx, cy, u * 2.4, '#FFE3C0', o.glow);
  }

  shots([
    // 1 -- 7:15 I got to the station early and waited
    [435.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(980, 560, 1.02 + .04 * k, 0);
      stStation(t);
      person(820, 950, 86, {
        role: 'boy', view: .2,
        face: faceAt(lt, [[0, 'calm'], [2.4, 'curious'], [4.6, 'happy']]),
        aR: lt > 2.4 ? 1.5 : .16
      });
      camEnd();
    }],
    // 2 -- 7:21 by the time she arrived it was already evening
    [442.00, (t, lt, dur) => {
      camBegin(960, 540, 1.04, 0);
      stStation(t);
      const x = lerp(1900, 1420, S(lt, 0, 1.8));
      person(x, 950, 80, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'calm'], [1.2, 'happy']]), walk: (x - 1900) / (4 * 80) });
      person(700, 950, 86, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'curious'], [1.4, 'wonder']]) });
      camEnd();
    }],
    // 3 -- 7:23 she spotted me and came running
    [444.00, (t, lt, dur) => {
      const w = S(lt, .2, 2.2);
      const x = lerp(1400, 900, w);
      camBegin(lerp(1200, 1000, w), 540, 1.06, 0);
      stStation(t);
      person(x, 950 - Math.abs(Math.sin(lt * 6)) * 20, 82, {
        role: 'girl', hat: 'bucket', view: -.3,
        face: faceAt(lt, [[0, 'happy']]), walk: (1400 - x) / (4 * 82)
      });
      person(620, 950, 86, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'wonder'], [1.4, 'happy']]) });
      camEnd();
    }],
    // 4 -- 7:25 she greeted me warmly, and thanked me for coming
    [446.60, (t, lt, dur) => {
      camBegin(1100, 470, 1.3, 0);
      stStation(t);
      person(870, 950, 88, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'happy'], [2.2, 'shy']]), blush: .4 });
      person(1290, 950, 88, {
        role: 'girl', hat: 'bucket', view: -.5, blush: .45,
        face: faceAt(lt, [[0, 'happy']]), dy: .012
      });
      camEnd();
    }],
    // 5 -- 7:30 we decided to walk back
    [450.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(lerp(900, 1080, k), 560, 1.02, 0);
      stStreet(t);
      const x = lerp(700, 1150, S(lt, 0, 3.4));
      person(x, 950, 84, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'happy']]), walk: (x - 700) / (4 * 84) });
      person(x - 260, 950, 82, { role: 'girl', hat: 'bucket', view: .2, face: faceAt(lt, [[0, 'calm']]), walk: (x - 700) / (4 * 84) });
      camEnd();
    }],
    // 6 -- 7:32 I gave her a little plush
    [454.00, (t, lt, dur) => {
      camBegin(1050, 480, 1.24, 0);
      stStreet(t);
      person(860, 950, 88, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'shy'], [1.6, 'happy']]), aR: 1.35 });
      person(1280, 950, 88, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'curious'], [1.8, 'wonder']]), aL: 1.2 });
      plush(lerp(1080, 1180, S(lt, 1.2, 2.4)), lerp(700, 640, S(lt, 1.2, 2.4)), 90);
      camEnd();
    }],
    // 7 -- 7:33 she lit up like a kid
    [457.50, (t, lt, dur) => {
      camBegin(1000, 470, 1.36, 0);
      stStreet(t);
      person(1000, 1180, 100, {
        role: 'girl', hat: 'bucket', blush: .55,
        face: faceAt(lt, [[0, 'happy']]), aL: 1.1, aR: 1.0
      });
      plush(1000, 900, 130);
      for (let i = 0; i < 5; i++) sparkle(700 + i * 150, 300 + (i % 2) * 70, 14, t, 180 + i);
      camEnd();
    }],
    // 8 -- 7:36 she looked at the plush, I looked at her
    [461.00, (t, lt, dur) => {
      camBegin(1160, 470, 1.4, 0);
      stStreet(t);
      person(1240, 1180, 100, { role: 'girl', hat: 'bucket', view: .2, blush: .5, face: faceAt(lt, [[0, 'happy']]), aL: 1.1 });
      plush(1090, 940, 120);
      camEnd();
    }],
    // 9 -- 7:41 we didn't say much; both a little awkward
    [464.00, (t, lt, dur) => {
      camBegin(960, 560, 1.0, 0);
      stStreet(t);
      person(620, 950, 82, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'calm'], [2.0, 'worried']]) });
      person(1080, 950, 82, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'calm']]) });
      inkLine([[900, 880], [1000, 880]], 2, '#C9B79A', 'dry', .3);
      camEnd();
    }],
    // 10 -- 7:44 near the school gate I stopped
    [467.50, (t, lt, dur) => {
      camBegin(960, 540, 1.02, 0);
      stStreet(t);
      // the school gate
      paint(rectPts(300, 300, 60, 620), { wash: '#C9B79A', ink: '#7E6E5C', sw: 1.6 });
      paint(rectPts(1560, 300, 60, 620), { wash: '#C9B79A', ink: '#7E6E5C', sw: 1.6 });
      paint(rectPts(300, 300, 1320, 44), { wash: '#C9B79A', ink: '#7E6E5C', sw: 1.6 });
      person(700, 950, 84, { role: 'boy', flip: true, view: .4, face: faceAt(lt, [[0, 'worried'], [2.0, 'calm']]) });
      person(900, 950, 84, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'calm']]) });
      camEnd();
    }],
    // 11 -- 7:47 no dating allowed: one step closer and we had to keep apart
    [471.00, (t, lt, dur) => {
      camBegin(960, 540, 1.4, 0);
      stStreet(t);
      const d = u => 0;
      // a red rule line between them
      inkLine([[860, 400], [860, 940]], 4, '#C25B4E', 'dry', .2);
      inkLine([[1060, 400], [1060, 940]], 4, '#C25B4E', 'dry', .2);
      person(760, 1180, 100, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'worried']]) });
      person(1180, 1180, 100, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'worried']]) });
      camEnd();
    }],
    // 12 -- 7:52 she felt it too, and stopped
    [475.00, (t, lt, dur) => {
      camBegin(1000, 470, 1.3, 0);
      stStreet(t);
      person(830, 950, 88, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'calm'], [2.4, 'worried']]) });
      person(1230, 950, 88, { role: 'girl', hat: 'bucket', view: -.5, face: faceAt(lt, [[0, 'calm'], [2.4, 'shy']]), blush: .3 });
      camEnd();
    }],
    // 13 -- 7:57 neither of us said a word
    [479.00, (t, lt, dur) => {
      camBegin(1030, 460, 1.6, 0);
      stStreet(t);
      person(1030, 1200, 104, { role: 'girl', hat: 'bucket', view: .1, blush: .5, face: faceAt(lt, [[0, 'calm'], [2.0, 'shy']]) });
      camEnd();
    }],
    // 14 -- 8:02 I reached for her hand
    [483.00, (t, lt, dur) => {
      camBegin(980, 470, 1.24 + lt * .03, 0);
      stStreet(t);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F0D3AC', fillOp: 90, ink: null });
      person(850, 960, 92, { role: 'boy', flip: true, view: .5, face: faceAt(lt, [[0, 'worried'], [1.4, 'shy']]), aR: 1.2 });
      person(1110, 960, 92, { role: 'girl', hat: 'bucket', view: -.5, blush: .5, face: faceAt(lt, [[0, 'calm'], [1.4, 'shy']]), aL: 1.2 });
      glow(980, 690, 190, '#FFE3C0', .45);
      camEnd();
    }],
    // 15 -- 8:05 she flinched, just a little
    [487.00, (t, lt, dur) => {
      camBegin(1000, 470, 1.36, 0);
      stStreet(t);
      const j = lt < .5 ? Math.sin(lt * 40) * 10 : 0;
      person(880 + j, 960, 94, { role: 'boy', flip: true, view: .5, face: faceAt(lt, [[0, 'worried']]), aR: 1.35 });
      person(1130 - j, 960, 94, { role: 'girl', hat: 'bucket', view: -.5, blush: .45, face: faceAt(lt, [[0, 'shock' in FACES ? 'shy' : 'shy'], [1.2, 'happy']]), aL: 1.5 });
      camEnd();
    }],
    // 16 -- 8:08 then she gave up and held on tight
    [489.50, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(980, 500, 1.18 + .07 * k, 0);
      stStreet(t);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F5D8AE', fillOp: 80, ink: null });
      person(870, 960, 94, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'shy'], [1.6, 'happy']]) });
      person(1090, 960, 94, { role: 'girl', hat: 'bucket', view: -.5, blush: .6, face: faceAt(lt, [[0, 'happy']]) });
      glow(980, 700, 240, '#FFE3C0', .7);
      for (let i = 0; i < 4; i++) sparkle(760 + i * 130, 380 + (i % 2) * 60, 12, t, 230 + i);
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * TAU + lt * .4;
        sparkle(960 + Math.cos(a) * 300, 560 + Math.sin(a) * 190, 13, t, 190 + i);
      }
      camEnd();
    }]
  ]);
})();
