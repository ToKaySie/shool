import { GoogleGenerativeAI } from '@google/generative-ai'
import { store } from '../store'

export async function generateNote(data) {
  const apiKey = store.getState().apiKey.key

  if (!apiKey) {
    throw new Error('Clé API manquante. Veuillez configurer votre clé API Gemini.')
  }

  const genAI = new GoogleGenerativeAI(apiKey)

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    En tant qu'expert pédagogique, crée une fiche de révision détaillée et structurée en Markdown sur le sujet suivant.
    
    Sujet: ${data.topic}
    Matière: ${data.subject}
    Niveau: ${data.level}
    
    Instructions spécifiques:
    ${data.includeGraphics ? '- Inclure des descriptions détaillées de graphiques et schémas pertinents' : ''}
    ${data.includeTables ? '- Inclure des tableaux récapitulatifs en format Markdown' : ''}
    ${data.includeExamples ? '- Inclure des exemples concrets et exercices pratiques' : ''}
    
    Structure requise:
    
    # ${data.title}
    
    ## Introduction
    - Présentation claire et concise du sujet
    - Importance et contexte
    
    ## Concepts Fondamentaux
    - Définitions clés
    - Principes essentiels
    - Points théoriques importants
    
    ## Explications Détaillées
    - Développement approfondi des concepts
    - Méthodes et techniques
    - Relations entre les différents aspects
    
    ## Applications et Exemples
    - Cas pratiques
    - Exercices résolus
    - Situations concrètes
    
    ## Synthèse
    - Points clés à retenir
    - Schéma récapitulatif
    - Conseils pratiques
    
    ## Pour Aller Plus Loin
    - Exercices supplémentaires
    - Ressources complémentaires
    - Liens avec d'autres concepts
    
    Consignes de style:
    - Utiliser un langage clair et adapté au niveau demandé
    - Inclure des points d'attention et astuces
    - Mettre en évidence les formules et définitions importantes
    - Utiliser des listes à puces pour la clarté
    - Ajouter des citations ou encadrés pour les points essentiels
    
    Format Markdown:
    - Utiliser les titres avec # ## ###
    - Mettre en gras les points importants avec **
    - Utiliser des listes avec - ou 1.
    - Créer des tableaux avec | si nécessaire
    - Utiliser des blocs de code pour les formules
    - Utiliser > pour les citations importantes
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Erreur API Gemini:', error)
    if (error.message.includes('API key')) {
      throw new Error('Clé API invalide. Veuillez vérifier votre configuration.')
    }
    throw new Error('Erreur lors de la génération de la fiche. Veuillez réessayer.')
  }
}
