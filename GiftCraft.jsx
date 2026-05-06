import { useState, useEffect } from "react";

const T = {
  bg: "#FFF8F2", card: "#FFFFFF", primary: "#FF3D57", secondary: "#FF8C00",
  accent: "#00C896", blue: "#1A6EFF", purple: "#8B5CF6",
  text: "#1A1A2E", muted: "#888", border: "#F0E6D8", gold: "#FFB300",
};

const IMG = (id, w = 300, h = 260) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const PRODUCTS = [
  { id: 1,  name: "Luxury Spa Gift Box",       price: 45.99, original: 89.99, category: "birthday",    rating: 4.8, reviews: 1243, badge: "49% OFF",    img: IMG("1556228578-8c89e6adf883"), fb: "🧴" },
  { id: 2,  name: "Crystal Wine Glass Set",     price: 38.50, original: 75.00, category: "wedding",     rating: 4.9, reviews: 876,  badge: "TRENDING",   img: IMG("1510812431401-41d2bd2722f3"), fb: "🍷" },
  { id: 3,  name: "Personalised Memory Book",   price: 29.99, original: 49.99, category: "anniversary", rating: 4.7, reviews: 2341, badge: "NEW",         img: IMG("1544716278-ca5e3f4abd8c"), fb: "📖" },
  { id: 4,  name: "Baby Milestone Set",         price: 34.99, original: 60.00, category: "baby",        rating: 4.9, reviews: 567,  badge: "42% OFF",    img: IMG("1515488042361-ee00e0ddd4e4"), fb: "🧸" },
  { id: 5,  name: "Executive Gift Hamper",      price: 89.99, original: 150.0, category: "corporate",   rating: 4.6, reviews: 334,  badge: "PREMIUM",    img: IMG("1607344645866-009c320b8eba"), fb: "🎩" },
  { id: 6,  name: "Birthday Candle Bundle",     price: 15.99, original: 28.00, category: "birthday",    rating: 4.5, reviews: 4521, badge: "FLASH",      img: IMG("1602523961358-f9f03dd557db"), fb: "🕯️" },
  { id: 7,  name: "Gold Wedding Photo Frame",   price: 55.00, original: 90.00, category: "wedding",     rating: 4.8, reviews: 234,  badge: "HOT",         img: IMG("1519741347686-c1e0aadf4611"), fb: "🖼️" },
  { id: 8,  name: "Aromatherapy Gift Set",      price: 42.00, original: 65.00, category: "birthday",    rating: 4.7, reviews: 1876, badge: "SALE",        img: IMG("1608571423902-eed4a5ad8108"), fb: "🌿" },
  { id: 9,  name: "Custom Name Necklace",       price: 25.99, original: 45.00, category: "anniversary", rating: 4.9, reviews: 3210, badge: "BESTSELLER",  img: IMG("1599643478518-a784e5dc4c8f"), fb: "📿" },
  { id: 10, name: "New Baby Hamper",            price: 65.00, original: 100.0, category: "baby",        rating: 4.8, reviews: 789,  badge: "35% OFF",    img: IMG("1519689680058-324335c77eba"), fb: "👶" },
  { id: 11, name: "Corporate Desk Set",         price: 79.99, original: 120.0, category: "corporate",   rating: 4.5, reviews: 445,  badge: "NEW",         img: IMG("1497366216548-37526070297c"), fb: "💼" },
  { id: 12, name: "Holiday Treat Box",          price: 35.00, original: 55.00, category: "holiday",     rating: 4.7, reviews: 1234, badge: "SEASONAL",    img: IMG("1512389142860-9c449e58a543"), fb: "🎄" },
  { id: 13, name: "Souvenir Scarf Collection",  price: 22.50, original: 40.00, category: "holiday",     rating: 4.6, reviews: 988,  badge: "44% OFF",    img: IMG("1520903920243-00d872a2d1c9"), fb: "🧣" },
  { id: 14, name: "Anniversary Jewellery Box",  price: 48.00, original: 80.00, category: "anniversary", rating: 4.8, reviews: 654,  badge: "HOT",         img: IMG("1515562141207-7a88fb7ce338"), fb: "💍" },
  { id: 15, name: "Scented Candle Gift Set",    price: 32.00, original: 52.00, category: "birthday",    rating: 4.6, reviews: 2100, badge: "38% OFF",    img: IMG("1603006905003-be475563bc89"), fb: "🕯️" },
  { id: 16, name: "Premium Leather Wallet",     price: 44.99, original: 70.00, category: "corporate",   rating: 4.7, reviews: 892,  badge: "TRENDING",   img: IMG("1548036161-18adf4c784f9"), fb: "👜" },
];

