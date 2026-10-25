// cast.js: PREVIEW ONLY — the Q-version model sheet, rendered as stills for approval.
// Not part of the finished film; swap studio.html back to scenes/summer.js when the cast is locked.
(() => {
  window.overlayHook = null;   // captions would cover the models on this sheet
  function stage(t) {
    paint(rectPts(-200, -200, W + 400, H + 400), { wash: '#F3EBDC', ink: null });
    paint(rectPts(-200, 880, W + 400, 400), { fill: '#DCC9A8', fillOp: 170, bleed: .3, tex: .4, ink: null });
    boilSeed('line');
    inkLine([[120, 890], [1800, 890]], 2, SK.wallDk, 'dry', .2);
    glow(1480, 240, 520, '#FFE9B0', .32);
  }
  // head centre sits at y - 7.9u; frame the bust a little low so the shoulders show
  function bust(x, y, u, o) {
    camBegin(x, y - u * 7.05, u / 52, 0);
    person(x, y, u, o);
    camEnd();
  }

  shots([
    [0.0, (t, lt) => { stage(t); person(430, 950, 88, { role: 'boy', face: faceAt(lt, [[0, 'calm']]) }); }],
    [1.0, (t, lt) => { stage(t); bust(430, 950, 130, { role: 'boy', face: faceAt(lt, [[0, 'calm']]) }); }],
    [2.0, (t, lt) => { stage(t); person(960, 950, 88, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]) }); }],
    [3.0, (t, lt) => { stage(t); bust(960, 950, 130, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]) }); }],
    [4.0, (t, lt) => { stage(t); bust(960, 950, 130, { role: 'girl', hat: 'bucket', view: .35, face: faceAt(lt, [[0, 'shy']]) }); }],
    [5.0, (t, lt) => { stage(t); person(1450, 950, 88, { role: 'liu', face: faceAt(lt, [[0, 'smug']]) }); }],
    [6.0, (t, lt) => { stage(t); person(1770, 950, 88, { role: 'teacher', face: faceAt(lt, [[0, 'neutral']]) }); }],
    [7.0, (t, lt) => {
      stage(t);
      person(560, 950, 78, { role: 'boy', face: faceAt(lt, [[0, 'wonder']]) });
      person(960, 950, 78, { role: 'liu', face: faceAt(lt, [[0, 'sly']]) });
      person(1360, 950, 78, { role: 'girl', hat: 'bucket', face: faceAt(lt, [[0, 'calm']]) });
    }]
  ]);
})();
