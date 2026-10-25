// stage.js -- shared staging for chapters 3-8: rooms, props and seated students.
// All of it is p5.brush only and a pure function of t.
const ST = {
  wall: '#EFE4D2', wallLt: '#F6ECDC', floor: '#DCC7A6', floorDk: '#B99C78',
  glass: '#CFE4EA', frame: '#6E7F86', desk: '#DCBB8C', deskLt: '#E7D6B8',
  sky: '#9FC6DA', dusk: '#F0C39A', night: '#2E3552', lamp: '#FFE3A8'
};

// A classroom seen from the front: windows right, blackboard wall behind the camera,
// empty desks receding, so any seated group has a room around it.
function stClass(t, o = {}) {
  paint(rectPts(-200, -180, W + 400, 1300), { fill: ST.wall, fillOp: 240, bleed: .25, tex: .45, ink: null });
  paint(rectPts(-200, -180, W + 400, 200), { fill: ST.wallLt, fillOp: 220, bleed: .2, ink: null });
  for (let i = 0; i < 3; i++) {
    boilSeed('stW' + i);
    const x = 1290 + i * 220;
    paint(rectPts(x, 110, 180, 430), { wash: ST.glass, ink: ST.frame, sw: 1.2 });
    paint(rectPts(x + 10, 120, 160, 200), { fill: '#EAF5F7', fillOp: 150, bleed: .3, ink: null });
    inkLine([[x + 90, 114], [x + 90, 546]], 1, ST.frame, 'inkfine', 0);
  }
  stClock(300, 230, 62, t);
  paint(rrPts(520, 170, 300, 200, 4, 3), { wash: '#F7EFDD', ink: '#9C8E78', sw: 1.6 });
  for (let i = 0; i < 3; i++) inkLine([[548, 220 + i * 42], [792, 216 + i * 42]], 4, '#C9B79A', 'dry', .3);
  for (let r = 0; r < 2 && !o.bare; r++) {
    const y = 1030 - r * 160, w = 250 - r * 44;
    for (let c = 0; c < 3; c++) {
      const x = 230 + c * 340 + r * 80;
      if (x > 1160) continue;
      boilSeed('stDk' + r + c);
      paint(ellPts(x, y + 4, w * .5, 16, 14), { fill: '#8A7358', fillOp: 34, bleed: .5, ink: null });
      desk(x, y, w, { front: r % 2 ? ST.deskLt : '#EEDFC4' });
    }
  }
  paint(rectPts(-200, 860, W + 400, 460), { fill: ST.floor, fillOp: 235, bleed: .2, tex: .35, ink: null });
  inkLine([[-100, 870], [1500, 860]], 2, ST.floorDk, 'dry', .3);
}

function stClock(cx, cy, r, t) {
  boilSeed('stClock');
  paint(ellPts(cx, cy, r, r, 20), { wash: '#FBF6EA', ink: '#7E7468', sw: 2 });
  const h = t * .35 % TAU, m = t * 2.1 % TAU;
  inkLine([[cx, cy], [cx + Math.cos(h - Math.PI / 2) * r * .45, cy + Math.sin(h - Math.PI / 2) * r * .45]], 2.4, '#7E7468', 'ink', .1);
  inkLine([[cx, cy], [cx + Math.cos(m - Math.PI / 2) * r * .72, cy + Math.sin(m - Math.PI / 2) * r * .72]], 1.6, '#7E7468', 'inkfine', .1);
}

// Seated student: deskTopY is the desk surface; hips land on it and a tall front panel
// hides the legs, so the pose reads as sitting even though the body is drawn upright.
function stSeated(x, deskTopY, u, o = {}) {
  const dw = u * 3.9;
  paint(ellPts(x, deskTopY + u * 4.4, dw * .62, u * .3, 18), { fill: '#8A7358', fillOp: 40, bleed: .5, ink: null });
  person(x, deskTopY + u * 3.3, u, { ...o, sit: true, shadow: false, hideLegs: true });
  paint(rrPts(x - dw / 2, deskTopY + u * .42, dw, u * 4.1, 4, 2), { wash: ST.deskLt, ink: SK3.ink, sw: 1 });
  paint(rrPts(x - dw / 2, deskTopY, dw, u * .5, 4, 3), { wash: ST.desk, ink: SK3.ink, sw: 1.1 });
}

