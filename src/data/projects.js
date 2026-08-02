// PROJEKTY / VIDEA
// Přidat nové video: zkopíruj řádek a vyplň youtubeId (kód z odkazu),
// category ('reels' | 'youtube' | 'ads' | 'motion' | 'ai'), vertical (true = na výšku),
// a názvy titleCs / titleEn.
// youtubeId = to za "youtu.be/" nebo "youtube.com/shorts/" (např. z youtu.be/2E8GxgTRM1U -> "2E8GxgTRM1U")
export const projects = [
  { id: 'v1', category: 'youtube', vertical: false, youtubeId: '2E8GxgTRM1U', titleCs: 'DronPro informační video', titleEn: 'DronPro — info video' },
  { id: 'v2', category: 'ai', vertical: true, youtubeId: 'iG4tzlkIXiM', titleCs: 'DronPro — AI short', titleEn: 'DronPro — AI short' },
  { id: 'v3', category: 'reels', vertical: true, youtubeId: 'weEbp1IW9Kw', titleCs: 'Barber Shop — reels', titleEn: 'Barber Shop — reel' },
  { id: 'v4', category: 'reels', vertical: true, youtubeId: 'Jr1Pn1nFnEA', titleCs: 'DronPro — reels', titleEn: 'DronPro — reel' },
  { id: 'v5', category: 'motion', vertical: true, youtubeId: 'Y6peuxHWSYk', titleCs: 'Tycoon Funded — motion grafika', titleEn: 'Tycoon Funded — motion graphics' },
  { id: 'v6', category: 'motion', vertical: true, youtubeId: 'JxVhWQz1CKU', titleCs: 'ThaurusGuru — motion grafika', titleEn: 'ThaurusGuru — motion graphics' },
  { id: 'v7', category: 'youtube', vertical: false, youtubeId: 'agJAubvtNJY', titleCs: 'DronPro recenze', titleEn: 'DronPro — review' },
  { id: 'v8', category: 'ai', vertical: true, youtubeId: 'jQgZoLFz1zA', titleCs: 'Gemini Omni — AI short', titleEn: 'Gemini Omni — AI short' },
  { id: 'v9', category: 'ai', vertical: true, youtubeId: 'ohmgMUcXXYQ', titleCs: 'Burton — AI short', titleEn: 'Burton — AI short' },
  { id: 'v10', category: 'ai', vertical: true, youtubeId: 'k8EWqzeatAg', titleCs: 'DronPro — AI short II', titleEn: 'DronPro — AI short II' },
  { id: 'v11', category: 'reels', vertical: true, youtubeId: 'tSfYluucZsc', titleCs: 'Mercedes — Instagram reels', titleEn: 'Mercedes — Instagram reel' },
  { id: 'v12', category: 'youtube', vertical: false, youtubeId: 'fGARiuXM0M8', titleCs: 'Dáváme — podcast', titleEn: 'Dáváme — podcast' },
]

// pořadí odpovídá filtrům v translations (Vše, Reels & Shorts, YouTube, Reklama, Motion, AI videa)
export const filterIds = ['all', 'reels', 'youtube', 'ads', 'motion', 'ai']

// náhledy z YouTube (maxres, s fallbackem na hqdefault)
export const thumbMax = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
export const thumbHq = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
