import { useState, useEffect } from "react";

/* ─── Google Fonts ─────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Design Tokens ────────────────────────────────────────────────────── */
const T = {
  navy:     "#050D1F",
  navy2:    "#0A1628",
  navy3:    "#0F1F3D",
  navy4:    "#162444",
  blue:     "#1B4FD8",
  blueL:    "#2D6AFF",
  blueGlow: "rgba(45,106,255,0.35)",
  gold:     "#C9A84C",
  goldL:    "#E4C36A",
  goldDim:  "rgba(201,168,76,0.18)",
  white:    "#FFFFFF",
  offWhite: "#EDF0F8",
  muted:    "rgba(237,240,248,0.5)",
  dim:      "rgba(237,240,248,0.25)",
  glass:    "rgba(255,255,255,0.04)",
  glassBrd: "rgba(255,255,255,0.09)",
  cardBg:   "rgba(11,22,50,0.85)",
};

/* ─── Unsplash Images ──────────────────────────────────────────────────── */
const IMG = (id, w = 400, h = 300) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

const PRODUCTS = [
  { id:1,  name:"Luxury Spa Collection",      price:89.00,  original:149.00, category:"birthday",    rating:4.9, reviews:1243, badge:"40% OFF",   img:IMG("1556228578-8c89e6adf883"), fb:"🧴" },
  { id:2,  name:"Crystal Wine Glass Set",     price:72.00,  original:130.00, category:"wedding",     rating:4.9, reviews:876,  badge:"TRENDING",  img:IMG("1510812431401-41d2bd2722f3"), fb:"🍷" },
  { id:3,  name:"Personalised Memory Book",   price:54.00,  original:90.00,  category:"anniversary", rating:4.8, reviews:2341, badge:"NEW IN",    img:IMG("1544716278-ca5e3f4abd8c"), fb:"📖" },
  { id:4,  name:"Baby Milestone Keepsake",    price:65.00,  original:110.00, category:"baby",        rating:4.9, reviews:567,  badge:"EXCLUSIVE", img:IMG("1515488042361-ee00e0ddd4e4"), fb:"🧸" },
  { id:5,  name:"Executive Hamper Prestige",  price:149.00, original:220.00, category:"corporate",   rating:4.7, reviews:334,  badge:"PREMIUM",   img:IMG("1607344645866-009c320b8eba"), fb:"🎩" },
  { id:6,  name:"Artisan Candle Bundle",      price:42.00,  original:70.00,  category:"birthday",    rating:4.6, reviews:4521, badge:"FLASH",     img:IMG("1602523961358-f9f03dd557db"), fb:"🕯️" },
  { id:7,  name:"Gold Edition Photo Frame",   price:98.00,  original:160.00, category:"wedding",     rating:4.8, reviews:234,  badge:"LIMITED",   img:IMG("1519741347686-c1e0aadf4611"), fb:"🖼️" },
  { id:8,  name:"Aromatherapy Prestige Set",  price:79.00,  original:125.00, category:"birthday",    rating:4.8, reviews:1876, badge:"37% OFF",   img:IMG("1608571423902-eed4a5ad8108"), fb:"🌿" },
  { id:9,  name:"18K Name Necklace",          price:115.00, original:180.00, category:"anniversary", rating:4.9, reviews:3210, badge:"BESTSELLER",img:IMG("1599643478518-a784e5dc4c8f"), fb:"📿" },
  { id:10, name:"Newborn Luxury Hamper",      price:125.00, original:195.00, category:"baby",        rating:4.9, reviews:789,  badge:"36% OFF",   img:IMG("1519689680058-324335c77eba"), fb:"👶" },
  { id:11, name:"Corporate Prestige Desk Set",price:139.00, original:210.00, category:"corporate",   rating:4.6, reviews:445,  badge:"NEW IN",    img:IMG("1497366216548-37526070297c"), fb:"💼" },
  { id:12, name:"Heritage Gift Hamper",       price:68.00,  original:110.00, category:"holiday",     rating:4.7, reviews:1234, badge:"SEASONAL",  img:IMG("1512389142860-9c449e58a543"), fb:"🎄" },
  { id:13, name:"Silk Scarf Collection",      price:55.00,  original:90.00,  category:"holiday",     rating:4.7, reviews:988,  badge:"44% OFF",   img:IMG("1520903920243-00d872a2d1c9"), fb:"🧣" },
  { id:14, name:"Jewellery Keepsake Box",     price:88.00,  original:145.00, category:"anniversary", rating:4.9, reviews:654,  badge:"HOT",       img:IMG("1515562141207-7a88fb7ce338"), fb:"💍" },
  { id:15, name:"Noir Candle Gift Set",       price:60.00,  original:95.00,  category:"birthday",    rating:4.7, reviews:2100, badge:"37% OFF",   img:IMG("1603006905003-be475563bc89"), fb:"🕯️" },
  { id:16, name:"Full-Grain Leather Wallet",  price:82.00,  original:130.00, category:"corporate",   rating:4.8, reviews:892,  badge:"TRENDING",  img:IMG("1548036161-18adf4c784f9"), fb:"👜" },
];

const CATEGORIES = [
  { id:"all",         label:"All",         emoji:"✦" },
  { id:"birthday",    label:"Birthday",    emoji:"🎂" },
  { id:"wedding",     label:"Wedding",     emoji:"💍" },
  { id:"anniversary", label:"Anniversary", emoji:"💑" },
  { id:"baby",        label:"Baby",        emoji:"👶" },
  { id:"corporate",   label:"Corporate",   emoji:"🏢" },
  { id:"holiday",     label:"Holiday",     emoji:"🎄" },
];

