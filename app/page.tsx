const clients = [
  ["un", "United Nations"], ["unionaire", "Unionaire"], ["bue", "The British University in Egypt"], ["panda", "Panda"], ["elsewedy", "Elsewedy Cables"],
  ["esic", "ESIC"], ["prego", "Prego"], ["grocer", "The Grocer"], ["misr-hospital", "Misr International Hospital"], ["enjoy", "Enjoy"], ["kazaz", "Kazaz"],
];

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="logo logo-motion" href="#top" aria-label="SAGA"><span className="logo-letter">S</span><span className="logo-letter">A</span><span className="logo-letter">G</span><span className="logo-letter">A</span><span className="logo-dot">.</span></a>
      <nav><a href="#services">Capabilities</a><a href="#story">Our story</a><a href="#network">Network</a></nav>
      <a className="top-cta" href="#quote">Start a request <b>↗</b></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow"><i /> Integrated trade support / Egypt</p>
        <h1><span className="hero-line">From the first</span><span className="hero-line hero-line-delay">requirement to the <em>final mile.</em></span></h1>
        <p className="hero-text">SAGA connects general supplies, freight forwarding and customs clearance into one considered business journey.</p>
        <div className="hero-actions"><a className="button" href="#quote">Start a request <b>→</b></a><a className="under-link" href="#services">Explore SAGA <span>↓</span></a></div>
      </div>
      <div className="live-route" aria-label="Animated route from Egypt to the world"><span className="route-label">EGYPT</span><span className="route-label destination">WORLDWIDE</span><div className="route-line"><i /></div><div className="route-node home" /><div className="route-node destination-node" /><small>LIVE TRADE ROUTE</small></div>
      <div className="hero-footer"><span>EST. 2005</span><span>FREIGHT · CUSTOMS · SUPPLIES</span><span>CAIRO / EGYPT</span></div>
    </section>

    <section className="intro section"><p className="kicker">01 / THE SAGA MODEL</p><div className="intro-grid"><h2>Business moves better when every step <em>belongs together.</em></h2><p>Not three disconnected services. A single SAGA relationship, designed to support the journey before, at and after the border.</p></div></section>

    <section className="services section" id="services">
      <div className="section-head"><div><p className="kicker">02 / CAPABILITIES</p><h2>Three disciplines.<br/><em>One standard.</em></h2></div><p>Choose a single capability or connect the complete chain around your requirement.</p></div>
      <div className="service-list">
        <article><span>01</span><div><small>MOVE</small><h3>Freight & Shipping</h3></div><p>Sea, air and land freight coordinated around cargo, timing and destination.</p></article>
        <article><span>02</span><div><small>CLEAR</small><h3>Customs Clearance</h3></div><p>Documentation, local coordination and experience that keeps goods moving.</p></article>
        <article><span>03</span><div><small>SOURCE</small><h3>General Supplies</h3></div><p>Medical, hygiene, PPE, packaging and custom business sourcing.</p></article>
      </div>
    </section>

    <section className="story" id="story"><div className="story-intro"><p className="kicker">03 / THE SAGA STORY</p><h2>One business, built <em>in the right order.</em></h2><p>Customs clearance came first. SAGA then connected freight and supply around the same customer relationship—so every delivery has one accountable partner.</p><div className="proofs"><div><strong>20+</strong><span>Years of experience</span></div><div><strong>01</strong><span>Point of contact</span></div><div><strong>08</strong><span>Markets served</span></div></div></div><div className="story-steps"><article><b>01</b><small>2005 / FOUNDATION</small><h3>Customs clearance</h3><p>Built on local know-how, documentation and border coordination.</p></article><article><b>02</b><small>CONNECTED SERVICE</small><h3>Freight & shipping</h3><p>Moving cargo with the clearance reality already understood.</p></article><article><b>03</b><small>TODAY</small><h3>General supplies</h3><p>Sourcing the products customers need, then taking them through to delivery.</p></article></div></section>

    <section className="clients" aria-label="Selected previous business clients"><div className="clients-head"><p className="kicker">04 / SELECTED CLIENTS</p><p>Relationships built across healthcare, industry, education and retail.</p></div><div className="logo-window"><div className="logo-track">{[...clients, ...clients].map(([name, label], i) => <div className="client-logo" key={`${name}-${i}`}><img src={`/clients/${name}.png`} alt={label}/></div>)}</div></div><p className="clients-note">Logos shown from SAGA&apos;s company presentation for this concept demonstration.</p></section>

    <section className="network" id="network"><div className="network-copy"><p className="kicker">05 / GLOBAL NETWORK</p><h2>Egypt at the centre.<br/><em>Relationships in motion.</em></h2><p>Every pin marks a market where SAGA has supported customers and projects—from local clearance to global supply.</p><div className="network-key"><span><i className="key-home"/> Cairo / home base</span><span><i className="key-route"/> active trade relationships</span></div></div>
      <div className="globe-stage" aria-label="Animated SAGA network globe centred on Egypt"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="globe"><img src="/saga_globe_premium.png" alt="Glowing Earth showing Egypt, Europe, the Middle East and Asia"/><div className="globe-glow"/><svg className="globe-routes" viewBox="0 0 520 520" aria-hidden="true"><path d="M260 268 Q144 210 85 252"/><path d="M260 268 Q188 178 192 164"/><path d="M260 268 Q265 178 290 146"/><path d="M260 268 Q319 218 352 234"/><path d="M260 268 Q347 260 370 276"/><path d="M260 268 Q371 309 400 348"/><path d="M260 268 Q380 202 430 185"/></svg><i className="globe-pin pin-usa" data-name="USA"/><i className="globe-pin pin-spain" data-name="Spain"/><i className="globe-pin pin-turkey" data-name="Turkey"/><i className="globe-pin pin-egypt homepin" data-name="Egypt"/><i className="globe-pin pin-saudi" data-name="Saudi Arabia"/><i className="globe-pin pin-qatar" data-name="Qatar"/><i className="globe-pin pin-uae" data-name="UAE"/><i className="globe-pin pin-china" data-name="China"/><i className="globe-pin pin-malaysia" data-name="Malaysia"/></div><p className="globe-caption"><span>CAIRO</span><i/> <span>CONNECTED MARKETS</span></p></div>
    </section>

    <section className="quote section" id="quote"><div><p className="kicker">06 / START A REQUEST</p><h2>Tell us what needs to <em>move.</em></h2><p>Or what needs to be sourced, cleared or delivered. SAGA will bring the right capability to the table.</p></div><form><label>Service<select required defaultValue=""><option value="" disabled>Choose a capability</option><option>Freight & Shipping</option><option>Customs Clearance</option><option>General Supplies</option><option>Integrated request</option></select></label><div className="form-pair"><label>Name<input required placeholder="Your name" /></label><label>Company<input placeholder="Company name" /></label></div><div className="form-pair"><label>Phone / WhatsApp<input placeholder="+20" /></label><label>Email<input type="email" placeholder="name@company.com" /></label></div><label>Requirement<textarea rows={3} placeholder="Cargo, product, origin/destination, quantity..." /></label><button className="button" type="button">Send request <b>→</b></button><small>Wireframe only — form submission is not connected yet.</small></form></section>
    <section className="contact-info" id="contact"><div className="contact-intro"><p className="kicker">07 / CONTACT SAGA</p><h2>Let&apos;s start <em>moving.</em></h2></div><div className="contact-list"><a href="mailto:sagafreight@gmail.com"><small>Email</small><strong>sagafreight@gmail.com</strong><span>Write to SAGA ↗</span></a><div><small>WhatsApp</small><strong>0111663399 · 01113702502</strong><span>Available for quick coordination</span></div><div><small>Call us</small><strong>01113702502 · 01116633999 · 01121315974</strong><span>Freight, customs and supplies</span></div></div></section>
    <footer><a className="logo logo-motion" href="#top" aria-label="SAGA"><span className="logo-letter">S</span><span className="logo-letter">A</span><span className="logo-letter">G</span><span className="logo-letter">A</span><span className="logo-dot">.</span></a><p>Freight · Customs Clearance · General Supplies</p><div><a href="#services">Capabilities</a><a href="#network">Network</a><a href="#contact">Contact</a></div></footer>
  </main>;
}
