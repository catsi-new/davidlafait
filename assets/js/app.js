(() => {
  "use strict";
  const CARD_REVISION = "collection-v19";
  const main = document.querySelector("main");
  const statusNode = document.getElementById("announcement");
  const rawBase = window.__DOWNLOAD_BASE__ || "";
  const local = ["localhost","127.0.0.1","[::1]"].includes(location.hostname);
  const downloadBase = rawBase.startsWith("__PORT_") ? (local ? "http://127.0.0.1:8000" : "") : rawBase.replace(/\/$/,"");
  const themes = [
    ["instruction","Instruction"],
    ["securite-justice","Sécurité et justice"],
    ["entreprenariat","Entrepreneuriat et commerce"],
    ["jeunesse-sport","Jeunesse et sport"],
    ["sante-prevention","Santé et prévention"],
    ["ecologie","Écologie du réel"],
    ["energie-mobilite","Énergie et mobilité"],
    ["solidarite-logement","Solidarité et logement"]
  ].map(([slug,name]) => ({slug,name,image:`assets/img/themes/${slug}.webp`}));
  const sources = {
    instruction: {name:"Ville de Cannes : l’apprentissage des langues",url:"https://www.cannes.com/fr/dossiers-cannes-com/annee-2026/rentree-scolaire-2026-2027/la-municipalite-renforce-l-apprentissage-des-langues.html"},
    zmel: {name:"Ville de Cannes : la zone de mouillage (ZMEL)",url:"https://www.cannes.com/fr/cadre-de-vie/plages-mer-nautisme/zone-de-mouillage-et-d-equipements-legers-zmel.html"},
    arrete: {name:"Arrêté préfectoral 238/2025 (PDF)",url:"https://www.cannes.com/_resource/Documents/Cadre%20de%20vie/S%C3%A9curit%C3%A9%20et%20pr%C3%A9vention/Les%20arr%C3%AAt%C3%A9s%20permanents/Mer%20et%20littoral/238-2025%20-%20Zone%20de%20mouillage%20et%20d'%C3%A9quipements%20l%C3%A9gers%20-%20ZMEL.pdf?download=true"},
    video: {name:"David Lisnard : « Libérer la recherche scientifique »",url:"https://www.youtube.com/watch?v=nxtvOPfuFyo"},
    charte: {name:"Légifrance : Charte de l’environnement, articles 5 et 9",url:"https://www.legifrance.gouv.fr/contenu/menu/droit-national-en-vigueur/constitution/charte-de-l-environnement"},
    article: {name:"Pour approfondir : « L’environnement à l’épreuve du réel »",url:"https://x.com/cappublic2027/article/2095195266429190365"},
    plu: {name:"Ville de Cannes : Plan local d’urbanisme",url:"https://www.cannes.com/fr/cadre-de-vie/travaux-voirie-urbanisme-logement/urbanisme/plan-local-d-urbanisme-plu.html"},
    lecture: {name:"Ville de Cannes : Rapport développement durable 2025",url:"https://www.cannes.com/_resource/Documents/Cadre%20de%20vie/D%C3%A9veloppement%20durable/Rapport%20developpement%20durable.pdf?download"},
    villa: {name:"Mairie de Cannes : aide aux femmes en grande difficulté sociale",url:"https://www.cannes.com/fr/index/actualites/annee-2024/novembre/la-mairie-de-cannes-poursuit-son-engagement-en-faveur-des-femmes-en-grande-difficulte-sociale.html"},
    poles: {name:"Entretien d’Alexandra Martin reproduit par Nouvelle Énergie",url:"https://www.unenouvelleenergie.fr/la-cyberpedocriminalite-etait-un-angle-mort-de-notre-droit-les-propositions-de-loi-de-la-deputee-alexandra-martin-integrees-au-texte-sur-les-violences-sexuelles/"}
  };
  const cards = [
    {
      id:"instruction",theme:"instruction",status:"realise",statusText:"RÉALISÉ",
      title:"Maîtriser les mots, comprendre le monde.",
      body:"À Cannes, des ateliers d'étymologie grecque et latine après la classe pour structurer la pensée des élèves.",
      impact:"Élever le niveau d'instruction des enfants sans dogme idéologique et soutenir le rôle éducatif des familles.",
      file:"david-la-fait-fiche-instruction.png",source:"instruction",refs:["instruction"],
      place:"Éducation · Cannes",
      context:"Une action locale documentée, à distinguer d’une réforme nationale.",
      sections:[
        ["Ce qui a été mis en place",`La Ville indique que les ateliers, initiés en 2015, sont proposés dans 17 accueils périscolaires élémentaires, du CP au CM2. Il s’agit d’activités après la classe, et non d’un enseignement obligatoire généralisé à toutes les écoles françaises.`, "instruction"],
        ["Ce que cette fiche permet de dire",`Elle décrit un dispositif municipal existant. Elle ne démontre pas, à elle seule, un effet chiffré sur les résultats scolaires.`, "instruction"]
      ]
    },
    {
      id:"lecture-civisme",theme:"instruction",status:"realise",statusText:"RÉALISÉ",
      title:"Donner le goût de lire et le sens civique",
      body:"Distribution de livres, sensibilisation aux risques des écrans et apprentissage des valeurs républicaines dès le plus jeune âge.",
      impact:"Transmettre les repères civiques et encourager le goût de la lecture pour les écoliers cannois.",
      file:"david-la-fait-fiche-lecture-civisme.png",source:"lecture",refs:["lecture"],
      place:"Éducation · Cannes",
      context:"Illustration éditoriale non documentaire. Les couvertures ne reproduisent pas des éditions réellement distribuées.",
      sections:[
        ["Le document cité","Ville de Cannes · Rapport 2025.", "lecture"]
      ]
    },
    {
      id:"posidonie",theme:"ecologie",status:"realise",statusText:"RÉALISÉ",
      title:"Ici on s'ammarre sans abîmer les fonds",
      body:"Protéger la mer sans l'interdire: 30 bouées d'ammarrage sur 5 hectare visent à limiter les dommages aux fond marins.",
      impact:"Protéger la biodiversité par la beauté et l'amménagement concret plutôt que par des slogans punitifs.",
      file:"david-la-fait-fiche-posidonie.png",source:"arrete",refs:["arrete"],
      place:"Cannes · Anse Sainte-Anne · Île Sainte-Marguerite · Arrêté 238/2025",
      context:"Posidonie et mouillage : 30 postes est une capacité d’accueil, pas une surface restaurée. L’herbier et les poissons sont illustratifs.",
      sections:[
        ["Ce qui a été mis en place",`L’arrêté interpréfectoral 238/2025 prévoit 30 postes d’amarrage pour des navires de passage de 6 à moins de 20 mètres. Dans la ZMEL de l’anse Sainte-Anne, le mouillage à l’ancre est interdit, sauf nécessité absolue liée à un danger immédiat.`, "arrete"],
        ["Le chiffre, sans raccourci",`Les 30 postes correspondent à une capacité d’accueil, pas à un nombre d’hectares sauvés ou restaurés. L’arrêté ne constitue pas un bilan écologique mesuré de l’état des herbiers.`, "arrete"],
        ["À propos de l’illustration",`Une navigatrice amarre son voilier à une bouée. Sous la surface, un herbier intact et des poissons illustrent le milieu à préserver ; ils ne représentent pas un résultat écologique mesuré sur place. Aucun baigneur ni plongeur n’est représenté : la baignade et la plongée sont interdites dans la ZMEL.`, "arrete"]
      ]
    },
    {
      id:"ilots-fraicheur",theme:"ecologie",status:"realise",statusText:"RÉALISÉ",
      title:"Création d'îlots de fraîcheur en ville",
      body:"Protection stricte de 360 ha d'espaces boisés et de plus de 1 000 arbres remarquables pour rafraîchir l'espace urbain.",
      impact:"Améliorer la qualité de l'air, abaisser les températures estivales et préserver un cadre apaisé.",
      file:"david-la-fait-fiche-ilots-fraicheur.png",source:"article",refs:["article"],
      place:"Écologie & Biodiversité · Cannes",
      context:"Illustration non documentaire. Fiche composée à partir du texte fourni.",
      sections:[
        ["Le document cité",`Article « David Lisnard, l'environnement à l'épreuve du réel ».`, "article"]
      ]
    },
    {
      id:"plu-108ha",theme:"ecologie",status:"realise",statusText:"RÉALISÉ",
      title:"Retrait de 108 hectares au béton",
      body:"Révision du PLU sanctuarisant 85 ha de zones naturelles et 23 ha de terres agricoles pour stopper l'étalement urbain.",
      impact:"Préserver des terres pour cultiver et des espaces naturels pour les générations futures.",
      file:"david-la-fait-fiche-plu-108ha.png",source:"plu",refs:["plu"],
      place:"Écologie & Biodiversité · Cannes",
      context:"Illustration non documentaire : protection de terres naturelles et agricoles, pas une preuve de démolition ou de désimperméabilisation.",
      sections:[
        ["Le document cité","Plan local d'urbanisme de Cannes.", "plu"]
      ]
    },
    {
      id:"mise-abri-femmes",theme:"solidarite-logement",status:"realise",statusText:"RÉALISÉ",
      title:"Protéger en urgence les femmes victimes de violences",
      body:"La Villa Baltz met à l'abri les femmes victimes de violences sous 72 heures, contre 45 jours auparavant.",
      impact:"Offrir un refuge immédiat et un accompagnement sécurisé pour sortir durablement de l'emprise.",
      file:"david-la-fait-fiche-mise-abri-femmes.png",source:"villa",refs:["villa"],
      place:"Solidarité & Logement · Cannes",
      context:"Scène d’accueil fictive et non documentaire, sans représentation d’une bénéficiaire réelle ni de l’intérieur du lieu d’hébergement.",
      sections:[
        ["Le document cité","Mairie de Cannes / Dispositif municipal d'aide d'urgence.", "villa"]
      ]
    },
    {
      id:"poles-ecoute-victimes",theme:"solidarite-logement",status:"en-cours",statusText:"EN COURS",
      title:"Briser l'isolement des victimes de violences",
      body:"Alexandra Martin soutient un texte prévoyant des pôles judiciaires spécialisés dans chaque tribunal.",
      impact:"Des professionnels formés pourraient mieux accueillir les victimes et coordonner leur protection.",
      file:"david-la-fait-fiche-poles-ecoute-victimes.png",source:"poles",refs:["poles"],
      place:"Solidarité & Logement · France",
      context:"Travail parlementaire national. La fiche ne présente pas la mesure comme déjà mise en œuvre ni comme un dispositif municipal à Cannes.",
      sections:[
        ["Le document cité","Entretien d'Alexandra Martin.", "poles"]
      ]
    },
    {
      id:"responsabilite",theme:"ecologie",status:"proposition",statusText:"PROPOSITION",
      title:"Remplacer le principe de précaution par un principe de responsabilité.",
      body:"David Lisnard propose une révision constitutionnelle pour substituer le principe de responsabilité au principe de précaution.",
      objective:"Objectif annoncé : libérer la recherche scientifique.",
      impact:"Cette réforme libère l’innovation et réarme l’expérimentation scientifique face à la paralysie normative.",
      file:"david-la-fait-fiche-proposition-responsabilite.png",source:"video",refs:["video","charte"],
      place:"CE QU’IL PROPOSE · Écologie · France",
      context:"Effets à évaluer. La prise de parole évoque aussi le gaz de schiste, pas seulement les innovations environnementales.",
      sections:[
        ["Ce qui est proposé",`Dans cette prise de parole, David Lisnard demande de remplacer le principe constitutionnel de précaution par un principe de responsabilité, notamment environnementale. La source présente une proposition, pas son adoption.`, "video"],
        ["Le contexte de la prise de parole",`L’intervention évoque notamment la recherche sur l’exploitation du gaz de schiste. Elle ne porte donc pas uniquement sur les innovations environnementales représentées dans l’illustration.`, "video"],
        ["Ce que prévoit le texte actuel",`L’article 5 de la Charte de l’environnement prévoit une évaluation des risques et des mesures provisoires et proportionnées en cas de risque de dommage grave et irréversible. Il ne pose pas une interdiction générale de la recherche. L’article 9 prévoit la contribution de la recherche et de l’innovation à la préservation de l’environnement.`, "charte"]
      ]
    }
  ];
  Object.assign(sources, window.__ADDITIONAL_SOURCES__ || {});
  cards.push(...(window.__ADDITIONAL_CARDS__ || []));
  const statusOrder = {"realise":0, "en-cours":1, "proposition":2};
  cards.forEach(card => {
    card.themes = window.__CARD_THEMES__?.[card.id] || [card.theme];
  });
  cards.sort((a,b) => statusOrder[a.status] - statusOrder[b.status]);
  const themeCards = slug => cards.filter(card => card.themes.includes(slug));
  const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const cardSearch = card => normalize(`${card.id} ${card.title} ${card.body} ${card.impact||""} ${card.context}`);
  const external = (key,label) => `<a href="${escape(sources[key].url)}" target="_blank" rel="noopener noreferrer">${label || escape(sources[key].name)} ↗</a>`;
  const badge = card => `<span class="badge ${card.status}">${card.statusText}</span>`;
  const search = placeholder => `<label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><span class="sr-only">${placeholder}</span><input type="search" placeholder="${placeholder}" autocomplete="off"><button type="button" aria-label="Effacer la recherche" hidden>×</button></label>`;
  const download = card => `<a class="download" href="${downloadBase ? `${downloadBase}/download/${card.id}?v=${CARD_REVISION}` : `assets/cards/${card.file}?v=${CARD_REVISION}`}" target="_blank" rel="noopener" download="${card.file}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/></svg>Télécharger</a>`;
  const actions = card => `<div class="card-actions">${download(card)}<a class="source-link" href="${escape(sources[card.source].url)}" target="_blank" rel="noopener noreferrer">Voir la source ↗</a></div>`;
  const legend = () => `<div class="legend" aria-label="Les trois statuts"><span class="badge realise">RÉALISÉ</span><span class="badge en-cours">EN COURS</span><span class="badge proposition">PROPOSITION</span><span class="legend-caption">Un fait établi, une étape en cours ou une mesure envisagée.</span></div>`;
  const empty = (title,text) => `<div class="empty"><h2>${title}</h2><p>${text}</p><a href="#/fiches">Voir toutes les cartes ↗</a></div>`;
  const thumb = card => `<article class="fiche" aria-label="${escape(card.title)}"><figure class="card-visual"><img src="assets/cards/${card.file.replace(".png",".webp")}?v=${CARD_REVISION}" alt="${escape(card.title)} Statut : ${card.statusText}. davidlafait.fr." width="1080" height="1620" loading="lazy"><figcaption class="sr-only">${escape(card.body)} ${escape(card.impact||"")} ${escape(card.context)}</figcaption></figure>${actions(card)}</article>`;
  function listenSearch(onChange) {
    const input=main.querySelector("input[type=search]"),clear=main.querySelector(".search button");
    input.addEventListener("input",()=>{clear.hidden=!input.value;onChange(input.value);});
    clear.addEventListener("click",()=>{input.value="";clear.hidden=true;onChange("");input.focus();});
  }
  function renderHome() {
    main.innerHTML=`<section class="intro"><h1>Des réalisations, des propositions et les sources pour comprendre.</h1><p class="principle">Un sujet. Un fait documenté. Les liens pour approfondir.</p></section><section aria-labelledby="themes-title"><div class="section-head"><h2 id="themes-title">Les thèmes</h2>${search("Rechercher un sujet…")}</div><ul class="theme-grid"></ul><div id="theme-empty" hidden>${empty("Aucun thème trouvé","Essayez un autre mot ou effacez la recherche.")}</div></section><div class="home-note"><p>Choisissez un thème. Chaque carte donne accès à sa source.</p><a href="#/fiches">Voir les ${cards.length} cartes disponibles ↗</a></div>`;
    const render = query => {
      const q=normalize(query);
      const list=themes.filter(t=>normalize(t.name).includes(q)||themeCards(t.slug).some(c=>cardSearch(c).includes(q)));
      main.querySelector(".theme-grid").innerHTML=list.map(t=>{const count=themeCards(t.slug).length;return `<li><a class="theme-tile" href="#/theme/${t.slug}"><img src="${t.image}" width="600" height="600" alt="" loading="${themes.indexOf(t)<4?"eager":"lazy"}"><span class="tile-arrow" aria-hidden="true">↗</span><span class="tile-label">${t.name}<span class="tile-count">${count} carte${count>1?"s":""}</span></span></a></li>`;}).join("");
      main.querySelector("#theme-empty").hidden=!!list.length;
      statusNode.textContent=`${list.length} thème${list.length>1?"s":""}`;
    };
    render("");listenSearch(render);
  }
  function renderCollection(theme) {
    const base=theme?themeCards(theme.slug):cards;
    let selected="all";
    main.innerHTML=`<a class="back" href="#/">← Retour aux thèmes</a><div class="page-heading"><p class="eyebrow">${theme?"Les thèmes":"La collection"}</p><h1 class="page-title">${theme?theme.name:"Les cartes à partager"}</h1><p>${base.length?`${base.length} carte${base.length>1?"s":""} disponible${base.length>1?"s":""}. Les réalisations, les actions en cours et les propositions restent distinctes.`:"Cette rubrique accueillera les prochaines cartes documentées."}</p></div>${base.length?`${legend()}<div class="section-head"><div class="filters" role="group" aria-label="Filtrer par statut">${[["all","Toutes"],["realise","Réalisé"],["en-cours","En cours"],["proposition","Proposition"]].map(([id,label])=>`<button type="button" class="filter" data-filter="${id}" aria-pressed="${id==="all"}">${label}</button>`).join("")}</div>${search("Rechercher une carte…")}</div><div class="cards-grid ${theme?"two":""}"></div>`:empty("Pas encore de carte ici","Les prochaines cartes seront ajoutées avec leur statut et leur source. En attendant, retrouvez les cartes disponibles dans la collection.")}`;
    if(!base.length)return;
    const render = () => {
      const q=normalize(main.querySelector("input").value);
      const list=base.filter(c=>(selected==="all"||c.status===selected)&&cardSearch(c).includes(q));
      main.querySelector(".cards-grid").innerHTML=list.length?list.map(thumb).join(""):empty("Aucune carte pour cette sélection","Modifiez le statut ou effacez votre recherche.");
      statusNode.textContent=`${list.length} carte${list.length>1?"s":""}`;
    };
    main.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
      selected=button.dataset.filter;
      main.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      render();
    }));
    listenSearch(render);render();
  }
  function renderDetail(card) {
    const theme=themes.find(t=>t.slug===card.theme);
    main.innerHTML=`<a class="back" href="#/theme/${card.theme}">← ${theme.name}</a><article class="detail-grid"><div class="detail-picture"><img src="assets/cards/${card.file}?v=${CARD_REVISION}" alt="Fiche illustrée : ${escape(card.title)} ${card.statusText}. davidlafait.fr." width="1080" height="1620">${actions(card)}</div><div class="detail-copy">${badge(card)}<h1>${card.title}</h1><p class="place">${card.place}</p><p>${card.body} ${external(card.source,"Consulter la source")}</p>${card.objective?`<p><strong>${card.objective}</strong> ${external("video","Prise de parole")}</p>`:""}${card.impact?`<section class="impact"><h2>IMPACT</h2><p>${card.impact}</p></section>`:""}${card.sections.map(([title,body,source])=>`<section class="detail-section"><h2>${title}</h2><p>${body}${source?` ${external(source,"Lire le document")}`:""}</p></section>`).join("")}<section class="detail-section sources"><h2>Les sources pour creuser</h2><ol>${card.refs.map(key=>`<li>${external(key)}</li>`).join("")}</ol><details><summary>Afficher les adresses et les copier</summary>${card.refs.map(key=>`<div><p>${sources[key].name}</p><span class="source-url" tabindex="0">${escape(sources[key].url)}</span><button type="button" class="copy-url" data-source="${key}">Copier l’adresse</button><p class="copy-status" role="status"></p></div>`).join("")}</details></section></div></article>`;
    main.querySelectorAll(".copy-url").forEach(button=>button.addEventListener("click",async()=>{
      const node=button.nextElementSibling;
      try{await navigator.clipboard.writeText(sources[button.dataset.source].url);node.textContent="Adresse copiée.";}
      catch{node.textContent="Copie automatique indisponible. Sélectionnez l’adresse ci-dessus pour la copier manuellement.";}
    }));
  }
  function renderAbout() {
    main.innerHTML=`<a class="back" href="#/">← Retour aux thèmes</a><article class="prose"><p class="eyebrow">Notre démarche</p><h1 class="page-title">Des faits, des propositions.<br>Et de quoi les vérifier.</h1><section><h2>Un site indépendant</h2><p>« David l’a fait » est une initiative indépendante, non officielle et non affiliée à Nouvelle Énergie. Ce site rassemble des cartes illustrées sur des actions locales, des travaux parlementaires et des propositions nationales, avec des liens vers les documents qui permettent de les examiner.</p><p>Le nom ne signifie pas que toutes les mesures présentées ont été réalisées : la pastille précise toujours leur statut.</p></section><section><h2>Trois statuts, sans confusion</h2><ul><li><span class="badge realise">RÉALISÉ</span> Où, quand et ce qui a effectivement été mis en place.</li><li><span class="badge en-cours">EN COURS</span> L’étape atteinte et ce qui reste à réaliser.</li><li><span class="badge proposition">PROPOSITION</span> La mesure envisagée, son périmètre et sa source.</li></ul><p>Une réalisation locale ne prouve pas à elle seule les effets d’une proposition nationale. Les effets possibles sont formulés au conditionnel ; les chiffres de capacité, les objectifs et les résultats mesurés ne sont pas confondus.</p></section><section><h2>Une image pour raconter, une source pour vérifier</h2><p>Les illustrations sont non documentaires : elles ne représentent pas des scènes photographiées et ne constituent pas des preuves visuelles. Les cartes proposent une synthèse ; chaque lien « Voir la source » donne accès à l’unique document cité sur la carte.</p></section><section><h2>Une collection qui pourra grandir</h2><p>Cette collection rassemble des fiches sur différents thèmes dont l’éducation, l’écologie, la solidarité et la protection des victimes... D’autres thèmes et d’autres fiches pourront s’y ajouter.</p><p><a href="#/fiches">Parcourir les cartes disponibles ↗</a></p></section></article>`;
  }
  function route() {
    let path;
    try{path=decodeURIComponent(location.hash.slice(1)||"/").replace(/\/$/,"")||"/";}catch{path="/introuvable";}
    let title="Les thèmes",nav="home";
    if(path==="/" || path==="/#themes")renderHome();
    else if(path==="/fiches"){renderCollection();title="Les cartes";nav="fiches";}
    else if(path==="/a-propos"){renderAbout();title="À propos";nav="about";}
    else if(path.startsWith("/theme/")&&themes.some(t=>t.slug===path.split("/")[2])){
      const theme=themes.find(t=>t.slug===path.split("/")[2]);renderCollection(theme);title=theme.name;
    }else if(path.startsWith("/fiche/")&&cards.some(c=>c.id===path.split("/")[2])){
      const card=cards.find(c=>c.id===path.split("/")[2]);renderDetail(card);title=card.title;nav="fiches";
    }else{main.innerHTML=`<div class="page-heading"><h1 class="page-title">Cette page n’existe pas.</h1><p><a href="#/">Retrouver les thèmes</a></p></div>`;}
    document.title=`${title} | David l’a fait`;
    document.querySelectorAll("[data-nav]").forEach(a=>a.dataset.nav===nav?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
    window.scrollTo({top:0,left:0,behavior:"instant"});
  }
  document.querySelector(".skip-link").addEventListener("click",event=>{event.preventDefault();main.focus();main.scrollIntoView();});
  window.addEventListener("hashchange",()=>{route();main.focus({preventScroll:true});});
  route();
})();
