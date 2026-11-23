"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  tag: string;
};

const products: Product[] = [
  { id: 1, name: "Gaming Laptop X", category: "Computers", price: 12499, oldPrice: 13999, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900", tag: "BEST SELLER" },
  { id: 2, name: "Smartphone Pro", category: "Phones", price: 8999, oldPrice: 9999, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900", tag: "NEW" },
  { id: 3, name: "Wireless Headphones", category: "Accessories", price: 1299, oldPrice: 1599, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900", tag: "HOT" },
  { id: 4, name: "Smart Watch", category: "Accessories", price: 1899, oldPrice: 2199, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900", tag: "NEW" },
  { id: 5, name: "Gaming Console", category: "Gaming", price: 6499, oldPrice: 6999, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=900", tag: "POPULAR" },
  { id: 6, name: "Mechanical Keyboard", category: "Accessories", price: 799, oldPrice: 999, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900", tag: "SALE" },
];

const categories = ["All", "Computers", "Phones", "Gaming", "Accessories"];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = category === "All" || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [category, search]
  );

  const addToCart = (id: number) => {
    setCart((current) => {
      const found = current.find((item) => item.id === id);
      return found
        ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { id, quantity: 1 }];
    });
  };

  const changeQuantity = (id: number, amount: number) => {
    setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-[#070a12] text-white selection:bg-cyan-400 selection:text-black">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes glow {
          0%, 100% { opacity: .45; }
          50% { opacity: .9; }
        }
        .float-animation { animation: float 5s ease-in-out infinite; }
        .glow-animation { animation: glow 4s ease-in-out infinite; }
        .glass { background: rgba(255,255,255,.045); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,.09); }
      `}</style>

      <div className="hidden justify-between border-b border-white/10 bg-[#0b1020] px-8 py-2 text-xs text-gray-400 md:flex">
        <span>✦ Premium technology store in Morocco</span>
        <div className="flex gap-8"><span>🚚 Delivery across Morocco</span><span>🔒 Secure shopping</span><span>☎ Customer support</span></div>
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080c17]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5">
          <a href="#" className="text-3xl font-black tracking-widest">TAVI<span className="text-cyan-400">XO</span><span className="ml-2 align-top text-[9px] font-medium tracking-[.3em] text-gray-500">TECH STORE</span></a>
          <div className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
            <a href="#" className="transition hover:text-cyan-400">Home</a><a href="#products" className="transition hover:text-cyan-400">Shop</a><a href="#categories" className="transition hover:text-cyan-400">Categories</a><a href="#offers" className="transition hover:text-cyan-400">Offers</a><a href="#about" className="transition hover:text-cyan-400">About</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCartOpen(true)} className="relative rounded-full border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400 hover:bg-cyan-400/10">
              <span className="text-lg">🛒</span>
              {cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-xs font-bold text-black">{cartCount}</span>}
            </button>
            <a href="#products" className="hidden rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-white sm:block">Explore Store ↗</a>
          </div>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-cyan-300"><span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />THE NEXT GENERATION OF TECH</div>
            <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">THE FUTURE<br />IS <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">HERE.</span></h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-gray-400">Upgrade your tech world. Discover premium devices, powerful performance and the latest technology — all in one place.</p>
            <div className="mt-9 flex flex-wrap gap-4"><a href="#products" className="rounded-full bg-cyan-400 px-8 py-4 font-bold text-black shadow-[0_0_35px_rgba(34,211,238,.2)] transition hover:-translate-y-1 hover:bg-white">Discover Products ↗</a><a href="#categories" className="rounded-full border border-white/20 px-8 py-4 font-semibold transition hover:border-cyan-400 hover:text-cyan-300">Explore Categories</a></div>
            <div className="mt-12 flex gap-10 border-t border-white/10 pt-7"><div><p className="text-2xl font-black">100%</p><p className="mt-1 text-xs text-gray-500">Tech focused</p></div><div><p className="text-2xl font-black">24/7</p><p className="mt-1 text-xs text-gray-500">Online access</p></div><div><p className="text-2xl font-black">MA</p><p className="mt-1 text-xs text-gray-500">Made for Morocco</p></div></div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="glow-animation absolute inset-10 rounded-full bg-blue-500/20 blur-[90px]" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-4 shadow-2xl shadow-blue-950/50">
              <div className="absolute left-8 top-8 z-10 rounded-full border border-cyan-300/30 bg-black/40 px-4 py-2 text-xs tracking-widest text-cyan-200">NEW COLLECTION</div>
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000" alt="Temporary smartphone product image" className="float-animation h-[390px] w-full rounded-2xl object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/65 p-5 backdrop-blur-xl"><p className="text-xs tracking-[.3em] text-cyan-300">TAVIXO SELECTION</p><div className="mt-2 flex items-center justify-between"><div><h3 className="text-xl font-bold">Technology. Redefined.</h3><p className="mt-1 text-sm text-gray-400">Discover what&apos;s next.</p></div><span className="text-3xl">✦</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">{[["🚚","Delivery","Across Morocco"],["🔒","Secure shopping","Your orders matter"],["✦","Selected products","Tech worth having"],["💬","Customer support","We’re here to help"]].map(([icon,title,desc]) => <div key={title} className="flex items-center gap-4"><span className="text-3xl">{icon}</span><div><p className="font-bold">{title}</p><p className="mt-1 text-xs text-gray-500">{desc}</p></div></div>)}</div></section>

      <section id="categories" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-9 flex items-end justify-between"><div><p className="text-xs font-bold tracking-[.3em] text-cyan-400">EXPLORE TAVIXO</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Shop by category</h2></div><span className="hidden text-sm text-gray-500 sm:block">Find your next upgrade ↗</span></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[["💻","Computers","Power & performance"],["📱","Phones","Stay connected"],["🎮","Gaming","Level up"],["🎧","Accessories","Complete your setup"]].map(([icon,name,desc]) => <button key={name} onClick={() => { setCategory(name); document.getElementById("products")?.scrollIntoView({behavior:"smooth"}); }} className="glass group rounded-2xl p-6 text-left transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-cyan-400/[0.07]"><span className="text-4xl">{icon}</span><h3 className="mt-5 font-bold">{name}</h3><p className="mt-1 text-xs text-gray-500">{desc}</p><p className="mt-5 text-sm text-cyan-300">Explore ↗</p></button>)}</div>
      </section>

      <section id="products" className="bg-[#0a0f1c] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-bold tracking-[.3em] text-cyan-400">CURATED FOR YOU</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Featured products</h2><p className="mt-3 text-sm text-gray-500">Explore our selection of technology.</p></div><div className="flex flex-col gap-3 sm:flex-row"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none transition focus:border-cyan-400" /><button onClick={() => {setSearch("");setCategory("All");}} className="rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-cyan-400">Reset filters</button></div></div>
          <div className="my-8 flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-5 py-2.5 text-sm transition ${category===item ? "bg-cyan-400 font-bold text-black" : "border border-white/10 bg-white/[0.03] text-gray-400 hover:border-cyan-400 hover:text-white"}`}>{item}</button>)}</div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product) => <article key={product.id} className="glass group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"><div className="relative overflow-hidden bg-[#111827]"><span className="absolute left-4 top-4 z-10 rounded-full bg-cyan-400 px-3 py-1.5 text-[10px] font-black tracking-wider text-black">{product.tag}</span><button onClick={() => setSelected(product)} className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs backdrop-blur hover:bg-cyan-400 hover:text-black">View ↗</button><img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110" /></div><div className="p-5"><p className="text-xs uppercase tracking-widest text-cyan-400">{product.category}</p><h3 className="mt-2 text-lg font-bold">{product.name}</h3><div className="mt-5 flex items-center justify-between gap-3"><div><p className="text-xl font-black">{product.price.toLocaleString("en-US")} <span className="text-xs text-gray-400">MAD</span></p><p className="mt-1 text-xs text-gray-500 line-through">{product.oldPrice.toLocaleString("en-US")} MAD</p></div><button onClick={() => addToCart(product.id)} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-400">+ Add to cart</button></div></div></article>)}</div>
          {filteredProducts.length===0 && <p className="py-16 text-center text-gray-400">No products found. Try another search.</p>}
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-5 py-20"><div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-r from-[#102b50] via-[#17204a] to-[#28164b] p-8 sm:p-14"><div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-[90px]" /><div className="relative max-w-2xl"><p className="text-xs font-bold tracking-[.3em] text-cyan-300">UPGRADE YOUR SETUP</p><h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">Your next tech upgrade starts here.</h2><p className="mt-5 max-w-lg text-gray-300">Discover selected devices and accessories for work, creativity and gaming.</p><a href="#products" className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-bold text-black transition hover:bg-white">Shop the collection ↗</a></div></div></section>

      <section id="about" className="border-t border-white/10 bg-[#080c15]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2"><div><h2 className="text-3xl font-black tracking-widest">TAVI<span className="text-cyan-400">XO</span></h2><p className="mt-4 max-w-md leading-7 text-gray-400">A modern destination for technology lovers. Discover devices, accessories and the tools that move your world forward.</p></div><div className="grid grid-cols-2 gap-8"><div><h3 className="font-bold">Explore</h3><div className="mt-4 space-y-3 text-sm text-gray-500"><p><a href="#products" className="hover:text-cyan-400">Products</a></p><p><a href="#categories" className="hover:text-cyan-400">Categories</a></p><p><a href="#offers" className="hover:text-cyan-400">Offers</a></p></div></div><div><h3 className="font-bold">Help</h3><div className="mt-4 space-y-3 text-sm text-gray-500"><p>Delivery information</p><p>Contact support</p><p>Order assistance</p></div></div></div></div><div className="border-t border-white/10 px-5 py-6 text-center text-xs text-gray-600">© 2026 TAVIXO. All rights reserved. Made for the future.</div></section>

      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}><div className="glass grid w-full max-w-3xl overflow-hidden rounded-3xl md:grid-cols-2" onClick={(e) => e.stopPropagation()}><img src={selected.image} alt={selected.name} className="h-72 w-full object-cover md:h-full" /><div className="p-7"><button onClick={() => setSelected(null)} className="float-right text-gray-400 hover:text-white">✕</button><p className="mt-8 text-xs uppercase tracking-widest text-cyan-400">{selected.category}</p><h2 className="mt-3 text-3xl font-black">{selected.name}</h2><p className="mt-5 text-2xl font-bold">{selected.price.toLocaleString("en-US")} MAD</p><p className="mt-4 text-sm leading-6 text-gray-400">Discover this product at TAVIXO. Product details and availability will be confirmed before ordering.</p><button onClick={() => {addToCart(selected.id);setSelected(null);setCartOpen(true);}} className="mt-8 w-full rounded-full bg-cyan-400 py-4 font-bold text-black hover:bg-white">Add to cart</button></div></div></div>}

      {cartOpen && <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setCartOpen(false)}><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b1020] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-xs tracking-widest text-cyan-400">YOUR SELECTION</p><h2 className="mt-1 text-2xl font-black">Shopping cart</h2></div><button onClick={() => setCartOpen(false)} className="rounded-full border border-white/10 px-4 py-2 hover:border-cyan-400">✕</button></div><div className="flex-1 overflow-y-auto py-5">{cart.length===0 ? <p className="py-16 text-center text-gray-500">Your cart is empty.</p> : cart.map((item) => {const product = products.find((p) => p.id===item.id)!;return <div key={item.id} className="mb-4 flex gap-4 border-b border-white/10 pb-4"><img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover" /><div className="flex-1"><h3 className="font-bold">{product.name}</h3><p className="mt-1 text-sm text-cyan-300">{product.price.toLocaleString("en-US")} MAD</p><div className="mt-3 flex items-center gap-3"><button onClick={() => changeQuantity(item.id,-1)} className="rounded-full border border-white/20 px-3 py-1">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id,1)} className="rounded-full border border-white/20 px-3 py-1">+</button></div></div></div>;})}</div><div className="border-t border-white/10 pt-5"><div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-cyan-300">{total.toLocaleString("en-US")} MAD</span></div><p className="mt-2 text-xs text-gray-500">Demo cart only. Real ordering and payment will be connected later.</p><button onClick={() => setCartOpen(false)} className="mt-5 w-full rounded-full bg-cyan-400 py-4 font-bold text-black hover:bg-white">Continue shopping</button></div></aside></div>}
    </main>
  );
}