const EVENT_TYPES = ["Birthday Party","Wedding","Baby Shower","Anniversary","Corporate Event","Holiday Party","Graduation"];

const EVENTS_INIT = [
  { id:1, name:"Sarah's 30th Birthday", date:"2026-06-15", type:"Birthday Party", guests:20, budget:500,
    img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=480&h=110&fit=crop&auto=format&q=80" },
  { id:2, name:"Tom & Lisa's Wedding",  date:"2026-07-22", type:"Wedding",         guests:80, budget:2000,
    img:"https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=480&h=110&fit=crop&auto=format&q=80" },
];

const pad = n => String(n).padStart(2,"0");

function useCountdown() {
  const [t, setT] = useState({ h:7, m:43, s:21 });
  useEffect(() => {
    const id = setInterval(() => setT(p => {
      let {h,m,s} = p;
      if (--s<0){s=59;if(--m<0){m=59;if(--h<0)h=23;}}
      return {h,m,s};
    }), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ─── Shared ───────────────────────────────────────────────────────────── */
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'DM Sans', system-ui, sans-serif";

const GoldLine = () => (
  <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.gold},transparent)`, margin:"0 0 0" }} />
);

function Stars({ rating }) {
  return <span style={{ color:T.gold, fontSize:11, letterSpacing:1 }}>{"★".repeat(Math.round(rating))}</span>;
}

/* ─── Product Card ─────────────────────────────────────────────────────── */
function ProductCard({ p, onAdd, onWishlist, wishlisted, onClick }) {
  const [hover, setHover] = useState(false);
  const [pop, setPop] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const disc = Math.round(((p.original - p.price) / p.original) * 100);
  const isFlash = /FLASH|OFF|LIMITED/.test(p.badge);

  return (
    <div
      onClick={() => onClick(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius:16, overflow:"hidden", cursor:"pointer", position:"relative",
        background: T.cardBg,
        border: hover ? `1px solid rgba(201,168,76,0.5)` : `1px solid ${T.glassBrd}`,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2), 0 0 30px ${T.blueGlow}`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s cubic-bezier(0.34,1.4,0.64,1)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Badge */}
      <span style={{
        position:"absolute", top:10, left:10, zIndex:3,
        background: isFlash ? `linear-gradient(135deg,#1B4FD8,#2D6AFF)` : T.goldDim,
        border: `1px solid ${isFlash ? "transparent" : T.gold}`,
        color: isFlash ? "#fff" : T.goldL,
        fontSize:8, fontWeight:600, fontFamily:sans,
        padding:"3px 9px", borderRadius:20, letterSpacing:1.5, textTransform:"uppercase",
      }}>{p.badge}</span>

      {/* Heart */}
      <button
        onClick={e => { e.stopPropagation(); setPop(true); setTimeout(()=>setPop(false),500); onWishlist(p.id); }}
        style={{
          position:"absolute", top:9, right:9, zIndex:3,
          width:32, height:32, borderRadius:"50%",
          background:"rgba(5,13,31,0.7)", border:`1px solid ${T.glassBrd}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14, cursor:"pointer", backdropFilter:"blur(8px)",
          transform: pop ? "scale(1.8)" : "scale(1)",
          transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >{wishlisted ? "❤️" : "🤍"}</button>

      {/* Image */}
      <div style={{ height:172, overflow:"hidden", background:T.navy3, position:"relative" }}>
        {imgOk
          ? <img src={p.img} alt={p.name} onError={()=>setImgOk(false)}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                transform: hover ? "scale(1.08)" : "scale(1)",
                transition:"transform 0.5s ease", filter:"brightness(0.9) saturate(1.1)" }} />
          : <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:52 }}>{p.fb}</div>
        }
        {/* Gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(5,13,31,0.7) 0%, transparent 55%)" }} />
      </div>

      {/* Info */}
      <div style={{ padding:"12px 14px 14px" }}>
        <p style={{ margin:"0 0 4px", fontSize:13, fontWeight:500, fontFamily:serif, color:T.offWhite, lineHeight:1.35, WebkitLineClamp:2, overflow:"hidden", display:"-webkit-box", WebkitBoxOrient:"vertical" }}>{p.name}</p>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:10 }}>
          <Stars rating={p.rating} />
          <span style={{ color:T.muted, fontSize:10, fontFamily:sans }}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:18, fontWeight:600, fontFamily:serif, color:T.goldL, letterSpacing:-0.3 }}>${p.price}</span>
            <span style={{ fontSize:11, color:T.muted, textDecoration:"line-through", marginLeft:5, fontFamily:sans }}>${p.original}</span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onAdd(p); }}
            onMouseDown={e=>e.currentTarget.style.transform="scale(0.9)"}
            onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
            style={{
              background:`linear-gradient(135deg,${T.blue},${T.blueL})`,
              color:"#fff", border:"none", borderRadius:30,
              padding:"7px 14px", fontSize:11, fontWeight:600,
              fontFamily:sans, cursor:"pointer", letterSpacing:0.3,
              boxShadow:`0 4px 14px ${T.blueGlow}`,
              transition:"transform 0.15s, box-shadow 0.2s",
            }}
          >Add</button>
        </div>
        <div style={{ marginTop:6, display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ height:1, flex:1, background:`linear-gradient(90deg,${T.goldDim},transparent)` }} />
          <span style={{ color:T.gold, fontSize:9, fontFamily:sans, fontWeight:500, letterSpacing:1.5 }}>SAVE {disc}%</span>
          <div style={{ height:1, flex:1, background:`linear-gradient(90deg,transparent,${T.goldDim})` }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Home Tab ─────────────────────────────────────────────────────────── */
function HomeTab({ onAdd, onWishlist, wishlist, onProduct, onGoShop, countdown, setCategory }) {
  const [bi, setBi] = useState(0);
  const banners = [
    { headline:"Curated for the Extraordinary",  sub:"Gift experiences money can't replicate", btn:"Explore Gifts",
      img:"https://images.unsplash.com/photo-1607344645866-009c320b8eba?w=600&h=280&fit=crop&auto=format&q=85" },
    { headline:"Your Perfect Event Awaits",       sub:"Plan, curate, and celebrate in style",   btn:"Plan Event",
      img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=280&fit=crop&auto=format&q=85" },
    { headline:"Souvenirs of Every Journey",      sub:"Unique gifts from around the world",      btn:"Shop Now",
      img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&h=280&fit=crop&auto=format&q=85" },
  ];
  useEffect(() => {
    const id = setInterval(() => setBi(i=>(i+1)%banners.length), 5000);
    return () => clearInterval(id);
  }, []);
  const b = banners[bi];

  return (
    <div style={{ paddingBottom:90 }}>
      {/* Search */}
      <div style={{ padding:"12px 16px 10px", background:T.navy, position:"sticky", top:60, zIndex:9 }}>
        <div style={{ background:T.glass, borderRadius:50, padding:"10px 18px", display:"flex", alignItems:"center", gap:10, border:`1px solid ${T.glassBrd}`, backdropFilter:"blur(10px)" }}>
          <span style={{ color:T.muted, fontSize:15 }}>⌕</span>
          <input placeholder="Search luxury gifts by occasion…"
            style={{ border:"none", outline:"none", flex:1, fontSize:13, background:"transparent", color:T.offWhite, fontFamily:sans }} />
          <span style={{ background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", fontSize:10, fontWeight:600, padding:"4px 12px", borderRadius:20, fontFamily:sans, letterSpacing:0.5 }}>Search</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ margin:"0 16px 0", borderRadius:22, overflow:"hidden", position:"relative", height:230 }}>
        <img src={b.img} alt="banner" key={bi} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.55) saturate(0.9)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(5,13,31,0.9) 0%,rgba(27,79,216,0.4) 100%)" }} />
        {/* Gold corner accent */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent 0%,${T.gold} 40%,${T.gold} 60%,transparent 100%)` }} />
        <div style={{ position:"relative", padding:"26px 22px" }}>
          <span style={{ color:T.gold, fontSize:9, fontWeight:500, fontFamily:sans, letterSpacing:3, textTransform:"uppercase" }}>✦ Limited Collection</span>
          <h2 style={{ margin:"8px 0 6px", color:"#fff", fontSize:24, fontWeight:600, fontFamily:serif, lineHeight:1.2, fontStyle:"italic" }}>{b.headline}</h2>
          <p style={{ margin:"0 0 18px", color:"rgba(237,240,248,0.7)", fontSize:13, fontFamily:sans }}>{b.sub}</p>
          <button onClick={onGoShop} style={{ background:`linear-gradient(135deg,${T.gold},${T.goldL})`, color:T.navy, border:"none", borderRadius:30, padding:"10px 20px", fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:sans, letterSpacing:0.5 }}>
            {b.btn} →
          </button>
        </div>
        <div style={{ position:"absolute", bottom:14, right:16, display:"flex", gap:6 }}>
          {banners.map((_,i)=>(
            <div key={i} onClick={()=>setBi(i)} style={{ width:i===bi?20:5, height:5, borderRadius:10, background:i===bi?T.gold:"rgba(255,255,255,0.3)", transition:"all 0.4s", cursor:"pointer" }} />
          ))}
        </div>
      </div>

      {/* Flash Deals */}
      <div style={{ padding:"20px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div>
            <p style={{ margin:0, fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Exclusive Offers</p>
            <h3 style={{ margin:"2px 0 0", fontSize:20, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Flash Deals</h3>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, background:T.glass, border:`1px solid ${T.glassBrd}`, borderRadius:12, padding:"6px 12px", backdropFilter:"blur(8px)" }}>
            <span style={{ fontSize:10, color:T.muted, fontFamily:sans }}>Ends in</span>
            {[pad(countdown.h),pad(countdown.m),pad(countdown.s)].map((v,i)=>(
              <span key={i} style={{ background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", borderRadius:6, padding:"3px 7px", fontSize:12, fontWeight:600, fontFamily:sans, fontVariantNumeric:"tabular-nums" }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ overflowX:"auto", padding:"0 16px 16px", display:"flex", gap:12, scrollbarWidth:"none" }}>
        {PRODUCTS.slice(0,6).map(p=>(
          <div key={p.id} style={{ minWidth:175, flexShrink:0 }}>
            <ProductCard p={p} onAdd={onAdd} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />
          </div>
        ))}
      </div>

      {/* Occasions */}
      <div style={{ padding:"4px 16px 16px" }}>
        <div style={{ marginBottom:12 }}>
          <p style={{ margin:"0 0 2px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Browse By</p>
          <h3 style={{ margin:0, fontSize:20, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Occasion</h3>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {CATEGORIES.slice(1).map(cat=>(
            <button key={cat.id}
              onClick={()=>{setCategory(cat.id);onGoShop();}}
              style={{ background:T.glass, border:`1px solid ${T.glassBrd}`, borderRadius:14, padding:"13px 6px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:5, transition:"all 0.25s", backdropFilter:"blur(8px)" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.gold;e.currentTarget.style.background=T.goldDim;e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,0.3)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.glassBrd;e.currentTarget.style.background=T.glass;e.currentTarget.style.boxShadow="none";}}
            >
              <span style={{ fontSize:24 }}>{cat.emoji}</span>
              <span style={{ fontSize:10.5, fontWeight:500, fontFamily:sans, color:T.offWhite, letterSpacing:0.3 }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div style={{ padding:"0 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:12 }}>
          <div>
            <p style={{ margin:"0 0 2px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Curated For You</p>
            <h3 style={{ margin:0, fontSize:20, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Trending Now</h3>
          </div>
          <button onClick={onGoShop} style={{ background:"none", border:"none", color:T.gold, fontSize:12, fontFamily:sans, cursor:"pointer", letterSpacing:0.5 }}>View All →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {PRODUCTS.slice(6,10).map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
        </div>
      </div>

      {/* Souvenir strip */}
      <div style={{ margin:"20px 16px 0", borderRadius:20, overflow:"hidden", position:"relative", height:150 }}>
        <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=560&h=150&fit=crop&auto=format&q=85" alt="souvenirs" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.5) saturate(0.8)" }} />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,rgba(5,13,31,0.92),rgba(27,79,216,0.6))`, padding:"20px 22px" }}>
          <div style={{ height:1, background:`linear-gradient(90deg,${T.gold},transparent)`, marginBottom:12, width:60 }} />
          <p style={{ margin:"0 0 2px", color:T.goldL, fontSize:9, fontFamily:sans, letterSpacing:3, textTransform:"uppercase" }}>Souvenir Spotlight</p>
          <p style={{ margin:"0 0 12px", color:"#fff", fontSize:17, fontWeight:600, fontFamily:serif, fontStyle:"italic" }}>Gifts from Every Corner of the World</p>
          <button onClick={onGoShop} style={{ background:`linear-gradient(135deg,${T.gold},${T.goldL})`, color:T.navy, border:"none", borderRadius:20, padding:"7px 16px", fontWeight:600, fontSize:11, cursor:"pointer", fontFamily:sans }}>
            Browse Collection
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Shop Tab ─────────────────────────────────────────────────────────── */
function ShopTab({ onAdd, onWishlist, wishlist, onProduct, category, setCategory }) {
  const [sort, setSort] = useState("popular");
  let list = category==="all" ? PRODUCTS : PRODUCTS.filter(p=>p.category===category);
  if (sort==="low")  list = [...list].sort((a,b)=>a.price-b.price);
  if (sort==="high") list = [...list].sort((a,b)=>b.price-a.price);
  if (sort==="new")  list = [...list].reverse();

  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ position:"sticky", top:60, background:T.navy, zIndex:9, padding:"10px 0 8px", borderBottom:`1px solid ${T.glassBrd}` }}>
        <div style={{ overflowX:"auto", display:"flex", gap:7, padding:"0 16px", scrollbarWidth:"none" }}>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} onClick={()=>setCategory(cat.id)} style={{
              flexShrink:0,
              background: category===cat.id ? `linear-gradient(135deg,${T.blue},${T.blueL})` : T.glass,
              color: category===cat.id ? "#fff" : T.offWhite,
              border: `1px solid ${category===cat.id ? "transparent" : T.glassBrd}`,
              borderRadius:30, padding:"7px 14px", fontSize:11.5, fontWeight:500,
              fontFamily:sans, cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap",
              letterSpacing:0.3, backdropFilter:"blur(8px)",
              boxShadow: category===cat.id ? `0 4px 14px ${T.blueGlow}` : "none",
            }}>{cat.emoji} {cat.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:"10px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:12, color:T.muted, fontFamily:sans }}>{list.length} gifts curated</span>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{ border:`1px solid ${T.glassBrd}`, borderRadius:8, padding:"6px 10px", fontSize:12, color:T.offWhite, background:T.navy3, fontFamily:sans, outline:"none" }}>
          <option value="popular">Most Popular</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="new">Newest</option>
        </select>
      </div>
      <div style={{ padding:"4px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {list.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
      </div>
    </div>
  );
}

/* ─── Events Tab ───────────────────────────────────────────────────────── */
function EventsTab({ onGoShop, setCategory }) {
  const [events, setEvents] = useState(EVENTS_INIT);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:"", date:"", type:"", guests:"", budget:"" });
  const [err, setErr] = useState("");
  const daysUntil = d => Math.max(0, Math.ceil((new Date(d)-new Date())/86400000));

  const save = () => {
    if (!form.name||!form.date||!form.type){setErr("Please fill in name, date and type.");return;}
    const eImgs = { "Wedding":"1519741347686-c1e0aadf4611","Baby Shower":"1519689680058-324335c77eba","Birthday Party":"1530103862676-de8c9debad1d" };
    const imgId = eImgs[form.type]||"1530103862676-de8c9debad1d";
    setEvents(p=>[...p,{...form,id:Date.now(),guests:parseInt(form.guests)||0,budget:parseFloat(form.budget)||0,img:`https://images.unsplash.com/photo-${imgId}?w=480&h=110&fit=crop&auto=format&q=80`}]);
    setForm({name:"",date:"",type:"",guests:"",budget:""});setShowForm(false);setErr("");
  };

  return (
    <div style={{ padding:"20px 16px 90px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:18 }}>
        <div>
          <p style={{ margin:"0 0 2px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Your Calendar</p>
          <h2 style={{ margin:0, fontSize:22, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>My Events</h2>
        </div>
        <button onClick={()=>setShowForm(true)} style={{ background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", border:"none", borderRadius:30, padding:"10px 18px", fontWeight:500, fontFamily:sans, fontSize:12, cursor:"pointer", boxShadow:`0 4px 14px ${T.blueGlow}`, letterSpacing:0.3 }}>
          + New Event
        </button>
      </div>

      {events.map(ev => {
        const days = daysUntil(ev.date);
        return (
          <div key={ev.id} style={{ background:T.cardBg, borderRadius:18, marginBottom:14, border:`1px solid ${T.glassBrd}`, overflow:"hidden", backdropFilter:"blur(12px)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
            <div style={{ height:110, overflow:"hidden", position:"relative" }}>
              <img src={ev.img} alt={ev.type} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.5) saturate(0.8)" }} />
              <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${T.gold},transparent)` }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(5,13,31,0.85),rgba(5,13,31,0.4))", padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <p style={{ margin:0, fontWeight:600, fontFamily:serif, fontSize:16, color:"#fff", fontStyle:"italic" }}>{ev.name}</p>
                  <p style={{ margin:"4px 0 0", fontSize:11, color:"rgba(237,240,248,0.65)", fontFamily:sans }}>{ev.type} · {ev.date}</p>
                </div>
                <span style={{ background:days<=14?`linear-gradient(135deg,#C0392B,#E74C3C)`:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", fontSize:9, fontWeight:600, fontFamily:sans, padding:"5px 12px", borderRadius:20, letterSpacing:0.5, whiteSpace:"nowrap" }}>
                  {days===0?"TODAY":days<=14?`${days} days left`:`${days}d away`}
                </span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", padding:"12px 16px" }}>
              {[["Guests",ev.guests,T.blueL],["Budget",`$${ev.budget.toLocaleString()}`,T.goldL],["Per Guest",ev.budget&&ev.guests?`$${Math.round(ev.budget/ev.guests)}`:"—",T.offWhite]].map(([l,v,c])=>(
                <div key={l} style={{ textAlign:"center", flex:1 }}>
                  <p style={{ margin:0, fontSize:17, fontWeight:600, fontFamily:serif, color:c }}>{v}</p>
                  <p style={{ margin:0, fontSize:9, color:T.muted, fontFamily:sans, letterSpacing:0.5 }}>{l.toUpperCase()}</p>
                </div>
              ))}
              <button onClick={()=>{setCategory("all");onGoShop();}} style={{ background:T.glass, border:`1px solid ${T.gold}`, borderRadius:20, padding:"7px 14px", fontSize:11, fontWeight:500, fontFamily:sans, cursor:"pointer", color:T.goldL, backdropFilter:"blur(8px)", whiteSpace:"nowrap" }}>
                🎁 Shop
              </button>
            </div>
          </div>
        );
      })}

      {/* Smart gift banner */}
      <div style={{ borderRadius:18, overflow:"hidden", position:"relative", height:140 }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=140&fit=crop&auto=format&q=80" alt="suggestions" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.45) saturate(0.7)" }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${T.gold},transparent)` }} />
        <div style={{ position:"absolute", inset:0, padding:"20px 22px" }}>
          <p style={{ margin:"0 0 4px", fontWeight:600, fontFamily:serif, fontSize:16, color:"#fff", fontStyle:"italic" }}>✨ Curated Gift Intelligence</p>
          <p style={{ margin:"0 0 12px", fontSize:12, color:"rgba(237,240,248,0.8)", fontFamily:sans }}>Tell us your budget — we build the perfect bundle</p>
          <button onClick={()=>{setCategory("all");onGoShop();}} style={{ background:`linear-gradient(135deg,${T.gold},${T.goldL})`, color:T.navy, border:"none", borderRadius:20, padding:"7px 16px", fontWeight:600, fontSize:11, cursor:"pointer", fontFamily:sans }}>Explore →</button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div onClick={()=>setShowForm(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(4px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.navy2, border:`1px solid ${T.glassBrd}`, borderRadius:"22px 22px 0 0", padding:"20px 20px 36px", width:"100%", maxWidth:430, borderTop:`2px solid ${T.gold}` }}>
            <div style={{ width:36, height:3, background:T.gold, borderRadius:10, margin:"0 auto 18px", opacity:0.5 }} />
            <p style={{ margin:"0 0 2px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Add to Calendar</p>
            <h3 style={{ margin:"0 0 18px", fontWeight:600, fontSize:20, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Create New Event</h3>

            {[{l:"Event Name",k:"name",t:"text",ph:"e.g. Sarah's 30th Birthday"},{l:"Date",k:"date",t:"date"},{l:"Number of Guests",k:"guests",t:"number",ph:"e.g. 30"},{l:"Gift Budget ($)",k:"budget",t:"number",ph:"e.g. 500"}].map(f=>(
              <div key={f.k} style={{ marginBottom:12 }}>
                <label style={{ fontSize:10, fontWeight:500, fontFamily:sans, color:T.muted, display:"block", marginBottom:5, letterSpacing:1, textTransform:"uppercase" }}>{f.l}</label>
                <input type={f.t} placeholder={f.ph||""} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                  style={{ width:"100%", padding:"11px 14px", background:T.glass, border:`1px solid ${T.glassBrd}`, borderRadius:10, fontSize:14, color:T.offWhite, boxSizing:"border-box", outline:"none", fontFamily:sans }} />
              </div>
            ))}
            <div style={{ marginBottom:18 }}>
              <label style={{ fontSize:10, fontWeight:500, fontFamily:sans, color:T.muted, display:"block", marginBottom:5, letterSpacing:1, textTransform:"uppercase" }}>Event Type</label>
              <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{ width:"100%", padding:"11px 14px", background:T.navy3, border:`1px solid ${T.glassBrd}`, borderRadius:10, fontSize:14, color:T.offWhite, outline:"none", fontFamily:sans }}>
                <option value="">Select event type…</option>
                {EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {err && <p style={{ color:"#E74C3C", fontSize:12, fontFamily:sans, margin:"0 0 10px" }}>{err}</p>}
            <button onClick={save} style={{ width:"100%", background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", border:"none", borderRadius:30, padding:14, fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:sans, boxShadow:`0 6px 20px ${T.blueGlow}`, letterSpacing:0.5 }}>
              Create Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Wishlist Tab ─────────────────────────────────────────────────────── */
function WishlistTab({ wishlist, onRemove, onAdd, onProduct }) {
  const items = PRODUCTS.filter(p=>wishlist.includes(p.id));
  return (
    <div style={{ padding:"20px 16px 90px" }}>
      <p style={{ margin:"0 0 2px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Curated By You</p>
      <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Wishlist</h2>
      <p style={{ margin:"0 0 16px", fontSize:12, color:T.muted, fontFamily:sans }}>{items.length} item{items.length!==1?"s":""} saved</p>
      {items.length===0
        ? <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:52, marginBottom:14, opacity:0.4 }}>🤍</div>
            <p style={{ fontWeight:600, fontSize:18, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Nothing saved yet</p>
            <p style={{ color:T.muted, fontSize:13, fontFamily:sans }}>Tap the heart on any gift to curate your wishlist</p>
          </div>
        : <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {items.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onWishlist={onRemove} wishlisted onClick={onProduct} />)}
          </div>
      }
    </div>
  );
}

/* ─── Cart Tab ─────────────────────────────────────────────────────────── */
function CartTab({ cart, setCart, onGoShop, showToast }) {
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  const count = cart.reduce((s,x)=>s+x.qty,0);
  const [placed, setPlaced] = useState(false);

  if (placed) return (
    <div style={{ padding:"60px 20px", textAlign:"center" }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:`linear-gradient(135deg,${T.blue},${T.blueL})`, margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, boxShadow:`0 0 40px ${T.blueGlow}` }}>✓</div>
      <p style={{ margin:"0 0 4px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Confirmed</p>
      <h2 style={{ margin:"0 0 8px", fontWeight:600, fontSize:24, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Order Placed!</h2>
      <p style={{ color:T.muted, fontSize:13, fontFamily:sans, marginBottom:28 }}>Your curated gifts are being prepared with care.</p>
      <button onClick={()=>{setCart([]);setPlaced(false);onGoShop();}} style={{ background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", border:"none", borderRadius:30, padding:"13px 28px", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:sans, boxShadow:`0 6px 20px ${T.blueGlow}` }}>
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div style={{ padding:"20px 16px 90px" }}>
      <p style={{ margin:"0 0 2px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ Your Selection</p>
      <h2 style={{ margin:"0 0 4px", fontSize:22, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>My Cart</h2>
      {count>0 && <p style={{ margin:"0 0 16px", fontSize:12, color:T.muted, fontFamily:sans }}>{count} item{count!==1?"s":""}</p>}

      {cart.length===0
        ? <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:52, marginBottom:14, opacity:0.4 }}>🛒</div>
            <p style={{ fontWeight:600, fontSize:18, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>Your cart awaits</p>
            <p style={{ color:T.muted, fontSize:13, fontFamily:sans, marginBottom:24 }}>Discover exceptional gifts for every occasion</p>
            <button onClick={onGoShop} style={{ background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", border:"none", borderRadius:30, padding:"13px 28px", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:sans, boxShadow:`0 6px 20px ${T.blueGlow}` }}>Start Shopping</button>
          </div>
        : <>
            {cart.map(item=>(
              <div key={item.id} style={{ background:T.cardBg, borderRadius:16, padding:14, marginBottom:10, display:"flex", gap:14, border:`1px solid ${T.glassBrd}`, backdropFilter:"blur(12px)" }}>
                <div style={{ width:76, height:76, borderRadius:12, overflow:"hidden", flexShrink:0, background:T.navy3 }}>
                  <img src={item.img} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:"0 0 3px", fontWeight:500, fontFamily:serif, fontSize:14, color:T.offWhite, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</p>
                  <p style={{ margin:"0 0 10px", fontSize:16, fontWeight:600, fontFamily:serif, color:T.goldL }}>${item.price}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <button onClick={()=>setCart(p=>p.map(x=>x.id===item.id?{...x,qty:Math.max(1,x.qty-1)}:x))} style={{ width:28,height:28,borderRadius:"50%",border:`1px solid ${T.glassBrd}`,background:T.glass,cursor:"pointer",fontWeight:600,fontSize:16,color:T.offWhite,display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
                    <span style={{ fontWeight:600,fontSize:14,minWidth:18,textAlign:"center",color:T.offWhite,fontFamily:sans }}>{item.qty}</span>
                    <button onClick={()=>setCart(p=>p.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x))} style={{ width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${T.blue},${T.blueL})`,border:"none",color:"#fff",cursor:"pointer",fontWeight:600,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
                    <button onClick={()=>setCart(p=>p.filter(x=>x.id!==item.id))} style={{ marginLeft:"auto",background:"none",border:"none",fontSize:15,cursor:"pointer",color:T.dim }}>✕</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo */}
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              <input placeholder="Promo code" style={{ flex:1,padding:"11px 16px",background:T.glass,border:`1px solid ${T.glassBrd}`,borderRadius:30,fontSize:13,color:T.offWhite,outline:"none",fontFamily:sans,backdropFilter:"blur(8px)" }} />
              <button onClick={()=>showToast("Code applied!")} style={{ background:`linear-gradient(135deg,${T.gold},${T.goldL})`,color:T.navy,border:"none",borderRadius:30,padding:"11px 18px",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:sans }}>Apply</button>
            </div>

            {/* Summary */}
            <div style={{ background:T.cardBg, borderRadius:18, padding:"16px 18px", marginBottom:16, border:`1px solid ${T.glassBrd}`, backdropFilter:"blur(12px)" }}>
              <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.gold},transparent)`, marginBottom:14 }} />
              {[["Subtotal",`$${total.toFixed(2)}`],["Shipping","Complimentary"],["Gift Wrapping","Complimentary"]].map(([l,v])=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                  <span style={{ color:T.muted,fontSize:13,fontFamily:sans }}>{l}</span>
                  <span style={{ fontWeight:500,fontSize:13,color:v==="Complimentary"?T.goldL:T.offWhite,fontFamily:sans }}>{v}</span>
                </div>
              ))}
              <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.gold},transparent)`, margin:"12px 0" }} />
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontWeight:600,fontSize:16,fontFamily:serif,color:T.offWhite }}>Total</span>
                <span style={{ fontWeight:600,fontSize:20,fontFamily:serif,color:T.goldL }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={()=>{setPlaced(true);showToast("Order confirmed!");}} style={{ width:"100%",background:`linear-gradient(135deg,${T.blue},${T.blueL})`,color:"#fff",border:"none",borderRadius:30,padding:16,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:sans,boxShadow:`0 8px 24px ${T.blueGlow}`,letterSpacing:0.5 }}>
              Confirm Order · ${total.toFixed(2)}
            </button>
          </>
      }
    </div>
  );
}

/* ─── Root ─────────────────────────────────────────────────────────────── */
export default function GiftCraft() {
  const [tab, setTab]           = useState("home");
  const [cart, setCart]         = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("all");
  const [product, setProduct]   = useState(null);
  const [toast, setToast]       = useState(null);
  const countdown               = useCountdown();

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),2800); };
  const addToCart = p => {
    setCart(prev => { const ex=prev.find(x=>x.id===p.id); return ex?prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...prev,{...p,qty:1}]; });
    showToast("Added to cart");
  };
  const toggleWishlist = id => setWishlist(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const cartCount = cart.reduce((s,x)=>s+x.qty,0);
  const wishCount = wishlist.length;

  const tabs = [
    {id:"home",    emoji:"⌂",   label:"Home"},
    {id:"shop",    emoji:"◈",   label:"Shop"},
    {id:"events",  emoji:"◷",   label:"Events"},
    {id:"wishlist",emoji:"♡",   label:wishCount>0?`Saved (${wishCount})`:"Saved"},
    {id:"cart",    emoji:"⊕",   label:cartCount>0?`Cart (${cartCount})`:"Cart"},
  ];

  return (
    <div style={{ maxWidth:430, margin:"0 auto", background:T.navy, minHeight:"100vh", fontFamily:sans, position:"relative", overflow:"hidden" }}>

      {/* Ambient glow bg */}
      <div style={{ position:"fixed", top:-100, left:-100, width:350, height:350, borderRadius:"50%", background:`radial-gradient(circle,${T.blueGlow} 0%,transparent 70%)`, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:-50, right:-50, width:250, height:250, borderRadius:"50%", background:`radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 70%)`, pointerEvents:"none", zIndex:0 }} />

      {/* Header */}
      <div style={{ padding:"16px 18px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(5,13,31,0.95)", position:"sticky", top:0, zIndex:10, backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.glassBrd}` }}>
        <div>
          <p style={{ margin:0, fontSize:8, color:T.gold, fontWeight:500, fontFamily:sans, letterSpacing:3, textTransform:"uppercase" }}>✦ Luxury Gift Curation</p>
          <h1 style={{ margin:0, fontSize:22, fontWeight:600, fontFamily:serif, color:T.offWhite, letterSpacing:-0.3, fontStyle:"italic" }}>GiftCraft</h1>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {[["♡","wishlist",wishCount],["⊕","cart",cartCount]].map(([em,t,n])=>(
            <div key={t} style={{ position:"relative", cursor:"pointer" }} onClick={()=>setTab(t)}>
              <span style={{ fontSize:20, color:n>0?T.goldL:T.muted }}>{em}</span>
              {n>0 && <span style={{ position:"absolute", top:-5, right:-7, background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", borderRadius:10, fontSize:8, fontWeight:600, padding:"1px 5px", fontFamily:sans }}>{n}</span>}
            </div>
          ))}
          <div style={{ width:30, height:30, borderRadius:"50%", background:`linear-gradient(135deg,${T.blue},${T.blueL})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, cursor:"pointer" }}>👤</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ position:"relative", zIndex:1 }}>
        {tab==="home"     && <HomeTab     onAdd={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} onProduct={setProduct} onGoShop={()=>setTab("shop")} countdown={countdown} setCategory={setCategory} />}
        {tab==="shop"     && <ShopTab     onAdd={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} onProduct={setProduct} category={category} setCategory={setCategory} />}
        {tab==="events"   && <EventsTab   onGoShop={()=>setTab("shop")} setCategory={setCategory} />}
        {tab==="wishlist" && <WishlistTab wishlist={wishlist} onRemove={toggleWishlist} onAdd={addToCart} onProduct={setProduct} />}
        {tab==="cart"     && <CartTab     cart={cart} setCart={setCart} onGoShop={()=>setTab("shop")} showToast={showToast} />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"rgba(5,13,31,0.96)", borderTop:`1px solid ${T.glassBrd}`, display:"flex", zIndex:100, backdropFilter:"blur(20px)" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, background:"none", border:"none", padding:"10px 2px 12px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:18, color:tab===t.id?T.goldL:T.dim, transition:"all 0.2s", transform:tab===t.id?"scale(1.1)":"scale(1)", display:"block" }}>{t.emoji}</span>
            <span style={{ fontSize:9, fontWeight:500, fontFamily:sans, color:tab===t.id?T.goldL:T.muted, transition:"color 0.2s", letterSpacing:0.5 }}>{t.label}</span>
            {tab===t.id && <div style={{ width:16, height:1.5, background:`linear-gradient(90deg,${T.gold},${T.goldL})`, borderRadius:10 }} />}
          </button>
        ))}
      </div>

      {/* Product Detail Sheet */}
      {product && (
        <div onClick={()=>setProduct(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center", backdropFilter:"blur(6px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.navy2, border:`1px solid ${T.glassBrd}`, borderTop:`2px solid ${T.gold}`, borderRadius:"24px 24px 0 0", width:"100%", maxWidth:430, maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ height:260, position:"relative", overflow:"hidden" }}>
              <img src={product.img} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.75) saturate(0.9)" }} onError={e=>{e.currentTarget.style.display="none";}} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(5,13,31,0.9) 0%,transparent 55%)" }} />
              <button onClick={()=>setProduct(null)} style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%", background:"rgba(5,13,31,0.7)", border:`1px solid ${T.glassBrd}`, color:T.offWhite, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(8px)" }}>✕</button>
              <span style={{ position:"absolute", top:14, left:14, background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", fontSize:9, fontWeight:600, fontFamily:sans, padding:"4px 12px", borderRadius:20, letterSpacing:1 }}>{product.badge}</span>
            </div>
            <div style={{ padding:"20px 22px 36px" }}>
              <p style={{ margin:"0 0 4px", fontSize:9, color:T.gold, fontFamily:sans, letterSpacing:2.5, textTransform:"uppercase" }}>✦ {product.category}</p>
              <h3 style={{ margin:"0 0 8px", fontSize:22, fontWeight:600, fontFamily:serif, color:T.offWhite, fontStyle:"italic" }}>{product.name}</h3>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <Stars rating={product.rating} />
                <span style={{ color:T.muted, fontSize:12, fontFamily:sans }}>{product.rating} · {product.reviews.toLocaleString()} reviews</span>
              </div>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:14 }}>
                <span style={{ fontSize:30, fontWeight:600, fontFamily:serif, color:T.goldL }}>${product.price}</span>
                <span style={{ fontSize:16, color:T.dim, textDecoration:"line-through", fontFamily:sans }}>${product.original}</span>
                <span style={{ background:T.glass, border:`1px solid ${T.gold}`, color:T.goldL, fontSize:10, fontWeight:500, padding:"3px 10px", borderRadius:10, fontFamily:sans }}>
                  Save ${(product.original-product.price).toFixed(2)}
                </span>
              </div>
              <div style={{ height:1, background:`linear-gradient(90deg,${T.gold},transparent)`, marginBottom:14, width:80 }} />
              <div style={{ display:"flex", gap:8, marginBottom:18 }}>
                {["Complimentary Shipping","Gift Wrapping Included","Premium Packaging"].map(v=>(
                  <span key={v} style={{ background:T.glass, border:`1px solid ${T.glassBrd}`, color:T.muted, fontSize:9, fontWeight:500, padding:"4px 10px", borderRadius:10, fontFamily:sans, letterSpacing:0.3, whiteSpace:"nowrap" }}>✓ {v}</span>
                ))}
              </div>
              <p style={{ color:T.muted, fontSize:13, fontFamily:sans, lineHeight:1.7, marginBottom:22 }}>
                A meticulously curated gift of distinction — perfect for every occasion. Arrives in our signature navy presentation box with a personalised gold-embossed gift card.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>toggleWishlist(product.id)} style={{ flex:1, background:T.glass, border:`1px solid ${T.glassBrd}`, borderRadius:30, padding:14, fontWeight:500, fontSize:14, cursor:"pointer", color:wishlist.includes(product.id)?T.goldL:T.muted, fontFamily:sans, backdropFilter:"blur(8px)", transition:"all 0.2s" }}>
                  {wishlist.includes(product.id)?"❤️ Saved":"🤍 Save"}
                </button>
                <button onClick={()=>{addToCart(product);setProduct(null);}} style={{ flex:2, background:`linear-gradient(135deg,${T.blue},${T.blueL})`, color:"#fff", border:"none", borderRadius:30, padding:14, fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:sans, boxShadow:`0 6px 20px ${T.blueGlow}` }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:82, left:"50%", transform:"translateX(-50%)", background:T.navy3, color:T.offWhite, border:`1px solid ${T.gold}`, borderRadius:30, padding:"10px 22px", fontSize:13, fontWeight:500, fontFamily:sans, zIndex:500, whiteSpace:"nowrap", boxShadow:`0 8px 30px rgba(0,0,0,0.5), 0 0 20px ${T.blueGlow}`, letterSpacing:0.3 }}>
          ✦ {toast}
        </div>
      )}

      <style>{`* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; } input::placeholder{color:rgba(237,240,248,0.3);} select option{background:#0A1628;} ::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
