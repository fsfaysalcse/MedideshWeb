const $ = (s, c = document) => c.querySelector(s)
const $$ = (s, c = document) => [...c.querySelectorAll(s)]
const on = (el, ev, fn) => el && el.addEventListener(ev, fn)

;(() => {
  const toggle = $('.menu-toggle'), nav = $('.nav')
  if (!toggle || !nav) return
  const open = () => { nav.classList.add('show'); document.body.style.overflow = 'hidden' }
  const close = () => { nav.classList.remove('show'); document.body.style.overflow = '' }
  on(toggle, 'click', () => nav.classList.contains('show') ? close() : open())
  on(nav, 'click', e => { if (e.target.closest('a')) close() })
  on(document, 'click', e => { if (!e.target.closest('.header') && nav.classList.contains('show')) close() })
  on(document, 'keydown', e => { if (e.key === 'Escape') close() })
  let t; on(window, 'resize', () => { clearTimeout(t); t = setTimeout(close, 150) })
})()

;(() => {
  const btn = document.querySelector('.theme-toggle')
  if (!btn) return
  const KEY = 'medidesh_theme'
  const sysPref = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const apply = (mode) => {
    const html = document.documentElement
    if (mode === 'light' || mode === 'dark') html.setAttribute('data-theme', mode)
    else { html.removeAttribute('data-theme'); mode = sysPref() }
    btn.textContent = (mode === 'dark') ? '☀️' : '🌙'
    btn.title = (mode === 'dark') ? 'Switch to light' : 'Switch to dark'
  }
  const stored = localStorage.getItem(KEY)
  apply(stored || 'system')
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem(KEY)) apply('system')
  })
  btn.addEventListener('click', (e) => {
    if (e.altKey) { localStorage.removeItem(KEY); apply('system'); return }
    const currentResolved = document.documentElement.getAttribute('data-theme') || sysPref()
    const next = currentResolved === 'dark' ? 'light' : 'dark'
    localStorage.setItem(KEY, next)
    apply(next)
  })
})()

;(() => {
  const header = $('.header')
  const offset = () => (header ? header.getBoundingClientRect().height : 0) + 12
  const go = (hash) => {
    const el = $(hash); if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - offset()
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  on(document, 'click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return
    const href = a.getAttribute('href'); if (!href || href === '#') return
    e.preventDefault(); history.pushState(null, '', href); go(href)
  })
  if (location.hash) setTimeout(() => go(location.hash), 0)
})()

;(() => {
  function setPrice(plan, amountBDT) {
    const el = document.querySelector(`[data-plan="${plan}"] .price .amount`)
    if (el) el.textContent = String(amountBDT)
    syncBadges()
  }
  function syncBadges() {
    const val = id => (document.querySelector(`[data-plan="${id}"] .price .amount`) || {}).textContent || ''
    const cells = $$('.compare thead th .plan-badge')
    if (cells.length === 3) {
      cells[0].textContent = `৳${val('free') || 0}/mo`
      cells[1].textContent = `৳${val('standard') || 1500}/mo`
      cells[2].textContent = `৳${val('premium') || 2500}/mo`
    }
  }
  window.MediDeshPricing = { set: setPrice, bulkSet: map => Object.entries(map || {}).forEach(([k, v]) => setPrice(k, v)) }
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear()
})()

;(() => {
  const nav = document.querySelector('.nav')
  if (!nav) return
  const links = Array.from(nav.querySelectorAll('a[href^="#"], a[href$="#showcase"], a[href$="#advisors"]'))
  const setActiveByHash = (hash) => {
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href').endsWith(hash)))
  }
  window.addEventListener('hashchange', () => setActiveByHash(location.hash))
  if (location.hash) setActiveByHash(location.hash)
  const ids = ['#features', '#platforms', '#showcase', '#advisors']
  const map = new Map(ids.map(id => [id, nav.querySelector(`a[href$="${id}"]`)]))
  const io = new IntersectionObserver((entries) => {
    let top = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
    if (top) {
      links.forEach(a => a.classList.remove('is-active'))
      const m = map.get('#' + top.target.id)
      if (m) m.classList.add('is-active')
    }
  }, { rootMargin: "-52% 0px -46% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] })
  ids.forEach(id => { const el = document.querySelector(id); if (el) io.observe(el) })
})()

;(() => {
  const carousels = document.querySelectorAll('.carousel')
  carousels.forEach(car => {
    const track = car.querySelector('.track')
    const grid = car.querySelector('.grid')
    const prev = car.querySelector('.car-btn.prev')
    const next = car.querySelector('.car-btn.next')
    if (!track || !grid || !prev || !next) return
    const updateArrows = () => {
      const overflows = grid.scrollWidth > track.clientWidth + 2
      prev.hidden = next.hidden = !overflows
    }
    const scrollByStep = (dir = 1) => {
      const step = Math.max(track.clientWidth * 0.9, 280)
      track.scrollBy({ left: dir * step, behavior: 'smooth' })
    }
    prev.addEventListener('click', () => scrollByStep(-1))
    next.addEventListener('click', () => scrollByStep(1))
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      e.preventDefault()
      track.scrollLeft += e.deltaX
    }, { passive: false })
    const ro = new ResizeObserver(updateArrows)
    ro.observe(track)
    ro.observe(grid)
    window.addEventListener('load', updateArrows)
    updateArrows()
  })
})()
