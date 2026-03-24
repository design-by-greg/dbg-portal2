export const WORKFLOW = {
  request: {
    nouvelle: ['en_etude', 'archivee'],
    en_etude: ['devis_en_preparation', 'archivee'],
    devis_en_preparation: ['devis_envoye', 'archivee'],
    devis_envoye: ['convertie', 'archivee'],
    convertie: [],
    archivee: []
  },
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

// Vérifie si transition autorisée
export function canTransition(type, from, to) {
  return WORKFLOW[type]?.[from]?.includes(to)
}

// Sécurise un changement de statut
export function enforceTransition(type, current, next) {
  if (!canTransition(type, current, next)) {
    throw new Error(`Transition interdite: ${current} → ${next}`)
  }
}
