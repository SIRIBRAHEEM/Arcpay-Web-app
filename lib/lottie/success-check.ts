const successCheckAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 240,
  h: 240,
  nm: "ArcPay Success Check",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Glow Circle",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0] }, { t: 24, s: [45] }, { t: 120, s: [12] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [120, 120, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [30, 30, 100] }, { t: 40, s: [118, 118, 100] }, { t: 120, s: [130, 130, 100] }] }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [140, 140] },
          nm: "Circle Path"
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.125, 0.835, 0.624, 1] },
          o: { a: 0, k: 100 },
          nm: "Fill"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Checkmark",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [120, 122, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              i: [[0, 0], [0, 0], [0, 0]],
              o: [[0, 0], [0, 0], [0, 0]],
              v: [[-42, 0], [-12, 30], [48, -38]],
              c: false
            }
          },
          nm: "Check Path"
        },
        {
          ty: "st",
          c: { a: 0, k: [1, 1, 1, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 14 },
          lc: 2,
          lj: 2,
          nm: "Stroke"
        },
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: { a: 1, k: [{ t: 18, s: [0] }, { t: 52, s: [100] }] },
          o: { a: 0, k: 0 },
          nm: "Trim"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ]
};

export default successCheckAnimation;