// Empty classroom at the end of the day: warm light flooding in from the right.
function stClassDusk(t, o = {}) {
  stClass(t, o);
  paint(rectPts(-200, -200, W + 400, 1300), { fill: '#F6C98F', fillOp: 80, bleed: .4, tex: .5, ink: null });
  glow(1500, 380, 700, '#FFD9A0', .55);
  paint([[1180, 120], [1700, 120], [1500, 1000], [900, 1000]], { fill: '#FFE8BC', fillOp: 60, bleed: .5, ink: null });
}

// Street outside school at dusk, for the walk home.
function stStreet(t, o = {}) {
  paint(rectPts(-200, -200, W + 400, 900), { fill: '#F3C79C', fillOp: 235, bleed: .4, tex: .5, ink: null });
  paint(rectPts(-200, 300, W + 400, 400), { fill: '#F7DCB4', fillOp: 180, bleed: .5, ink: null });
  glow(1420, 300, 520, '#FFD98E', .55);
  paint(ellPts(1420, 320, 90, 90, 22), { wash: '#FBE0A6', ink: null });
  // distant buildings
  for (let i = 0; i < 5; i++) {
    boilSeed('stB' + i);
    const x = 60 + i * 260, h = 220 + hash(i) * 180;
    paint(rectPts(x, 640 - h, 200, h), { wash: mixCol('#C9A98A', '#B08F73', hash(i + 3)), ink: null });
    for (let k = 0; k < 3; k++) paint(rectPts(x + 30 + k * 55, 660 - h + 40, 32, 40), { wash: '#F6DCA8', washOp: 150, ink: null });
  }
  paint(rectPts(-200, 620, W + 400, 560), { fill: '#B49A7C', fillOp: 230, bleed: .3, tex: .4, ink: null });
  inkLine([[-100, 640], [1800, 630]], 3, '#9A8163', 'dry', .3);
  // road
  paint(rectPts(-200, 760, W + 400, 400), { fill: '#8E8478', fillOp: 200, bleed: .3, ink: null });
  for (let i = 0; i < 8; i++) paint(rectPts(80 + i * 240, 900, 110, 14, 2), { wash: '#E8DFC8', washOp: 150, ink: null });
}

// A dark stairwell at home: plain wall, a run of steps low in frame, one sensor lamp.
function stStair(t, lightK = 1) {
  paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#34313D', fillOp: 245, bleed: .3, tex: .4, ink: null });
  paint(rectPts(-200, -200, W + 400, 560), { fill: '#3E3B49', fillOp: 230, ink: null });
  boilSeed('stSwin');
  paint(rectPts(700, 140, 260, 200), { wash: '#5B6A82', ink: '#24222E', sw: 2 });
  inkLine([[830, 144], [830, 336]], 2, '#24222E', 'ink', 0);
  glow(830, 240, 200, '#8FA6C4', .18);
  // steps: just their edges, low in the frame, so the room still reads as a stairwell
  for (let i = 0; i < 5; i++) {
    const y = 760 + i * 62;
    inkLine([[60, y], [1860, y]], 3, '#5A5049', 'dry', .25);
    paint(rectPts(60, y, 1800, 62), { fill: '#26232C', fillOp: 70, ink: null });
  }
  inkLine([[150, 900], [1150, 250]], 9, '#8A7A64', 'ink', .05);
  for (let i = 0; i < 5; i++) inkLine([[240 + i * 180, 860 - i * 130], [246 + i * 180, 940 - i * 130]], 4, '#7A6A56', 'ink', .1);
  if (lightK > .02) {
    glow(1080, 170, 500 * lightK, '#FFE9B0', .8 * lightK);
    paint(ellPts(1080, 160, 60, 22, 16), { wash: '#FFF3CE', ink: '#4A4238', sw: 1.2 });
    paint([[1064, 180], [1096, 180], [1210, 1000], [830, 1000]], { fill: '#FFF0C2', fillOp: 40 * lightK, bleed: .6, ink: null });
  }
}