const CATEGORIES = [
  { id: "all",         label: "All Gifts",   emoji: "🎁" },
  { id: "birthday",    label: "Birthday",    emoji: "🎂" },
  { id: "wedding",     label: "Wedding",     emoji: "💍" },
  { id: "anniversary", label: "Anniversary", emoji: "💑" },
  { id: "baby",        label: "Baby",        emoji: "👶" },
  { id: "corporate",   label: "Corporate",   emoji: "🏢" },
  { id: "holiday",     label: "Holiday",     emoji: "🎄" },
];

const EVENT_TYPES = ["Birthday Party","Wedding","Baby Shower","Anniversary","Corporate Event","Holiday Party","Graduation"];

const EVENTS_INIT = [
  { id: 1, name: "Sarah's 30th Birthday", date: "2026-06-15", type: "Birthday Party", guests: 20, budget: 500,
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=430&h=90&fit=crop&auto=format&q=80" },
  { id: 2, name: "Tom & Lisa's Wedding",  date: "2026-07-22", type: "Wedding",         guests: 80, budget: 2000,
    img: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=430&h=90&fit=crop&auto=format&q=80" },
];

const pad = n => String(n).padStart(2, "0");

function useCountdown() {
  const [t, setT] = useState({ h: 5, m: 23, s: 47 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(p => {
        let { h, m, s } = p;
        if (--s < 0) { s = 59; if (--m < 0) { m = 59; if (--h < 0) h = 23; } }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ── Product Card ─────────────────────────────────────────────────────── */
function ProductCard({ p, onAdd, onWishlist, wishlisted, onClick }) {
  const [hover, setHover] = useState(false);
  const [pop, setPop] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const disc = Math.round(((p.original - p.price) / p.original) * 100);
  const flash = /FLASH|OFF|SALE/.test(p.badge);

  return (
    <div
      onClick={() => onClick(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ borderRadius: 18, overflow: "hidden", cursor: "pointer", background: T.card, border: `1px solid ${T.border}`, position: "relative",
        transform: hover ? "translateY(-5px) scale(1.01)" : "none",
        boxShadow: hover ? "0 16px 40px rgba(0,0,0,0.13)" : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
    >
      <span style={{ position:"absolute", top:9, left:9, zIndex:2, background: flash ? T.primary : T.secondary, color:"#fff", fontSize:9, fontWeight:900, padding:"3px 8px", borderRadius:20 }}>{p.badge}</span>
      <button
        onClick={e => { e.stopPropagation(); setPop(true); setTimeout(()=>setPop(false),500); onWishlist(p.id); }}
        style={{ position:"absolute", top:8, right:8, zIndex:2, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.92)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
          transform: pop ? "scale(1.7)" : "scale(1)", transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
      >{wishlisted ? "❤️" : "🤍"}</button>

      <div style={{ height: 160, overflow: "hidden", background: "#f5f5f5" }}>
        {imgOk
          ? <img src={p.img} alt={p.name} onError={() => setImgOk(false)} style={{ width:"100%", height:"100%", objectFit:"cover", transform: hover ? "scale(1.07)" : "scale(1)", transition:"transform 0.4s ease", display:"block" }} />
          : <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, background:"#FFF3E0" }}>{p.fb}</div>
        }
      </div>

      <div style={{ padding: "10px 12px 12px" }}>
        <p style={{ margin:"0 0 3px", fontSize:12, fontWeight:700, color:T.text, lineHeight:1.3, WebkitLineClamp:2, overflow:"hidden", display:"-webkit-box", WebkitBoxOrient:"vertical" }}>{p.name}</p>
        <div style={{ display:"flex", alignItems:"center", gap:3, marginBottom:6 }}>
          <span style={{ color:T.gold, fontSize:11 }}>{"★".repeat(Math.round(p.rating))}</span>
          <span style={{ color:T.muted, fontSize:10 }}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:15, fontWeight:900, color:T.primary }}>${p.price}</span>
            <span style={{ fontSize:10, color:T.muted, textDecoration:"line-through", marginLeft:4 }}>${p.original}</span>
          </div>
          <button onClick={e => { e.stopPropagation(); onAdd(p); }} onMouseDown={e=>e.currentTarget.style.transform="scale(0.9)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
            style={{ background:T.primary, color:"#fff", border:"none", borderRadius:20, padding:"5px 11px", fontSize:11, fontWeight:800, cursor:"pointer", transition:"transform 0.15s" }}>+ Add</button>
        </div>
        <span style={{ background:"#FFF0F0", color:T.primary, fontSize:9, fontWeight:800, padding:"2px 7px", borderRadius:10, marginTop:5, display:"inline-block" }}>SAVE {disc}%</span>
      </div>
    </div>
  );
}

/* ── Home ─────────────────────────────────────────────────────────────── */
function HomeTab({ onAdd, onWishlist, wishlist, onProduct, onGoShop, countdown, setCategory }) {
  const [bi, setBi] = useState(0);
  const banners = [
    { headline:"Mega Gift Sale!", sub:"Up to 60% off curated gifts", btn:"Shop Now", c1:"#FF3D57", c2:"#FF8C00",
      img:"https://images.unsplash.com/photo-1607344645866-009c320b8eba?w=500&h=220&fit=crop&auto=format&q=80" },
    { headline:"Plan Your Event!", sub:"Gift registries made effortless", btn:"Events", c1:"#8B5CF6", c2:"#1A6EFF",
      img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=220&fit=crop&auto=format&q=80" },
    { headline:"New Arrivals!", sub:"Fresh souvenir drops every week", btn:"Explore", c1:"#00C896", c2:"#1A6EFF",
      img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&h=220&fit=crop&auto=format&q=80" },
  ];
  useEffect(() => { const id = setInterval(() => setBi(i=>(i+1)%banners.length), 4500); return ()=>clearInterval(id); }, []);
  const b = banners[bi];

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Search */}
      <div style={{ padding:"12px 16px 8px", background:T.bg, position:"sticky", top:58, zIndex:9 }}>
        <div style={{ background:T.card, borderRadius:50, padding:"9px 16px", display:"flex", alignItems:"center", gap:8, border:`1.5px solid ${T.border}` }}>
          <span>🔍</span>
          <input placeholder="Search gifts by occasion, budget…" style={{ border:"none", outline:"none", flex:1, fontSize:13, background:"transparent", color:T.text }} />
          <span style={{ background:T.primary, color:"#fff", fontSize:10, fontWeight:800, padding:"3px 9px", borderRadius:20 }}>Search</span>
        </div>
      </div>

      {/* Banner */}
      <div style={{ margin:"8px 16px 0", borderRadius:20, overflow:"hidden", position:"relative", height:200 }}>
        <img src={b.img} alt="banner" key={bi} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${b.c1}dd,${b.c2}88)` }} />
        <div style={{ position:"relative", padding:"22px 20px" }}>
          <span style={{ color:"rgba(255,255,255,0.8)", fontSize:10, fontWeight:800, letterSpacing:2, textTransform:"uppercase" }}>Limited Offer</span>
          <h2 style={{ margin:"4px 0 4px", color:"#fff", fontSize:26, fontWeight:900, lineHeight:1.1 }}>{b.headline}</h2>
          <p style={{ margin:"0 0 14px", color:"rgba(255,255,255,0.85)", fontSize:13 }}>{b.sub}</p>
          <button onClick={onGoShop} style={{ background:"#fff", color:b.c1, border:"none", borderRadius:30, padding:"9px 18px", fontWeight:800, fontSize:13, cursor:"pointer" }}>{b.btn} →</button>
        </div>
        <div style={{ position:"absolute", bottom:10, right:14, display:"flex", gap:5 }}>
          {banners.map((_,i)=><div key={i} onClick={()=>setBi(i)} style={{ width:i===bi?18:6, height:6, borderRadius:10, background:i===bi?"#fff":"rgba(255,255,255,0.5)", transition:"all 0.3s", cursor:"pointer" }} />)}
        </div>
      </div>

      {/* Flash Deals */}
      <div style={{ padding:"14px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontSize:16, fontWeight:900, color:T.text }}>⚡ Flash Deals</span>
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ fontSize:11, color:T.muted }}>Ends in</span>
            {[pad(countdown.h),pad(countdown.m),pad(countdown.s)].map((v,i)=>(
              <span key={i} style={{ background:T.text, color:"#fff", borderRadius:6, padding:"3px 6px", fontSize:12, fontWeight:900, fontVariantNumeric:"tabular-nums" }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ overflowX:"auto", padding:"0 16px 16px", display:"flex", gap:12, scrollbarWidth:"none" }}>
        {PRODUCTS.slice(0,6).map(p=>(
          <div key={p.id} style={{ minWidth:162, flexShrink:0 }}>
            <ProductCard p={p} onAdd={onAdd} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />
          </div>
        ))}
      </div>

      {/* Occasions */}
      <div style={{ padding:"0 16px 16px" }}>
        <h3 style={{ margin:"0 0 10px", fontSize:15, fontWeight:900, color:T.text }}>Shop by Occasion</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {CATEGORIES.slice(1).map(cat=>(
            <button key={cat.id} onClick={()=>{setCategory(cat.id);onGoShop();}}
              style={{ background:T.card, border:`1.5px solid ${T.border}`, borderRadius:14, padding:"11px 4px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.primary;e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 4px 12px rgba(255,61,87,0.15)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
              <span style={{ fontSize:26 }}>{cat.emoji}</span>
              <span style={{ fontSize:11, fontWeight:700, color:T.text }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div style={{ padding:"0 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <h3 style={{ margin:0, fontSize:15, fontWeight:900, color:T.text }}>🔥 Trending Now</h3>
          <button onClick={onGoShop} style={{ background:"none", border:"none", color:T.primary, fontSize:13, fontWeight:700, cursor:"pointer" }}>See All</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {PRODUCTS.slice(6,10).map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)} onClick={onProduct} />)}
        </div>
      </div>

      {/* Souvenir banner */}
      <div style={{ margin:"20px 16px 0", borderRadius:18, overflow:"hidden", position:"relative", height:140 }}>
        <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=140&fit=crop&auto=format&q=80" alt="souvenirs" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(26,110,255,0.88),rgba(139,92,246,0.75))", padding:"18px 20px" }}>
          <p style={{ margin:"0 0 2px", color:"#FFD700", fontSize:10, fontWeight:800, letterSpacing:2, textTransform:"uppercase" }}>Souvenir Spotlight</p>
          <p style={{ margin:"0 0 10px", color:"#fff", fontSize:17, fontWeight:900 }}>Gifts from Around the World 🌍</p>
          <button onClick={onGoShop} style={{ background:"#fff", color:T.blue, border:"none", borderRadius:20, padding:"7px 14px", fontWeight:800, fontSize:12, cursor:"pointer" }}>Browse Collection</button>
        </div>
      </div>
    </div>
  );
}

/* ── Shop ─────────────────────────────────────────────────────────────── */
function ShopTab({ onAdd, onWishlist, wishlist, onProduct, category, setCategory }) {
  const [sort, setSort] = useState("popular");
  let list = category === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  if (sort === "low")  list = [...list].sort((a,b)=>a.price-b.price);
  if (sort === "high") list = [...list].sort((a,b)=>b.price-a.price);
  if (sort === "new")  list = [...list].reverse();

  return (
    <div style={{ paddingBottom:90 }}>
      <div style={{ position:"sticky", top:58, background:T.bg, zIndex:9, padding:"10px 0 6px" }}>
        <div style={{ overflowX:"auto", display:"flex", gap:7, padding:"0 16px", scrollbarWidth:"none" }}>
          {CATEGORIES.map(cat=>(
            <button key={cat.id} onClick={()=>setCategory(cat.id)} style={{ flexShrink:0, background:category===cat.id?T.primary:T.card, color:category===cat.id?"#fff":T.text, border:`1.5px solid ${category===cat.id?T.primary:T.border}`, borderRadius:30, padding:"6px 13px", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap" }}>{cat.emoji} {cat.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:"8px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:12, color:T.muted, fontWeight:600 }}>{list.length} gifts found</span>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{ border:`1px solid ${T.border}`, borderRadius:8, padding:"5px 10px", fontSize:12, color:T.text, background:T.card, fontWeight:600 }}>
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

/* ── Events ───────────────────────────────────────────────────────────── */
function EventsTab({ onGoShop, setCategory }) {
  const [events, setEvents] = useState(EVENTS_INIT);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:"", date:"", type:"", guests:"", budget:"" });
  const [err, setErr] = useState("");
  const daysUntil = d => Math.max(0, Math.ceil((new Date(d)-new Date())/86400000));

  const save = () => {
    if (!form.name||!form.date||!form.type){setErr("Please fill in name, date and type.");return;}
    const eventImgs = { "Wedding":"1519741347686-c1e0aadf4611","Baby Shower":"1519689680058-324335c77eba","Birthday Party":"1530103862676-de8c9debad1d" };
    const imgId = eventImgs[form.type] || "1530103862676-de8c9debad1d";
    setEvents(p=>[...p,{...form,id:Date.now(),guests:parseInt(form.guests)||0,budget:parseFloat(form.budget)||0,img:`https://images.unsplash.com/photo-${imgId}?w=430&h=90&fit=crop&auto=format&q=80`}]);
    setForm({name:"",date:"",type:"",guests:"",budget:""});setShowForm(false);setErr("");
  };

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:900, color:T.text }}>My Events 🎉</h2>
        <button onClick={()=>setShowForm(true)} style={{ background:T.primary, color:"#fff", border:"none", borderRadius:30, padding:"10px 16px", fontWeight:800, fontSize:13, cursor:"pointer" }}>+ New Event</button>
      </div>

      {events.map(ev => {
        const days = daysUntil(ev.date);
        return (
          <div key={ev.id} style={{ background:T.card, borderRadius:18, marginBottom:12, border:`1.5px solid ${T.border}`, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ height:90, overflow:"hidden", position:"relative" }}>
              <img src={ev.img} alt={ev.type} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <p style={{ margin:0, fontWeight:800, fontSize:15, color:"#fff" }}>{ev.name}</p>
                  <p style={{ margin:"3px 0 0", fontSize:12, color:"rgba(255,255,255,0.8)" }}>{ev.type} • {ev.date}</p>
                </div>
                <span style={{ background:days<=14?T.primary:T.accent, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 10px", borderRadius:20 }}>
                  {days===0?"TODAY!":`${days}d away`}
                </span>
              </div>
            </div>
            <div style={{ display:"flex", gap:12, padding:"10px 14px", alignItems:"center" }}>
              {[["Guests",ev.guests,T.primary],["Budget",`$${ev.budget.toLocaleString()}`,T.blue],["Per Guest",ev.budget&&ev.guests?`$${Math.round(ev.budget/ev.guests)}`:"—",T.purple]].map(([l,v,c])=>(
                <div key={l} style={{ textAlign:"center" }}>
                  <p style={{ margin:0, fontSize:17, fontWeight:900, color:c }}>{v}</p>
                  <p style={{ margin:0, fontSize:10, color:T.muted }}>{l}</p>
                </div>
              ))}
              <div style={{ flex:1, display:"flex", justifyContent:"flex-end" }}>
                <button onClick={()=>{setCategory("all");onGoShop();}} style={{ background:"#F0FFF4", color:T.accent, border:"none", borderRadius:20, padding:"7px 13px", fontSize:12, fontWeight:700, cursor:"pointer" }}>🎁 Shop Gifts</button>
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ borderRadius:18, overflow:"hidden", position:"relative", height:130, marginTop:4 }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=430&h=130&fit=crop&auto=format&q=80" alt="suggestions" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(26,110,255,0.9),rgba(0,200,150,0.8))", padding:18 }}>
          <p style={{ margin:"0 0 4px", fontWeight:800, fontSize:15, color:"#fff" }}>✨ Smart Gift Suggestions</p>
          <p style={{ margin:"0 0 10px", fontSize:12, color:"rgba(255,255,255,0.9)" }}>Set your budget — we curate the perfect bundle</p>
          <button onClick={()=>{setCategory("all");onGoShop();}} style={{ background:"#fff", color:T.blue, border:"none", borderRadius:20, padding:"7px 14px", fontWeight:800, fontSize:12, cursor:"pointer" }}>Explore Gifts →</button>
        </div>
      </div>

      {showForm && (
        <div onClick={()=>setShowForm(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.card, borderRadius:"22px 22px 0 0", padding:"20px 20px 32px", width:"100%", maxWidth:430 }}>
            <div style={{ width:38, height:4, background:"#DDD", borderRadius:10, margin:"0 auto 16px" }} />
            <h3 style={{ margin:"0 0 16px", fontWeight:900, fontSize:18, color:T.text }}>Create New Event 🎉</h3>
            {[{l:"Event Name",k:"name",t:"text",ph:"e.g. Sarah's 30th Birthday"},{l:"Date",k:"date",t:"date"},{l:"Guests",k:"guests",t:"number",ph:"e.g. 30"},{l:"Budget ($)",k:"budget",t:"number",ph:"e.g. 500"}].map(f=>(
              <div key={f.k} style={{ marginBottom:11 }}>
                <label style={{ fontSize:12, fontWeight:700, color:T.muted, display:"block", marginBottom:5 }}>{f.l}</label>
                <input type={f.t} placeholder={f.ph||""} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:12, fontSize:14, color:T.text, boxSizing:"border-box", outline:"none", fontFamily:"inherit" }} />
              </div>
            ))}
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:12, fontWeight:700, color:T.muted, display:"block", marginBottom:5 }}>Event Type</label>
              <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:12, fontSize:14, color:T.text, background:T.card, outline:"none", fontFamily:"inherit" }}>
                <option value="">Select type…</option>
                {EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {err && <p style={{ color:T.primary, fontSize:12, margin:"0 0 10px" }}>{err}</p>}
            <button onClick={save} style={{ width:"100%", background:T.primary, color:"#fff", border:"none", borderRadius:30, padding:14, fontWeight:900, fontSize:15, cursor:"pointer" }}>Create Event 🎉</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Wishlist ─────────────────────────────────────────────────────────── */
function WishlistTab({ wishlist, onRemove, onAdd, onProduct }) {
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div style={{ padding:"16px 16px 90px" }}>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:900, color:T.text }}>Wishlist ❤️</h2>
      <p style={{ margin:"0 0 16px", fontSize:12, color:T.muted }}>{items.length} item{items.length!==1?"s":""} saved</p>
      {items.length===0
        ? <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:64, marginBottom:12 }}>🤍</div>
            <p style={{ fontWeight:700, fontSize:17, color:T.text }}>No saved items yet</p>
            <p style={{ color:T.muted, fontSize:13 }}>Tap the heart on any gift to save it here</p>
          </div>
        : <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {items.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onWishlist={onRemove} wishlisted onClick={onProduct} />)}
          </div>
      }
    </div>
  );
}

