# Blog Post Generator — Scheduled Task Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a daily scheduled task that generates and publishes SEO/GEO-optimized blog posts to Supabase automatically.

**Architecture:** A scheduled task (`mcp__scheduled-tasks__create_scheduled_task`) runs daily at 9am. The prompt instructs Claude to: query existing posts via Supabase MCP, decide theme based on coverage gaps, generate GEO-optimized HTML content, generate cover image via Google Imagen API, upload to Supabase Storage, and insert the complete post into the `blog_posts` table.

**Tech Stack:** Claude Code scheduled tasks, Supabase MCP (execute_sql), Google Imagen 4.0 API, Supabase Storage API

---

### Task 1: Create Supabase Storage bucket for blog covers

**Step 1: Create the `blog-covers` bucket via Supabase MCP**

Use `mcp__95bcbb59-a3ca-4aaa-a323-58b2401bb921__execute_sql` to run:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;
```

**Step 2: Add RLS policy for public read access**

```sql
CREATE POLICY "Public read blog covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-covers');
```

**Step 3: Add RLS policy for service role insert**

```sql
CREATE POLICY "Service role insert blog covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-covers');
```

**Step 4: Verify bucket exists**

```sql
SELECT id, name, public FROM storage.buckets WHERE id = 'blog-covers';
```

Expected: one row with `public = true`.

---

### Task 2: Create the scheduled task

**Step 1: Create the scheduled task with `mcp__scheduled-tasks__create_scheduled_task`**

Parameters:
- `taskId`: `blog-post-generator`
- `description`: `Generates and publishes a daily SEO/GEO-optimized blog post to Supabase`
- `cronExpression`: `0 9 * * *` (daily at 9am local time)
- `prompt`: See full prompt below in Task 3

**Step 2: Verify the task was created**

Check that the skill file exists at `~/.claude/scheduled-tasks/blog-post-generator/SKILL.md`

---

### Task 3: The scheduled task prompt

The prompt must be comprehensive and self-contained. Here is the full prompt to use:

````
You are a blog content generator for Plus Energy, a solar energy subscription company in Rio Grande do Sul, Brazil. Your job is to generate and publish one SEO/GEO-optimized blog post.

## Company Context

- Plus Energy offers solar energy subscriptions (Geracao Distribuida) in RS via RGE network
- Discount: up to 25% on electricity bills
- No installation, no loyalty contract, 100% digital
- Regulated by Lei 14.300/2022 (ANEEL)
- Cities served: all RGE coverage area in RS (Erechim, Passo Fundo, Marcelino Ramos, Concordia, Getulio Vargas, Gaurama, Aratiba, Ijui, Santo Angelo, Cruz Alta, Santa Maria, Caxias do Sul, Bento Goncalves, Lajeado, Santa Cruz do Sul, Pelotas, Rio Grande, Novo Hamburgo, Sao Leopoldo, Canoas, Gravatai, Viamao, Cachoeirinha, and more)
- Average RGE tariff: R$ 0.85/kWh
- CNPJ: 51.181.561/0001-75
- Location: Marcelino Ramos, RS

## Step 1: Query existing posts

Use the Supabase MCP tool `execute_sql` to find all existing posts:

```sql
SELECT slug, category, tags, title FROM public.blog_posts ORDER BY published_at DESC;
```

Analyze what cities and topics are already covered.

## Step 2: Decide the topic

Follow a 3:1 ratio — 3 GEO local posts for every 1 informational post.

**GEO Local topics** (priority — one per city):
- "Como economizar na conta de luz em [Cidade]/RS"
- "Energia solar por assinatura em [Cidade]: como funciona"
- "Desconto na conta de luz [Cidade]: até 25% sem instalar nada"
- "Conta de luz cara em [Cidade]? Veja como reduzir"

**Informational topics:**
- O que é geração distribuída e como funciona
- Lei 14.300: o que muda na energia solar
- Energia solar por assinatura vs painéis próprios
- Como funciona o crédito de energia solar na conta de luz
- Vantagens da energia solar para empresas no RS
- Como escolher uma empresa de energia solar por assinatura
- Sustentabilidade e energia limpa no Rio Grande do Sul
- Tarifa de energia elétrica no RS: entenda sua conta
- Energia solar para condomínios: como funciona
- Energia solar para comércios e indústrias no RS

**Decision rules:**
1. Never repeat a slug that already exists
2. Prioritize cities without coverage
3. After all priority cities are covered, create variations (empresas, condominios, etc.)
4. Every 4th post should be informational (not GEO local)

## Step 3: Generate the content

Write the post in Brazilian Portuguese. The content MUST be optimized for GEO (Generative Engine Optimization) — structured to be cited by LLMs like ChatGPT, Perplexity, Gemini, and Claude.

**GEO optimization rules:**
- First paragraph: self-contained definition/answer in 40-60 words that directly answers the main query
- H2/H3 headings that match real search queries (with id attributes in kebab-case)
- Statistics with cited sources: "Segundo a ANEEL...", "De acordo com dados da EPE...", "A tarifa média da RGE no RS é de R$ 0,85/kWh (fonte: RGE/CPFL)"
- Comparison tables when relevant (HTML <table>)
- Numbered lists for process/how-to content
- NO keyword stuffing (reduces AI visibility by 10%)
- Natural, fluent language — write for humans, structure for machines
- Include specific numbers: R$ values, percentages, timeframes
- Each paragraph should convey one clear idea
- Content length: 800-1200 words

**HTML structure required:**
```html
<p>[Opening paragraph — 40-60 word self-contained answer to the main query]</p>

