// ch6.js -- CH6 (8:15-10:30): chocolate, an oversized shirt, and a cold war.
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));

  function chocoBox(x, y, w) {
    boilSeed('ch6cb' + Math.round(x));
    sticker(rrPts(x - w / 2, y - w * .34, w, w * .42, 5, 2), '#8E4A46', { sw: 1.2 });
    sticker(rrPts(x - w / 2, y - w * .44, w, w * .16, 4, 2), '#C2655C', { sw: 1.1 });
    for (let i = 0; i < 4; i++) paint(rrPts(x - w * .38 + i * w * .2, y - w * .3, w * .14, w * .14, 2, 1), { wash: '#5E3A34', ink: null });
  }
  function tear(x, y, w) {
    // a page of handwriting held up between them
    sticker(rrPts(x - w / 2, y - w * .62, w, w * 1.24, 4, 2), '#FBF6E8', { sw: 1.4 });
    for (let i = 0; i < 7; i++) {
      const yy = y - w * .44 + i * w * .13;
      inkLine([[x - w * .38, yy], [x - w * .1, yy - 2], [x + w * .14, yy + 2], [x + w * .34, yy - 1]], 3.2, '#6E6152', 'inkfine', .35);
    }
  }

  shots([
    // 1 -- 8:15 with her I was happy, almost never down
    [495.00, (t, lt, dur) => {
      camBegin(960, 560, 1.02, 0);
      stStreet(t);
      person(820, 950, 84, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'happy']]) });
      person(1100, 950, 84, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'happy']]) });
      for (let i = 0; i < 5; i++) sparkle(700 + i * 130, 300 + (i % 2) * 60, 13, t, 200 + i);
      camEnd();
    }],
    // 2 -- 8:18 I hid a big box of chocolate in her desk
    [499.00, (t, lt, dur) => {
      camBegin(1000 - lt * 12, 520, 1.06 + lt * .02, 0);
      stClass(t, { bare: true });
      // he is crouched beside her desk, sliding a box of chocolate inside
      desk(1160, 1000, 330, { front: ST.deskLt });
      person(760, 980, 90, {
        role: 'boy', flip: true, view: .35, sq: .16, dy: -.06,
        face: faceAt(lt, [[0, 'sly'], [1.6, 'happy'], [3.2, 'wonder']]),
        aR: 1.35, aL: .5
      });
      chocoBox(1130, 748, 210);
      if (lt > 1.4) glow(1130, 740, 260, '#FFE0C0', .35);
      camEnd();
    }],
    // 3 -- 8:21 I wrote her a note: be happy, no worries, I'll treat you well
    [503.00, (t, lt, dur) => {
      camBegin(980, 520, 1.24, 0);
      stClassDusk(t);
      person(700, 1180, 96, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'calm'], [2.6, 'happy']]), aR: 1.15 });
      tear(1180, 700, 300);
      camEnd();
    }],
    // 4 -- 8:30 she wrote a whole page back, and nearly cried reading mine
    [508.00, (t, lt, dur) => {
      camBegin(1200, 480, 1.28, 0);
      stClassDusk(t);
      person(1180, 1180, 98, {
        role: 'girl', hat: 'bucket', blush: .6,
        face: faceAt(lt, [[0, 'calm'], [1.6, 'shy'], [3.4, 'happy']]),
        aL: 1.15, aR: 1.1
      });
      tear(1180, 830, 210);
      camEnd();
    }],
    // 5 -- 8:34.92 after evening study she held me and cried
    [513.00, (t, lt, dur) => {
      camBegin(1020, 520, 1.16, 0);
      stClassDusk(t);
      stNight(t, .5);
      person(880, 950, 88, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'worried'], [2.4, 'calm']]), aR: 1.3 });
      person(1180, 950, 88, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'worried'], [2.0, 'pain']]), aL: 1.5, dy: Math.sin(lt * 3) * .02 });
      sweatDrop(1250, 300, 12, 1);
      camEnd();
    }],
    // 6 -- 8:41 I held her shoulders, not knowing what to say
    [518.00, (t, lt, dur) => {
      camBegin(1000, 470, 1.34, 0);
      stClassDusk(t);
      stNight(t, .5);
      person(860, 950, 92, { role: 'boy', view: .6, face: faceAt(lt, [[0, 'worried'], [2.0, 'calm']]), aR: 1.6 });
      person(1200, 950, 92, { role: 'girl', hat: 'bucket', view: -.5, face: faceAt(lt, [[0, 'pain'], [2.2, 'happy']]), aL: 1.4, blush: .4 });
      camEnd();
    }],
    // 7 -- 8:45 "what are you crying for?" / "seeing you sad makes me sad"
    [523.00, (t, lt, dur) => {
      camBegin(1000, 460, 1.42, 0);
      stNight(t, .7);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#3B4258', fillOp: 150, ink: null });
      person(1000, 1180, 102, { role: 'boy', view: .1, blush: .3, face: faceAt(lt, [[0, 'worried'], [2.2, 'happy']]) });
      camEnd();
    }],
    // 8 -- 8:51 she bought me a T-shirt as a surprise, without asking my size
    [528.00, (t, lt, dur) => {
      camBegin(1000, 540, 1.1, 0);
      stStreet(t);
      person(820, 950, 86, { role: 'girl', hat: 'bucket', view: -.3, face: faceAt(lt, [[0, 'happy'], [2.0, 'grin']]), aL: 1.2 });
      person(1160, 950, 86, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'curious'], [2.0, 'wonder']]) });
      sticker(rrPts(1120, 500, 260, 300, 6, 3), '#D8E3EC', { sw: 1.3 });
      camEnd();
    }],
    // 9 -- 8:56 it was so big it nearly reached my knees
    [533.00, (t, lt, dur) => {
      camBegin(960, 540, 1.04, 0);
      stStreet(t);
      person(960, 950, 86, {
        role: 'boy', view: .1,
        face: faceAt(lt, [[0, 'dead'], [2.0, 'bored']])
      });
      // an absurdly long tee over him
      sticker([[960 - 150, 470], [960 + 150, 470], [960 + 160, 830], [960 - 160, 830]], '#D8E3EC', { curv: .35, sw: 1.3 });
      camEnd();
    }],
    // 10 -- 9:06 she burst out laughing, and I laughed too
    [538.00, (t, lt, dur) => {
      camBegin(1030, 470, 1.3, 0);
      stStreet(t);
      person(840, 950, 90, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'grin']]) });
      person(1220, 950, 90, { role: 'girl', hat: 'bucket', view: -.3, face: faceAt(lt, [[0, 'happy'], [1.4, 'grin']]), dy: Math.abs(Math.sin(lt * 4)) * .02 });
      camEnd();
    }],
    // 11 -- 9:15 it wasn't always smooth; we argued
    [544.00, (t, lt, dur) => {
      camBegin(960, 540, 1.06, 0);
      stStreet(t);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#5B6274', fillOp: 60, ink: null });
      person(780, 950, 86, { role: 'boy', flip: true, view: .4, face: faceAt(lt, [[0, 'pain'], [2.0, 'dead']]) });
      person(1140, 950, 86, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'worried'], [2.0, 'bored']]) });
      inkLine([[950, 420], [950, 640]], 3, '#7A8090', 'dry', .2);
      camEnd();
    }],
    // 12 -- 9:24 she got moved to the front row; she was too busy to walk with me
    [549.00, (t, lt, dur) => {
      camBegin(1000, 520, 1.06, 0);
      stClass(t);
      stSeated(600, 700, 82, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'calm']]) });
      stSeated(1120, 700, 86, { role: 'boy', view: -.3, face: faceAt(lt, [[0, 'worried'], [2.0, 'bored']]) });
      inkLine([[760, 640], [960, 620]], 2, '#B3A28C', 'dry', .2);
      camEnd();
    }],
    // 13 -- 9:31 "can't you find a little time?" "not for now."
    [553.00, (t, lt, dur) => {
      camBegin(980, 470, 1.36, 0);
      stClass(t);
      person(820, 950, 92, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'pain'], [1.6, 'bored']]), aR: 1.4 });
      person(1180, 950, 92, { role: 'girl', hat: 'bucket', view: -.5, face: faceAt(lt, [[0, 'calm'], [1.8, 'neutral']]) });
      camEnd();
    }],
    // 14 -- 9:43 I really did stop talking to her: a long cold war
    [559.00, (t, lt, dur) => {
      camBegin(960, 540, 1.02, 0);
      stClass(t);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#6E7484', fillOp: 70, ink: null });
      person(700, 950, 84, { role: 'boy', flip: true, view: .2, face: faceAt(lt, [[0, 'dead']]) });
      person(1240, 950, 84, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'bored']]) });
      // the distance between them
      inkLine([[860, 900], [1080, 900]], 2, '#9AA0AC', 'dry', .3);
      camEnd();
    }],
    // 15 -- 9:50 after the exams she came to me: "let's go see a film"
    [563.00, (t, lt, dur) => {
      camBegin(1020, 480, 1.3, 0);
      stClassDusk(t);
      person(860, 950, 90, { role: 'boy', flip: true, view: .2, face: faceAt(lt, [[0, 'bored'], [2.4, 'dead']]) });
      person(1220, 950, 90, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'calm'], [1.6, 'happy']]), aL: 1.3 });
      camEnd();
    }],
    // 16 -- 9:54 she wheedled: "come on, come on~" and I couldn't stay angry
    [566.00, (t, lt, dur) => {
      camBegin(1000, 460, 1.42, 0);
      stClassDusk(t);
      person(1000, 1180, 100, {
        role: 'girl', hat: 'bucket', blush: .6,
        face: faceAt(lt, [[0, 'shy'], [1.4, 'happy']]),
        aL: 1.2, dy: Math.sin(lt * 4) * .015
      });
      for (let i = 0; i < 3; i++) sparkle(820 + i * 140, 300 + (i % 2) * 60, 12, t, 210 + i);
      camEnd();
    }],
    // 17 -- 9:57 "fine... I'll come along, reluctantly."
    [569.00, (t, lt, dur) => {
      camBegin(1000, 480, 1.34, 0);
      stClassDusk(t);
      person(1000, 1180, 100, {
        role: 'boy', blush: .4,
        face: faceAt(lt, [[0, 'dead'], [1.2, 'shy'], [2.6, 'happy']])
      });
      camEnd();
    }]
  ]);
})();
