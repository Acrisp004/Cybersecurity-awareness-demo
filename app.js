/* CozyNest Home — classroom-only static ecommerce simulation.
   No network requests, analytics, key logging, external SDKs, or real payment processing. */
(() => {
  'use strict';
  const products = [
    {id:'thermasoft', name:'ThermaSoft Heated Blanket', type:'heated',color:'Ivory',price:119,old:149,rating:4.8,reviews:'2,537',image:'thermasoft.jpg',sale:true,swatches:['#efe8dc','#9c9b98','#beaa94','#83937c','#40506c'],intro:'A plush, wonderfully soft electric blanket with adjustable heat and cozy channel stitching. Designed for chilly evenings and comfortable nights.',features:['Six adjustable warmth settings','Auto shut-off timer on select settings','Removable controller for simple care','Velvety-soft quilted microfiber'],material:'100% polyester microfiber',care:'Disconnect controller before washing. Machine wash cold on gentle cycle; tumble dry low.',sizes:{Throw:'50 × 60 in',Twin:'62 × 84 in',Queen:'84 × 90 in',King:'100 × 90 in'}},
    {id:'haven-quilt',name:'Haven Quilted Quilt Set',type:'quilt',color:'Olive',price:119,rating:4.7,reviews:'1,320',image:'haven-quilt.jpg',swatches:['#8c9478','#dac8ac','#f1e6d5','#6f7681'],intro:'A timeless, textured quilt set with classic stitched squares and a soft, lived-in finish.',features:['Classic stitched-square pattern','Lightweight layer for all seasons','Includes matching pillow shams','Relaxed, cozy finish'],material:'Cotton-blend quilt cover with polyester filling',care:'Machine wash cold with similar colors; tumble dry low.',sizes:{Twin:'68 × 86 in',Queen:'90 × 92 in',King:'106 × 92 in'}},
    {id:'cloudloft',name:'CloudLoft Heated Throw',type:'throw',color:'Ivory',price:44,old:59,rating:4.9,reviews:'3,014',image:'cloudloft.jpg',sale:true,swatches:['#f2e1d0','#c48e93','#9ba88f','#66717f'],intro:'Wrap yourself in exceptionally fluffy fleece with gentle, adjustable warmth for the couch or reading chair.',features:['Plush, cloud-soft texture','Adjustable heating levels','Auto shut-off for extra peace of mind','Ideal size for lounging'],material:'Soft polyester sherpa fleece',care:'Unplug the controller; machine wash gentle and air dry.',sizes:{Throw:'50 × 60 in'}},
    {id:'willow-coverlet',name:'Willow Textured Coverlet Set',type:'coverlet',color:'Ivory',price:99,rating:4.7,reviews:'986',image:'willow-coverlet.jpg',swatches:['#d3c7b7','#b1a38f','#eee3d7','#435066','#856a56'],intro:'A graceful, textured coverlet that brings an effortless, tailored finish to your bedroom.',features:['Soft decorative texture','Comfortable lightweight coverage','Includes coordinating shams','Pairs beautifully with layered bedding'],material:'Cotton and polyester blend',care:'Machine wash cold; gentle cycle; tumble dry low.',sizes:{Twin:'68 × 86 in',Queen:'90 × 90 in',King:'104 × 96 in'}},
    {id:'ultraplush',name:'UltraPlush Heated Blanket',type:'heated',color:'Charcoal',price:159,rating:4.8,reviews:'1,941',image:'ultraplush.jpg',swatches:['#454244','#ac9787','#e5d8c9','#43506a'],intro:'Extra-thick plush fabric and soothing adjustable heat make this a cozy cold-weather essential.',features:['Exceptionally soft plush fabric','Adjustable heat settings','Removable controller','Auto shut-off safety feature'],material:'100% polyester plush fleece',care:'Disconnect from power; follow care label for gentle machine washing.',sizes:{Twin:'62 × 84 in',Queen:'84 × 90 in',King:'100 × 90 in'}},
    {id:'meadow-bloom',name:'Meadow Bloom Quilt Set',type:'quilt',color:'Floral',price:109,rating:4.7,reviews:'743',image:'meadow-bloom.jpg',swatches:['#d7c49d','#ede7db','#aa917a','#bdc3ac'],intro:'A soft botanical quilt with subtle floral accents to brighten up your bedroom.',features:['Delicate botanical print','Soft and breathable feel','Includes matching pillow shams','Beautiful across the seasons'],material:'Cotton-blend shell and light polyester fill',care:'Machine wash cold; tumble dry on low.',sizes:{Twin:'68 × 86 in',Queen:'90 × 92 in',King:'106 × 92 in'}},
    {id:'knitluxe',name:'KnitLuxe Heated Throw',type:'throw',color:'Rose',price:34,old:49,rating:4.8,reviews:'1,276',image:'knitluxe.jpg',sale:true,swatches:['#be898c','#e6d7c6','#91a18d','#c0bec1'],intro:'A charming rose-toned, chunky-knit-look throw made for comfortable lounging and gentle warmth.',features:['Soft textured-knit look','Adjustable warmth','Fringed decorative edges','Compact couch-friendly size'],material:'Soft polyester knit-look fleece',care:'Disconnect controller; hand wash or use gentle machine cycle.',sizes:{Throw:'50 × 60 in'}},
    {id:'evercozy',name:'EverCozy Bedding Gift Set',type:'gift',color:'Ivory',price:159,rating:4.9,reviews:'428',image:'evercozy.jpg',swatches:['#e7dbcd','#a5a5a2','#97a48d','#445066'],intro:'A thoughtful coordinated bundle featuring a plush heated blanket, a lightweight quilt and matching shams.',features:['Heated blanket included','Coordinated quilt and pillow shams','Gift-ready neutral palette','Mix-and-match styling'],material:'Polyester heated blanket with cotton-blend bedding',care:'Wash bedding separately; disconnect heating controller first.',sizes:{Queen:'Queen bedding bundle',King:'King bedding bundle'}}
  ];

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

  const ratingFor = p => { const r=sampleReviews[p.id]||[]; return r.length ? (r.reduce((total,x)=>total+x.stars,0)/r.length).toFixed(1) : p.rating.toFixed(1); };
  const byId = Object.fromEntries(products.map(p=>[p.id,p]));
  const key='cozynest-demo-cart-v1', wishKey='cozynest-demo-faves-v1';
  const money=n=>'$'+n.toFixed(2);
  const load=(k,fallback)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??fallback}catch{return fallback}};
  const cart=()=>load(key,[]).filter(c=>byId[c.id]&&c.qty>0&&c.qty<=99);
  const saveCart=arr=>{localStorage.setItem(key,JSON.stringify(arr));renderCount()};
  const favorites=()=>load(wishKey,[]);
  const renderCount=()=>document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=String(cart().reduce((n,c)=>n+c.qty,0)));
  const html = s=>s; // Products are static, not user-supplied HTML.
  const toast = msg=>{document.querySelector('.toast')?.remove();const e=document.createElement('div');e.className='toast';e.role='status';e.textContent=msg;document.body.append(e);setTimeout(()=>e.remove(),2700)};
  const siteHeader=()=>{document.querySelector('#site-header').innerHTML=`<div class="promo">Soft layers. Cozy spaces. &nbsp; ✦ &nbsp; Some favorites are on sale now!</div><div class="safety">TRAINING STORE · Example products and reviews · No real orders or payments</div><header class="header"><a href="index.html" class="logo" aria-label="CozyNest Home">⌂ <span>CozyNest Home</span></a><nav class="nav" aria-label="Main navigation"><a href="index.html">New Arrivals</a><a href="index.html?sort=rating">Best Sellers</a><a href="index.html?category=heated">Heated Blankets</a><a href="index.html?category=quilt">Quilts</a><a href="index.html?category=throw">Throws</a><a href="index.html?category=coverlet">Bedroom</a><a href="index.html?category=gift">Gifts</a><a href="index.html?deals=sale" class="sale-link">On Sale</a></nav><div class="actions"><form id="header-search" role="search" class="searchbar"><span aria-hidden="true">⌕</span><input id="search-input" aria-label="Search products" type="search" placeholder="Search cozy bedding..."></form><a class="iconlink" href="cart.html" title="Shopping bag" aria-label="Shopping bag">♧<span class="counter" data-cart-count>0</span></a></div></header><hr class="divider">`;
    document.querySelector('#header-search').addEventListener('submit',e=>{e.preventDefault();const q=document.querySelector('#search-input').value.trim();window.location.href='index.html?search='+encodeURIComponent(q)});
    renderCount();
  };
  const siteFooter=()=>document.querySelector('#site-footer').innerHTML=`<footer class="footer"><div class="footer-inner"><div class="footer-item"><span class="footer-icon">☎</span><div><strong>Phone</strong><br>(402) 555-0187<br>(402) 555-0142</div></div><div class="footer-item"><span class="footer-icon">◷</span><div><strong>Store Hours</strong><br>Mon–Fri 9 AM–7 PM<br>Sat 10 AM–6 PM · Sun 12 PM–5 PM</div></div><div class="footer-item"><span class="footer-icon">⌖</span><div><strong>Store Location</strong><br>1847 Willow Creek Lane<br>Lincoln, NE 68508</div></div><div class="footer-item"><span class="footer-icon">✉</span><div><strong>Email</strong><br>hello@cozynesthome.example</div></div></div><div class="footer-note">© 2026 CozyNest Home</div></footer>`;
  const card=(p)=>`<article class="product-card"><div class="product-photo">${p.sale?'<span class="badge-sale">On sale</span>':''}<a href="product.html?id=${p.id}" aria-label="View ${p.name}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a><button class="heart ${favorites().includes(p.id)?'active':''}" data-favorite="${p.id}" aria-label="Save ${p.name} to favorites" title="Toggle favorite">${favorites().includes(p.id)?'♥':'♡'}</button></div><a href="product.html?id=${p.id}" class="product-name">${p.name}</a><div class="rating"><a class="review-link" href="product.html?id=${p.id}#customer-reviews" aria-label="Read reviews for ${p.name}"><span class="stars">★</span> ${ratingFor(p)} &nbsp;(${(sampleReviews[p.id]||[]).length} reviews) <span aria-hidden="true">↗</span></a></div><div class="prices">${p.old?`<span class="was">${money(p.old)}</span>`:''}<span class="${p.sale?'now':''}">${money(p.price)}</span></div><div class="swatches" aria-label="Available color choices">${p.swatches.map(c=>`<span class="swatch" style="background:${c}"></span>`).join('')}</div></article>`;
  const favoritesHandler=()=>document.addEventListener('click',e=>{const btn=e.target.closest('[data-favorite]');if(!btn)return;const id=btn.dataset.favorite;const f=favorites();const next=f.includes(id)?f.filter(x=>x!==id):[...f,id];localStorage.setItem(wishKey,JSON.stringify(next));document.querySelectorAll(`[data-favorite="${id}"]`).forEach(b=>{b.classList.toggle('active',next.includes(id));b.textContent=next.includes(id)?'♥':'♡'});toast(next.includes(id)?'Saved to favorites':'Removed from favorites')});
  const home=()=>{
    const cats=[['all','All','cat-all.png'],['heated','Heated Blankets','cat-heated.png'],['quilt','Quilts','cat-quilts.png'],['throw','Throws','cat-throws.png'],['coverlet','Coverlets','cat-coverlets.png'],['gift','Gift Sets','cat-gifts.png'],['sham','Shams','cat-shams.png']];
    const params=new URLSearchParams(location.search);const initialType=params.get('category')||'all';const tf=document.querySelector('#type-filter');if([...tf.options].some(o=>o.value===initialType))tf.value=initialType;
    if(params.get('deals')==='sale')document.querySelector('#deal-filter').value='sale';
    if(['price-low','price-high','rating'].includes(params.get('sort')))document.querySelector('#sort-filter').value=params.get('sort');
    if(params.has('search'))document.querySelector('#search-input').value=params.get('search');
    const render=()=>{
      const type=tf.value,color=document.querySelector('#color-filter').value,price=document.querySelector('#price-filter').value,deal=document.querySelector('#deal-filter').value,sort=document.querySelector('#sort-filter').value,q=document.querySelector('#search-input').value.trim().toLowerCase();
      let arr=products.filter(p=>(type==='all'||p.type===type)&&(color==='all'||p.color===color)&&(deal==='all'||p.sale)&&(!q||p.name.toLowerCase().includes(q)||p.intro.toLowerCase().includes(q)));
      if(price!=='all'){const [low,high]=price.split('-').map(Number);arr=arr.filter(p=>p.price>=low&&p.price<(high===999?1000:high));}
      if(sort==='price-low')arr.sort((a,b)=>a.price-b.price);if(sort==='price-high')arr.sort((a,b)=>b.price-a.price);if(sort==='rating')arr.sort((a,b)=>Number(ratingFor(b))-Number(ratingFor(a)));
      document.querySelector('#product-grid').innerHTML=arr.map(card).join('');document.querySelector('#result-count').textContent=arr.length+' product'+(arr.length===1?'':'s');document.querySelector('#no-results').style.display=arr.length?'none':'block';
      document.querySelector('#categories').innerHTML=cats.map(([id,name,img])=>`<button class="category ${id===type?'active':''}" data-category="${id}" aria-pressed="${id===type}"><img src="${img}" alt=""><span>${name}</span></button>`).join('');
    };
    document.querySelector('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;tf.value=b.dataset.category==='sham'?'all':b.dataset.category;render()});
    ['type-filter','color-filter','price-filter','deal-filter','sort-filter'].forEach(id=>document.getElementById(id).addEventListener('change',render));
    document.querySelector('#search-input').addEventListener('input',render);render();
  };

  const reviewStars = count => `<span class="review-stars" aria-label="${count} out of 5 stars">${'★'.repeat(count)}<span class="star-empty">${'☆'.repeat(5-count)}</span></span>`;
  const reviewSection = p => {
    const records = sampleReviews[p.id] || [];
    const counts = [5,4,3,2,1].map(stars=>({stars,count:records.filter(r=>r.stars===stars).length}));
    return `<section id="customer-reviews" class="reviews-section" aria-labelledby="reviews-heading">
      <div class="reviews-heading"><div><p class="reviews-kicker">SHOPPING EXPERIENCE</p><h2 id="reviews-heading">Customer reviews</h2><p class="reviews-disclosure"><strong>Example reviews:</strong> These comments and ratings are invented for training and do not represent verified purchases or real customer experiences.</p></div></div>
      <div class="reviews-overview"><div class="review-overall"><strong>${ratingFor(p)}</strong><span class="stars" aria-hidden="true">${"★".repeat(Math.round(Number(ratingFor(p))))}${"☆".repeat(5-Math.round(Number(ratingFor(p))))}</span><span>${records.length} example ratings</span><small>${records.length} comments below</small></div>
      <div class="rating-breakdown" aria-label="Star ratings in the comments">${counts.map(c=>`<div class="rating-bar-row"><span>${c.stars} star</span><div class="rating-bar"><span style="width:${records.length?100*c.count/records.length:0}%"></span></div><span>${c.count}</span></div>`).join('')}</div></div>
      <div class="reviews-toolbar"><strong><span id="review-visible-count">${records.length}</span> comments</strong><div class="review-controls"><label for="review-filter">Rating</label><select id="review-filter"><option value="all">All stars</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option></select><label for="review-sort">Sort by</label><select id="review-sort"><option value="recent">Most recent</option><option value="highest">Highest rating</option><option value="lowest">Lowest rating</option></select></div></div>
      <div id="review-list" class="review-list" aria-live="polite"></div>
    </section>`;
  };
  const setupReviews = p => {
    const root = document.getElementById('review-list');
    const filter = document.getElementById('review-filter');
    const sort = document.getElementById('review-sort');
    const formatDate = d => new Date(d+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    const render = () => {
      let arr = [...(sampleReviews[p.id]||[])];
      if(filter.value!=='all') arr=arr.filter(r=>r.stars===Number(filter.value));
      if(sort.value==='highest') arr.sort((a,b)=>b.stars-a.stars||b.date.localeCompare(a.date));
      if(sort.value==='lowest') arr.sort((a,b)=>a.stars-b.stars||b.date.localeCompare(a.date));
      if(sort.value==='recent') arr.sort((a,b)=>b.date.localeCompare(a.date));
      document.getElementById('review-visible-count').textContent=arr.length;
      root.innerHTML=arr.length?arr.map(r=>`<article class="review-item"><div class="review-item-top"><div class="review-author"><span class="review-avatar" aria-hidden="true">${r.name[0]}</span><div><strong>${r.name}</strong><span class="review-meta">${formatDate(r.date)}</span></div></div><span class="review-comment-stars">${reviewStars(r.stars)}</span></div><h3>${r.title}</h3><p>${r.body}</p></article>`).join(''):'<div class="review-empty">No reviews match that filter. Try another rating.</div>';
    };
    filter.addEventListener('change',render);sort.addEventListener('change',render);render();
  };

  const productPage=()=>{
    const id=new URLSearchParams(location.search).get('id');const p=byId[id]||products[0];document.title=p.name+' | CozyNest Home';document.querySelector('#crumb-product').textContent=p.name;
    document.querySelector('#product-detail').innerHTML=`<section class="product-detail"><div><img class="large-image" alt="${p.name} — enlarged product view" src="${p.image}"><div class="thumbs"><img class="thumb" src="${p.image}" alt="${p.name} thumbnail"></div></div><div>${p.sale?'<span class="badge-sale" style="position:static;display:inline-block;margin-bottom:14px">On sale</span>':''}<h1 class="detail-name">${p.name}</h1><div class="rating"><a class="review-link" href="#customer-reviews" aria-label="Go to customer comments"><span class="stars">★</span> &nbsp; ${ratingFor(p)} (${(sampleReviews[p.id]||[]).length} reviews) · Read comments ↓</a></div><div class="detail-price">${p.old?`<span class="was">${money(p.old)}</span> &nbsp;`:''}<span class="${p.sale?'now':''}">${money(p.price)}</span></div><p class="detail-intro">${p.intro}</p><div class="form-group"><label for="product-size">Size</label><select id="product-size">${Object.keys(p.sizes).map(s=>`<option value="${s}">${s} — ${p.sizes[s]}</option>`).join('')}</select></div><div class="form-group"><label for="product-color">Color</label><select id="product-color">${[p.color,'Sand','Ivory','Slate'].filter((v,i,a)=>a.indexOf(v)===i).map(c=>`<option>${c}</option>`).join('')}</select></div><div class="form-group"><label for="product-qty">Quantity</label><select id="product-qty">${[1,2,3,4,5,6,7,8,9,10].map(x=>`<option value="${x}">${x}</option>`).join('')}</select><p id="selected-total" class="small light" aria-live="polite">Total for 1 item: ${money(p.price)}</p></div><button class="solid full" id="add-to-bag">Add to bag — ${money(p.price)}</button><p class="light small">✓ Cozy textures &nbsp; ✓ Size options &nbsp; ✓ Easy-care materials</p><h2 class="section-title">Product details</h2><ul class="features">${p.features.map(x=>`<li>${x}</li>`).join('')}</ul><h2 class="section-title">Dimensions & materials</h2><table class="specs"><tbody><tr><td>Available sizes</td><td>${Object.entries(p.sizes).map(([s,d])=>`${s}: ${d}`).join('<br>')}</td></tr><tr><td>Material</td><td>${p.material}</td></tr><tr><td>Care instructions</td><td>${p.care}</td></tr><tr><td>Brand</td><td>CozyNest Home</td></tr></tbody></table></div></section>`;
    // Keep the product-page total and button in sync with the selected quantity.
    const qtySelect=document.querySelector('#product-qty');
    const updateSelectedTotal=()=>{
      const qty=Math.max(1,Math.min(10,Number(qtySelect.value)||1));
      const total=money(p.price*qty);
      document.querySelector('#selected-total').textContent=`Total for ${qty} item${qty===1?'':'s'}: ${total}`;
      document.querySelector('#add-to-bag').textContent=`Add to bag — ${total}`;
    };
    qtySelect.addEventListener('change',updateSelectedTotal);
    updateSelectedTotal();
    document.querySelector('#add-to-bag').addEventListener('click',()=>{const size=document.querySelector('#product-size').value,color=document.querySelector('#product-color').value,qty=Number(qtySelect.value);const c=cart(),item=c.find(x=>x.id===p.id&&x.size===size&&x.color===color);if(item)item.qty=Math.min(99,item.qty+qty);else c.push({id:p.id,size,color,qty});saveCart(c);toast(`${p.name} added to your bag`)});
    document.querySelector('#product-detail').insertAdjacentHTML('afterend',reviewSection(p));
    setupReviews(p);
    if(location.hash==='#customer-reviews') requestAnimationFrame(()=>document.getElementById('customer-reviews')?.scrollIntoView({block:'start'}));
    document.querySelector('#related-grid').innerHTML=products.filter(x=>x.id!==p.id).slice(0,4).map(card).join('');
  };
  const subtotal=()=>cart().reduce((n,c)=>n+byId[c.id].price*c.qty,0);
  const summary=(showButton=true)=>`<h2 style="font-family:var(--serif);margin-top:0">Order summary</h2><div class="summary-line"><span>Subtotal (${cart().reduce((n,c)=>n+c.qty,0)} items)</span><span>${money(subtotal())}</span></div><div class="summary-line"><span>Shipping</span><span>FREE</span></div><div class="summary-line"><span>Tax</span><span>$0.00</span></div><div class="summary-line total"><span>Total</span><span>${money(subtotal())}</span></div><p class="small light">No real purchase or shipment will occur.</p>${showButton?`<a href="checkout.html" class="solid full" style="display:block;text-align:center">Continue to checkout</a>`:''}`;
  const cartPage=()=>{
    const c=cart(),root=document.querySelector('#cart-content');if(!c.length){root.innerHTML=`<div class="empty"><h2>Your bag is empty</h2><p>Browse the collection to find something you like.</p><a class="solid" href="index.html" style="display:inline-block;margin-top:10px">Shop the collection</a></div>`;return;}
    root.innerHTML=`<div class="cart-layout"><div>${c.map((x,i)=>{const p=byId[x.id];return `<div class="cart-row"><a href="product.html?id=${x.id}"><img src="${p.image}" alt="${p.name}"></a><div><a href="product.html?id=${x.id}" class="product-name">${p.name}</a><div class="light small">Size: ${x.size} &nbsp;·&nbsp; Color: ${x.color}</div><div class="qty-row"><button class="qty-button" data-action="less" data-index="${i}" aria-label="Decrease quantity">−</button><strong>${x.qty}</strong><button class="qty-button" data-action="more" data-index="${i}" aria-label="Increase quantity">+</button><button class="text-button" data-action="remove" data-index="${i}">Remove</button></div></div><strong>${money(p.price*x.qty)}</strong></div>`}).join('')}<p style="margin-top:25px"><a href="index.html">← Continue shopping</a></p></div><aside class="summary">${summary()}</aside></div>`;
    root.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{const current=cart(),idx=Number(btn.dataset.index);if(!current[idx])return;switch(btn.dataset.action){case 'more':current[idx].qty=Math.min(current[idx].qty+1,10);break;case 'less':current[idx].qty--;break;case 'remove':current.splice(idx,1);break;}saveCart(current.filter(x=>x.qty>0));cartPage()}));
  };
  const checkoutPage=()=>{
    if(!cart().length){document.querySelector('.checkout-layout').innerHTML='<div class="empty"><h2>Your bag is empty.</h2><p>Please add an item before checking out.</p><a class="solid" style="display:inline-block" href="index.html">Go shopping</a></div>';return;}
    document.querySelector('#checkout-summary').innerHTML=summary(false)+`<div style="border-top:1px solid #ded1c8;padding-top:12px">${cart().map(x=>`<div class="summary-line"><span>${byId[x.id].name} × ${x.qty}<br><small>${x.size} / ${x.color}</small></span><strong>${money(byId[x.id].price*x.qty)}</strong></div>`).join('')}</div>`;
    document.querySelectorAll('input[name="payment"]').forEach(r=>r.addEventListener('change',()=>document.querySelector('#card-last4').textContent=r.value==='demo-visa'?'4242':'4444'));
    document.querySelector('#fill-demo').addEventListener('click',()=>{Object.entries({'demo-name':'Example Student','demo-email':'student@example.com','demo-phone':'402-555-0148','demo-street':'100 Example Avenue','demo-city':'Sample City','demo-state':'NE','demo-zip':'00000'}).forEach(([id,value])=>document.getElementById(id).value=value);document.querySelector('#dummy-only').checked=true;toast('Example details added')});
    document.querySelector('#checkout-form').addEventListener('submit',e=>{
      e.preventDefault();const f=e.currentTarget;const error=document.getElementById('checkout-error');error.style.display='none';
      if(!f.reportValidity())return;
      const mail=document.getElementById('demo-email').value.trim().toLowerCase();const phone=document.getElementById('demo-phone').value.replace(/\D/g,'');
      if(!mail.endsWith('@example.com')&&!mail.endsWith('@example.org')&&!mail.endsWith('@example.net')){error.textContent='Enter an example email ending in @example.com, @example.org or @example.net.';error.style.display='block';return;}
      if(!/^[0-9]{10,11}$/.test(phone)||!/55501[0-9]{2}$/.test(phone.slice(-7))){error.textContent='Use an example 555-01XX phone number, such as 402-555-0148.';error.style.display='block';return;}
      const street=document.getElementById('demo-street').value.trim().toLowerCase();if(!/(example|sample|fictional|demo)/.test(street)){error.textContent='Use a made-up address such as 100 Example Avenue.';error.style.display='block';return;}
      const order={id:'TRAIN-'+Math.floor(100000+Math.random()*900000),itemCount:cart().reduce((n,c)=>n+c.qty,0),total:subtotal(),date:new Date().toLocaleString()};
      sessionStorage.setItem('cozynest-demo-last-order',JSON.stringify(order));saveCart([]);window.location.href='confirmation.html';
    });
  };
  const confirmation=()=>{const o=loadSessionOrder();document.querySelector('#confirm-content').innerHTML=o?`<div class="success"><div class="check-round">✓</div><h1 class="page-title" style="margin-top:20px">Checkout completed</h1><p class="subtitle" style="margin:14px 0">This was a training checkout. No purchase was placed, no payment was charged, and nothing will ship.</p><div class="summary" style="text-align:left;margin:25px auto;max-width:430px"><div class="summary-line"><span>Order reference</span><strong>${o.id}</strong></div><div class="summary-line"><span>Items</span><span>${o.itemCount}</span></div><div class="summary-line"><span>Displayed total</span><strong>${money(o.total)}</strong></div><div class="summary-line"><span>Actual charge</span><strong>$0.00</strong></div></div><a class="solid" style="display:inline-block" href="index.html">Back to the storefront</a></div>`:`<div class="empty"><h1>No order summary found</h1><p>Finish checkout to see the order summary.</p><a class="solid" style="display:inline-block" href="index.html">Return to the store</a></div>`};
  const loadSessionOrder=()=>{try{return JSON.parse(sessionStorage.getItem('cozynest-demo-last-order'))}catch{return null}};
  siteHeader();siteFooter();favoritesHandler();
  switch(document.body.dataset.page){case 'home':home();break;case 'product':productPage();break;case 'cart':cartPage();break;case 'checkout':checkoutPage();break;case 'confirmation':confirmation();break;}
})();