// A small-town bus station at dusk: canopy, timetable, bench.
function stStation(t, k = 1) {
  paint(rectPts(-200, -200, W + 400, 900), { fill: mixCol('#F3C79C', '#E7A97F', .5 * k), fillOp: 235, bleed: .4, tex: .5, ink: null });
  glow(1400, 300, 620, '#FFD08E', .65);
  paint(ellPts(1400, 320, 110, 110, 22), { wash: '#FBE0A6', ink: null });
  // canopy
  paint(rectPts(-120, 90, 1500, 60), { wash: '#C9B79A', ink: '#6E5F4E', sw: 2 });
  for (let i = 0; i < 4; i++) inkLine([[180 + i * 380, 150], [180 + i * 380, 780]], 12, '#B0A08A', 'ink', .05);
  // timetable board
  paint(rrPts(1060, 210, 220, 300, 6, 3), { wash: '#F6EFDF', ink: '#7E6E5C', sw: 1.6 });
  for (let i = 0; i < 5; i++) inkLine([[1090, 260 + i * 46], [1250, 256 + i * 46]], 3, '#B3A28C', 'dry', .3);
  // bench
  paint(rrPts(240, 700, 520, 34, 6, 3), { wash: '#B98F63', ink: '#6E5A44', sw: 1.6 });
  paint(rrPts(240, 830, 520, 30, 6, 3), { wash: '#B98F63', ink: '#6E5A44', sw: 1.6 });
  inkLine([[280, 734], [280, 830]], 8, '#8A6B4E', 'ink', .05);
  inkLine([[720, 734], [720, 830]], 8, '#8A6B4E', 'ink', .05);
  // ground
  paint(rectPts(-200, 860, W + 400, 400), { fill: '#A8967E', fillOp: 225, bleed: .3, tex: .4, ink: null });
  inkLine([[-100, 872], [1800, 864]], 3, '#8A7A64', 'dry', .3);
}

// A phone screen, drawn flat: used for the chat scenes.
function stPhone(cx, cy, w, o = {}) {
  const h = w * 1.9;
  sticker(rrPts(cx - w / 2, cy - h / 2, w, h, w * .12, 2), '#2E2A33', { sw: 1.6 });
  paint(rrPts(cx - w / 2 + w * .07, cy - h / 2 + w * .12, w * .86, h - w * .24, w * .05, 1), { wash: o.wall || '#EDE6DA', ink: null });
  const n = o.msgs || 3;
  for (let i = 0; i < n; i++) {
    const mine = i % 2 === 1, bw = w * (.34 + hash(i + 2) * .3);
    const bx = mine ? cx + w * .34 - bw : cx - w * .34;
    const by = cy - h * .3 + i * h * .16;
    paint(rrPts(bx, by, bw, h * .09, w * .04, 1), { wash: mine ? '#9BD0A0' : '#FFFFFF', ink: null });
  }
}

// Night classroom / corridor: dim the warm room down and light it with desk lamps.
function stNight(t, k = .62) {
  paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#3B4258', fillOp: 70 + 90 * k, bleed: .4, tex: .4, ink: null });
}

