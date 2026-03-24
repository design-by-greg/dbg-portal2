export const WORKFLOW = {
  quote: {
    brouillon: ['envoye'],
    envoye: ['accepte', 'refuse', 'paye'],
    accepte: ['paye'],
    refuse: [],
    paye: []
  },
  project: {
    paye: ['en_preparation'],
    en_preparation: ['bat_envoye'],
    bat_envoye: ['corrections', 'bat_valide'],
    corrections: ['bat_envoye'],
    bat_valide: ['en_production'],
    en_production: ['expedie'],
    expedie: ['livre'],
    livre: ['archive'],
    archive: []
  }
}

export function canTransition(type, from, to) {
  return WORKFLOW[type]?.[from]?.includes(to)
}
