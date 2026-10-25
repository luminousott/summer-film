// ch3.js -- CH3 (4:03-5:27): the holiday, the QQ number, and the happiest class of his life.
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));

  // seats: boy in the middle, his girl behind (staged side by side so nothing overlaps)
  const BOY = { x: 900, top: 700, u: 88 };
  const GIRL = { x: 1300, top: 700, u: 88 };

  shots([
    // 1 -- 4:03 after that I couldn't wait for class
    [243.30, (t, lt, dur) => {
      camBegin(960, 560, 1.02, 0);
      corridorBG(t);
      const b = Math.abs(Math.sin(lt * 3.2));
      person(lerp(420, 1180, S(lt, 0, 2.6)), 950 - b * 40, 86, {
        role: 'boy', view: .3,
        face: faceAt(lt, [[0, 'happy']]),
        walk: lt * 1.6
      });
      for (let i = 0; i < 3; i++) sparkle(500 + i * 260 + lt * 40, 300 + (i % 2) * 80, 14, t, 100 + i);
      camEnd();
    }],
    // 2 -- 4:06 the school broke up, everyone was over the moon
    [247.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      stClass(t);
      const jump = i => Math.pow(Math.abs(Math.sin(lt * 3.4 + i * .7)), .7) * 74;
      person(520, 960 - jump(0), 80, { role: 'liu', face: faceAt(lt, [[0, 'grin']]), aL: 2.3, aR: 2.4 });
      person(760, 960 - jump(1), 78, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'grin']]), aL: 2.2, aR: 2.2 });
      person(1180, 960 - jump(2), 74, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'happy']]), aL: 2.1, aR: 2.2 });
      person(1420, 960 - jump(3), 70, { role: 'teacher', face: faceAt(lt, [[0, 'happy']]) });
      for (let i = 0; i < 6; i++) sparkle(380 + i * 230, 280 + hash(i) * 120, 12 + hash(i + 2) * 8, t, 110 + i);
      // paper confetti drifting down
      for (let i = 0; i < 22; i++) {
        boilSeed('ch3cf' + i);
        const y = frac(hash(i) + lt * (.14 + hash(i + 3) * .1)) * 1080;
        const x = 80 + hash(i + 7) * 1760 + Math.sin(lt * 1.2 + i) * 24;
        paint(rrPts(x, y, 9, 14, 2, 1), { fill: ['#E2837E', '#F2D48C', '#9FD0B4', '#B6D4E5'][i % 4], washOp: 210, ink: null });
      }
      camEnd();
    }],
    // 3 -- 4:09 but I couldn't be happy
    [250.40, (t, lt, dur) => {
      camBegin(960, 460, 1.4, 0);
      stClass(t);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#DCD6CE', fillOp: 70, bleed: .3, ink: null });
      person(960, 1180, 100, {
        role: 'boy', view: .1,
        face: faceAt(lt, [[0, 'bored'], [1.8, 'dead']])
      });
      camEnd();
    }],
    // 4 -- 4:10 it meant a long time without seeing her
    [254.90, (t, lt, dur) => {
      camBegin(960, 560, 1.1, 0);
      stClassDusk(t);
      // her empty desk, a chair still pulled out
      desk(1180, 1000, 300, { front: ST.deskLt });
      chair(1180, 900, 96);
      for (let i = 0; i < 4; i++) {
        boilSeed('ch3dust' + i);
        paint(ellPts(1120 + hash(i) * 160, 380 + hash(i + 5) * 200 + Math.sin(t + i) * 10, 5, 5, 8), { wash: '#FFF6D8', washOp: 130, ink: null });
      }
      person(760, 980, 88, { role: 'boy', flip: true, view: .5, face: faceAt(lt, [[0, 'bored'], [2.4, 'worried']]) });
      camEnd();
    }],
    // 5 -- 4:13 I didn't hear a word the teacher said
    [258.70, (t, lt, dur) => {
      camBegin(960, 520, 1.06, 0);
      stClass(t);
      person(500, 940, 84, { role: 'teacher', face: faceAt(lt, [[0, { e: 'open', m: 'o', b: 0 }], [1.6, 'neutral']]), aR: 1.2 });
      stSeated(1000, 700, 88, { role: 'boy', view: .2, lookX: 1, face: faceAt(lt, [[0, 'bored'], [2.0, 'dead']]) });
      // his mind drifting out of the window
      for (let i = 0; i < 3; i++) {
        boilSeed('ch3dr' + i);
        paint(ellPts(1260 + i * 70, 420 - i * 40, 26, 20, 14), { wash: '#FFFFFF', washOp: 120, ink: null });
      }
      camEnd();
    }],
    // 6 -- 4:15 the last lesson came far too fast
    [261.90, (t, lt, dur) => {
      camBegin(960, 520, 1.12, 0);
      stClass(t);
      // the clock spins while the light outside slides from noon to evening
      paint(rectPts(1290, 110, 620, 430), { fill: mixCol('#BFE0F2', '#F6C98F', clamp(lt / 2.2)), fillOp: 180, bleed: .4, ink: null });
      glow(1500, 300, 480, '#FFE3A8', .5);
      stClock(560, 300, 150, t * 9);
      camEnd();
    }],
    // 7 -- 4:18 only the last lesson of term was left
    [264.30, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(1000, 540, 1.0 + .06 * k, 0);
      stClassDusk(t);
      person(760, 960, 86, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'bored'], [1.4, 'worried']]) });
      person(1250, 960, 76, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]) });
      camEnd();
    }],
    // 8 -- 4:20 I turned round and asked for her QQ number
    [266.90, (t, lt, dur) => {
      camBegin(1100, 560, 1.1, 0);
      stClass(t);
      stSeated(BOY.x, BOY.top, BOY.u, {
        role: 'boy', view: .5, flip: true,
        face: faceAt(lt, [[0, 'worried'], [1.6, 'calm']])
      });
      stSeated(GIRL.x, GIRL.top, GIRL.u, {
        role: 'girl', hat: 'bucket', view: -.5,
        face: faceAt(lt, [[0, 'curious'], [2.2, 'calm']])
      });
      camEnd();
    }],
    // 9 -- 4:24 she was surprised, then tore a page out and wrote it down
    [270.40, (t, lt, dur) => {
      camBegin(1240, 470, 1.34, 0);
      stClass(t);
      stSeated(GIRL.x, GIRL.top, GIRL.u, {
        role: 'girl', hat: 'bucket', view: -.3,
        face: faceAt(lt, [[0, 'curious'], [2.0, 'shy'], [4.0, 'happy']]),
        aL: 1.1, aR: .3
      });
      if (lt > 2.6) stNote(GIRL.x + 40, 690, 300, 0, 3);
      camEnd();
    }],
    // 10 -- 4:31 I folded it up and hid it in my bag, like a treasure
    [278.80, (t, lt, dur) => {
      camBegin(960, 560, 1.3, 0);
      stClass(t);
      person(960, 1120, 96, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'calm'], [2.0, 'happy']]) });
      const k = clamp(lt / 3);
      stNote(960, lerp(760, 560, k), lerp(320, 220, k), 260, clamp(lt - 1.6), 3);
      for (let i = 0; i < 4; i++) sparkle(760 + i * 130, 300 + (i % 2) * 60, 16, t, 120 + i);
      camEnd();
    }],
    // 11 -- 4:37 the last lesson: I could not stop grinning
    [285.50, (t, lt, dur) => {
      camBegin(1000, 540, 1.06, 0);
      stClass(t);
      person(470, 940, 82, { role: 'teacher', face: faceAt(lt, [[0, { e: 'open', m: 'o', b: 0 }]]) });
      stSeated(BOY.x, BOY.top, BOY.u, {
        role: 'boy', view: .2,
        face: faceAt(lt, [[0, 'happy'], [2.4, 'grin'], [4.6, 'happy']]),
        dy: Math.abs(Math.sin(lt * 2.6)) * .03
      });
      camEnd();
    }],
    // 12 -- 4:44 the teacher asked why I was so happy
    [292.50, (t, lt, dur) => {
      camBegin(1020, 520, 1.16, 0);
      stClass(t);
      person(560, 950, 84, { role: 'teacher', view: .2, face: faceAt(lt, [[0, 'curious'], [2.2, 'neutral']]), aR: 1.0 });
      stSeated(1000, 700, 88, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'grin'], [3.0, 'happy']]) });
      camEnd();
    }],
    // 13 -- 4:49 "your lesson is just so wonderful, sir!"
    [297.40, (t, lt, dur) => {
      camBegin(1010, 470, 1.4, 0);
      stClass(t);
      person(1010, 1180, 100, {
        role: 'boy', view: .1,
        face: faceAt(lt, [[0, 'grin'], [1.8, { e: 'happy', m: 'grin', b: -.06, blush: .3 }], [3.6, 'happy']]),
        aL: 1.6, aR: 1.5
      });
      for (let i = 0; i < 4; i++) sparkle(760 + i * 170, 300 + (i % 2) * 70, 15, t, 130 + i);
      camEnd();
    }],
    // 14 -- 4:54 "then tell me what IDK means?"
    [303.00, (t, lt, dur) => {
      camBegin(900, 520, 1.12, 0);
      stClass(t);
      person(520, 950, 86, { role: 'teacher', view: .3, face: faceAt(lt, [[0, 'smug'], [2.4, 'happy']]), aR: 1.4 });
      stSeated(1020, 700, 88, { role: 'boy', view: -.2, face: faceAt(lt, [[0, 'shocked'], [3.0, 'blank']]) });
      camEnd();
    }],
    // 15 -- 4:59 "uh... I don't know." / "correct!"
    [309.00, (t, lt, dur) => {
      camBegin(1000, 480, 1.34, 0);
      stClass(t);
      if (lt < 2.6) {
        person(1000, 1180, 100, {
          role: 'boy', view: .1, sweat: 1,
          face: faceAt(lt, [[0, 'blank'], [1.2, 'worried'], [2.2, 'dead']]),
          aL: .6, aR: .6
        });
      } else {
        person(1000, 1180, 100, {
          role: 'boy', view: .1,
          face: faceAt(lt, [[0, 'wonder'], [1.2, 'happy']])
        });
        for (let i = 0; i < 4; i++) sparkle(760 + i * 170, 320 + (i % 2) * 60, 14, t, 140 + i);
      }
      camEnd();
    }],
    // 16 -- 5:08 on the way home I still couldn't stop laughing
    [313.50, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(lerp(900, 1050, k), 560, 1.02, 0);
      stStreet(t);
      const x = lerp(500, 1050, S(lt, 0, 3.4));
      person(x, 950, 84, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'happy'], [2.0, 'grin']]), walk: (x - 500) / (4 * 84) });
      person(x - 250, 950, 84, { role: 'liu', view: .2, face: faceAt(lt, [[0, 'bored'], [1.8, 'curious']]), walk: (x - 500) / (4 * 84) });
      camEnd();
    }],
    // 17 -- 5:10 "what are you grinning at?" / "put that mouth down!" / "just cooling my teeth"
    [318.00, (t, lt, dur) => {
      camBegin(1000, 470, 1.3, 0);
      stStreet(t);
      person(820, 960, 90, { role: 'liu', view: .4, face: faceAt(lt, [[0, 'bored'], [1.4, 'smug'], [3.6, 'grin']]), aR: 1.5 });
      person(1160, 960, 90, {
        role: 'boy', view: -.4,
        face: faceAt(lt, [[0, 'grin'], [2.0, 'happy'], [4.0, 'grin']]),
        aL: 1.7, aR: .2, dy: Math.abs(Math.sin(lt * 3)) * .02
      });
      camEnd();
    }],
    // 18 -- 5:18 all that over one QQ number
    [325.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 560, 1.0 + .1 * k, 0);
      stStreet(t);
      person(860, 950, 80, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'happy']]) });
      person(1100, 950, 80, { role: 'liu', view: -.2, face: faceAt(lt, [[0, 'grin']]) });
      for (let i = 0; i < 5; i++) sparkle(700 + i * 140, 300 + (i % 2) * 70, 13 + hash(i) * 8, t, 150 + i);
      camEnd();
    }]
  ]);
})();
