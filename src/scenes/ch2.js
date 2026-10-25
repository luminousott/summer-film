// ch2.js -- CH2 (2:13-4:03): the mirror on Lao Liu's desk, and the first eye contact.
// Front-of-class view: rows stack up the screen (front row = lower + bigger).
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));
  const C = SK3;

  function bgClass(t) {
    paint(rectPts(-200, -180, W + 400, 1300), { fill: '#EFE4D2', fillOp: 240, bleed: .25, tex: .45, ink: null });
    paint(rectPts(-200, -180, W + 400, 200), { fill: '#F6ECDC', fillOp: 220, bleed: .2, ink: null });
    // back wall: windows on the right, a clock and a poster on the left
    for (let i = 0; i < 3; i++) {
      boilSeed('c2w' + i);
      const x = 1290 + i * 220;
      paint(rectPts(x, 110, 180, 430), { wash: '#CFE4EA', ink: '#6E7F86', sw: 1.2 });
      paint(rectPts(x + 10, 120, 160, 200), { fill: '#EAF5F7', fillOp: 150, bleed: .3, ink: null });
      inkLine([[x + 90, 114], [x + 90, 546]], 1, '#6E7F86', 'inkfine', 0);
    }
    boilSeed('c2clock');
    paint(ellPts(300, 230, 62, 62, 20), { wash: '#FBF6EA', ink: '#7E7468', sw: 2 });
    inkLine([[300, 230], [300, 186]], 2, '#7E7468', 'inkfine', .1);
    inkLine([[300, 230], [334, 240]], 2, '#7E7468', 'inkfine', .1);
    paint(rrPts(520, 170, 300, 200, 4, 3), { wash: '#F7EFDD', ink: '#9C8E78', sw: 1.6 });
    for (let i = 0; i < 3; i++) inkLine([[548, 220 + i * 42], [792, 216 + i * 42]], 4, '#C9B79A', 'dry', .3);
    // empty desks receding to the right, so the room has depth
    for (let r = 0; r < 2; r++) {
      const y = 1020 - r * 150, w = 250 - r * 40;
      for (let c = 0; c < 3; c++) {
        const x = 210 + c * 330 + r * 70;
        if (x > 1150) continue;
        boilSeed('c2dk' + r + c);
        desk(x, y, w, { front: r % 2 ? '#E7D6B8' : '#EEDFC4' });
        inkLine([[x - w * .4, y], [x - w * .4, y + 6]], 2, SK.ink, 'ink', 0);
      }
    }
    // floor
    paint(rectPts(-200, 860, W + 400, 460), { fill: '#DCC7A6', fillOp: 235, bleed: .2, tex: .35, ink: null });
    inkLine([[-100, 870], [1500, 860]], 2, '#B99C78', 'dry', .3);
  }

  // A seated student. deskTopY is the desk surface line: the desk is built down from it and the
  // body is placed so its hips land exactly on that line, which hides the lap behind the desk.
  function seated(x, deskTopY, u, o = {}) {
    const dw = u * 3.9;
    person(x, deskTopY + u * 3.3, u, { ...o, sit: true, shadow: false });
    desk(x, deskTopY + dw * .86, dw);
  }

  // A hand mirror. p5.brush paints into its own buffer, so nothing can be clipped:
  // whatever is "in the glass" is simply drawn small enough to sit inside the frame.
  function mirror(x, y, w, h, who, o = {}) {
    boilSeed('c2mir' + Math.round(x) + Math.round(y));
    paint(rrPts(x - w / 2, y - h / 2, w, h, w * .16, 2), { wash: '#D9D2C6', ink: '#6E6068', sw: 2.6 });
    const ix = x - w / 2 + 16, iy = y - h / 2 + 16, iw = w - 32, ih = h - 32;
    paint(rectPts(ix, iy, iw, ih), { fill: '#E8F0F2', fillOp: 235, ink: null });
    const u = ih / 10.6, feet = iy + ih - u * .2;
    if (who === 'girl') {
      person(x, feet, u, {
        role: 'girl', hat: 'bucket', view: o.view ?? -.1, lookX: o.lookX ?? 0,
        blush: o.blush ?? .4, face: o.face || FACES.calm, aR: o.aR ?? .1, aL: .1
      });
    } else if (who === 'face') {
      // the back of a head in the glass (he is checking his hair)
      paint(ellPts(x, iy + ih * .46, iw * .34, ih * .34, 22), { wash: C.skin, ink: C.ink, sw: 1.2 });
      paint(ellPts(x, iy + ih * .34, iw * .38, ih * .26, 20), { wash: C.hairBoy, ink: C.ink, sw: 1.2 });
      inkLine([[x - iw * .12, iy + ih * .74], [x + iw * .1, iy + ih * .8]], 6, '#A9805A', 'ink', .05);
    }
    paint([[x - w * .34, y - h * .3], [x - w * .12, y - h * .4], [x - w * .24, y + h * .06]], { wash: '#FFFFFF', washOp: 80, ink: null });
    inkLine([[x, y + h / 2], [x + w * .06, y + h / 2 + w * .34]], w * .09, '#8A6B4E', 'ink', .05);
  }

  function bookStack(x, y, w) {
    for (let i = 0; i < 4; i++) {
      boilSeed('c2bk' + Math.round(x) + i);
      const bx = x - w / 2 + (hash(i) - .5) * w * .12, by = y - i * w * .1;
      sticker(rrPts(bx, by - w * .1, w, w * .1, 2, 1), ['#C7D4DE', '#E4D3B6', '#CBD8C4', '#E0C4C0'][i], { sw: .6 });
    }
  }

  function ripple(cx, cy, r, k) {
    for (let i = 0; i < 3; i++) {
      const rr = r * (i + 1) * .5 * k;
      if (rr < 4) continue;
      inkLine(ellPts(cx, cy, rr, rr * .32, 26), 1.4, '#7FA9B8', 'inkfine', .2);
    }
  }

  shots([
    // 1 -- 2:13 she was that exquisite; she could have been on a romance-novel cover
    [133.10, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 470, 1.12 + .05 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F6EEDC', fillOp: 235, bleed: .3, tex: .45, ink: null });
      glow(1180, 260, 620, '#FFEBC2', .5);
      // soft paper frame, like a book cover
      paint(rrPts(430, 60, 1060, 900, 8, 3), { ink: '#C7B393', sw: 3 });
      for (let i = 0; i < 4; i++) sparkle(640 + i * 220, 200 + (i % 2) * 60, 14, t, 60 + i);
      person(960, 1180, 92, {
        role: 'girl', view: .18,
        face: faceAt(lt, [[0, 'calm'], [3.0, 'shy'], [6.4, 'happy']]),
        blush: .5
      });
      camEnd();
    }],
    // 2 -- 2:21 she just arrived, so she had to sit in the last row / 2:23 so I put her desk behind mine
    [141.70, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(900, 520, 1.0 + .05 * k, 0);
      bgClass(t);
      // the boy drags a desk across, then she sits down behind him
      const dx = lerp(1400, 960, S(lt, .6, 3.4));
      if (lt < 3.6) {
        desk(dx, 1010, 300);
        person(dx - 20, 860, 78, {
          role: 'boy', view: .3,
          face: faceAt(lt, [[0, 'effort'], [2.4, 'happy']]),
          aL: .3, aR: 1.4, walk: (1400 - dx) / (4 * 78)
        });
      } else {
        person(960, 860, 78, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'happy']]) });
        person(960, 700, 68, {
          role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]), aL: .1, aR: .12
        });
        desk(960, 1000, 300);
      }
      person(960, 1010, 88, { role: 'liu', view: .1, face: faceAt(lt, [[0, 'smug']]), aL: .2, aR: .3 });
      camEnd();
    }],
    // 3 -- 2:25 Lao Liu sits in front of me, and he is a peacock
    [147.60, (t, lt, dur) => {
      camBegin(960, 560, 1.0, 0);
      bgClass(t);
      seated(648, 742, 92, { role: 'liu', view: .1, face: faceAt(lt, [[0, 'smug'], [2.0, 'sly'], [4.4, 'grin']]) });
      seated(960, 700, 86, { role: 'boy', view: .15, face: faceAt(lt, [[0, 'bored'], [2.6, 'dead']]) });
      seated(1288, 664, 80, { role: 'girl', hat: 'bucket', view: -.1, face: faceAt(lt, [[0, 'calm']]) });
      camEnd();
    }],
    // 4 -- 2:28 boys stack books on the desk and primp behind them
    [155.00, (t, lt, dur) => {
      camBegin(980, 560, 1.24, 0);
      bgClass(t);
      seated(980, 1010, 104, { role: 'liu', view: .08, face: faceAt(lt, [[0, 'smug'], [1.6, 'sly'], [3.6, 'happy']]), aL: 2.0, aR: 2.1 });
      bookStack(1120, 690, 230);
      // a little hand mirror held up
      mirror(1180, 560, 150, 190, 'face');
      camEnd();
    }],
    // 5 -- 2:38 he's got a cracked mirror and a comb behind the books
    [162.00, (t, lt, dur) => {
      camBegin(1000, 540, 1.5, 0);
      bgClass(t);
      bookStack(860, 800, 300);
      mirror(1060, 470, 250, 320, 'face');
      // crack
      inkLine([[1000, 380], [1030, 470], [1010, 560]], 1.2, '#6E6068', 'inkfine', .3);
      camEnd();
    }],
    // 6 -- 2:44 from where the mirror sits, I can see her behind me
    [166.60, (t, lt, dur) => {
      camBegin(960, 520, 1.3, 0);
      bgClass(t);
      mirror(960, 500, 460, 580, 'girl', { face: faceAt(lt, [[0, 'calm'], [2.4, 'neutral']]) });
      camEnd();
    }],
    // 7 -- 2:50 how could anyone study with that mirror there? I sneak a look
    [172.00, (t, lt, dur) => {
      camBegin(960, 560, 1.0, 0);
      bgClass(t);
      const glance = Math.max(0, Math.sin(lt * 1.5));
      seated(648, 742, 92, { role: 'liu', view: .1, face: faceAt(lt, [[0, 'bored'], [3.4, 'smug']]) });
      seated(960, 700, 86, {
        role: 'boy', view: .2 + .3 * glance, lookX: .8 * glance,
        face: faceAt(lt, [[0, 'bored'], [1.6, 'curious'], [3.4, 'smug'], [5.6, 'happy']])
      });
      seated(1288, 664, 80, { role: 'girl', hat: 'bucket', view: -.1, face: faceAt(lt, [[0, 'calm']]) });
      camEnd();
    }],
    // 8 -- 2:58 my grades slid. all Lao Liu's fault.
    [181.50, (t, lt, dur) => {
      camBegin(960, 600, 1.35, 0);
      bgClass(t);
      // a test paper with red marks
      sticker(rrPts(700, 420, 520, 340, 6, 3), '#FBF4E4', { sw: 1.4 });
      for (let i = 0; i < 4; i++) inkLine([[740, 490 + i * 60], [1160, 486 + i * 60]], 2, '#B9AE9A', 'dry', .2);
      inkLine([[760, 470], [820, 530]], 5, '#C85A4E', 'ink', .1);
      inkLine([[820, 470], [760, 530]], 5, '#C85A4E', 'ink', .1);
      inkLine([[880, 440], [940, 470], [1000, 430]], 4, '#C85A4E', 'ink', .2);
      person(1100, 1060, 96, { role: 'liu', view: .2, face: faceAt(lt, [[0, 'smug'], [2.0, 'sly']]) });
      person(700, 1040, 86, { role: 'boy', view: -.3, face: faceAt(lt, [[0, 'dead'], [2.2, 'bored']]) });
      camEnd();
    }],
    // 9 -- 3:02 she can see me in it too / 3:08 the first time our eyes met through the mirror
    [185.00, (t, lt, dur) => {
      camBegin(960, 470, 1.18, 0);
      bgClass(t);
      const look = lt < 2.2 ? -.2 : 1;
      mirror(960, 450, 520, 640, 'girl', {
        lookX: look,
        face: faceAt(lt, [[0, 'calm'], [2.2, 'curious'], [4.2, 'shy']])
      });
      camEnd();
    }],
    // 10 -- 3:12 she glances aside, then back to the board, lips pressed, cheeks pink
    [192.00, (t, lt, dur) => {
      camBegin(960, 545, 1.06, 0);
      bgClass(t);
      const turn = lt > 1.4 ? 1 : 0;
      person(960, 1180, 104, {
        role: 'girl', hat: 'bucket',
        view: -.15 + .3 * turn, lookX: turn ? 1 : -.8,
        blush: .5 + .3 * turn,
        face: faceAt(lt, [[0, 'calm'], [1.4, 'curious'], [2.6, 'shy'], [4.4, 'happy']])
      });
      glow(1260, 300, 380, '#FFEFD0', .35);
      camEnd();
    }],
    // 11 -- 3:27 slowly she seems to like being watched / 3:31 the mirror is our little secret
    [202.00, (t, lt, dur) => {
      camBegin(960, 500, 1.12, 0);
      bgClass(t);
      const beat = Math.floor(lt * .8);
      const g = beat % 2 === 0 ? 1 : 0;
      mirror(960, 470, 430, 540, 'girl', {
        lookX: g ? 1 : 0, blush: g ? .6 : .3,
        face: g ? FACES.shy : FACES.calm
      });
      for (let i = 0; i < 2; i++) sparkle(760 + i * 420, 300 + i * 60, 12, t, 70 + i);
      camEnd();
    }],
    // 12 -- 3:34 she looked straight at me in the mirror and waved
    [210.00, (t, lt, dur) => {
      camBegin(960, 470, 1.22, 0);
      bgClass(t);
      const wave = lt > 1.2 ? Math.sin(lt * 9) * .35 + 1.2 : .1;
      mirror(960, 450, 500, 620, 'girl', {
        aR: wave,
        face: faceAt(lt, [[0, 'calm'], [1.2, 'happy']])
      });
      camEnd();
    }],
    // 13 -- 3:42 this time the shy one was me
    [219.00, (t, lt, dur) => {
      camBegin(960, 470, 1.45, 0);
      bgClass(t);
      person(960, 1200, 104, {
        role: 'boy', blush: .95,
        face: faceAt(lt, [[0, 'shocked'], [1.6, 'shy'], [3.6, 'happy']]),
        aL: 2.3, aR: 2.4
      });
      for (let i = 0; i < 3; i++) sparkle(760 + i * 200, 260 + (i % 2) * 70, 15, t, 80 + i);
      camEnd();
    }],
    // 14 -- 3:45 that smile was like a summer afternoon, a wind chime on the window sill
    [226.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(940, 520, 1.0 + .05 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F3EAD6', fillOp: 235, bleed: .3, tex: .45, ink: null });
      // window frame
      paint(rectPts(420, 90, 1080, 800), { wash: '#E7F1EE', ink: '#7E8A82', sw: 3 });
      inkLine([[960, 96], [960, 884]], 3, '#7E8A82', 'ink', 0);
      inkLine([[426, 480], [1494, 480]], 3, '#7E8A82', 'ink', 0);
      // the chime, swaying
      const sway = Math.sin(t * 1.4) * 26;
      inkLine([[960, 240], [960 + sway * .4, 360]], 1.2, '#8A7D6A', 'inkfine', 0);
      for (let i = 0; i < 4; i++) {
        boilSeed('c2ch' + i);
        const cx = 960 + sway * (1 - i * .12) + (i - 1.5) * 34;
        inkLine([[cx, 360 + i * 10], [cx, 470 + i * 40]], .9, '#8A7D6A', 'inkfine', 0);
        paint(rrPts(cx - 17, 470 + i * 40, 34, 96, 8, 2), { wash: '#DCE6E2', ink: '#7E8A82', sw: 1 });
      }
      person(1500, 990, 96, { role: 'girl', hat: 'bucket', view: -.2, blush: .55, face: faceAt(lt, [[0, 'happy']]) });
      camEnd();
    }],
    // 15 -- 3:55 the sound flew into my heart, and the lake rippled again
    [236.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 540, 1.0 + .08 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#DCE9EE', fillOp: 240, bleed: .4, tex: .5, ink: null });
      glow(1200, 260, 640, '#FFF0C8', .5);
      // water
      paint(rectPts(-200, 430, W + 400, 800), { fill: '#A9CBD8', fillOp: 190, bleed: .5, tex: .6, ink: null });
      ripple(960, 620, 120, 1 + lt * .5);
      ripple(760, 700, 90, 1 + lt * .35);
      // her smile, floating in the water
      paint(ellPts(960, 600 + Math.sin(t) * 6, 210, 210, 26), { wash: '#FBE3D6', washOp: 210, ink: null });
      person(960, 1010, 74, {
        role: 'girl', hat: 'bucket', view: .1, blush: .6,
        face: faceAt(lt, [[0, 'happy']]), aL: .12, aR: .12
      });
      for (let i = 0; i < 5; i++) sparkle(620 + i * 170, 360 + (i % 2) * 80, 12 + hash(i) * 8, t, 90 + i);
      camEnd();
    }]
  ]);
})();
