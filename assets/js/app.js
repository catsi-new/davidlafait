(() => {
  "use strict";
  /* Données : assets/js/data.js, généré par build.py à partir de site.json. */
  const CARD_REVISION = "20261121-coins";
  const main = document.querySelector("main");
  const statusNode = document.getElementById("announcement");
  const SITE = window.__SITE__;
  const themes = SITE.themes;
  const statusOrder = {"realise":0, "en-cours":1, "proposition":2};
  const cards = SITE.cards.slice().sort((a,b) => themes.findIndex(t=>t.slug===a.theme) - themes.findIndex(t=>t.slug===b.theme) || statusOrder[a.status]-statusOrder[b.status]);
  const themePage = slug => `thematiques/${slug}.html`;
  const OLD = {"securite-justice":"securite-civisme","jeunesse-sport":"sport-jeunesse-excellence","sante-prevention":"sport-sante-prevention","solidarite-logement":"protection-femmes"};
  const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const cardSearch = card => normalize(`${card.id} ${card.title} ${card.body} ${card.impact||""} ${card.tag}`);
  const search = placeholder => `<label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><span class="sr-only">${placeholder}</span><input type="search" placeholder="${placeholder}" autocomplete="off"><button type="button" aria-label="Effacer la recherche" hidden>×</button></label>`;
  const download = card => `<a class="download" href="assets/cards/${card.file}.png?v=${CARD_REVISION}" target="_blank" rel="noopener" download="${card.file}.png"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/></svg>Télécharger</a>`;
  const actions = card => `<div class="card-actions">${download(card)}<a class="source-link" href="${escape(card.source.url)}" target="_blank" rel="noopener noreferrer">Voir la source ↗</a></div>`;
  const legend = () => `<div class="legend" aria-label="Les trois statuts"><span class="badge realise">RÉALISÉ</span><span class="badge en-cours">EN COURS</span><span class="badge proposition">PROPOSITION</span><span class="legend-caption">Un fait établi, une étape en cours ou une mesure envisagée.</span></div>`;
  const empty = (title,text) => `<div class="empty"><h2>${title}</h2><p>${text}</p><a href="#/">Retrouver les thématiques ↗</a></div>`;
  const thumb = card => `<article class="fiche" aria-label="${escape(card.title)}"><figure class="card-visual"><img src="assets/cards/${card.file}.webp?v=${CARD_REVISION}" alt="${escape(card.title)}. Statut : ${card.statusText}." width="1080" height="1620" loading="lazy"><figcaption class="sr-only">${escape(card.body)} ${escape(card.impact||"")}</figcaption></figure>${actions(card)}</article>`;
  const themeCards = slug => cards.filter(c => c.theme === slug);
  function listenSearch(onChange) {
    const input=main.querySelector("input[type=search]"),clear=main.querySelector(".search button");
    input.addEventListener("input",()=>{clear.hidden=!input.value;onChange(input.value);});
    clear.addEventListener("click",()=>{input.value="";clear.hidden=true;onChange("");input.focus();});
  }
  function renderHome() {
    main.innerHTML=`<section class="intro"><div class="intro-text"><h1>Des réalisations, des propositions et les sources pour comprendre.</h1><p class="principle">Un fait documenté. Un fil logique. Les liens pour approfondir.</p></div><img class="david" src="assets/img/david-lisnard.webp" width="440" height="499" alt="David Lisnard"></section><section aria-labelledby="themes-title"><div class="section-head"><h2 id="themes-title">Les thématiques</h2>${search("Rechercher un sujet…")}</div><ul class="theme-grid"></ul><div id="theme-empty" hidden>${empty("Aucune thématique trouvée","Essayez un autre mot ou effacez la recherche.")}</div></section><div class="home-note"><div><p>Choisissez une thématique et suivez le fil, du réalisé à la proposition.</p><p>D’autres thématiques sont en préparation. Revenez bientôt suivre le fil.</p></div><a href="#/fiches">Voir les ${cards.length} cartes ↗</a></div>`;
    const render = query => {
      const q=normalize(query);
      const list=themes.filter(t=>normalize(t.name+" "+t.fil).includes(q)||themeCards(t.slug).some(c=>cardSearch(c).includes(q)));
      main.querySelector(".theme-grid").innerHTML=list.map(t=>{const count=themeCards(t.slug).length;return `<li><a class="theme-tile" href="${themePage(t.slug)}"><img src="${t.image}?v=${CARD_REVISION}" width="600" height="600" alt="" loading="${themes.indexOf(t)<4?"eager":"lazy"}"><span class="tile-arrow" aria-hidden="true">↗</span><span class="tile-label">${t.name}<span class="tile-count">${count} carte${count>1?"s":""}</span></span></a></li>`;}).join("");
      main.querySelector("#theme-empty").hidden=!!list.length;
      statusNode.textContent=`${list.length} thématique${list.length>1?"s":""}`;
    };
    render("");listenSearch(render);
  }
  function renderCollection() {
    let selected="all";
    main.innerHTML=`<a class="back" href="#/">← Retour aux thématiques</a><div class="page-heading"><p class="eyebrow">La collection</p><h1 class="page-title">Les cartes à partager</h1><p>${cards.length} cartes, classées par thématique. Les réalisations, les actions en cours et les propositions restent distinctes.</p></div><div class="section-head"><div class="filters status-filters" role="group" aria-label="Filtrer par statut">${[["all","Toutes"],["realise","RÉALISÉ"],["en-cours","EN COURS"],["proposition","PROPOSITION"]].map(([id,label])=>`<button type="button" class="filter${id==="all"?"":" st "+id}" data-filter="${id}" aria-pressed="${id==="all"}">${label} <span class="count">· ${id==="all"?cards.length:cards.filter(c=>c.status===id).length}</span></button>`).join("")}<span class="legend-caption">Un fait établi, une étape en cours ou une mesure envisagée.</span></div>${search("Rechercher une carte…")}</div><div class="cards-grid"></div><a class="back back-bottom" href="#/">← Retour aux thématiques</a>`;
    const render = () => {
      const q=normalize(main.querySelector("input").value);
      const list=cards.filter(c=>(selected==="all"||c.status===selected)&&cardSearch(c).includes(q));
      main.querySelector(".cards-grid").innerHTML=list.length?list.map(thumb).join(""):empty("Aucune carte pour cette sélection","Modifiez le statut ou effacez votre recherche.");
      statusNode.textContent=`${list.length} carte${list.length>1?"s":""}`;
    };
    main.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
      selected=(button.dataset.filter!=="all"&&selected===button.dataset.filter)?"all":button.dataset.filter;
      main.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===selected)));
      render();
    }));
    listenSearch(render);render();
  }
  function renderAbout() {
    main.innerHTML=`<a class="back" href="#/">← Retour aux thématiques</a><article class="prose"><p class="eyebrow">Notre démarche</p><h1 class="page-title">Des faits, des propositions.<br>Et de quoi les vérifier.</h1><section><h2>Un site indépendant</h2><p>« David l’a fait » est une initiative indépendante, non officielle et non affiliée à Nouvelle Énergie. Ce site rassemble des cartes illustrées sur des actions locales, des travaux parlementaires et des propositions nationales, avec des liens vers les documents qui permettent de les examiner.</p><p>Le nom ne signifie pas que toutes les mesures présentées ont été réalisées : la pastille précise toujours leur statut.</p></section><section><h2>Trois statuts, sans confusion</h2><ul class="statuts"><li><span class="badge realise">RÉALISÉ</span> Où, quand et ce qui a effectivement été mis en place.</li><li><span class="badge en-cours">EN COURS</span> L’étape atteinte et ce qui reste à réaliser.</li><li><span class="badge proposition">PROPOSITION</span> La mesure envisagée, son périmètre et sa source.</li></ul><p>Une réalisation locale ne prouve pas à elle seule les effets d’une proposition nationale. Les effets possibles sont formulés au conditionnel ; les chiffres de capacité, les objectifs et les résultats mesurés ne sont pas confondus.</p></section><section><h2>Une image pour raconter, une source pour vérifier</h2><p>Les illustrations sont non documentaires : elles ne représentent pas des scènes photographiées et ne constituent pas des preuves visuelles. Les cartes proposent une synthèse ; chaque lien « Voir la source » donne accès à l’unique document cité sur la carte.</p></section><section><h2>Une démarche par thématique</h2><p>Chaque thématique réunit des réalisations cannoises, des actions en cours et des propositions nationales, reliées par un fil conducteur. Chaque carte cite sa source. Le site s’enrichira au fil des thématiques.</p><p><a href="#/">Parcourir les thématiques ↗</a></p></section></article>`;
  }
  function route() {
    let path;
    try{path=decodeURIComponent(location.hash.slice(1)||"/").replace(/\/$/,"")||"/";}catch{path="/introuvable";}
    let title="Les thématiques",nav="home";
    const part=path.split("/")[2];
    if(path==="/" || path==="/#themes")renderHome();
    else if(path==="/fiches"){renderCollection();title="Les cartes";nav="fiches";}
    else if(path==="/a-propos"){renderAbout();title="À propos";nav="about";}
    else if(path.startsWith("/theme/")&&themes.some(t=>t.slug===(OLD[part]||part))){location.replace(themePage(OLD[part]||part));return;}
    else if(path.startsWith("/fiche/")&&cards.some(c=>c.id===part)){location.replace(themePage(cards.find(c=>c.id===part).theme));return;}
    else{main.innerHTML=`<div class="page-heading"><h1 class="page-title">Cette page n’existe pas.</h1><p><a href="#/">Retrouver les thématiques</a></p></div>`;}
    document.title=`${title} | David l’a fait`;
    document.querySelectorAll("[data-nav]").forEach(a=>a.dataset.nav===nav?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
    window.scrollTo({top:0,left:0,behavior:"instant"});
  }
  document.querySelector(".skip-link").addEventListener("click",event=>{event.preventDefault();main.focus();main.scrollIntoView();});
  window.addEventListener("hashchange",()=>{route();main.focus({preventScroll:true});});
  route();
})();
