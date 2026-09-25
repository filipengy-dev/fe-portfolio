// RECENZE
// Dokud jsou obě pole prázdná, sekce se na webu vůbec nevykreslí.
// Jakmile něco přidáš, objeví se sama i s odkazem v menu.

// TEXTOVÉ RECENZE
// name = kdo to řekl
// role = pozice a firma
// text = samotná recenze; prázdný řádek (\n\n) udělá nový odstavec
// logo = nepovinné, cesta k logu klienta; bez loga se ukáže kolečko s iniciálou
export const reviews = [
  {
    id: 'r1',
    name: 'David Lörincz',
    role: 'konzultant na marketing a AI, DronPro',
    logo: '/logos/dronpro.png',
    text:
      'S Filipem v DRONPRO dlouhodobě spolupracujeme. Stříhá nám videa na YouTube, ' +
      'od recenzí DRONů po delší formáty. Jeho střih je moderní a svižný, takový, ' +
      'jaký dnešní divák chce vidět. Výborně pracuje se zvukem a záběry synchronizuje ' +
      's hudbou tak, že video má tempo a drží pozornost až do konce. Pracuje rychle ' +
      'a dá se na něj spolehnout. Filipa rád doporučím každému, kdo hledá střihače ' +
      's citem pro rytmus a moderní styl.',
  },
  {
    id: 'r2',
    name: 'Lukáš Starek',
    role: 'spoluzakladatel, SuperTlapka',
    logo: '/logos/supertlapka.png',
    text:
      'Filip pro nás v Super Tlapce už několik měsíců zajišťuje postprodukci videí ' +
      'a jako spoluzakladatel firmy jsem s naší spoluprací moc spokojený. Nejvíc si ' +
      'cením jeho rychlé a proaktivní komunikace. V našem podnikání je zásadní, aby ' +
      'věci plynuly, a s Filipem je domluva jednoduchá, koordinace funguje a práce ' +
      'má spád. Když potřebujeme něco upravit nebo přidat nad rámec původního zadání, ' +
      'reaguje rychle a ochotně hledá řešení.\n\n' +
      'Stará se především o naše reklamní videa, která díky jeho práci skvěle fungují. ' +
      'Výstupy jsou kvalitní a je na něj spoleh, což nám výrazně usnadňuje práci. ' +
      'Filipa rád doporučuji dál.',
  },
]

// VIDEO RECENZE
// youtubeId = kód z odkazu (z youtu.be/XYZ dej 'XYZ')
// vertical  = true u videí na výšku (reels, shorts)
export const videoReviews = [
  // { id: 'vr1', name: 'Jan Novák', role: 'majitel, DronPro', youtubeId: 'XXXXXXXXXXX', vertical: true },
]
