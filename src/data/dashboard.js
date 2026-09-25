// DASHBOARD („Přehled · Filip Engelhart")
// Data pro graf v okně u sekce statistik.
//
// POZOR: čísla níž jsou ILUSTRATIVNÍ křivka růstu, ne export z YouTube Studia.
// Až budeš mít reálná čísla, přepiš pole `values`, jedna hodnota = jedno čtvrtletí.
// Měřítko osy Y se dopočítá samo, jednotky si drž stejné.

// křivka růstu zhlédnutí; popisky období tu schválně nejsou, aby graf
// neprozrazoval časovou osu. V bublině se ukazuje jen hodnota.
export const rangeAll = {
  id: 'all',
  values: [22, 47, 81, 128, 179, 287, 347, 483, 597, 753, 959, 1113],
  total: '~5 mil.',
}

// mapování položek bočního menu na pohledy (pořadí musí sedět s `dash.side` v translations.js)
// Seznamy videí tu schválně nejsou, od toho je galerie „Vybrané projekty" níž na stránce.
export const viewIds = ['overview', 'clients']
