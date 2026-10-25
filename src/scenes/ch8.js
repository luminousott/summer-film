// ch8.js -- CH8 (12:19-15:23): the last morning, the announcement, the letter, the playground.
(() => {
  const S = (t, a, b) => ease(seg(t, a, b));
  // 12:48-14:13 the letter is read on screen; a caption would only double it
  window.SUBS_OFF = t => t > 794.5 && t < 842;
  const HAND = '38px "Ma Shan Zheng", "Kaiti SC", serif';
  const HAND2 = '54px "Ma Shan Zheng", "Kaiti SC", serif';

  // The letter page: warm paper, a red stamp, and the actual handwriting appearing line by line.
  function letterPage(t, lines, o = {}) {
    const x0 = o.x ?? 250, y0 = o.y ?? 110, w = o.w ?? 980, h = o.h ?? 860;
    boilSeed('ch8pp');
    sticker(rrPts(x0, y0, w, h, 8, 3), '#FBF3DF', { sw: 1.8 });
    // ruled lines, faint
    for (let i = 0; i < 9; i++) inkLine([[x0 + 60, y0 + 170 + i * 96], [x0 + w - 60, y0 + 146 + i * 78]], 1.2, '#E4D5B8', 'inkfine', .2);
    // a red seal in the corner
    paint(ellPts(x0 + w - 120, y0 + h - 120, 46, 46, 18), { wash: '#C0564C', washOp: 150, ink: null });
    inkLine([[x0 + w - 150, y0 + h - 150], [x0 + w - 90, y0 + h - 90]], 3, '#A8443C', 'dry', .2);
    inkLine([[x0 + w - 90, y0 + h - 150], [x0 + w - 150, y0 + h - 90]], 3, '#A8443C', 'dry', .2);
    // handwriting
    for (let i = 0; i < lines.length; i++) {
      const k = clamp((t - i * .55) / .5);
      if (k <= 0) continue;
      letter(lines[i], x0 + 70 + (o.lineMay ?? 0), y0 + 130 + i * 96, 54, '#4A4038', {
        font: HAND2, align: 'left', alpha: k, ink: false,
        screen: false
      });
    }
  }
  // A round memory vignette: a soft cream frame with an image inside.
  function vignette(cx, cy, r) {
    boilSeed('ch8vg' + Math.round(cx));
    paint(ellPts(cx, cy, r + 16, r + 16, 30), { wash: '#F7EDD8', washOp: 235, ink: '#C9B79A', sw: 2.4 });
    paint(ellPts(cx, cy, r, r, 30), { wash: '#E7DCC6', washOp: 240, ink: null });
  }
  function chocoBox(x, y, w) {
    boilSeed('ch8cb' + Math.round(x));
    sticker(rrPts(x - w / 2, y - w * .34, w, w * .42, 5, 2), '#8E4A46', { sw: 1.2 });
    sticker(rrPts(x - w / 2, y - w * .44, w, w * .16, 4, 2), '#C2655C', { sw: 1.1 });
    for (let i = 0; i < 4; i++) paint(rrPts(x - w * .38 + i * w * .2, y - w * .3, w * .14, w * .14, 2, 1), { wash: '#5E3A34', ink: null });
  }
  function coach(x, y, w) {
    sticker(rrPts(x - w / 2, y - w * .42, w, w * .36, w * .05, 2), '#DCCDB2', { sw: 1.3 });
    for (let i = 0; i < 4; i++) sticker(rrPts(x - w * .42 + i * w * .24, y - w * .34, w * .17, w * .17, 3, 1), '#BED8E4', { sw: .7 });
    for (const s of [-1, 1]) sticker(ellPts(x + s * w * .3, y - w * .02, w * .1, w * .1, 12), '#4A434E', { sw: .9 });
  }

  shots([
    // 1 -- 11:38 next morning, before school
    [739.00, (t, lt, dur) => {
      camBegin(960, 540, 1.06, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F0E6D2', fillOp: 235, ink: null });
      paint(rectPts(-200, 800, W + 400, 460), { fill: '#CDB391', fillOp: 220, ink: null });
      person(760, 950, 86, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'calm'], [2.4, 'happy']]) });
      stPhone(1240, 560, 220, { msgs: 2 });
      camEnd();
    }],
    // 2 -- 11:43 "see you at school"
    [743.80, (t, lt, dur) => {
      camBegin(960, 540, 1.2, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E7EDF4', fillOp: 235, ink: null });
      paint(rrPts(640, 200, 640, 680, 26, 3), { wash: '#2E2A33', ink: null });
      paint(rrPts(660, 220, 600, 640, 18, 1), { wash: '#EDE6DA', ink: null });
      letter('学校见', 960, 420, 62, '#3B333C', { font: '62px "Ma Shan Zheng", serif', ink: false, alpha: .95 });
      paint(rrPts(700, 500, 360, 110, 18, 2), { wash: '#9BD0A0', ink: null });
      paint(rrPts(900, 640, 300, 110, 18, 2), { wash: '#FFFFFF', ink: null });
      camEnd();
    }],
    // 3 -- 11:47 on the coach back, Lao Liu was asleep before it left
    [748.50, (t, lt, dur) => {
      camBegin(960, 540, 1.06, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#DCE3EC', fillOp: 235, ink: null });
      paint(rectPts(-200, 700, W + 400, 460), { fill: '#B9C3D2', fillOp: 200, ink: null });
      for (let i = 0; i < 3; i++) paint(rrPts(180 + i * 620, 380, 520, 380, 40, 3), { wash: '#8E9AB0', ink: '#4A5464', sw: 1.6 });
      person(560, 900, 86, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'bored'], [2.2, 'worried']]) });
      person(1180, 900, 86, { role: 'liu', view: -.2, dy: .02, face: faceAt(lt, [[0, 'closed'], [2.0, 'calm']]) });
      paint(ellPts(1180, 470 + Math.sin(lt * 1.4) * 8, 130, 40, 18), { fill: '#FFF6E0', fillOp: 90, ink: null });
      camEnd();
    }],
    // 4 -- 11:58 I waited at the station as usual
    [755.00, (t, lt, dur) => {
      camBegin(980, 560, 1.02, 0);
      stStation(t, .8);
      person(840, 950, 86, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'calm'], [3.0, 'worried']]), aR: lt > 2 ? 1.4 : .16 });
      camEnd();
    }],
    // 5 -- 12:01 Lao Liu took a few steps, then turned back
    [760.00, (t, lt, dur) => {
      camBegin(1000, 530, 1.08, 0);
      stStation(t, .8);
      const x = lerp(1450, 1080, S(lt, .2, 2.2));
      person(x, 950, 86, { role: 'liu', view: -.3, face: faceAt(lt, [[0, 'worried'], [1.6, 'dead']]), walk: (1450 - x) / (4 * 86) });
      person(760, 950, 86, { role: 'boy', view: .5, face: faceAt(lt, [[0, 'curious'], [1.8, 'worried']]) });
      camEnd();
    }],
    // 6 -- 12:09 his eyes slid away: "it's nothing."
    [765.50, (t, lt, dur) => {
      camBegin(1120, 450, 1.42, 0);
      stStation(t, .8);
      person(1120, 1180, 102, { role: 'liu', view: -.2, lookX: -1, face: faceAt(lt, [[0, 'worried'], [1.4, 'dead']]) });
      camEnd();
    }],
    // 7 -- 12:13 I waited until evening study; she never came
    [768.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      stStation(t, .5);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#3B4258', fillOp: 60, ink: null });
      person(880, 950, 86, { role: 'boy', view: .1, face: faceAt(lt, [[0, 'worried'], [2.6, 'dead']]) });
      camEnd();
    }],
    // 8 -- 12:17 back in class, the noise stopped the moment I walked in
    [773.00, (t, lt, dur) => {
      camBegin(960, 540, 1.02, 0);
      stClass(t);
      stNight(t, .3);
      for (let i = 0; i < 5; i++) {
        stSeated(300 + i * 320, 720, 74, { role: 'boy', face: faceAt(lt, [[0, 'stare']]), view: (i - 2) * .1 });
      }
      person(960, 950, 88, { role: 'boy', view: .1, face: faceAt(lt, [[0, 'curious'], [1.6, 'worried']]) });
      camEnd();
    }],
    // 9 -- 12:24 "what's going on?" / the teacher walked in
    [777.50, (t, lt, dur) => {
      camBegin(980, 520, 1.06, 0);
      stClass(t);
      stNight(t, .35);
      stSeated(700, 700, 84, { role: 'liu', view: .3, face: faceAt(lt, [[0, 'worried'], [2.0, 'dead']]) });
      person(960, 950, 86, { role: 'boy', view: -.3, face: faceAt(lt, [[0, 'curious'], [2.2, 'worried']]) });
      person(1420, 950, 82, { role: 'teacher', view: -.3, face: faceAt(lt, [[0, 'neutral'], [1.6, 'worried']]) });
      camEnd();
    }],
    // 10 -- 12:32 the teacher opened his book and announced it
    [784.00, (t, lt, dur) => {
      camBegin(1100, 520, 1.12, 0);
      stClass(t);
      stNight(t, .4);
      person(860, 950, 88, { role: 'teacher', view: .3, face: faceAt(lt, [[0, 'neutral']]), aL: 1.1 });
      stSeated(1240, 700, 82, { role: 'boy', view: -.3, face: faceAt(lt, [[0, 'blank'], [1.6, 'shocked']]) });
      camEnd();
    }],
    // 11 -- 12:38 it hit me like a thunderclap
    [788.00, (t, lt, dur) => {
      camBegin(960, 460, 1.3, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#F4F1EA', fillOp: 240, ink: null });
      flash(clamp(1 - lt / .5) * .9);
      person(960, 1180, 102, { role: 'boy', face: faceAt(lt, [[0, 'shocked'], [1.4, 'blank'], [3.0, 'dead']]) });
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * TAU, r = 200 + lt * 90;
        inkLine([[960 + Math.cos(a) * r, 500 + Math.sin(a) * r * .7], [960 + Math.cos(a) * (r + 90), 500 + Math.sin(a) * (r + 90) * .7]], 3, '#B9AFA0', 'dry', .2);
      }
      camEnd();
    }],
    // 12 -- 12:45 Lao Liu handed me a letter
    [791.50, (t, lt, dur) => {
      camBegin(1000, 500, 1.16, 0);
      stClass(t);
      stNight(t, .35);
      person(760, 950, 86, { role: 'liu', view: .4, face: faceAt(lt, [[0, 'pain'], [1.6, 'worried']]), aL: 1.4 });
      person(1180, 950, 86, { role: 'boy', view: -.4, face: faceAt(lt, [[0, 'blank'], [1.8, 'dead']]), aR: 1.2 });
      sticker(rrPts(1010, 600, 150, 200, 4, 2), '#FBF4E2', { sw: 1.3 });
      camEnd();
    }],
    // 13 -- 12:48 the letter begins
    [795.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E3D8C2', fillOp: 240, bleed: .3, ink: null });
      letterPage(lt, ['宝宝，当你看到这封信的时候，', '我可能已经在前往四川的路上了。', '请原谅我的不辞而别。', '', '我知道如果我看到你，', '我肯定就走不了了，因为我舍不得你。']);
      vignette(1480, 520, 300);
      coach(1480, 560, 400);
      camEnd();
    }],
    // 14 -- 13:06 "if I saw you I'd never be able to leave"
    [802.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E3D8C2', fillOp: 240, ink: null });
      letterPage(lt, ['和你在一起的日子，', '是我一生中最快乐的时光。', '', '谢谢你在我刚来学校的时候', '那么照顾我。']);
      vignette(1480, 520, 300);
      person(1480, 790, 50, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'calm'], [2.6, 'pain']]) });
      camEnd();
    }],
    // 15 -- 13:22 "thank you for looking after me"
    [810.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E3D8C2', fillOp: 240, ink: null });
      letterPage(lt, ['你不是问我，为什么因为', '一盒巧克力就哭吗？', '', '我的家庭条件不太好，', '从小是妈妈一直带着我。']);
      vignette(1480, 520, 300);
      chocoBox(1480, 580, 230);
      camEnd();
    }],
    // 16 -- 13:39 "that was the first time I got so much chocolate"
    [817.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E3D8C2', fillOp: 240, ink: null });
      letterPage(lt, ['我特别喜欢吃巧克力，', '但是不好意思找妈妈要。', '', '那是我第一次收到那么多巧克力。', '谢谢你。']);
      vignette(1480, 480, 280);
      person(1480, 790, 48, { role: 'girl', hat: 'bucket', blush: .4, face: faceAt(lt, [[0, 'pain'], [2.4, 'happy']]) });
      camEnd();
    }],
    // 17 -- 13:50 the bet with her mother
    [826.00, (t, lt, dur) => {
      camBegin(960, 540, 1.0, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#E3D8C2', fillOp: 240, ink: null });
      letterPage(lt, ['还有前段时间我没有陪你散步，', '是因为我和妈妈打了个赌。', '', '妈妈要回四川了，我舍不得你，', '不愿意走。她说只要我期中考试', '考进前三名，就让我留下来。']);
      vignette(1480, 520, 290);
      person(1480, 790, 50, { role: 'girl', hat: 'bucket', view: -.2, face: faceAt(lt, [[0, 'calm'], [2.0, 'pain']]) });
      camEnd();
    }],
    // 18 -- 14:10 "I'm sorry. I lost the bet."
    [837.00, (t, lt, dur) => {
      camBegin(960, 500, 1.04, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#DED4C0', fillOp: 240, ink: null });
      glow(1420, 340, 640, '#FFF0C8', .45);
      letterPage(lt, ['对不起啊，', '我赌输了。'], { x: 300, y: 220, w: 780, h: 620 });
      vignette(1450, 560, 300);
      person(1450, 810, 50, { role: 'girl', hat: 'bucket', blush: .3, face: faceAt(lt, [[0, 'pain'], [2.2, 'calm']]) });
      camEnd();
    }],
    // 19 -- 14:20 Haruki Murakami said: we are all lost souls...
    [844.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 520, 1.0 + .06 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#2E3552', fillOp: 240, bleed: .4, ink: null });
      for (let i = 0; i < 40; i++) {
        boilSeed('ch8st' + i);
        paint(ellPts(120 + hash(i) * 1680, 80 + hash(i + 7) * 620, 2 + hash(i + 3) * 2.4, 2 + hash(i + 3) * 2.4, 8), { wash: '#FFF6E0', washOp: 140, ink: null });
      }
      glow(960, 700, 700, '#F2D7A8', .35);
      person(960, 1250, 96, { role: 'girl', hat: 'bucket', blush: .4, face: faceAt(lt, [[0, 'calm'], [3.0, 'happy']]) });
      for (let i = 0; i < 26; i++) {
        const x = 140 + hash(i) * 1640, y = frac(lt * .12 + hash(i + 5)) * 1000;
        paint(ellPts(x, y, 4, 4, 8), { wash: '#FFFFFF', washOp: 190, ink: null });
      }
      letter('重要的是握紧你的手', 960, 200, 46, '#F6E3C4', { font: '46px "Ma Shan Zheng", serif', ink: false, alpha: clamp((lt - 2) / 2) });
      camEnd();
    }],
    // 20 -- 14:53 I wanted to cry but no sound came out
    [860.00, (t, lt, dur) => {
      camBegin(960, 480, 1.24, 0);
      stClassDusk(t);
      stNight(t, .55);
      person(960, 1180, 100, { role: 'boy', face: faceAt(lt, [[0, 'blank'], [2.0, 'pain'], [4.0, 'dead']]) });
      camEnd();
    }],
    // 21 -- 15:02 I ran to the track, lap after lap
    [893.00, (t, lt, dur) => {
      camBegin(960, 520, 1.02, 0);
      paint(rectPts(-200, -200, W + 400, 640), { fill: '#E7B98E', fillOp: 235, ink: null });
      glow(1200, 260, 620, '#FFD79A', .5);
      paint(rectPts(-200, 600, W + 400, 600), { fill: '#C08A62', fillOp: 235, ink: null });
      // running track: lanes as long shallow arcs, side view
      for (let i = 0; i < 3; i++) inkLine([[60, 780 + i * 66], [900, 760 + i * 66], [1800, 780 + i * 66]], 3, '#8E6547', 'dry', .25);
      inkLine([[60, 700], [1800, 700]], 4, '#A87A54', 'dry', .2);
      const x = 960 + Math.sin(lt * 2.2) * 520;
      person(x, 900, 84, { role: 'boy', view: .2, face: faceAt(lt, [[0, 'pain']]), walk: lt * 2.4, dy: -Math.abs(Math.sin(lt * 6)) * .03 });
      camEnd();
    }],
    // 22 -- 15:09 I lay down at the crossing where we once held hands
    [903.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 500 - 30 * k, 1.02, 0);
      paint(rectPts(-200, -200, W + 400, 700), { fill: '#D9A87C', fillOp: 235, ink: null });
      glow(960, 680, 760, '#FFCE94', .45);
      paint(rectPts(-200, 660, W + 400, 500), { fill: '#9C7F63', fillOp: 235, ink: null });
      inkLine([[100, 720], [1800, 700]], 4, '#7E644C', 'dry', .3);
      // him, lying on his back: head, folded arms, legs, shoes
      sticker(ellPts(880, 838, 300, 26, 20), { fill: '#7E644C', fillOp: 90, bleed: .5, ink: null });
      sticker(rrPts(700, 782, 470, 92, 46, 3), SK3.boyCoat, { sw: 1.2 });
      sticker(rrPts(1130, 792, 120, 60, 26, 2), SK3.pants, { sw: 1.1 });
      sticker(rrPts(1230, 796, 120, 54, 24, 2), SK3.pants, { sw: 1.1 });
      sticker(ellPts(1330, 812, 46, 34, 14), SK3.shoe, { sw: 1 });
      sticker(ellPts(1360, 812, 46, 32, 14), SK3.shoe, { sw: 1 });
      sticker(rrPts(800, 756, 300, 60, 28, 2), SK3.boyCoat, { sw: 1 });
      sticker(ellPts(600, 800, 66, 58, 18), SK3.skin, { sw: 1.2 });
      sticker(ellPts(576, 772, 68, 42, 18), SK3.hairBoy, { sw: 1.2 });
      sticker(ellPts(636, 828, 26, 16, 10), SK3.skin, { sw: .8 });
      camEnd();
    }],
    // 23 -- 15:11 I shouted at the sky until I had no voice
    [911.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 520, 1.0 + .1 * k, 0);
      paint(rectPts(-200, -200, W + 400, 800), { fill: '#E0956B', fillOp: 235, ink: null });
      glow(960, 360, 760, '#FFCE94', .6);
      paint(rectPts(-200, 700, W + 400, 500), { fill: '#8E7358', fillOp: 235, ink: null });
      person(960, 980, 88, { role: 'boy', view: .1, face: faceAt(lt, [[0, 'pain'], [2.0, 'dead']]), aL: 2.5, aR: 2.5, dy: -.02 });
      // he shouts at the sky: clouds part, wind streaks move, and he is very small
      for (let i = 0; i < 5; i++) {
        boilSeed('ch8cl' + i);
        const cx = 200 + i * 380 + Math.sin(t * .2 + i) * 20;
        paint(ellPts(cx, 180 + hash(i) * 90, 210 + hash(i + 2) * 90, 74 + hash(i + 3) * 30, 20),
          { fill: '#F7E2C4', fillOp: 120, bleed: .6, tex: .4, ink: null });
      }
      for (let i = 0; i < 7; i++) {
        const k = frac(lt * .5 + i / 7);
        const x = 120 + hash(i) * 1600 + k * 120, y = 300 + hash(i + 4) * 260;
        inkLine([[x, y], [x + 90 + hash(i) * 60, y - 8]], 1.6, '#FFE9C8', 'inkfine', .2);
      }
      camEnd();
    }],
    // 24 -- 15:13 all I wanted was for her to look back once
    [916.00, (t, lt, dur) => {
      const k = S(t, 0, dur);
      camBegin(960, 500, 1.04 + .08 * k, 0);
      paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#3A3350', fillOp: 240, bleed: .4, ink: null });
      glow(960, 640, 760, '#F2C08E', .4);
      for (let i = 0; i < 40; i++) {
        boilSeed('ch8end' + i);
        paint(ellPts(120 + hash(i) * 1680, 60 + hash(i + 9) * 520, 2 + hash(i + 4) * 2.4, 2 + hash(i + 4) * 2.4, 8), { wash: '#FFF6E0', washOp: 130, ink: null });
      }
      person(960, 1240, 92, { role: 'boy', view: .1, face: faceAt(lt, [[0, 'dead']]) });
      paint(ellPts(1420, 700, 130, 240, 24), { fill: '#F6E2C4', fillOp: 70, bleed: .6, ink: null });
      flash(clamp((lt - (dur - 2.2)) / 2.2) * .95, '#F8EFDC');
      camEnd();
    }]
  ]);
})();