/* ── Cart ─────────────────────────────────────────────────────────────── */
function CartTab({ cart, setCart, onGoShop, showToast }) {
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  const count = cart.reduce((s,x)=>s+x.qty,0);
  const [placed, setPlaced] = useState(false);

  if (placed) return (
    <div style={{ padding:"60px 20px", textAlign:"center" }}>
      <div style={{ fontSize:80, marginBottom:16 }}>🎉</div>
      <h2 style={{ margin:"0 0 8px", fontWeight:900, fontSize:22, color:T.text }}>Order Placed!</h2>
      <p style={{ color:T.muted, fontSize:14, marginBottom:24 }}>Your curated gifts are on their way 🚀</p>
      <button onClick={()=>{setCart([]);setPlaced(false);onGoShop();}} style={{ background:T.primary, color:"#fff", border:"none", borderRadius:30, padding:"12px 24px", fontWeight:800, fontSize:14, cursor:"pointer" }}>Continue Shopping</button>
    </div>
  );

  return (
    <div style={{ padding:"16px 16px 90px" }}>
      <h2 style={{ margin:"0 0 4px", fontSize:20, fontWeight:900, color:T.text }}>My Cart 🛒</h2>
      {count>0 && <p style={{ margin:"0 0 14px", fontSize:12, color:T.muted }}>{count} item{count!==1?"s":""}</p>}
      {cart.length===0
        ? <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:64, marginBottom:12 }}>🛒</div>
            <p style={{ fontWeight:700, fontSize:17, color:T.text }}>Your cart is empty</p>
            <p style={{ color:T.muted, fontSize:13, marginBottom:20 }}>Discover amazing gifts for every occasion</p>
            <button onClick={onGoShop} style={{ background:T.primary, color:"#fff", border:"none", borderRadius:30, padding:"12px 24px", fontWeight:800, fontSize:14, cursor:"pointer" }}>Start Shopping</button>
          </div>
        : <>
            {cart.map(item=>(
              <div key={item.id} style={{ background:T.card, borderRadius:16, padding:12, marginBottom:10, display:"flex", gap:12, border:`1px solid ${T.border}` }}>
                <div style={{ width:72, height:72, borderRadius:12, overflow:"hidden", flexShrink:0, background:"#f5f5f5" }}>
                  <img src={item.img} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ margin:"0 0 2px", fontWeight:700, fontSize:13, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</p>
                  <p style={{ margin:"0 0 8px", fontSize:15, fontWeight:900, color:T.primary }}>${item.price}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <button onClick={()=>setCart(p=>p.map(x=>x.id===item.id?{...x,qty:Math.max(1,x.qty-1)}:x))} style={{ width:26,height:26,borderRadius:"50%",border:`1px solid ${T.border}`,background:T.card,cursor:"pointer",fontWeight:800,fontSize:15 }}>−</button>
                    <span style={{ fontWeight:800,fontSize:14,minWidth:16,textAlign:"center" }}>{item.qty}</span>
                    <button onClick={()=>setCart(p=>p.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x))} style={{ width:26,height:26,borderRadius:"50%",background:T.primary,border:"none",color:"#fff",cursor:"pointer",fontWeight:800,fontSize:15 }}>+</button>
                    <button onClick={()=>setCart(p=>p.filter(x=>x.id!==item.id))} style={{ marginLeft:"auto",background:"none",border:"none",fontSize:16,cursor:"pointer",color:"#ccc" }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              <input placeholder="Promo code" style={{ flex:1,padding:"10px 14px",border:`1.5px solid ${T.border}`,borderRadius:30,fontSize:13,color:T.text,outline:"none" }} />
              <button onClick={()=>showToast("🎉 Code applied!")} style={{ background:T.secondary,color:"#fff",border:"none",borderRadius:30,padding:"10px 16px",fontWeight:700,fontSize:12,cursor:"pointer" }}>Apply</button>
            </div>
            <div style={{ background:T.card, borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${T.border}` }}>
              {[["Subtotal",`$${total.toFixed(2)}`],["Shipping","FREE 🚀"],["Discount","-$0.00"]].map(([l,v])=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                  <span style={{ color:T.muted,fontSize:13 }}>{l}</span>
                  <span style={{ fontWeight:700,fontSize:13,color:v.includes("FREE")?T.accent:T.text }}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",borderTop:`1px solid ${T.border}`,paddingTop:10 }}>
                <span style={{ fontWeight:800,fontSize:15 }}>Total</span>
                <span style={{ fontWeight:900,fontSize:18,color:T.primary }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={()=>{setPlaced(true);showToast("🎉 Order placed!");}} style={{ width:"100%",background:`linear-gradient(135deg,${T.primary},${T.secondary})`,color:"#fff",border:"none",borderRadius:30,padding:15,fontWeight:900,fontSize:16,cursor:"pointer" }}>
              Checkout • ${total.toFixed(2)}
            </button>
          </>
      }
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────────────── */
export default function GiftCraft() {
  const [tab, setTab]           = useState("home");
  const [cart, setCart]         = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState("all");
  const [product, setProduct]   = useState(null);
  const [toast, setToast]       = useState(null);
  const countdown               = useCountdown();

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),2600); };
  const addToCart = p => {
    setCart(prev => { const ex=prev.find(x=>x.id===p.id); return ex?prev.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...prev,{...p,qty:1}]; });
    showToast("Added to cart!");
  };
  const toggleWishlist = id => setWishlist(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const cartCount = cart.reduce((s,x)=>s+x.qty,0);
  const wishCount = wishlist.length;

  const tabs = [
    {id:"home",    emoji:"🏠",label:"Home"},
    {id:"shop",    emoji:"🛍️",label:"Shop"},
    {id:"events",  emoji:"🎉",label:"Events"},
    {id:"wishlist",emoji:"❤️",label:wishCount>0?`Saved (${wishCount})`:"Saved"},
    {id:"cart",    emoji:"🛒",label:cartCount>0?`Cart (${cartCount})`:"Cart"},
  ];

  return (
    <div style={{ maxWidth:430, margin:"0 auto", background:T.bg, minHeight:"100vh", fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif', position:"relative" }}>
      {/* Header */}
      <div style={{ padding:"14px 16px 10px", display:"flex", justifyContent:"space-between", alignItems:"center", background:T.bg, position:"sticky", top:0, zIndex:10, borderBottom:`1px solid ${T.border}` }}>
        <div>
          <p style={{ margin:0, fontSize:9, color:T.muted, fontWeight:700, letterSpacing:2, textTransform:"uppercase" }}>Your Gift Universe</p>
          <h1 style={{ margin:0, fontSize:22, fontWeight:900, color:T.text, letterSpacing:-0.5 }}>🎁 GiftCraft</h1>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {[["❤️","wishlist",wishCount],["🛒","cart",cartCount]].map(([em,t,n])=>(
            <div key={t} style={{ position:"relative", cursor:"pointer" }} onClick={()=>setTab(t)}>
              <span style={{ fontSize:22 }}>{em}</span>
              {n>0 && <span style={{ position:"absolute", top:-4, right:-6, background:T.primary, color:"#fff", borderRadius:10, fontSize:8, fontWeight:900, padding:"1px 4px" }}>{n}</span>}
            </div>
          ))}
          <span style={{ fontSize:22, cursor:"pointer" }}>👤</span>
        </div>
      </div>

      {tab==="home"     && <HomeTab     onAdd={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} onProduct={setProduct} onGoShop={()=>setTab("shop")} countdown={countdown} setCategory={setCategory} />}
      {tab==="shop"     && <ShopTab     onAdd={addToCart} onWishlist={toggleWishlist} wishlist={wishlist} onProduct={setProduct} category={category} setCategory={setCategory} />}
      {tab==="events"   && <EventsTab   onGoShop={()=>setTab("shop")} setCategory={setCategory} />}
      {tab==="wishlist" && <WishlistTab wishlist={wishlist} onRemove={toggleWishlist} onAdd={addToCart} onProduct={setProduct} />}
      {tab==="cart"     && <CartTab     cart={cart} setCart={setCart} onGoShop={()=>setTab("shop")} showToast={showToast} />}

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:T.card, borderTop:`1px solid ${T.border}`, display:"flex", zIndex:100 }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, background:"none", border:"none", padding:"8px 2px 10px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
            <span style={{ fontSize:20, filter:tab===t.id?"none":"grayscale(1) opacity(0.45)", transform:tab===t.id?"scale(1.15)":"scale(1)", transition:"all 0.2s", display:"block" }}>{t.emoji}</span>
            <span style={{ fontSize:9, fontWeight:700, color:tab===t.id?T.primary:T.muted, transition:"color 0.2s" }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Product sheet */}
      {product && (
        <div onClick={()=>setProduct(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.card, borderRadius:"22px 22px 0 0", width:"100%", maxWidth:430, maxHeight:"88vh", overflowY:"auto" }}>
            <div style={{ height:250, position:"relative", overflow:"hidden" }}>
              <img src={product.img} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)" }} />
              <button onClick={()=>setProduct(null)} style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.9)", border:"none", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              <span style={{ position:"absolute", top:14, left:14, background:T.primary, color:"#fff", fontSize:10, fontWeight:900, padding:"4px 10px", borderRadius:20 }}>{product.badge}</span>
            </div>
            <div style={{ padding:"18px 20px 32px" }}>
              <h3 style={{ margin:"0 0 6px", fontSize:19, fontWeight:900, color:T.text }}>{product.name}</h3>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                <span style={{ color:T.gold }}>{"★".repeat(Math.round(product.rating))}</span>
                <span style={{ color:T.muted, fontSize:12 }}>{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
              </div>
              <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:28, fontWeight:900, color:T.primary }}>${product.price}</span>
                <span style={{ fontSize:16, color:T.muted, textDecoration:"line-through" }}>${product.original}</span>
                <span style={{ background:"#E8FFE8", color:T.accent, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:10 }}>Save ${(product.original-product.price).toFixed(2)}</span>
              </div>
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                <span style={{ background:"#F0FFF4", color:T.accent, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:10 }}>✓ Free Shipping</span>
                <span style={{ background:"#FFF8E8", color:T.secondary, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:10 }}>✓ Gift Wrapping</span>
              </div>
              <p style={{ color:T.muted, fontSize:13, lineHeight:1.6, marginBottom:20 }}>
                A beautifully curated gift perfect for any occasion. Comes in premium eco-friendly packaging with a personalised gift card option. Makes the ideal souvenir or event gift for your loved ones.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>toggleWishlist(product.id)} style={{ flex:1, background:"#FFF0F4", border:"none", borderRadius:30, padding:13, fontWeight:700, fontSize:14, cursor:"pointer", color:T.primary }}>
                  {wishlist.includes(product.id)?"❤️ Saved":"🤍 Save"}
                </button>
                <button onClick={()=>{addToCart(product);setProduct(null);}} style={{ flex:2, background:T.primary, color:"#fff", border:"none", borderRadius:30, padding:13, fontWeight:900, fontSize:14, cursor:"pointer" }}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:76, left:"50%", transform:"translateX(-50%)", background:T.text, color:"#fff", borderRadius:30, padding:"11px 20px", fontSize:13, fontWeight:700, zIndex:500, whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(0,0,0,0.25)" }}>
          {toast}
        </div>
      )}

      <style>{`* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; } input::placeholder{color:#bbb;} ::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
