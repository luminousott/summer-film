// ch7.js -- CH7 (10:30-12:19): the film, the kiss in the cold, and the nightmare.
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));
  function breath(x, y, s, t) {
    boilSeed('ch7br' + Math.round(x) + Math.round(t * 2));
    for (let i = 0; i < 3; i++) paint(ellPts(x + i * 26 + s * .4, y - i * 14 - s * .4, s * (.9 - i * .2), s * (.6 - i * .12), 14),
      { fill: '#EAF2F6', fillOp: 90 - i * 20, bleed: .5, tex: .5, ink: null });
  }
  function heart(x, y, s, k) {
    boilSeed('ch7h' + Math.round(x));
    paint([[x, y + s * .5], [x - s, y - s * .2], [x - s * .5, y - s * .9], [x, y - s * .4],
           [x + s * .5, y - s * .9], [x + s, y - s * .2]], { wash: '#E2837E', washOp: 210 * k, ink: null });
  }

  shots([
    // 1 -- 10:30 the film started
    [630.50, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      stCinema(t, 1);
      person(760, 990, 84, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'calm']]) });
      person(1120, 990, 84, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'calm']]) });
      camEnd();
    }],
    // 2 -- 10:06 grown men in tears
    [634.80, (t, lt, dur) => {
      camBegin(1000, 520, 1.26, 0);
      stCinema(t, .9);
      person(800, 990, 88, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'worried'], [2.0, 'pain']]) });
      person(1200, 990, 88, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'worried'], [2.4, 'pain']]) });
      for (let i = 0; i < 2; i++) sweatDrop(680 + i * 620, 420, 12, 1);
      camEnd();
    }],
    // 3 -- 10:08 on screen: "if I love someone, I want to give her the best ending"
    [639.00, (t, lt, dur) => {
      camBegin(960, 540, 1.1, 0);
      stCinema(t, 1);
      paint(rectPts(300, 120, 1320, 520), { fill: '#E8EEF6', fillOp: 200, bleed: .4, ink: null });
      glow(960, 380, 620, '#CBDCEE', .6);
      // on screen: two people on a bench, close together
      boilSeed('ch7scr');
      paint(rectPts(340, 470, 1240, 130), { wash: '#C8D6E6', washOp: 120, ink: null });
      for (const s of [-1, 1]) {
        const bx = 960 + s * 150;
        paint(ellPts(bx, 400, 52, 52, 18), { wash: '#4C5A74', washOp: 210, ink: null });
        paint(rrPts(bx - 74, 452, 148, 172, 60, 2), { wash: '#4C5A74', washOp: 210, ink: null });
      }
      paint(rrPts(700, 470, 520, 34, 10, 2), { wash: '#5D6C86', washOp: 190, ink: null });
      inkLine([[700, 470], [700, 620]], 8, '#5D6C86', 'ink', .05);
      inkLine([[1220, 470], [1220, 620]], 8, '#5D6C86', 'ink', .05);
      camEnd();
    }],
    // 4 -- 10:13 I turned to look at her / she was already looking at me
    [643.20, (t, lt, dur) => {
      camBegin(1000, 490, 1.34, 0);
      stCinema(t, .8);
      person(820, 990, 90, { role: 'boy', view: .6, flip: true, face: faceAt(lt, [[0, 'calm'], [1.6, 'wonder']]) });
      person(1200, 990, 90, { role: 'girl', hat: 'bucket', view: -.6, blush: .5, face: faceAt(lt, [[0, 'calm'], [1.4, 'happy']]) });
      camEnd();
    }],
    // 5 -- 10:16.95 tears in her eyes / 10:18 she squeezed my hand
    [646.40, (t, lt, dur) => {
      camBegin(1040, 450, 1.5, 0);
      stCinema(t, .85);
      person(1040, 1200, 104, {
        role: 'girl', hat: 'bucket', blush: .55,
        face: faceAt(lt, [[0, 'worried'], [1.8, 'pain'], [3.4, 'happy']])
      });
      paint(ellPts(960, 520, 14, 22, 12), { wash: '#BFD9EA', washOp: 200, ink: null });
      camEnd();
    }],
    // 6 -- 10:20 my whole heart melted
    [650.10, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 520, 1.06, 0);
      stCinema(t, .7);
      for (let i = 0; i < 5; i++) heart(700 + i * 130, 420 - i * 30 + Math.sin(t + i) * 10, 26 + hash(i) * 10, .8);
      person(1000, 1200, 100, { role: 'boy', blush: .5, face: faceAt(lt, [[0, 'happy']]) });
      camEnd();
    }],
    // 7 -- 10:22 she leaned on my shoulder and cried to the end
    [653.00, (t, lt, dur) => {
      camBegin(1000, 500, 1.2, 0);
      stCinema(t, .8);
      person(860, 990, 88, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'calm'], [2.0, 'happy']]), aR: 1.35 });
      person(1090, 990, 84, { role: 'girl', hat: 'bucket', view: -.1, dy: -.06, face: faceAt(lt, [[0, 'pain'], [2.4, 'calm']]) });
      camEnd();
    }],
    // 8 -- 10:30 the film ended and we walked out / 10:32 it was already freezing
    [665.60, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 560, 1.0 + .04 * k, 0);
      stNightStreet(t);
      person(820, 950, 86, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'calm'], [2.2, 'happy']]) });
      person(1080, 950, 86, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'calm']]) });
      breath(720, 430, 30, t);
      breath(1160, 430, 26, t + .4);
      camEnd();
    }],
    // 9 -- 10:38 I said I'd buy her a milk tea to warm up
    [672.60, (t, lt, dur) => {
      camBegin(1020, 470, 1.28, 0);
      stNightStreet(t);
      person(830, 950, 90, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'happy']]), aR: 1.4 });
      person(1210, 950, 90, { role: 'girl', hat: 'bucket', view: -.5, face: faceAt(lt, [[0, 'calm'], [1.6, 'shy']]) });
      breath(760, 420, 26, t);
      camEnd();
    }],
    // 10 -- 10:40 she took my hand and pulled me back
    [677.00, (t, lt, dur) => {
      camBegin(1020, 520, 1.2, 0);
      stNightStreet(t);
      person(850, 950, 90, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'curious']]) });
      person(1200, 950, 90, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'calm'], [1.2, 'shy']]), aL: 1.5 });
      camEnd();
    }],
    // 11 -- 10:43.01 and then she kissed me
    [680.50, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 480 + k * 20, 1.06 + .16 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#2B3148', fillOp: 240, ink: null });
      glow(960, 420, 620, '#FFE0B8', .6);
      // two silhouettes leaning together, tastefully cropped at the shoulders
      sticker(rrPts(430, 700, 340, 300, 60, 3), '#5A6484', { sw: 1.4 });
      sticker(rrPts(1150, 700, 340, 300, 60, 3), '#7C87A6', { sw: 1.4 });
      sticker(ellPts(760, 600, 150, 158, 24), SK3.hairBoy, { sw: 1.4 });
      sticker(ellPts(1150, 580, 150, 158, 24), SK3.hairGirl, { sw: 1.4 });
      sticker(ellPts(770, 690, 118, 140, 22), SK3.skin, { sw: 1.2 });
      sticker(ellPts(1140, 680, 118, 140, 22), SK3.skin, { sw: 1.2 });
      sticker(ellPts(860, 640, 54, 26, 14), SK3.lip, { sw: .8 });
      sticker(ellPts(1050, 640, 54, 26, 14), SK3.lip, { sw: .8 });
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * TAU + lt * .5;
        sparkle(960 + Math.cos(a) * 300, 520 + Math.sin(a) * 170, 12, t, 220 + i);
      }
      heart(960, 330, 40, clamp(lt));
      camEnd();
    }],
    // 12 -- 10:45 I didn't react at all
    [685.50, (t, lt, dur) => {
      camBegin(960, 470, 1.4, 0);
      stNightStreet(t);
      person(960, 1180, 102, {
        role: 'boy', blush: .9,
        face: faceAt(lt, [[0, 'shocked'], [1.4, 'shy'], [3.0, 'happy']])
      });
      camEnd();
    }],
    // 13 -- 10:47 "do you even know what the film was about?"
    [687.50, (t, lt, dur) => {
      camBegin(1030, 480, 1.3, 0);
      stNightStreet(t);
      person(830, 950, 90, { role: 'boy', view: .4, face: faceAt(lt, [[0, 'blank'], [1.6, 'shy']]) });
      person(1210, 950, 90, { role: 'girl', hat: 'bucket', view: -.4, face: faceAt(lt, [[0, 'calm'], [1.4, 'happy']]) });
      camEnd();
    }],
    // 14 -- 10:52 "can you hold me?"
    [691.00, (t, lt, dur) => {
      camBegin(1000, 470, 1.36, 0);
      stNightStreet(t);
      person(1000, 1180, 102, {
        role: 'girl', hat: 'bucket', blush: .6,
        face: faceAt(lt, [[0, 'shy'], [1.6, 'happy']]),
        aL: 1.3, aR: 1.3
      });
      camEnd();
    }],
    // 15 -- 10:54.60 I just held her; it was cold, but we were warm
    [694.60, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 500, 1.06 + .05 * k, 0);
      stNightStreet(t);
      person(880, 990, 88, { role: 'boy', view: .3, face: faceAt(lt, [[0, 'calm'], [2.0, 'happy']]), aR: 1.5 });
      person(1080, 990, 86, { role: 'girl', hat: 'bucket', view: -.2, dy: -.04, face: faceAt(lt, [[0, 'calm'], [2.0, 'happy']]), aL: 1.4 });
      breath(760, 420, 24, t);
      for (let i = 0; i < 3; i++) heart(700 + i * 60, 380 - i * 20, 16, .6);
      camEnd();
    }],
    // 16 -- 11:01 that night I dreamed she waved and walked backwards away from me
    [701.30, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 540, 1.0, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E9EDF6', fillOp: 240, bleed: .5, tex: .3, ink: null });
      glow(960, 420, 760, '#FFFFFF', .5);
      person(1180 + lt * 24, 960, 80, { role: 'girl', hat: 'bucket', view: -.3, face: faceAt(lt, [[0, 'happy']]), aR: 2.0 });
      person(760 + lt * 10, 960, 88, { role: 'boy', view: .6, face: faceAt(lt, [[0, 'calm'], [1.6, 'worried']]) });
      camEnd();
    }],
    // 17 -- 11:07 I chased her, and fell into a pit
    [706.50, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 540 - lt * 60, 1.0 + .2 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#DCE3F0', fillOp: 240, ink: null });
      inkLine([[200, 900], [900, 860], [1100, 980], [1500, 940]], 5, '#9AA6BE', 'ink', .2);
      paint(ellPts(1180, 700 + lt * 40, 260, 90, 26), { fill: '#5A6480', fillOp: 200, bleed: .4, ink: null });
      person(1000, 960, 88, { role: 'boy', view: .4, dy: lt * .5, face: faceAt(lt, [[0, 'worried'], [1.2, 'shocked']]) });
      camEnd();
    }],
    // 18 -- 11:11.55 I woke up with a start at four in the morning
    [711.50, (t, lt, dur) => {
      camBegin(960, 520, 1.12, 0);
      stBedroom(t);
      person(900, 950, 92, {
        role: 'boy', view: .1,
        face: faceAt(lt, [[0, 'shocked'], [1.4, 'worried'], [3.0, 'pain']]),
        dy: -.1 + Math.sin(lt * 6) * .02
      });
      sweatDrop(1020, 330, 13, 1);
      camEnd();
    }],
    // 19 -- 11:15 I went out to the stairwell to check my phone. nothing.
    [716.00, (t, lt, dur) => {
      camBegin(960, 540, 1.04, 0);
      stStair(t, .45);
      person(900, 950, 86, { role: 'boy', view: .2, sit: true, face: faceAt(lt, [[0, 'worried'], [2.2, 'bored']]), aR: 1.1 });
      stPhone(1160, 560, 190, { msgs: 1 });
      camEnd();
    }],
    // 20 -- 11:23 I texted her that I missed her. she was awake too.
    [721.50, (t, lt, dur) => {
      camBegin(960, 540, 1.2, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#39405C', fillOp: 235, ink: null });
      stPhone(960, 520, 400, { msgs: 4, wall: '#E7EDF6' });
      letter('好想她呀', 1080, 636, 27, '#2E2A33', { font: '27px "Ma Shan Zheng", serif', ink: false, screen: true });
      letter('梦都是相反的', 838, 700, 27, '#2E2A33', { font: '27px "Ma Shan Zheng", serif', ink: false, screen: true });
      letter('早点休息', 1090, 764, 27, '#2E2A33', { font: '27px "Ma Shan Zheng", serif', ink: false, screen: true });
      glow(960, 520, 460, '#BFD6EE', .5);
      camEnd();
    }],
    // 21 -- 11:30 "dreams are the opposite, don't think about it, sleep early"
    [727.00, (t, lt, dur) => {
      camBegin(960, 470, 1.32, 0);
      stBedroom(t);
      person(960, 1180, 100, {
        role: 'boy', view: .1,
        face: faceAt(lt, [[0, 'worried'], [2.0, 'calm'], [3.4, 'happy']])
      });
      stPhone(1420, 620, 150, { msgs: 5 });
      camEnd();
    }]
  ]);
})();