// Cinema: dark hall, rows of seats, the screen doing all the lighting.
function stCinema(t, glowK = 1) {
  paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#2B2E40', fillOp: 245, bleed: .3, tex: .4, ink: null });
  paint(rectPts(240, 80, 1440, 560), { fill: '#DCE6F2', fillOp: 210 * glowK, bleed: .5, tex: .3, ink: null });
  glow(960, 360, 760, '#BFD6EE', .45 * glowK);
  // seats in front, silhouettes
  for (let i = 0; i < 6; i++) {
    boilSeed('stCs' + i);
    paint(rrPts(60 + i * 320, 830, 280, 260, 40, 3), { fill: '#1F2233', fillOp: 235, ink: null });
  }
}

// Night street outside the cinema: cold, with breath in the air.
function stNightStreet(t) {
  paint(rectPts(-200, -200, W + 400, 900), { fill: '#2F3550', fillOp: 240, bleed: .4, tex: .4, ink: null });
  paint(rectPts(-200, 380, W + 400, 400), { fill: '#3D4566', fillOp: 200, bleed: .5, ink: null });
  for (let i = 0; i < 5; i++) {
    boilSeed('stNs' + i);
    const x = 90 + i * 340;
    paint(rectPts(x, 610, 230, 300), { wash: '#39405C', ink: '#22263A', sw: 1.2 });
    for (let k = 0; k < 3; k++) paint(rectPts(x + 28 + k * 66, 650, 36, 46), { wash: '#F6DCA8', washOp: 200, ink: null });
  }
  // lamp post
  inkLine([[1480, 900], [1480, 260]], 9, '#4A5170', 'ink', .05);
  glow(1480, 250, 380, '#FFE0A0', .55);
  paint(ellPts(1480, 250, 44, 26, 16), { wash: '#FFF0C8', ink: null });
  paint(rectPts(-200, 880, W + 400, 400), { fill: '#272C43', fillOp: 235, ink: null });
}

// A small bedroom at night: bed, window, phone light.
function stBedroom(t) {
  paint(rectPts(-200, -200, W + 400, H + 400), { fill: '#39405C', fillOp: 235, bleed: .3, tex: .4, ink: null });
  boilSeed('stBedW');
  paint(rectPts(1240, 130, 420, 380), { wash: '#2C3350', ink: '#1E2234', sw: 2 });
  glow(1450, 320, 260, '#9FB6D8', .45);
  paint(ellPts(1450, 240, 60, 60, 18), { wash: '#D8E4F0', washOp: 200, ink: null });
  // bed
  paint(rrPts(180, 620, 820, 300, 18, 3), { wash: '#5A6484', ink: '#2A2F44', sw: 1.6 });
  paint(rrPts(180, 560, 300, 120, 16, 2), { wash: '#7C87A6', ink: '#2A2F44', sw: 1.4 });
  paint(rectPts(-200, 880, W + 400, 400), { fill: '#2C3350', fillOp: 235, ink: null });
}

// A sheet of paper with handwriting, used for the QQ number and later for the letter.
function stNote(cx, cy, w, k, lines = 4) {
  boilSeed('stNote' + Math.round(cx));
  sticker(rrPts(cx - w / 2, cy - w * .34, w, w * .68, 4, 2), '#FBF6E8', { sw: 1.4 });
  for (let i = 0; i < lines; i++) {
    const y = cy - w * .2 + i * w * .14;
    inkLine([[cx - w * .38, y], [cx + w * .3 - i * w * .03, y - w * .01]], 2.2, '#8C7E6A', 'dry', .3);
  }
  if (k > 0) glow(cx, cy, w * 1.2, '#FFE9AE', .5 * k);
}

// A dark, out-of-focus foreground element: the cheapest depth a flat room can get.
function stForeground(t, side = 1) {
  const x = side > 0 ? W + 40 : -40;
  boilSeed('stFg' + side);
  paint([[x, 1080], [x - side * 280, 1080], [x - side * 360, 720], [x - side * 120, 690], [x, 740]],
    { fill: '#6B5B4A', fillOp: 60, bleed: .6, tex: .5, ink: null });
}
