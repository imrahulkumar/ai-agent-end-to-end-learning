// Shared model setup for every agent in this repo.
//
// If `baseURL` is set in .env, the Agents SDK is pointed at a local
// OpenAI-compatible model server (Docker Model Runner, Ollama, LM Studio, ...).
// If it is not set, the SDK talks to OpenAI as usual.
import 'dotenv/config';
import OpenAI from 'openai';
import {
  setDefaultOpenAIClient,
  setOpenAIAPI,
  setTracingDisabled,
} from '@openai/agents';

export const IS_LOCAL = Boolean(process.env.baseURL);

if (IS_LOCAL) {
  const client = new OpenAI({
    baseURL: process.env.baseURL,
    apiKey: process.env.apiKey || 'not-needed', // local server ignores it, but the OpenAI client requires a value
  });

  setDefaultOpenAIClient(client);
  setOpenAIAPI('chat_completions'); // local servers speak Chat Completions, not the Responses API
  setTracingDisabled(true); // don't try to upload traces to OpenAI
}

// Model served by the local server (e.g. ai/gemma4). Without this the SDK
// falls back to its default OpenAI model, which the local server doesn't have.
export const MODEL = process.env.model || 'gpt-4o-mini';
