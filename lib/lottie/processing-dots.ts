const processingDotsAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 240,
  h: 120,
  nm: "ArcPay Processing Dots",
  ddd: 0,
  assets: [],
  layers: [0, 1, 2].map((index) => ({
    ddd: 0,
    ind: index + 1,
    ty: 4,
    nm: `Dot ${index + 1}`,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          { t: index * 10, s: [30] },
          { t: 24 + index * 10, s: [100] },
          { t: 56 + index * 10, s: [30] },
          { t: 120, s: [30] }
        ]
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [80 + index * 40, 60, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { t: index * 10, s: [70, 70, 100] },
          { t: 24 + index * 10, s: [118, 118, 100] },
          { t: 56 + index * 10, s: [70, 70, 100] },
          { t: 120, s: [70, 70, 100] }
        ]
      }
    },
    shapes: [
      {
        ty: "el",
        p: { a: 0, k: [0, 0] },
        s: { a: 0, k: [18, 18] },
        nm: "Dot Path"
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
  }))
};

export default processingDotsAnimation;