<h2 id="[kebab-case]">[Query-matching heading]</h2>
<p>[Content with cited statistics]</p>

<h2 id="como-funciona">[How it works section]</h2>
<ol>
  <li><strong>Step 1:</strong> description</li>
  ...
</ol>

<h2 id="quanto-custa">[Cost/savings section with real numbers]</h2>
<p>A tarifa média da RGE no RS é de aproximadamente <strong>R$ 0,85 por kWh</strong> (fonte: RGE/CPFL). Uma família que consome 300 kWh/mês paga cerca de R$ 380...</p>

<h2 id="vantagens">[Benefits section]</h2>
<ul>
  <li><strong>Benefit:</strong> explanation</li>
  ...
</ul>

<h2 id="cidades-atendidas">[Cities section — for GEO local posts]</h2>

<h2 id="como-aderir">[How to join section]</h2>
```

**Generate these fields:**
- `title`: max 60 chars, SEO keyword in front
- `slug`: kebab-case from title, no accents
- `excerpt`: 150-160 chars, compelling summary
- `content`: full HTML as described above
- `category`: one of "Economia", "Energia Solar", "Legislação", "Sustentabilidade"
- `tags`: 3-6 relevant tags as text array
- `reading_time`: word count / 200, rounded up
- `meta_title`: SERP-optimized title (can differ from title), max 60 chars
- `meta_description`: excerpt with subtle CTA, max 160 chars
- `faq`: JSON array of 3-5 {question, answer} objects with natural language questions people actually ask

## Step 4: Generate cover image

Use the Google Imagen API to generate a cover image. The prompt MUST relate to the post title and topic.

Run this bash command (replace PROMPT with a contextual image description in English):

```bash
curl -s -X POST \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/gen-lang-client-0609447011/locations/us-central1/publishers/google/models/imagen-4.0-generate-001:predict" \
  -H "x-goog-api-key: AIzaSyAJ8_jjgyBt4PPgbJHTGUVrMK_NjPZnYjY" \
  -H "Content-Type: application/json" \
  -d '{
    "instances": [{"prompt": "PROMPT"}],
    "parameters": {"sampleCount": 1, "aspectRatio": "16:9", "outputOptions": {"mimeType": "image/jpeg"}}
  }'
```

**Image prompt guidelines:**
- Derive from the post title and theme
- Professional photography style
- Brazilian context (landscapes, architecture, people)
- Solar energy related elements
- Example for GEO local post about Erechim: "Professional photo of solar panels on rooftop in a small Brazilian city with green hills, sunny day, Rio Grande do Sul landscape, warm lighting"
- Example for informational post: "Clean energy infographic concept, solar farm connected to power grid, Brazilian electricity infrastructure, professional photography"

The response contains base64 image data in `predictions[0].bytesBase64Encoded`.

Save the base64 to a temp file, then upload to Supabase Storage:

```bash
# Decode base64 to file
echo "BASE64_DATA" | base64 -d > /tmp/blog-cover.jpg

# Upload to Supabase Storage
curl -s -X POST \
  "https://ulelpcuaxvyfrqifxwpi.supabase.co/storage/v1/object/blog-covers/SLUG.jpg" \
  -H "Authorization: Bearer SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: image/jpeg" \
  --data-binary @/tmp/blog-cover.jpg
```

The public URL will be: `https://ulelpcuaxvyfrqifxwpi.supabase.co/storage/v1/object/public/blog-covers/SLUG.jpg`

If image generation fails for any reason, proceed without a cover image (set cover_url to null).

## Step 5: Insert into Supabase

Use `execute_sql` to insert the post:

```sql
INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_url, category, tags, reading_time, meta_title, meta_description, faq, published, published_at)
VALUES (
  'TITLE',
  'SLUG',
  'EXCERPT',
  'CONTENT_HTML',
  'COVER_URL_OR_NULL',
  'CATEGORY',
  ARRAY['tag1', 'tag2', 'tag3'],
  READING_TIME,
  'META_TITLE',
  'META_DESCRIPTION',
  '[{"question":"Q1","answer":"A1"},{"question":"Q2","answer":"A2"}]'::jsonb,
  true,
  now()
);
```

IMPORTANT: Escape single quotes in all text fields by doubling them ('').

## Step 6: Confirm

After inserting, verify:

```sql
SELECT id, title, slug, published_at FROM public.blog_posts WHERE slug = 'THE-SLUG';
```

Report the result: title, slug, and the full URL: `https://plusenergy.com.br/blog/SLUG`
````

---

### Task 4: Test the scheduled task manually

**Step 1: Run the task manually**

Trigger the scheduled task to verify it works end-to-end.

**Step 2: Verify the post was created**

Query Supabase to confirm the new post exists with all fields populated.

**Step 3: Check the blog page**

Navigate to the blog listing and the new post page to verify rendering.

---

### Task 5: Verify Supabase Storage upload works

**Step 1: Check if we need the service role key for storage uploads**

The anon key may not have permission to upload to storage. If uploads fail, we need to either:
- Add the service role key to the environment
- Or use `execute_sql` to insert the image URL directly (using an external hosting fallback)

**Step 2: Test image upload flow**

Generate a test image and attempt upload to verify the full pipeline.

---

### Task 6: Update memory

**Step 1: Update the project blog automation memory file**

Update `project_blog_automation.md` to reflect the new approach (scheduled task instead of N8N).
