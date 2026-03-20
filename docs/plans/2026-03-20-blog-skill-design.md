# Design — Skill `/blog-post` + Schedule Diario

## Resumo

Skill do Claude Code que gera e publica 1 post de blog por dia no Supabase, otimizado para GEO (Generative Engine Optimization) — conteudo estruturado para ser citado por LLMs (ChatGPT, Perplexity, Gemini, Claude) alem de rankear no Google tradicional.

## Arquitetura

```
/blog-post (skill)
  1. Consulta Supabase — posts existentes (slugs, categorias, cidades cobertas)
  2. Decide tema — analisa gaps de cobertura (GEO + informacional, ratio 3:1)
  3. Pesquisa — busca dados reais, estatisticas, fontes citaveis
  4. Gera conteudo — HTML otimizado pra GEO (estrutura extractavel)
  5. Gera imagem — Google Imagen API (prompt derivado do titulo)
  6. Upload imagem — Supabase Storage (bucket blog-covers)
  7. Insere no Supabase — post completo com published: true
  8. Confirma — retorna titulo + slug + URL do post publicado

Schedule: roda /blog-post 1x/dia (default 9h)
```

## Estrategia de Conteudo GEO

Cada post e otimizado pra ser citado por LLMs, nao apenas rankeado no Google.

### Estrutura do HTML gerado

- **Paragrafo de definicao** (40-60 palavras) — resposta direta auto-contida, ideal pra extracao por IA
- **H2/H3 com IDs** — headings que espelham queries reais ("Como funciona energia solar em [cidade]?")
- **Blocos de estatisticas citadas** — numeros reais com fonte ("Segundo a ANEEL...", "De acordo com a RGE...")
- **Tabelas comparativas** — quando relevante (ex: tarifa RGE vs economia Plus Energy)
- **Lista de passos** — para queries "como fazer"
- **FAQ com 3-5 perguntas** — perguntas naturais que LLMs extraem diretamente
- **Sem keyword stuffing** — linguagem natural e fluente (stuffing reduz visibilidade em -10%)

### Mix de conteudo (3:1)

- 3 posts GEO locais ("energia solar em [cidade]", "conta de luz [cidade]")
- 1 post informativo ("o que e geracao distribuida", "Lei 14.300 explicada")

### Fontes de autoridade

- ANEEL (regulamentacao)
- EPE (dados energeticos)
- Lei 14.300/2022
- Tarifas RGE (dados publicos)
- IRENA/IEA (dados globais de energia solar)

## Campos gerados por post

| Campo | Como e gerado |
|---|---|
| `title` | Titulo SEO com keyword principal (max 60 chars) |
| `slug` | Derivado do titulo, kebab-case |
| `excerpt` | Resumo de 150-160 chars (meta description length) |
| `content` | HTML completo com h2/h3 (IDs), paragrafos, tabelas, listas |
| `cover_url` | URL da imagem gerada via Imagen -> Supabase Storage |
| `category` | Uma das: "Economia", "Energia Solar", "Legislacao", "Sustentabilidade", "GEO Local" |
| `tags` | 3-6 tags relevantes (ex: ["energia-solar", "erechim", "rge"]) |
| `reading_time` | Calculado: palavras / 200 |
| `meta_title` | Titulo otimizado pra SERP (pode diferir do title) |
| `meta_description` | Excerpt com CTA sutil |
| `faq` | Array de 3-5 objetos {question, answer} em linguagem natural |
| `published` | true (auto-publish) |
| `published_at` | now() |

## Fluxo de decisao de tema

```
1. Busca todos os posts existentes no Supabase (slug, category, tags)
2. Extrai cidades ja cobertas dos slugs/tags
3. Compara com lista completa de cidades RGE (constants.ts)
4. Se ha cidades sem post -> gera post GEO local pra proxima cidade
5. Se todas cobertas -> verifica temas informativos nao cobertos
6. Se ciclo completo -> gera variacoes (ex: "economia para empresas em [cidade]")
7. Nunca repete slug existente
```

## Imagem de capa

- Prompt para Imagen derivado do titulo e tema do post
- Exemplos:
  - "Como economizar na conta de luz em Erechim" -> "solar panels on rooftop of a house in a small Brazilian city, green hills background, sunny day, professional photography"
  - "O que e Geracao Distribuida" -> "electricity distribution grid connected to solar farm, infographic style, clean energy concept, Brazilian landscape"
  - "Lei 14.300 explicada" -> "Brazilian government building with solar panels, official document signing, clean energy regulation concept"
- Upload para Supabase Storage (bucket `blog-covers`)
- Se Imagen falhar -> post publica sem capa (cover_url: null)

## Schedule

- Frequencia: 1x/dia
- Horario: configuravel (default: 9h)
- Comando: `/blog-post`

## Decisoes tecnicas

- **Abordagem escolhida:** Skill + Schedule (vs. script Node.js autonomo ou hibrido)
- **Razao:** Aproveita o Claude Code como motor de IA sem API key extra, invocavel manualmente para teste
- **Auto-publish:** Posts publicam automaticamente (published: true)
- **Tema autonomo:** Skill decide o proximo tema com base nos gaps de cobertura
- **GEO first:** Conteudo estruturado para extracao por LLMs (definicoes auto-contidas, FAQ natural, estatisticas citadas)
