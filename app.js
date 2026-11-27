/* CozyNest Home — classroom-only ecommerce simulation.
   Firebase sends only explicitly opted-in practice text (letters/spaces) and
   anonymous section completion counts. Real checkout field values are never sent.
   No analytics, hidden keylogging, or payment processing. */
(() => {
  'use strict';
  // Classroom demo is activated only by the explicitly labeled class invitation link.
  // No opt-in means no Firebase checkout module is loaded on the public storefront.
  const classroomSessionKey = 'cozynest-classroom-opt-in-v1';
  const classroomSessionTTL = 60 * 60 * 1000; // 1 hour in this browser tab.
  const classroomSessionActive = () => {
    try {
      const started = Number(sessionStorage.getItem(classroomSessionKey));
      return Number.isFinite(started) && started > 0 &&
        Date.now() >= started && Date.now() - started < classroomSessionTTL;
    } catch { return false; }
  };
  // The invitation URL itself is the opt-in action. Share it with a clear label
  // explaining that fictional practice entries are sent to the presenter live.
  if (document.body.dataset.page === 'home' &&
      new URLSearchParams(location.search).get('classroom') === 'live-practice') {
    try { sessionStorage.setItem(classroomSessionKey, String(Date.now())); } catch {}
  }
  const products = [{
    id:'european-linen-cotton-stitch-quilt',
    name:'European Linen Cotton Stitch Quilt', type:'quilt', color:'Natural',
    price:129, old:235, sale:true, rating:4.9, reviews:'2,846', writtenReviewCount:118,
    filterMaterial:'linen-cotton', quiltType:'stitched', pattern:'textured',
    image:'european-linen-natural-folded.jpg',
    gallery:[
      'european-linen-natural-folded.jpg',
      'european-linen-natural-bedroom-side.jpg',
      'european-linen-natural-bedroom-front.jpg',
      'european-linen-natural-pillows.jpg'
    ],
    galleries:{
      'Natural':[
        'european-linen-natural-folded.jpg',
        'european-linen-natural-bedroom-side.jpg',
        'european-linen-natural-bedroom-front.jpg',
        'european-linen-natural-pillows.jpg'
      ],
      'Orchid':[
        'european-linen-orchid-folded.png',
        'european-linen-orchid-bedroom-side.png',
        'european-linen-orchid-pillows.png',
        'european-linen-orchid-bedroom-front.png'
      ],
      'Pine':[
        'european-linen-pine-folded.png',
        'european-linen-pine-bedroom-side.png',
        'european-linen-pine-bedroom-front.png',
        'european-linen-pine-pillows.png'
      ]
    },
    variantImages:{
      'Natural':'european-linen-natural-folded.jpg',
      'Orchid':'european-linen-orchid-folded.png',
      'Pine':'european-linen-pine-folded.png'
    },
    sizePrices:{'Twin':129,'Full/Queen':139,'King':159},
    sizeOriginalPrices:{'Twin':235,'Full/Queen':267,'King':325},
    swatches:['#d9d4c8','#c9b0be','#485b4a'],
    intro:'A relaxed quilted bedding layer with soft, dimensional stitching. Choose Natural, softly muted Orchid, or deep green Pine for a cozy, layered look.',
    features:['Subtle stitched texture','Natural, Orchid, and Pine colorways','Three size options','Coordinated look for layered bedding'],
    material:'Linen/cotton composition — exact fabric details to be confirmed',
    care:'Follow the product care label. Full care instructions to be confirmed.',
    sizes:{'Twin':'Dimensions coming soon','Full/Queen':'Dimensions coming soon','King':'Dimensions coming soon'}
  },{
    id:'organic-cotton-jacquard-floral-sham-set',
    name:'Organic Cotton Jacquard Floral Sham Set', type:'sham', color:'Floral',
    price:25, old:38.46, sale:true, rating:4.7, reviews:'156', writtenReviewCount:22,
    filterMaterial:'organic-cotton', quiltType:'jacquard', pattern:'jacquard',
    image:'organic-cotton-jacquard-floral-sham-set-floral-room-close.png',
    gallery:[
      'organic-cotton-jacquard-floral-sham-set-floral-room-close.png',
      'organic-cotton-jacquard-floral-sham-set-floral-stack.png',
      'organic-cotton-jacquard-floral-sham-set-floral-room-front.png',
      'organic-cotton-jacquard-floral-sham-set-floral-detail.png'
    ],
    galleries:{
      'Floral':[
        'organic-cotton-jacquard-floral-sham-set-floral-room-close.png',
        'organic-cotton-jacquard-floral-sham-set-floral-stack.png',
        'organic-cotton-jacquard-floral-sham-set-floral-room-front.png',
        'organic-cotton-jacquard-floral-sham-set-floral-detail.png'
      ],
      'Geometric':[
        'organic-cotton-jacquard-floral-sham-set-geometric-room-close.png',
        'organic-cotton-jacquard-floral-sham-set-geometric-stack.png',
        'organic-cotton-jacquard-floral-sham-set-geometric-room-front.png',
        'organic-cotton-jacquard-floral-sham-set-geometric-detail.png'
      ]
    },
    variantImages:{
      'Floral':'organic-cotton-jacquard-floral-sham-set-floral-room-close.png',
      'Geometric':'organic-cotton-jacquard-floral-sham-set-geometric-room-close.png'
    },
    sizePrices:{'Standard':25,'King':40},
    sizeOriginalPrices:{'Standard':38.46,'King':61.54},
    swatches:['#6a7897','#b6b09f'],
    intro:'A soft organic cotton jacquard sham set with two pattern options: Floral and Geometric. Both styles bring subtle texture and an easy layered look to the bed.',
    features:['Organic cotton jacquard sham set','Two pattern options: Floral and Geometric','Available in Standard and King sizes','Designed to coordinate with neutral bedding'],
    material:'Organic cotton jacquard — exact fabric details to be confirmed',
    care:'Follow the product care label. Full care instructions to be confirmed.',
    sizes:{'Standard':'Dimensions coming soon','King':'Dimensions coming soon'}

  }];

  const colorPalettes = {
  "european-linen-cotton-stitch-quilt": [
    ["Natural", "#d9d4c8"],
    ["Orchid", "#c9b0be"],
    ["Pine", "#485b4a"]
  ],
  "thermasoft": [
    [
      "Ivory",
      "#efe8dc"
    ],
    [
      "Slate",
      "#647487"
    ],
    [
      "Sage",
      "#99a792"
    ],
    [
      "Mocha",
      "#998474"
    ]
  ],
  "haven-quilt": [
    [
      "Olive",
      "#788364"
    ],
    [
      "Sand",
      "#c8b6a1"
    ],
    [
      "Ivory",
      "#ece3d5"
    ],
    [
      "Slate",
      "#778591"
    ]
  ],
  "cloudloft": [
    [
      "Ivory",
      "#f0e5d6"
    ],
    [
      "Rose",
      "#c28c99"
    ],
    [
      "Sage",
      "#98a68e"
    ],
    [
      "Slate",
      "#748191"
    ]
  ],
  "willow-coverlet": [
    [
      "Ivory",
      "#e4d8c9"
    ],
    [
      "Sand",
      "#c0a98f"
    ],
    [
      "Sage",
      "#91a28d"
    ],
    [
      "Slate",
      "#637587"
    ]
  ],
  "ultraplush": [
    [
      "Charcoal",
      "#48464b"
    ],
    [
      "Mocha",
      "#997e71"
    ],
    [
      "Ivory",
      "#e0d9ce"
    ],
    [
      "Navy",
      "#4c5972"
    ]
  ],
  "meadow-bloom": [
    [
      "Floral",
      "#d9c7b0"
    ],
    [
      "Sage",
      "#9ba98d"
    ],
    [
      "Oatmeal",
      "#caba9e"
    ],
    [
      "Blush",
      "#bd9295"
    ]
  ],
  "knitluxe": [
    [
      "Rose",
      "#bc858e"
    ],
    [
      "Ivory",
      "#e6dfd1"
    ],
    [
      "Sage",
      "#9bab98"
    ],
    [
      "Charcoal",
      "#555257"
    ]
  ],
  "evercozy": [
    [
      "Ivory",
      "#eadfd3"
    ],
    [
      "Sand",
      "#c8b59f"
    ],
    [
      "Sage",
      "#9eab96"
    ],
    [
      "Slate",
      "#718194"
    ]
  ],
  "fireside": [
    [
      "Slate",
      "#607180"
    ],
    [
      "Ivory",
      "#e9e1d5"
    ],
    [
      "Sage",
      "#95a58c"
    ],
    [
      "Rose",
      "#b78c91"
    ]
  ],
  "aurora": [
    [
      "Sage",
      "#8fa28b"
    ],
    [
      "Ivory",
      "#e6ddce"
    ],
    [
      "Rose",
      "#c79ea7"
    ],
    [
      "Charcoal",
      "#5e5f64"
    ]
  ],
  "cedar-ridge": [
    [
      "Sand",
      "#c7b49d"
    ],
    [
      "Sage",
      "#919b82"
    ],
    [
      "Ivory",
      "#e9e2d5"
    ],
    [
      "Slate",
      "#728292"
    ]
  ],
  "aspen": [
    [
      "Mocha",
      "#a58774"
    ],
    [
      "Ivory",
      "#eae0d4"
    ],
    [
      "Slate",
      "#7d8998"
    ],
    [
      "Charcoal",
      "#4a494f"
    ]
  ],
  "harbor": [
    [
      "Slate",
      "#64768a"
    ],
    [
      "Ivory",
      "#e7dccd"
    ],
    [
      "Sage",
      "#99a99a"
    ],
    [
      "Sand",
      "#c4b29d"
    ]
  ],
  "briar": [
    [
      "Sage",
      "#8d9a83"
    ],
    [
      "Oatmeal",
      "#cdbfa8"
    ],
    [
      "Blush",
      "#c59796"
    ],
    [
      "Ivory",
      "#eae0d4"
    ]
  ],
  "rosewood": [
    [
      "Ivory",
      "#e6dfd1"
    ],
    [
      "Rose",
      "#ba8a91"
    ],
    [
      "Sage",
      "#a0ad98"
    ],
    [
      "Slate",
      "#748092"
    ]
  ],
  "luna": [
    [
      "Slate",
      "#7f8c99"
    ],
    [
      "Ivory",
      "#e6ded3"
    ],
    [
      "Sage",
      "#9dab98"
    ],
    [
      "Sand",
      "#c7b8aa"
    ]
  ],
  "alpine-shams": [
    [
      "Ivory",
      "#e7dccf"
    ],
    [
      "Sand",
      "#c9b79f"
    ],
    [
      "Sage",
      "#a0aa97"
    ],
    [
      "Slate",
      "#798799"
    ]
  ],
  "organic-cotton-jacquard-floral-sham-set": [
    [
      "Floral",
      "#6a7897"
    ],
    [
      "Geometric",
      "#b6b09f"
    ]
  ]
};
  const colorSlug = str => str.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  products.forEach(p => {
    p.colors=(colorPalettes[p.id]||[[p.color,'#e5ddd2']]).map(([name,hex])=>({
      name,
      hex,
      image:p.variantImages?.[name] || p.image,
      gallery:p.galleries?.[name] || p.gallery || [p.image]
    }));
    p.old = {"thermasoft": 299, "haven-quilt": 279, "cloudloft": 139, "willow-coverlet": 259, "ultraplush": 399, "meadow-bloom": 289, "knitluxe": 119, "evercozy": 429}[p.id] || p.old;
    // Keep a mix of sale prices and regular prices so the Deals filter is meaningful.
    const saleIds=['european-linen-cotton-stitch-quilt','organic-cotton-jacquard-floral-sham-set','thermasoft','cloudloft','ultraplush','knitluxe','evercozy','fireside','aurora','aspen','harbor','rosewood','luna'];
    if (!saleIds.includes(p.id)) p.old = null;
    p.sale = typeof p.old === 'number' && p.old > p.price;
  });
  // Fictional examples for a classroom demo. No visitors can submit reviews.
  const sampleReviews = {
  "thermasoft": [
    {
      "name": "Maya R.",
      "date": "2026-11-11",
      "stars": 5,
      "title": "Warm without feeling heavy",
      "body": "The fabric feels soft and the heat spreads evenly across the blanket. I mostly use the middle setting when reading at night. The controller is straightforward."
    },
    {
      "name": "Jordan T.",
      "date": "2026-10-27",
      "stars": 4,
      "title": "Nice for cold evenings",
      "body": "It heats up well and the ivory color looks good on my bed. I wish the controller cord were slightly longer, but overall I like it."
    },
    {
      "name": "Elena P.",
      "date": "2026-10-14",
      "stars": 5,
      "title": "A cozy upgrade",
      "body": "The channel stitching looks neat and the blanket has a good weight to it. It has become the first thing I reach for when the temperature drops."
    },
    {
      "name": "Chris M.",
      "date": "2026-09-29",
      "stars": 3,
      "title": "Soft, but consider the size",
      "body": "The fabric is comfortable, but the throw size was smaller than I expected for sharing on the couch. Check the measurements before choosing."
    },
    {
      "name": "Taylor W.",
      "date": "2026-09-11",
      "stars": 4,
      "title": "Easy to care for",
      "body": "I followed the washing instructions and it came out looking good. Detaching the controller takes a moment, so I would read the care label first."
    }
  ],
  "haven-quilt": [
    {
      "name": "Avery K.",
      "date": "2026-11-09",
      "stars": 5,
      "title": "Great for layering",
      "body": "The olive color is muted and works well with cream sheets. It adds texture without making the bed look bulky."
    },
    {
      "name": "Morgan L.",
      "date": "2026-10-20",
      "stars": 4,
      "title": "Lightweight and comfortable",
      "body": "The stitching looks tidy and the quilt feels good for mild weather. In the winter I would add another blanket."
    },
    {
      "name": "Riley D.",
      "date": "2026-10-04",
      "stars": 5,
      "title": "Just the style I wanted",
      "body": "The square pattern is subtle in person. I like that the set includes shams, so the bed looks coordinated."
    },
    {
      "name": "Sam H.",
      "date": "2026-09-19",
      "stars": 3,
      "title": "Color is a little different",
      "body": "The quilt feels nice, but the green was slightly grayer than it appeared on my screen. I would recommend checking swatches."
    },
    {
      "name": "Casey N.",
      "date": "2026-09-02",
      "stars": 4,
      "title": "Good everyday quilt",
      "body": "It washes well on a gentle cycle and folds easily. A nice lightweight option for a guest room."
    }
  ],
  "cloudloft": [
    {
      "name": "Jamie S.",
      "date": "2026-11-13",
      "stars": 5,
      "title": "Very soft throw",
      "body": "The fluffy texture is the standout feature. It feels warm and comfortable on the couch, even before the heating is turned on."
    },
    {
      "name": "Dana P.",
      "date": "2026-10-28",
      "stars": 5,
      "title": "A good gift idea",
      "body": "The size is right for one person and the neutral color fits most rooms. I would happily give one as a winter gift."
    },
    {
      "name": "Alex G.",
      "date": "2026-10-12",
      "stars": 4,
      "title": "Cozy, with one small issue",
      "body": "It gets comfortably warm and feels plush. The controller is easy to use, but I wish it had a brighter display."
    },
    {
      "name": "Leslie B.",
      "date": "2026-09-24",
      "stars": 3,
      "title": "Great texture, small size",
      "body": "Really comfortable fabric, though the throw is best for one person. I expected a little more coverage."
    },
    {
      "name": "Quinn F.",
      "date": "2026-09-05",
      "stars": 5,
      "title": "My reading chair favorite",
      "body": "I keep it folded by my chair. The fabric is soft against bare arms and has a pleasant weight."
    }
  ],
  "willow-coverlet": [
    {
      "name": "Noah C.",
      "date": "2026-11-08",
      "stars": 5,
      "title": "Clean and simple look",
      "body": "The texture gives the bed some dimension without a bold pattern. I paired it with darker pillowcases."
    },
    {
      "name": "Pat R.",
      "date": "2026-10-22",
      "stars": 4,
      "title": "Works well in warmer months",
      "body": "This is lighter than my comforter and easy to layer. The color is a little warmer than I expected."
    },
    {
      "name": "Drew S.",
      "date": "2026-10-02",
      "stars": 5,
      "title": "Nice finish on the edges",
      "body": "The stitching is tidy and the coverlet drapes well at the foot of the bed. I like the understated style."
    },
    {
      "name": "Robin J.",
      "date": "2026-09-20",
      "stars": 3,
      "title": "Check the dimensions",
      "body": "The quality is fine, but I wanted more overhang on the sides. I would size up if you like a longer drape."
    },
    {
      "name": "Frankie L.",
      "date": "2026-09-03",
      "stars": 4,
      "title": "Good guest room option",
      "body": "It gives the room a put-together look and does not feel too heavy. Easy to fold and store."
    }
  ],
  "ultraplush": [
    {
      "name": "Emerson V.",
      "date": "2026-11-12",
      "stars": 5,
      "title": "Warm and thick",
      "body": "The plush fabric has a noticeably thicker feel than my old blanket. Great for evenings when the house is cold."
    },
    {
      "name": "Sydney Q.",
      "date": "2026-10-26",
      "stars": 4,
      "title": "Cozy but a little bulky",
      "body": "It feels luxurious and warm, although it takes more room in the closet than a lighter throw."
    },
    {
      "name": "Parker T.",
      "date": "2026-10-09",
      "stars": 5,
      "title": "Love the charcoal color",
      "body": "The dark gray looks great with neutral bedding. The softness was exactly what I hoped for."
    },
    {
      "name": "Hayden M.",
      "date": "2026-09-21",
      "stars": 3,
      "title": "Check the weight first",
      "body": "The warmth is nice, but I prefer a lighter blanket. If you like heavy plush layers you may enjoy it more."
    },
    {
      "name": "Jesse B.",
      "date": "2026-09-07",
      "stars": 4,
      "title": "Comfortable for colder nights",
      "body": "The controller is simple to figure out and the blanket is soft. I would like more color options."
    }
  ],
  "meadow-bloom": [
    {
      "name": "Blair A.",
      "date": "2026-11-10",
      "stars": 5,
      "title": "Pretty floral pattern",
      "body": "The botanical print is subtle rather than busy. It brightened my bedroom without overpowering the furniture."
    },
    {
      "name": "Terry E.",
      "date": "2026-10-23",
      "stars": 4,
      "title": "Nice lightweight quilt",
      "body": "The set looks coordinated and feels comfortable. It is better as a top layer than a heavy winter blanket."
    },
    {
      "name": "Kim N.",
      "date": "2026-10-06",
      "stars": 5,
      "title": "Lovely neutral colors",
      "body": "The cream and floral colors look soft in daylight. The matching shams were a nice touch."
    },
    {
      "name": "Reese O.",
      "date": "2026-09-16",
      "stars": 3,
      "title": "Pattern scale surprised me",
      "body": "The print looked smaller in the photos. The fabric is comfortable, but I would zoom in on the pattern next time."
    },
    {
      "name": "Finley W.",
      "date": "2026-09-04",
      "stars": 4,
      "title": "Easy to style",
      "body": "Looks good with simple bedding and throws. I washed it once on gentle and it kept its shape."
    }
  ],
  "knitluxe": [
    {
      "name": "Harper M.",
      "date": "2026-11-14",
      "stars": 5,
      "title": "Love the rose color",
      "body": "The dusty pink looks warm and inviting on my cream chair. It is soft and looks nice when draped over the arm."
    },
    {
      "name": "Cameron S.",
      "date": "2026-10-30",
      "stars": 4,
      "title": "Soft and stylish",
      "body": "It adds a cozy touch to the living room. The fringe is pretty, but it can get caught if you are not careful."
    },
    {
      "name": "Lee P.",
      "date": "2026-10-11",
      "stars": 5,
      "title": "Looks more expensive than it is",
      "body": "The knit-look texture is convincing and the throw feels comfortable. It was a nice little refresh for my couch."
    },
    {
      "name": "Jules D.",
      "date": "2026-09-28",
      "stars": 3,
      "title": "A bit smaller than expected",
      "body": "The color and texture are lovely, but it works better as a lap blanket than something to fully wrap up in."
    },
    {
      "name": "Skyler R.",
      "date": "2026-09-09",
      "stars": 4,
      "title": "Good for relaxing",
      "body": "The fabric feels soft against my skin. I would love a slightly larger option in the same color."
    }
  ],
  "evercozy": [
    {
      "name": "Ari H.",
      "date": "2026-11-07",
      "stars": 5,
      "title": "A thoughtful gift set",
      "body": "I liked having the coordinating pieces together. The neutral palette makes it easy to style a room."
    },
    {
      "name": "Charlie P.",
      "date": "2026-10-25",
      "stars": 4,
      "title": "Convenient bundle",
      "body": "The quilt and shams match well. I recommend reading the dimensions because the blanket and quilt have different sizing."
    },
    {
      "name": "Bailey J.",
      "date": "2026-10-08",
      "stars": 5,
      "title": "Everything works together",
      "body": "The bedding layers look cohesive without trying too hard. A handy choice when refreshing a guest room."
    },
    {
      "name": "Milan F.",
      "date": "2026-09-23",
      "stars": 3,
      "title": "Good set, lots of packaging",
      "body": "The pieces look nice together, but I wish the packaging had been simpler. I would also appreciate more color combinations."
    },
    {
      "name": "Devon L.",
      "date": "2026-09-01",
      "stars": 4,
      "title": "Nice coordinated look",
      "body": "A practical way to get a matching room setup. The blanket feels plush and the quilt is lighter."
    }
  ]
};


  // Sample comments for additional products (not submitted by customers).
  const reviewSeeds = {
    "fireside": [["Comfortable addition", "The fireside luxe heated blanket looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the slate color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "aurora": [["Comfortable addition", "The aurora sherpa heated throw looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the sage color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "cedar-ridge": [["Comfortable addition", "The cedar ridge quilted bedspread looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the sand color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "aspen": [["Comfortable addition", "The aspen plush heated blanket looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the mocha color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "harbor": [["Comfortable addition", "The harbor waffle coverlet set looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the slate color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "briar": [["Comfortable addition", "The briar garden floral quilt looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the sage color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "rosewood": [["Comfortable addition", "The rosewood chunky knit throw looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the ivory color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "luna": [["Comfortable addition", "The luna cozy bedding bundle looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the slate color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
    "alpine-shams": [["Comfortable addition", "The alpine quilted pillow sham pair looks cozy and pairs well with neutral bedding."], ["Nice details", "I like the ivory color. The description made it easy to understand the sizes."], ["Worth checking measurements", "The texture is soft, but I would double-check the dimensions before choosing a size."]],
  };
  Object.entries(reviewSeeds).forEach(([id,items])=>{
    sampleReviews[id] = items.map(([title,body],i)=>({
      name:['Alex P.','Morgan R.','Jamie S.'][i],
      date:['2026-11-04','2026-10-11','2026-09-18'][i],
      stars:[5,4,3][i],title,body
    }));
  });
  // Classroom sample data: the metric totals are illustrative, not verified customer ratings.
  // Every detailed comment below is generated locally for this static training storefront.
  const ratingMetrics = {
    'european-linen-cotton-stitch-quilt':2846,
    'thermasoft':2537, 'haven-quilt':1320, 'cloudloft':3014,
    'willow-coverlet':986, 'ultraplush':1941, 'meadow-bloom':743,
    'knitluxe':1276, 'evercozy':428, 'fireside':2246,
    'aurora':684, 'cedar-ridge':585, 'aspen':1189,
    'harbor':376, 'briar':712, 'rosewood':498,
    'luna':1437, 'alpine-shams':284,
    'organic-cotton-jacquard-floral-sham-set':156
  };
  const reviewNames = [
    'Alex','Avery','Blair','Cameron','Casey','Charlie','Dakota','Dana','Drew','Eden',
    'Ellis','Emery','Finley','Frankie','Harper','Hayden','Jamie','Jesse','Jordan','Kai',
    'Kelly','Kendall','Lane','Logan','Marlowe','Morgan','Nico','Parker','Quinn','Reese',
    'Remy','Riley','Robin','Rowan','Sage','Sam','Shiloh','Skyler','Taylor','Terry'
  ];
  const reviewTitles = {
    5:['Super cozy','Exactly the texture I wanted','Lovely color and finish','Great addition to the room','Comfortable and attractive','Better than expected','Happy with the size','A cozy favorite'],
    4:['Very nice, one small detail','Good for everyday use','Pretty and practical','Soft with a minor caveat','Nice quality for the price','Looks great on the bed','Would consider another color','A solid choice'],
    3:['A few things to consider','Check the measurements','Color looks different in person','Comfortable but not perfect','Mixed feelings about the fit','Good enough for occasional use'],
    2:['Not quite the right fit','I expected a different feel','Not ideal for my space','Would choose a different size'],
    1:['Not what I was looking for','Did not suit my needs']
  };
  const reviewOpeners = {
    5:['I really like the finish on this piece.','The texture feels nice and looks thoughtful.','It makes the room feel much cozier.','I was pleasantly surprised by how soft the fabric feels.','The styling fits my room better than I expected.','The material has a comfortable feel.','I like the way the stitching looks up close.','The fabric and shape work well with my other bedding.'],
    4:['Overall I like the fabric and finish.','It looks good in the room and feels comfortable.','The color works well with my bedding.','I am pleased with the texture overall.','The design is attractive without being too busy.','It feels cozy and the stitching is neat.','A practical piece with a nice soft finish.','It is a good match for my everyday bedding.'],
    3:['The material is comfortable, but I have some reservations.','It looks nice from a distance, though some details surprised me.','The texture is softer than expected, but the fit is not ideal.','The color is pleasant, although it differs a bit from the photo.','I like the basic design, but would check measurements carefully.','This one works fine, though it was not quite what I pictured.'],
    2:['The piece did not fit my setup as well as I expected.','I wanted to like the texture more than I did.','The shade was not quite what I had in mind.','The dimensions felt awkward for my space.'],
    1:['The design simply was not right for my room.','It did not match the fabric feel I was looking for.']
  };
  const reviewDetail = {
    heated:[
      'The lower heat setting seems useful for chilly evenings.','The controller location is easy to find while relaxing.','I would plan where the power cord goes before putting it on the bed.','It has a substantial feel without looking bulky.','I like the quilted texture on top of plain sheets.','The fabric feels pleasant against a light cotton sheet.','The controller takes a little space next to the bed.','The cord placement is worth checking before ordering.','It is a nice option for reading in the evening.','I would check the size chart before buying for a shared bed.'
    ],
    throw:[
      'The drape works well on the back of my couch.','The throw size is comfortable for one person.','The texture adds interest to a simple armchair.','I prefer a larger throw when two people share the couch.','It folds easily when not in use.','The soft finish is the part I like most.','The edges look nicely finished.','It looks good layered with neutral cushions.','I like it as an extra layer on cooler evenings.','I would check the throw dimensions before ordering.'
    ],
    quilt:[
      'The stitching gives the bed a tidy look.','It is light enough to use as an extra layer.','The pattern is subtle next to plain pillowcases.','I would add a thicker blanket for colder nights.','The matching shams give the bed a finished look.','The quilt folds nicely at the foot of the bed.','The texture is pretty without being too bold.','It is worth checking the measurements for a deep mattress.','The fabric works with several neutral colors.','The cover feels easy to layer with other bedding.'
    ],
    coverlet:[
      'The texture looks especially good in natural light.','It gives the bed a clean and simple finish.','The coverlet is best as a light layer.','I would use a thicker blanket underneath in winter.','The subtle pattern adds dimension without extra color.','The edges look neat when tucked in.','It is easy to coordinate with other pillow colors.','The fit depends on how much overhang you like.','I like the way it looks folded at the foot of the bed.','The fabric is lighter than a heavy quilt.'
    ],
    gift:[
      'The coordinated pieces make styling easier.','The colors look good together on the bed.','It is helpful to have the matching shams included.','I would double-check exactly which pieces come with the set.','It gives the room a pulled-together look.','The layers are easy to mix with existing sheets.','I like the soft neutral color choices.','The bundle works especially well for a guest bedroom.','It is worth comparing the bundle sizes.','The textures complement each other nicely.'
    ],
    sham:[
      'The stitched fabric gives pillows a finished look.','I would measure the pillow inserts first.','The texture pairs nicely with plain bedding.','The seams look tidy around the edges.','The color is easy to match with neutral sheets.','The covers work best with a full pillow insert.','I like the understated quilted pattern.','The set makes the bed look more coordinated.','The material is soft enough for a decorative sham.','Check the dimensions before choosing king size.'
    ]
  };
  const reviewEndings = [
    'I would compare the available sizes first.',
    'The neutral colors are easy to work with.',
    'It pairs nicely with the rest of my bedding.',
    'I appreciate the simple styling.',
    'The shape and texture make a difference.',
    'I would look closely at the color swatches.',
    'I like that the design is not too fussy.',
    'The proportions worked well in my room.',
    'It feels more like an everyday piece than a special-occasion one.',
    'I would read the care instructions before washing.'
  ];
  const commentStars = (i,p,productIndex) => {
    // Deterministic ratings weighted to the illustrated product average.
    const roll=((i*37+productIndex*17)%100)/100;
    const low1=.004,low2=.008,low3=(5-p.rating)*.1;
    const five=(p.rating-4)+low3+2*low2+3*low1;
    if(roll<five)return 5;
    if(roll<1-low1-low2-low3)return 4;
    if(roll<1-low1-low2)return 3;
    if(roll<1-low1)return 2;
    return 1;
  };
  products.forEach((p, productIndex) => {
    const records=sampleReviews[p.id]||[];
    const target=p.writtenReviewCount||(ratingMetrics[p.id]>=1000?100:50);
    const detail=reviewDetail[p.type]||reviewDetail.quilt;
    for(let i=records.length;i<target;i++){
      const stars=commentStars(i,p,productIndex);
      const titles=reviewTitles[stars];
      const openers=reviewOpeners[stars];
      const day=new Date(Date.UTC(2026,10,19)-(i*2+productIndex)*86400000);
      const first=reviewNames[(i*13+productIndex*3)%reviewNames.length];
      const initial=String.fromCharCode(65+((i*7+productIndex*5)%26));
      const shade=p.colors[(i+productIndex)%p.colors.length].name;
      const opener=openers[(i*3+Math.floor(i/6)+productIndex)%openers.length];
      const specific=detail[(i*7+Math.floor(i/12)+productIndex)%detail.length];
      const ending=reviewEndings[(i*9+Math.floor(i/8)+productIndex)%reviewEndings.length];
      records.push({
        name:`${first} ${initial}.`,
        date:day.toISOString().slice(0,10),
        stars,
        title:titles[(i*5+productIndex)%titles.length],
        body:`${opener} I chose ${shade} for the ${p.name.toLowerCase()}. ${specific} ${ending}`
      });
    }
    sampleReviews[p.id]=records;
  });
  // Generate a synthetic distribution matching the published sample mean, not real purchases.
  const ratingBreakdown = p => {
    const total=ratingMetrics[p.id];
    const c1=Math.round(total*.004),c2=Math.round(total*.008);
    const c3=Math.round(total*(5-p.rating)*.1);
    const c5=Math.round(total*(p.rating-4)+(c3+2*c2+3*c1));
    const c4=Math.max(0,total-c1-c2-c3-c5);
    return [c5,c4,c3,c2,c1].map((count,i)=>({stars:5-i,count}));
  };
  const ratingFor = p => Number(p.rating).toFixed(1);
  const ratingText = p => `${ratingMetrics[p.id].toLocaleString('en-US')} ratings · ${sampleReviews[p.id].length} comments`;

  const byId = Object.fromEntries(products.map(p=>[p.id,p]));
  const key='cozynest-demo-cart-v1', wishKey='cozynest-demo-faves-v1';
  const money=n=>'$'+n.toFixed(2);
  const priceFor=(p,size,shamSet='without')=>(p.sizePrices?.[size] ?? p.price)+(p.id==='european-linen-cotton-stitch-quilt'&&shamSet==='with'?30:0);
  const originalFor=(p,size,shamSet='without')=>(p.sizeOriginalPrices?.[size] ?? p.old)+(p.id==='european-linen-cotton-stitch-quilt'&&shamSet==='with'?30:0);
  const load=(k,fallback)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??fallback}catch{return fallback}};
  const cart=()=>load(key,[]).filter(c=>byId[c.id]&&c.qty>0&&c.qty<=99);
  const saveCart=arr=>{localStorage.setItem(key,JSON.stringify(arr));renderCount()};
  const favorites=()=>load(wishKey,[]);
  const renderCount=()=>document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=String(cart().reduce((n,c)=>n+c.qty,0)));
  const html = s=>s; // Products are static, not user-supplied HTML.
  const toast = msg=>{document.querySelector('.toast')?.remove();const e=document.createElement('div');e.className='toast';e.role='status';e.textContent=msg;document.body.append(e);setTimeout(()=>e.remove(),2700)};
  const siteHeader=()=>{document.querySelector('#site-header').innerHTML=`<div class="promo">Soft layers. Cozy spaces. &nbsp; ✦ &nbsp; Some favorites are on sale now!</div><div class="safety"><header class="header"><a href="index.html" class="logo" aria-label="CozyNest Home">⌂ <span>CozyNest Home</span></a><nav class="nav" aria-label="Main navigation"><a href="index.html">New Arrivals</a><a href="index.html?sort=rating">Best Sellers</a><a href="index.html?category=heated">Heated Blankets</a><a href="index.html?category=quilt">Quilts</a><a href="index.html?category=throw">Throws</a><a href="index.html?category=coverlet">Bedroom</a><a href="index.html?category=gift">Gifts</a><a href="index.html?deals=sale" class="sale-link">On Sale</a></nav><div class="actions"><form id="header-search" role="search" class="searchbar"><span aria-hidden="true">⌕</span><input id="search-input" aria-label="Search products" type="search" placeholder="Search cozy bedding..."></form><a class="iconlink" href="cart.html" title="Shopping bag" aria-label="Shopping bag"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.6 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg><span class="counter" data-cart-count>0</span></a></div></header><hr class="divider">`;
    document.querySelector('#header-search').addEventListener('submit',e=>{e.preventDefault();const q=document.querySelector('#search-input').value.trim();window.location.href='index.html?search='+encodeURIComponent(q)});
    renderCount();
  };
  const siteFooter=()=>document.querySelector('#site-footer').innerHTML=`<footer class="footer"><div class="footer-inner"><div class="footer-item"><span class="footer-icon">☎</span><div><strong>Phone</strong><br>(402) 555-0187<br>(402) 555-0142</div></div><div class="footer-item"><span class="footer-icon">◷</span><div><strong>Store Hours</strong><br>Mon–Fri 9 AM–7 PM<br>Sat 10 AM–6 PM · Sun 12 PM–5 PM</div></div><div class="footer-item"><span class="footer-icon">⌖</span><div><strong>Store Location</strong><br>1847 Willow Creek Lane<br>Lincoln, NE 68508</div></div><div class="footer-item"><span class="footer-icon">✉</span><div><strong>Email</strong><br>Cozynesthome@gmail.com</div></div></div><div class="footer-note">© 2026 CozyNest Home</div></footer>`;
  const variantFor=(p,name)=>p.colors.find(c=>c.name===name)||p.colors[0];
  const variantImage=(p,name)=>variantFor(p,name).image;
  const variantGallery=(p,name)=>variantFor(p,name).gallery||p.gallery||[variantImage(p,name)];
  const swatchMarkup=(p,selected=p.colors[0].name,context='card')=>p.colors.map(({name,hex})=>
    `<button type="button" class="swatch-button ${name===selected?'selected':''}" style="--swatch:${hex}" data-${context}-color="${p.id}|${name}" aria-label="Select ${name} ${p.name}" aria-pressed="${name===selected}" title="${name}"></button>`
  ).join('');
  const card=(p)=>`<article class="product-card" data-card-id="${p.id}"><div class="product-photo">${p.sale?'<span class="badge-sale">On sale</span>':''}<a data-card-link href="product.html?id=${p.id}" aria-label="View ${p.name}"><img data-card-image src="${variantImage(p,p.colors[0].name)}" alt="${p.name} photographed in ${p.colors[0].name}" loading="lazy"></a><button class="heart ${favorites().includes(p.id)?'active':''}" data-favorite="${p.id}" aria-label="Save ${p.name} to favorites" title="Toggle favorite">${favorites().includes(p.id)?'♥':'♡'}</button></div><a data-card-link href="product.html?id=${p.id}" class="product-name">${p.name}</a><div class="rating"><a class="review-link" href="product.html?id=${p.id}#customer-reviews" aria-label="Read reviews for ${p.name}"><span class="stars">★</span> ${ratingFor(p)} &nbsp;(${ratingText(p)}) <span aria-hidden="true">↗</span></a></div><div class="prices">${p.old?`<span class="was">${money(p.old)}</span>`:''}<span class="${p.sale?'now':''}">${money(p.price)}</span></div><div class="swatches" role="group" aria-label="${p.name} colors">${swatchMarkup(p)}</div><div class="card-color-name" data-card-color-name>Color: ${p.colors[0].name}</div></article>`;
  const activateCardSwatches=()=>document.addEventListener('click',e=>{
    const sw=e.target.closest('[data-card-color]');if(!sw)return;
    const [id,name]=sw.dataset.cardColor.split('|');const p=byId[id];if(!p)return;
    const cardEl=sw.closest('[data-card-id]');const v=variantFor(p,name);
    cardEl.querySelector('[data-card-image]').src=v.image;
    cardEl.querySelector('[data-card-image]').alt=`${p.name} photographed in ${name}`;
    cardEl.querySelectorAll('[data-card-link]').forEach(a=>a.href=`product.html?id=${encodeURIComponent(p.id)}&color=${encodeURIComponent(name)}`);
    cardEl.querySelector('[data-card-color-name]').textContent=`Color: ${name}`;
    cardEl.querySelectorAll('[data-card-color]').forEach(button=>{let selected=button===sw;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
  });
  const favoritesHandler=()=>document.addEventListener('click',e=>{const btn=e.target.closest('[data-favorite]');if(!btn)return;const id=btn.dataset.favorite;const f=favorites();const next=f.includes(id)?f.filter(x=>x!==id):[...f,id];localStorage.setItem(wishKey,JSON.stringify(next));document.querySelectorAll(`[data-favorite="${id}"]`).forEach(b=>{b.classList.toggle('active',next.includes(id));b.textContent=next.includes(id)?'♥':'♡'});toast(next.includes(id)?'Saved to favorites':'Removed from favorites')});
  const home=()=>{
    const cats=[
      ['all','All','category-all.jpg'],
      ['quilt','Quilts','category-quilt.jpg'],
      ['comforter','Comforters','category-comforter.jpg'],
      ['coverlet','Coverlets','category-coverlet.jpg'],
      ['heated','Bed Blankets','category-heated.jpg'],
      ['set','Quilt & Coverlet Sets','category-set.jpg'],
      ['sham','Shams','category-sham.jpg']
    ];
    const params=new URLSearchParams(location.search);
    const tf=document.querySelector('#type-filter');
    const initialType=params.get('category')||'all';
    if([...tf.options].some(o=>o.value===initialType))tf.value=initialType;
    const colorFilter=document.querySelector('#color-filter');
    const colors=[...new Set(products.flatMap(p=>p.colors.map(c=>c.name)))].sort();
    colorFilter.innerHTML='<option value="all">All</option>'+colors.map(n=>`<option value="${n}">${n}</option>`).join('');
    const sizeFilter=document.querySelector('#size-filter');
    const sizes=[...new Set(products.flatMap(p=>Object.keys(p.sizes)))];
    sizeFilter.innerHTML='<option value="all">All</option>'+sizes.map(s=>`<option value="${s}">${s}</option>`).join('');
    if(params.get('deals')==='sale')document.querySelector('#deal-filter').value='sale';
    if(['price-low','price-high','rating'].includes(params.get('sort')))document.querySelector('#sort-filter').value=params.get('sort');
    if(params.has('search'))document.querySelector('#search-input').value=params.get('search');
    const checkCategory=(p,type)=>type==='all'||p.type===type||(type==='heated'&&['heated','throw'].includes(p.type))||(type==='set'&&['set','gift'].includes(p.type));
    const render=()=>{
      const type=tf.value;
      const color=colorFilter.value;
      const size=sizeFilter.value;
      const material=document.querySelector('#material-filter').value;
      const quiltType=document.querySelector('#quilt-type-filter').value;
      const pattern=document.querySelector('#pattern-filter').value;
      const price=document.querySelector('#price-filter').value;
      const deal=document.querySelector('#deal-filter').value;
      const sort=document.querySelector('#sort-filter').value;
      const q=document.querySelector('#search-input').value.trim().toLowerCase();
      let arr=products.filter(p=>checkCategory(p,type)
        &&(color==='all'||p.colors.some(c=>c.name===color))
        &&(size==='all'||Object.prototype.hasOwnProperty.call(p.sizes,size))
        &&(material==='all'||p.filterMaterial===material)
        &&(quiltType==='all'||p.quiltType===quiltType)
        &&(pattern==='all'||p.pattern===pattern)
        &&(deal==='all'||p.sale)
        &&(!q||p.name.toLowerCase().includes(q)||p.intro.toLowerCase().includes(q)));
      if(price!=='all'){
        const [low,high]=price.split('-').map(Number);
        arr=arr.filter(p=>p.price>=low&&p.price<high);
      }
      if(sort==='price-low')arr.sort((a,b)=>a.price-b.price);
      if(sort==='price-high')arr.sort((a,b)=>b.price-a.price);
      if(sort==='rating')arr.sort((a,b)=>Number(ratingFor(b))-Number(ratingFor(a)));
      document.querySelector('#product-grid').innerHTML=arr.map(card).join('');
      document.querySelector('#result-count').textContent=arr.length+' product'+(arr.length===1?'':'s');
      document.querySelector('#no-results').style.display=arr.length?'none':'block';
      document.querySelector('#categories').innerHTML=cats.map(([id,name,img])=>`
        <button type="button" class="category ${id===type?'active':''}" data-category="${id}" aria-pressed="${id===type}" title="View ${name}">
          <img src="${img}" alt="" loading="lazy"><span>${name}</span>
        </button>`).join('');
    };
    document.querySelector('#categories').addEventListener('click',e=>{
      const b=e.target.closest('[data-category]');if(!b)return;
      tf.value=b.dataset.category;render();
    });
    const ids=['type-filter','color-filter','size-filter','material-filter','price-filter','quilt-type-filter','pattern-filter','deal-filter','sort-filter'];
    ids.forEach(id=>document.getElementById(id).addEventListener('change',render));
    document.querySelector('#search-input').addEventListener('input',render);
    const toggle=document.querySelector('#toggle-filters');
    const extra=document.querySelector('#extra-filters');
    toggle.addEventListener('click',()=>{extra.hidden=!extra.hidden;toggle.setAttribute('aria-expanded',String(!extra.hidden));});
    document.querySelector('#clear-filters').addEventListener('click',()=>{
      ids.forEach(id=>document.getElementById(id).selectedIndex=0);
      document.querySelector('#search-input').value='';
      render();
    });
    render();
  };

  const reviewStars = count => `<span class="review-stars" aria-label="${count} out of 5 stars">${'★'.repeat(count)}<span class="star-empty">${'☆'.repeat(5-count)}</span></span>`;
  const reviewSection = p => {
    const records=sampleReviews[p.id]||[];
    const counts=ratingBreakdown(p);
    const allRatings=ratingMetrics[p.id];
    return `<section id="customer-reviews" class="reviews-section" aria-labelledby="reviews-heading">
      <div class="reviews-heading"><div><p class="reviews-kicker">PRODUCT FEEDBACK</p><h2 id="reviews-heading">Ratings & reviews</h2><p class="reviews-disclosure">Reviews are fictional classroom examples, not verified customer feedback or purchases.</p></div></div>
      <div class="reviews-overview"><div class="review-overall"><strong>${ratingFor(p)}</strong><span class="stars" aria-hidden="true">${'★'.repeat(Math.round(Number(ratingFor(p))))}${'☆'.repeat(5-Math.round(Number(ratingFor(p))))}</span><span>${allRatings.toLocaleString('en-US')} ratings</span><small>${records.length} written comments</small></div>
      <div class="rating-breakdown" aria-label="Illustrative star ratings">${counts.map(c=>`<div class="rating-bar-row"><span>${c.stars} star</span><div class="rating-bar"><span style="width:${Math.round(100*c.count/allRatings)}%"></span></div><span>${c.count.toLocaleString('en-US')}</span></div>`).join('')}</div></div>
      <div class="reviews-toolbar"><strong>Showing <span id="review-visible-count">10</span> of <span id="review-total-matches">${records.length}</span> comments</strong><div class="review-controls"><label for="review-filter">Rating</label><select id="review-filter"><option value="all">All stars</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select><label for="review-sort">Sort by</label><select id="review-sort"><option value="recent">Most recent</option><option value="highest">Highest rating</option><option value="lowest">Lowest rating</option></select></div></div>
      <div id="review-list" class="review-list" aria-live="polite"></div><div class="reviews-more-wrap"><button type="button" id="review-more" class="outline">Show 10 more comments</button></div>
    </section>`;
  };
  const setupReviews = p => {
    const root=document.getElementById('review-list');
    const filter=document.getElementById('review-filter');
    const sort=document.getElementById('review-sort');
    const more=document.getElementById('review-more');
    let shown=10;
    const formatDate=d=>new Date(d+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    const render=()=>{
      let arr=[...(sampleReviews[p.id]||[])];
      if(filter.value!=='all')arr=arr.filter(r=>r.stars===Number(filter.value));
      if(sort.value==='highest')arr.sort((a,b)=>b.stars-a.stars||b.date.localeCompare(a.date));
      if(sort.value==='lowest')arr.sort((a,b)=>a.stars-b.stars||b.date.localeCompare(a.date));
      if(sort.value==='recent')arr.sort((a,b)=>b.date.localeCompare(a.date));
      document.getElementById('review-visible-count').textContent=String(Math.min(shown,arr.length));
      document.getElementById('review-total-matches').textContent=String(arr.length);
      root.innerHTML=arr.length?arr.slice(0,shown).map(r=>`<article class="review-item"><div class="review-item-top"><div class="review-author"><span class="review-avatar" aria-hidden="true">${r.name[0]}</span><div><strong>${r.name}</strong><span class="review-meta">${formatDate(r.date)}</span></div></div><span class="review-comment-stars">${reviewStars(r.stars)}</span></div><h3>${r.title}</h3><p>${r.body}</p></article>`).join(''):'<div class="review-empty">No comments match this filter. Try another rating.</div>';
      more.hidden=shown>=arr.length;
    };
    filter.addEventListener('change',()=>{shown=10;render()});
    sort.addEventListener('change',()=>{shown=10;render()});
    more.addEventListener('click',()=>{shown+=10;render()});
    render();
  };

  const productPage=()=>{
    const id=new URLSearchParams(location.search).get('id');const p=byId[id]||products[0];document.title=p.name+' | CozyNest Home';document.querySelector('#crumb-product').textContent=p.name;
    const initialColor=new URLSearchParams(location.search).get('color');
    const selectedColor=p.colors.some(c=>c.name===initialColor)?initialColor:p.colors[0].name;
    document.querySelector('#product-detail').innerHTML=`<section class="product-detail"><div><img class="large-image" id="gallery-main" alt="${p.name}, ${selectedColor}, product view 1" src="${variantImage(p,selectedColor)}"><div class="thumbs product-gallery-thumbs"></div><div class="fabric-preview" aria-live="polite"><span id="selected-fabric" class="fabric-square" style="--fabric-color:${variantFor(p,selectedColor).hex}"></span><span class="fabric-preview-label">Selected color: <strong id="fabric-preview-name">${selectedColor}</strong></span></div></div><div>${p.sale?'<span class="badge-sale" style="position:static;display:inline-block;margin-bottom:14px">On sale</span>':''}<h1 class="detail-name">${p.name}</h1><div class="rating"><a class="review-link" href="#customer-reviews" aria-label="Go to customer comments"><span class="stars">★</span> &nbsp; ${ratingFor(p)} (${ratingText(p)}) · Read comments ↓</a></div><div class="detail-price"><span id="old-price" class="was">${money(originalFor(p,Object.keys(p.sizes)[0]))}</span> &nbsp; <span id="unit-price" class="${p.sale?'now':''}">${money(priceFor(p,Object.keys(p.sizes)[0]))}</span> <span id="discount-label" class="discount-label">45% off</span></div><p class="detail-intro">${p.intro}</p><div class="form-group"><label for="product-size">Size</label><select id="product-size">${Object.keys(p.sizes).map(s=>`<option value="${s}">${s}</option>`).join('')}</select></div><div class="form-group"><label for="product-color">Color: <strong id="selected-color-name">${selectedColor}</strong></label><div id="detail-swatches" class="swatches detail-color-swatches" role="group" aria-label="Choose ${p.name} color">${swatchMarkup(p,selectedColor,'detail')}</div><select id="product-color" aria-label="Select color">${p.colors.map(c=>`<option value="${c.name}" ${c.name===selectedColor?'selected':''}>${c.name}</option>`).join('')}</select></div>${p.id==='european-linen-cotton-stitch-quilt'?'<div class="form-group"><label for="product-sham-set">Sham set</label><select id="product-sham-set"><option value="without">Without sham set</option><option value="with">With sham set</option></select></div>':''}<div class="form-group"><label for="product-qty">Quantity</label><select id="product-qty">${[1,2,3,4,5,6,7,8,9,10].map(x=>`<option value="${x}">${x}</option>`).join('')}</select><p id="selected-total" class="small light" aria-live="polite">Total for 1 item: ${money(p.price)}</p></div><button class="solid full" id="add-to-bag">Add to bag — ${money(p.price)}</button><p class="light small">✓ Cozy textures &nbsp; ✓ Size options &nbsp; ✓ Easy-care materials</p><h2 class="section-title">Product details</h2><ul class="features">${p.features.map(x=>`<li>${x}</li>`).join('')}</ul><h2 class="section-title">Dimensions & materials</h2><table class="specs"><tbody><tr><td>Available sizes</td><td>${Object.entries(p.sizes).map(([s,d])=>`${s}: ${d}`).join('<br>')}</td></tr><tr><td>Material</td><td>${p.material}</td></tr><tr><td>Care instructions</td><td>${p.care}</td></tr><tr><td>Brand</td><td>CozyNest Home</td></tr></tbody></table></div></section>`;
    const colorSelect=document.querySelector('#product-color');
    const bindGalleryThumbs=name=>{
      document.querySelectorAll('[data-gallery-index]').forEach(button=>button.addEventListener('click',()=>{
        const i=Number(button.dataset.galleryIndex);
        const list=variantGallery(p,name);
        document.querySelector('#gallery-main').src=list[i]||list[0];
        document.querySelector('#gallery-main').alt=`${p.name}, ${name}, product view ${i+1}`;
        document.querySelectorAll('[data-gallery-index]').forEach(b=>b.classList.toggle('active',b===button));
      }));
    };
    const renderGallery=name=>{
      const list=variantGallery(p,name);
      document.querySelector('.product-gallery-thumbs').innerHTML=list.map((img,i)=>`<button type="button" class="gallery-thumb ${i===0?'active':''}" data-gallery-index="${i}" aria-label="View product image ${i+1}"><img class="thumb" src="${img}" alt="${p.name} ${name} product view ${i+1}"></button>`).join('');
      document.querySelector('#gallery-main').src=list[0]||variantImage(p,name);
      document.querySelector('#gallery-main').alt=`${p.name}, ${name}, product view 1`;
      bindGalleryThumbs(name);
    };
    const setColor=name=>{
      const variant=variantFor(p,name);
      colorSelect.value=variant.name;
      renderGallery(variant.name);
      document.querySelector('#selected-color-name').textContent=variant.name;
      document.querySelector('#fabric-preview-name').textContent=variant.name;
      document.querySelector('#selected-fabric').style.setProperty('--fabric-color', variant.hex);
      document.querySelectorAll('[data-detail-color]').forEach(button=>{
        const active=button.dataset.detailColor===`${p.id}|${variant.name}`;
        button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));
      });
    };
    renderGallery(selectedColor);
    document.querySelector('#detail-swatches').addEventListener('click',e=>{
      const button=e.target.closest('[data-detail-color]');if(!button)return;
      setColor(button.dataset.detailColor.split('|')[1]);
    });
    colorSelect.addEventListener('change',()=>setColor(colorSelect.value));
    // Keep the product-page total and button in sync with the selected quantity.
    const qtySelect=document.querySelector('#product-qty');
    const updateSelectedTotal=()=>{
      const qty=Math.max(1,Math.min(10,Number(qtySelect.value)||1));
      const size=document.querySelector('#product-size').value;
      const shamSet=document.querySelector('#product-sham-set')?.value||'without';
      const unit=priceFor(p,size,shamSet), oldUnit=originalFor(p,size,shamSet);
      const total=money(unit*qty);
      document.querySelector('#unit-price').textContent=money(unit);
      document.querySelector('#old-price').textContent=money(oldUnit);
      document.querySelector('#discount-label').textContent=Math.round((1-unit/oldUnit)*100)+'% off';
      document.querySelector('#selected-total').textContent=`Total for ${qty} item${qty===1?'':'s'}: ${total}`;
      document.querySelector('#add-to-bag').textContent=`Add to bag — ${total}`;
    };
    qtySelect.addEventListener('change',updateSelectedTotal);
    document.querySelector('#product-size').addEventListener('change',updateSelectedTotal);
    document.querySelector('#product-sham-set')?.addEventListener('change',updateSelectedTotal);
    updateSelectedTotal();
    document.querySelector('#add-to-bag').addEventListener('click',()=>{const size=document.querySelector('#product-size').value,color=document.querySelector('#product-color').value,qty=Number(qtySelect.value),shamSet=document.querySelector('#product-sham-set')?.value||'without';const c=cart(),item=c.find(x=>x.id===p.id&&x.size===size&&x.color===color&&(x.shamSet||'without')===shamSet);if(item)item.qty=Math.min(99,item.qty+qty);else c.push({id:p.id,size,color,qty,shamSet});saveCart(c);toast(`${p.name} added to your bag`)});
    document.querySelector('#product-detail').insertAdjacentHTML('afterend',reviewSection(p));
    setupReviews(p);
    if(location.hash==='#customer-reviews') requestAnimationFrame(()=>document.getElementById('customer-reviews')?.scrollIntoView({block:'start'}));
    document.querySelector('#related-grid').innerHTML=products.filter(x=>x.id!==p.id).slice(0,4).map(card).join('');
  };
  const subtotal=()=>cart().reduce((n,c)=>n+priceFor(byId[c.id],c.size,c.shamSet)*c.qty,0);
  const summary=(showButton=true)=>`<h2 style="font-family:var(--serif);margin-top:0">Order summary</h2><div class="summary-line"><span>Subtotal (${cart().reduce((n,c)=>n+c.qty,0)} items)</span><span>${money(subtotal())}</span></div><div class="summary-line"><span>Shipping</span><span>FREE</span></div><div class="summary-line"><span>Tax</span><span>$0.00</span></div><div class="summary-line total"><span>Total</span><span>${money(subtotal())}</span></div>${showButton?`<a href="checkout.html" class="solid full" style="display:block;text-align:center">Continue to checkout</a>`:''}`;
  const cartPage=()=>{
    const c=cart(),root=document.querySelector('#cart-content');if(!c.length){root.innerHTML=`<div class="empty"><h2>Your bag is empty</h2><p>Browse the collection to find something you like.</p><a class="solid" href="index.html" style="display:inline-block;margin-top:10px">Shop the collection</a></div>`;return;}
    root.innerHTML=`<div class="cart-layout"><div>${c.map((x,i)=>{const p=byId[x.id];return `<div class="cart-row"><a href="product.html?id=${x.id}"><img src="${variantImage(p,x.color)}" alt="${p.name} photographed in ${x.color}"></a><div><a href="product.html?id=${x.id}" class="product-name">${p.name}</a><div class="light small">Size: ${x.size} &nbsp;·&nbsp; Color: ${x.color}${p.id==='european-linen-cotton-stitch-quilt'?' &nbsp;·&nbsp; '+(x.shamSet==='with'?'With sham set':'Without sham set'):''} </div><div class="qty-row"><button class="qty-button" data-action="less" data-index="${i}" aria-label="Decrease quantity">−</button><strong>${x.qty}</strong><button class="qty-button" data-action="more" data-index="${i}" aria-label="Increase quantity">+</button><button class="text-button" data-action="remove" data-index="${i}">Remove</button></div></div><strong>${money(priceFor(p,x.size,x.shamSet)*x.qty)}</strong></div>`}).join('')}<p style="margin-top:25px"><a href="index.html">← Continue shopping</a></p></div><aside class="summary">${summary()}</aside></div>`;
    root.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{const current=cart(),idx=Number(btn.dataset.index);if(!current[idx])return;switch(btn.dataset.action){case 'more':current[idx].qty=Math.min(current[idx].qty+1,10);break;case 'less':current[idx].qty--;break;case 'remove':current.splice(idx,1);break;}saveCart(current.filter(x=>x.qty>0));cartPage()}));
  };
  const checkoutPage=()=>{
    if(!cart().length){document.querySelector('.checkout-layout').innerHTML='<div class="empty"><h2>Your bag is empty.</h2><p>Please add an item before checking out.</p><a class="solid" style="display:inline-block" href="index.html">Go shopping</a></div>';return;}
    document.querySelector('#checkout-summary').innerHTML=summary(false)+`<div style="border-top:1px solid #ded1c8;padding-top:12px">${cart().map(x=>`<div class="summary-line"><span>${byId[x.id].name} × ${x.qty}<br><small>${x.size} / ${x.color}${x.id==='european-linen-cotton-stitch-quilt'?' / '+(x.shamSet==='with'?'With sham set':'Without sham set'):''}</small></span><strong>${money(priceFor(byId[x.id],x.size,x.shamSet)*x.qty)}</strong></div>`).join('')}</div>`;
    // Only the clearly labeled classroom invitation link enables live syncing.
    // Ordinary visitors never load the Firebase checkout module.
    if (classroomSessionActive()) {
      import('./firebase-live-checkout.js').catch(() => {
        console.warn('Classroom live demo is unavailable.');
      });
    }
    // Checkout accepts practice payment values only; nothing here is saved or transmitted.
    // Keep the original HTML compatible, even if its card fields were marked readonly.
    document.querySelector('.checkout-actions')?.remove();
    const cardNumberInput=document.getElementById('demo-card-number');
    const expiryInput=document.getElementById('demo-card-expiry');
    // The site-wide training notice already explains that no real payments occur.
    document.querySelector('.payment-explainer')?.remove();
    if(cardNumberInput){
      cardNumberInput.readOnly=false;
      cardNumberInput.removeAttribute('readonly');
      cardNumberInput.removeAttribute('aria-readonly');
      // Collect a maximum of four digits: never allow a full payment card number.
      const cardLabel=document.querySelector('label[for="demo-card-number"]');
      if(cardLabel)cardLabel.textContent='Card number (last 4 digits)';
      cardNumberInput.setAttribute('aria-label','Example card ending, four digits maximum');
      cardNumberInput.autocomplete='off';
      cardNumberInput.inputMode='numeric';
      cardNumberInput.maxLength=4;
      cardNumberInput.placeholder='Last 4 digits';
      cardNumberInput.required=true;
      cardNumberInput.defaultValue='';
      cardNumberInput.value='';
      cardNumberInput.addEventListener('input',()=>{
        cardNumberInput.value=cardNumberInput.value.replace(/\D/g,'').slice(0,4);
      });
    }
    if(expiryInput){
      expiryInput.readOnly=false;
      expiryInput.removeAttribute('readonly');
      expiryInput.removeAttribute('aria-readonly');
      expiryInput.setAttribute('aria-label','Example expiration date, month and year');
      expiryInput.autocomplete='off';
      expiryInput.inputMode='numeric';
      expiryInput.maxLength=5;
      expiryInput.placeholder='MM/YY';
      expiryInput.required=true;
      expiryInput.defaultValue='';
      expiryInput.value='';
      expiryInput.addEventListener('input',()=>{
        const digits=expiryInput.value.replace(/\D/g,'').slice(0,4);
        expiryInput.value=digits.length>2?digits.slice(0,2)+'/'+digits.slice(2):digits;
      });
    }
    document.querySelector('#checkout-form').addEventListener('submit',e=>{
      e.preventDefault();const f=e.currentTarget;const error=document.getElementById('checkout-error');error.style.display='none';
      if(!f.reportValidity())return;
      // Reject anything but exactly four digits; never store payment entries.
      if(!cardNumberInput || !/^\d{4}$/.test(cardNumberInput.value)){
        error.textContent='Enter exactly four digits in the card-number field.';
        error.style.display='block';return;
      }
      if(!expiryInput || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryInput.value)){
        error.textContent='Enter an example expiration date in MM/YY format, such as 12/30.';
        error.style.display='block';return;
      }
      const mail=document.getElementById('demo-email').value.trim().toLowerCase();const phone=document.getElementById('demo-phone').value.replace(/\D/g,'');
      if(!mail.endsWith('@example.com')&&!mail.endsWith('@example.org')&&!mail.endsWith('@example.net')){error.textContent='Enter an example email ending in @example.com, @example.org or @example.net.';error.style.display='block';return;}
      if(!/^[0-9]{10,11}$/.test(phone)||!/55501[0-9]{2}$/.test(phone.slice(-7))){error.textContent='Use an example 555-01XX phone number, such as 402-555-0148.';error.style.display='block';return;}
      const street=document.getElementById('demo-street').value.trim().toLowerCase();if(!/(example|sample|fictional|demo)/.test(street)){error.textContent='Use a made-up address such as 100 Example Avenue.';error.style.display='block';return;}
      const order={id:'TRAIN-'+Math.floor(100000+Math.random()*900000),itemCount:cart().reduce((n,c)=>n+c.qty,0),total:subtotal(),date:new Date().toLocaleString()};
      cardNumberInput.value='';expiryInput.value=''; // Do not retain entered test-card values.
      sessionStorage.setItem('cozynest-demo-last-order',JSON.stringify(order));saveCart([]);window.location.href='confirmation.html';
    });
  };
  const confirmation=()=>{const o=loadSessionOrder();document.querySelector('#confirm-content').innerHTML=o?`<div class="success"><div class="check-round">✓</div><h1 class="page-title" style="margin-top:20px">Checkout completed</h1><p class="subtitle" style="margin:14px 0">This was a training checkout. No purchase was placed, no payment was charged, and nothing will ship.</p><div class="summary" style="text-align:left;margin:25px auto;max-width:430px"><div class="summary-line"><span>Order reference</span><strong>${o.id}</strong></div><div class="summary-line"><span>Items</span><span>${o.itemCount}</span></div><div class="summary-line"><span>Displayed total</span><strong>${money(o.total)}</strong></div><div class="summary-line"><span>Actual charge</span><strong>$0.00</strong></div></div><a class="solid" style="display:inline-block" href="index.html">Back to the storefront</a></div>`:`<div class="empty"><h1>No order summary found</h1><p>Finish checkout to see the order summary.</p><a class="solid" style="display:inline-block" href="index.html">Return to the store</a></div>`};
  const loadSessionOrder=()=>{try{return JSON.parse(sessionStorage.getItem('cozynest-demo-last-order'))}catch{return null}};
  siteHeader();siteFooter();favoritesHandler();activateCardSwatches();
  switch(document.body.dataset.page){case 'home':home();break;case 'product':productPage();break;case 'cart':cartPage();break;case 'checkout':checkoutPage();break;case 'confirmation':confirmation();break;}
})();
