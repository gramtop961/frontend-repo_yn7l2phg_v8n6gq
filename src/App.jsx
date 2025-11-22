import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingBag, Users, Shield, Bell, Star, LogIn } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const vendors = [
  { key: 'amazon', label: 'Amazon', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { key: 'flipkart', label: 'Flipkart', img: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Flipkart_logo.png' },
  { key: 'meesho', label: 'Meesho', img: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Meesho_Logo_Full.png' },
  { key: 'shopify', label: 'Shopify', img: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
  { key: 'myntra', label: 'Myntra', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Myntra_logo.png' },
  { key: 'ajio', label: 'Ajio', img: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Ajio-logo.png' },
  { key: 'alibaba', label: 'Alibaba', img: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Alibaba_Group_logo.svg' },
  { key: 'snapdeal', label: 'Snapdeal', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Snapdeal_Logo.png' },
]

function Splash() {
  const [tapCount, setTapCount] = useState(0)
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (tapCount >= 5) setShowAdmin(true)
  }, [tapCount])

  const checkAdmin = () => {
    if (adminEmail === 'shekharxlr8@gmail.com' && adminPass === 'Shekhar_4t7') {
      window.location.hash = '#admin'
      setShowAdmin(false)
      setToast('Welcome, Admin')
    } else {
      setToast('Invalid admin credentials')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/40 to-slate-950/70 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button onClick={() => setTapCount(c => c + 1)} className="mx-auto block rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 p-6 shadow-2xl">
            <div className="text-3xl font-semibold tracking-tight">Shopearn Pro</div>
            <div className="text-sm text-white/60">Shop Smart. Earn Smarter.</div>
          </button>

          <motion.div className="mt-10 grid gap-4 w-full max-w-md" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <a href="#buyer" className="w-full inline-flex items-center justify-between rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 font-semibold shadow-lg">
              <span>Continue as Customer / Buyer</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#affiliate" className="w-full inline-flex items-center justify-between rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4 font-semibold shadow-lg">
              <span>Become an Affiliate Partner</span>
              <Users className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showAdmin && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
              <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6">
                <div className="text-lg font-semibold mb-4">Admin Login</div>
                <input placeholder="Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
                <input placeholder="Password" type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
                <div className="flex gap-3">
                  <button onClick={checkAdmin} className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 py-3 font-semibold">Login</button>
                  <button onClick={() => setShowAdmin(false)} className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 py-3 font-semibold">Cancel</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!!toast && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-900 rounded-full px-4 py-2 shadow">
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BuyerHome() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [settings, setSettings] = useState({})

  useEffect(() => {
    fetch(`${backendBase}/admin/settings`).then(r => r.json()).then(setSettings).catch(() => {})
  }, [])

  useEffect(() => {
    const url = new URL(`${backendBase}/products`)
    if (query) url.searchParams.set('q', query)
    fetch(url).then(r => r.json()).then(d => setItems(d.items || [])).catch(() => setItems([]))
  }, [query])

  const goVendor = key => {
    if (!settings?.[key]) {
      alert('Link not available yet.')
      return
    }
    window.open(`${backendBase}/r/${key}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-950/70 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => (window.location.hash = '#')} className="rounded-full bg-white/10 p-2"><LogIn className="w-5 h-5" /></button>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Products…" className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10" />
          <button className="rounded-full bg-white/10 p-2"><Bell className="w-5 h-5" /></button>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 overflow-x-auto">
          <div className="flex gap-4">
            {vendors.map(v => (
              <button key={v.key} onClick={() => goVendor(v.key)} className="shrink-0 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:bg-white/10">
                <div className="text-sm font-medium">{v.label}</div>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(p => (
          <div key={p._id} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            {p.images?.[0] && (
              <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold">{p.title}</div>
                <div className="text-emerald-400 font-bold">₹{p.price}</div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(p.rating || 0) ? '' : 'opacity-30'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <a href={`#product:${p._id}`} className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 py-2 text-center">View</a>
                <a href={`${backendBase}/r/product/${p._id}`} target="_blank" className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 py-2 text-center">Buy Now</a>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

function ProductDetail({ id }) {
  const [p, setP] = useState(null)
  useEffect(() => {
    fetch(`${backendBase}/products/${id}`).then(r => r.json()).then(setP)
  }, [id])

  if (!p) return <div className="min-h-screen grid place-items-center text-white">Loading…</div>
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-full h-full object-contain" />}
          </div>
          <div>
            <div className="text-2xl font-semibold mb-2">{p.title}</div>
            <div className="text-emerald-400 font-bold text-xl mb-2">₹{p.price}</div>
            <p className="text-white/70 mb-4">{p.description}</p>
            <div className="flex gap-3">
              <button className="rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2">Add to Cart</button>
              <a href={`${backendBase}/r/product/${p._id}`} target="_blank" className="rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2">Buy Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AffiliateDashboard() {
  const [mine, setMine] = useState([])
  const [form, setForm] = useState({ title: '', price: '', vendor: 'amazon', affiliate_link: '', images: [] })
  const affiliateId = 'demo-affiliate' // placeholder id for demo

  const loadMine = () => {
    const url = new URL(`${backendBase}/products`)
    url.searchParams.set('affiliate_id', affiliateId)
    fetch(url).then(r => r.json()).then(d => setMine(d.items || []))
  }
  useEffect(() => { loadMine() }, [])

  const upload = async () => {
    if (!form.title || !form.price || !form.affiliate_link) {
      alert('Please fill title, price and affiliate link')
      return
    }
    const payload = { ...form, price: Number(form.price), affiliate_id: affiliateId, images: form.images.filter(Boolean) }
    const r = await fetch(`${backendBase}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (r.ok) {
      setForm({ title: '', price: '', vendor: 'amazon', affiliate_link: '', images: [] })
      loadMine()
      alert('Product Uploaded Successfully.')
    } else {
      const e = await r.json().catch(() => ({}))
      alert(e.detail || 'Failed to upload')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Affiliate Dashboard</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mine.map(p => (
                <div key={p._id} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="font-semibold mb-1">{p.title}</div>
                  <div className="text-sm text-white/60 mb-2">Clicks: {p.clicks || 0} • Orders: {p.orders || 0}</div>
                  <a href={`#product:${p._id}`} className="text-emerald-400 text-sm">View</a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="font-semibold mb-3">Upload Product</div>
              <div className="space-y-2">
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
                <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
                <select value={form.vendor} onChange={e => setForm({ ...form, vendor: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  {vendors.map(v => <option key={v.key} value={v.key}>{v.label}</option>)}
                </select>
                <input value={form.affiliate_link} onChange={e => setForm({ ...form, affiliate_link: e.target.value })} placeholder="Affiliate Link (https://)" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
                <input value={form.images[0] || ''} onChange={e => setForm({ ...form, images: [e.target.value] })} placeholder="Image URL (optional)" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
                <button onClick={upload} className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 py-2 font-semibold">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [links, setLinks] = useState({})
  useEffect(() => {
    fetch(`${backendBase}/admin/stats`).then(r => r.json()).then(setStats)
    fetch(`${backendBase}/admin/settings`).then(r => r.json()).then(setLinks)
  }, [])

  const save = async () => {
    const r = await fetch(`${backendBase}/admin/settings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(links) })
    const data = await r.json(); setLinks(data)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <button onClick={() => (window.location.hash = '#')} className="rounded-full bg-white/10 px-3 py-1">Logout</button>
        </div>
        {stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">Total Buyers <div className="text-2xl font-semibold">{stats.total_buyers}</div></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">Total Affiliates <div className="text-2xl font-semibold">{stats.total_affiliates}</div></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">Subscribers <div className="text-2xl font-semibold">{stats.subscribers}</div></div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">App Earnings <div className="text-2xl font-semibold">₹{stats.app_earnings}</div></div>
          </div>
        )}

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="font-semibold mb-3">Affiliate Link Management</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vendors.map(v => (
              <div key={v.key} className="space-y-1">
                <div className="text-sm text-white/70">{v.label}</div>
                <input value={links[v.key] || ''} onChange={e => setLinks({ ...links, [v.key]: e.target.value })} placeholder={`https://…`} className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={save} className="rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2">Save Links</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Router() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash.startsWith('#buyer')) return <BuyerHome />
  if (hash.startsWith('#affiliate')) return <AffiliateDashboard />
  if (hash.startsWith('#admin')) return <AdminDashboard />
  if (hash.startsWith('#product:')) return <ProductDetail id={hash.split('#product:')[1]} />
  return <Splash />
}

export default function App() {
  return <Router />
}
