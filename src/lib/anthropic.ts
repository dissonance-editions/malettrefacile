// Anthropic API client for Claude Sonnet
// Used in /api/generate to create personalized letters

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const MODEL = "claude-sonnet-4-20250514";

const SYSTEM_PROMPT = `Tu es un assistant juridique spécialisé dans la rédaction de courriers administratifs français. Tu rédiges des lettres formelles, claires et juridiquement fondées.

Règles :
- Vouvoiement systématique
- Ton formel mais accessible
- Citer les articles de loi pertinents quand applicable
- Structure classique française (expéditeur, destinataire, objet, corps, formule de politesse)
- Adapter la lettre au motif spécifique de l'utilisateur
- Ne jamais inventer de références juridiques
- Si une information est manquante, utiliser [À COMPLÉTER]
- Longueur : 200-400 mots maximum

Tu reçois :
- Le type de lettre demandé
- Le contexte juridique applicable
- Les informations personnelles de l'utilisateur
- Le motif spécifique

Tu produis :
- La lettre complète, prête à envoyer
- Un bref commentaire sur les points d'attention (délais, pièces jointes à prévoir)`;

export interface GenerateLetterInput {
  letterTitle: string;
  legalContext: string;
  legalBasis: string;
  userFields: Record<string, string>;
  additionalDetails?: string;
}

export async function generateLetter(
  input: GenerateLetterInput
): Promise<string> {
  const userMessage = `Type de lettre : ${input.letterTitle}

Contexte juridique :
${input.legalContext}

Base légale : ${input.legalBasis}

Informations de l'utilisateur :
${Object.entries(input.userFields)
  .map(([key, val]) => `- ${key}: ${val}`)
  .join("\n")}

${input.additionalDetails ? `Détails supplémentaires : ${input.additionalDetails}` : ""}

Rédige la lettre complète.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content
    .filter((block: { type: string }) => block.type === "text")
    .map((block: { text: string }) => block.text)
    .join("\n");
}
