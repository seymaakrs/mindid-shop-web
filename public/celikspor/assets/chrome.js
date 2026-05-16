/* =====================================================================
   Chrome injector — renders navbar + footer + curtain to every page
   ===================================================================== */

(function () {
  const PAGES = [
    { href: 'index.html',      label: 'Ana Sayfa' },
    { href: 'hakkimizda.html', label: 'Kulüp' },
    { href: 'takim.html',      label: 'Takım' },
    { href: 'fikstur.html',    label: 'Fikstür' },
    { href: 'haberler.html',   label: 'Haberler' },
    { href: 'sponsorlar.html', label: 'Sponsorlar' },
    { href: 'iletisim.html',   label: 'İletişim' },
  ];

  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const emblem = `<img src="assets/brand/logo-3d.png" alt="Çelik Spor" style="width:100%;height:100%;display:block;object-fit:contain;" />`;

  const navHTML = `
    <div class="page-curtain" id="pageCurtain"></div>
    <div class="curtain-mark" id="curtainMark">
      <div class="logo-emblem"><img src="assets/brand/logo-3d.png" alt="" style="width:100%;height:100%;object-fit:contain;" /></div>
    </div>
    <div class="bg-grain" aria-hidden="true"></div>

    <header class="navbar" id="navbar">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Çelik Spor Kulübü Ana Sayfa">
          <div class="emblem">${emblem}</div>
          <div class="brand-text">
            <span class="l1">Çelik Spor</span>
            <span class="l2">Bandırma · 1953</span>
          </div>
        </a>

        <nav>
          <ul class="nav-links" id="navLinks">
            ${PAGES.map(p => `
              <li><a href="${p.href}" class="${p.href === here ? 'is-active' : ''}">${p.label}</a></li>
            `).join('')}
            <li><a class="nav-cta" href="fikstur.html">Bilet Al</a></li>
          </ul>
        </nav>

        <button class="nav-toggle" id="navToggle" aria-label="Menü" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `;

  const footerHTML = `
    <div class="ticker">
      <div class="track">
        <span>
          ${Array(6).fill(0).map(() => `
            <span>Yeni Sezon</span><span class="star"></span>
            <span>Yeni Mücadele</span><span class="star"></span>
            <span>Bandırma 1953</span><span class="star"></span>
            <span>Çelik Spor</span><span class="star"></span>
          `).join('')}
        </span>
      </div>
    </div>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="col-brand">
            <a class="brand" href="index.html">
              <div class="emblem" style="width:52px;height:52px">${emblem}</div>
              <div class="brand-text">
                <span class="l1">Çelik Spor</span>
                <span class="l2">Bandırma · 1953</span>
              </div>
            </a>
            <p>Bandırma Çelikspor Kulübü Kadın Voleybol Takımı resmi web sitesi. 1953'ten bu yana parkenin yıldızı.</p>
            <p class="script">Güçlü geçmiş, yeni gelecek.</p>
          </div>

          <div>
            <h4>Keşfet</h4>
            <ul>
              <li><a href="hakkimizda.html">Hakkımızda</a></li>
              <li><a href="takim.html">Takım Kadrosu</a></li>
              <li><a href="fikstur.html">Fikstür &amp; Sonuçlar</a></li>
              <li><a href="haberler.html">Haberler</a></li>
              <li><a href="sponsorlar.html">Sponsorlar</a></li>
            </ul>
          </div>

          <div>
            <h4>Kulüp</h4>
            <ul>
              <li><a href="iletisim.html">İletişim</a></li>
              <li><a href="iletisim.html">Sponsorluk</a></li>
              <li><a href="iletisim.html">Bilet & Taraftar</a></li>
              <li><a href="iletisim.html">Basın</a></li>
            </ul>
          </div>

          <div>
            <h4>İletişim</h4>
            <ul>
              <li>Bandırma Şehir Spor Salonu</li>
              <li>Balıkesir, Türkiye</li>
              <li><a href="mailto:info@celikspor.com">info@celikspor.com</a></li>
              <li><a href="tel:+902660000000">+90 266 000 00 00</a></li>
            </ul>
            <div class="social">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter / X">X</a>
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 Bandırma Çelikspor Kulübü — Tüm hakları saklıdır.</span>
          <span>Yeni Sezon · Yeni Mücadele</span>
        </div>
      </div>
    </footer>
  `;

  // Insert at document boundaries
  const navMount = document.getElementById('chrome-nav');
  const footMount = document.getElementById('chrome-foot');
  if (navMount) navMount.outerHTML = navHTML;
  if (footMount) footMount.outerHTML = footerHTML;
})();
