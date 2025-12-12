'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating medical documents.
 *
 * - translateMedicalDocument - A function that handles the medical document translation process.
 * - MedicalDocumentInput - The input type for the translateMedicalDocument function.
 * - MedicalDocumentOutput - The return type for the translateMedicalDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "The medical document as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MedicalDocumentInput = z.infer<typeof MedicalDocumentInputSchema>;

const MedicalDocumentOutputSchema = z.object({
  extractedData: z.string().describe('The extracted medical data in JSON format.'),
  translatedSummary: z.string().describe('A summary of the medical document for diaspora doctors.'),
});
export type MedicalDocumentOutput = z.infer<typeof MedicalDocumentOutputSchema>;

export async function translateMedicalDocument(
  input: MedicalDocumentInput
): Promise<MedicalDocumentOutput> {
  return translateMedicalDocumentFlow(input);
}

const translateMedicalDocumentPrompt = ai.definePrompt({
  name: 'translateMedicalDocumentPrompt',
  input: {schema: MedicalDocumentInputSchema},
  output: {schema: MedicalDocumentOutputSchema},
  prompt: `You are a medical expert specializing in understanding medical documents from Nigeria.

You will extract key medical data from the document, convert it to a standardized international format, highlight critical values/abnormalities, and generate a summary for diaspora doctors.

Use the following as the primary source of information about the medical document.

Document: {{media url=documentDataUri}}`,
});

const translateMedicalDocumentFlow = ai.defineFlow(
  {
    name: 'translateMedicalDocumentFlow',
    inputSchema: MedicalDocumentInputSchema,
    outputSchema: MedicalDocumentOutputSchema,
  },
  async input => {
    const {output} = await translateMedicalDocumentPrompt(input);
    return output!;
  }
);

