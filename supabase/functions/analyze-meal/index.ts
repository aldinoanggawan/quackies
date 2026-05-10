import { createClient } from 'jsr:@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Missing authorization header' }),
      {
        status: 401,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      },
    );
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
  );

  const { error: authError } = await supabase.auth.getUser(
    authHeader.replace('Bearer ', ''),
  );
  if (authError) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const { beforeImage, afterImage, mimeType, userNote } = await req.json();

  let prompt: string;
  if (afterImage) {
    prompt =
      'The first image shows the meal before eating. The second image shows what remains after eating. Compare both images carefully. Set eaten to true for items that were fully or partially consumed, and false only for items that are clearly still remaining uneaten in the after photo. Estimate calories only for eaten items.';
  } else {
    prompt =
      'Identify all food items in this image. The user ate everything shown. Set eaten to true for every item. Estimate the calories for each item assuming the full portion was consumed.';
  }

  if (userNote) {
    prompt += ` Additional context from the user: ${userNote}`;
  }

  prompt += ` Respond in this exact JSON format with no markdown:
{
  "items": [{ "name": string, "portion": string, "kcal": number, "eaten": boolean }],
  "totalKcal": number,
  "confidence": number between 0 and 1 where 1 is 100% confident,
  "notes": string
}`;

  const parts: unknown[] = [
    { text: prompt },
    { inline_data: { mime_type: mimeType, data: beforeImage } },
  ];

  if (afterImage) {
    parts.push({ inline_data: { mime_type: mimeType, data: afterImage } });
  }

  const apiKey = Deno.env.get('GEMINI_API_KEY')!;
  const geminiRes = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          maxOutputTokens: 1024,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      }),
    },
  );

  const geminiData = await geminiRes.json();
  console.log('Gemini raw response:', JSON.stringify(geminiData));

  if (!geminiData.candidates || geminiData.candidates.length === 0) {
    console.error(
      'No candidates in Gemini response:',
      JSON.stringify(geminiData),
    );
    return new Response(
      JSON.stringify({
        error: 'Gemini returned no candidates',
        detail: geminiData,
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      },
    );
  }

  const rawText: string = geminiData.candidates[0].content.parts[0].text;
  const cleaned = rawText
    .replace(/^```(?:json)?\n?/, '')
    .replace(/\n?```$/, '')
    .trim();

  let analysis: unknown;
  try {
    analysis = JSON.parse(cleaned);
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to parse Gemini response' }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      },
    );
  }

  return new Response(JSON.stringify(analysis), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
});
