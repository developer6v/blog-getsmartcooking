# Get Smart Cooking, site completo

Costa Launch LLC, operando como Get Smart Cooking.
Build: 15 de maio de 2026.

## Estrutura

```
/.htaccess               Configuração Apache (URL rewrite, HTTPS, cache, segurança)
/robots.txt              Instruções para bots de busca
/sitemap.xml             Mapa do site para Google e Bing
/index.html              Redirector silencioso (detecta idioma do navegador)
/README.md               Este arquivo
/en/index.html           Landing em inglês
/en/privacy.html         Política de privacidade
/en/terms.html           Termos de uso
/es/index.html           Landing em espanhol
/es/privacy.html
/es/terms.html
/pt/index.html           Landing em português brasileiro
/pt/privacy.html
/pt/terms.html
```

URLs públicas finais:
- `getsmartcooking.com` redireciona para `/en/`, `/es/` ou `/pt/` conforme navegador
- `getsmartcooking.com/en/`, `/es/`, `/pt/` levam direto à landing daquele idioma
- `getsmartcooking.com/en/privacy`, `/es/privacy`, `/pt/privacy`
- `getsmartcooking.com/en/terms`, `/es/terms`, `/pt/terms`

## Como publicar (Cloudflare + cPanel)

### Passo 1, subir os arquivos no cPanel

1. Entre no cPanel, abra o File Manager
2. Vá pra pasta `public_html/`
3. Faça upload de TODOS os arquivos do zip, **incluindo o `.htaccess`** (que é arquivo oculto, pode estar invisível por padrão, ative "Show Hidden Files" no File Manager)
4. Confirme que a estrutura ficou:
   - `public_html/index.html`
   - `public_html/.htaccess`
   - `public_html/robots.txt`
   - `public_html/sitemap.xml`
   - `public_html/en/`, `public_html/es/`, `public_html/pt/` com seus respectivos arquivos

### Passo 2, configurar Cloudflare corretamente

Esses toggles no Cloudflare são CRÍTICOS pra evitar loop de redirect:

1. **SSL/TLS, Overview**: configurar pra **"Full"** ou **"Full (strict)"**. Nunca "Flexible", isso causa loop infinito com o `.htaccess` que força HTTPS.
2. **SSL/TLS, Edge Certificates**: ativar **"Always Use HTTPS"** (Cloudflare faz o redirect HTTP→HTTPS na borda, mais rápido que Apache)
3. **SSL/TLS, Edge Certificates**: ativar **"Automatic HTTPS Rewrites"**
4. **Speed, Optimization**: ativar **"Auto Minify"** para HTML, CSS, JS
5. **Speed, Optimization**: ativar **"Brotli"** (compressão melhor que Gzip)
6. **Caching, Configuration**: deixar em **"Standard"** (default)

### Passo 3, testar

Abra essas URLs em sequência e confirme o comportamento:

- `getsmartcooking.com` → deve redirecionar para `/en/`, `/es/` ou `/pt/` (depende do seu navegador)
- `getsmartcooking.com/en/` → landing em inglês
- `getsmartcooking.com/en/privacy` → privacy em inglês (sem `.html` na URL)
- `getsmartcooking.com/en/privacy.html` → deve redirecionar pra `/en/privacy` (URL limpa)
- `getsmartcooking.com/es/` → landing em espanhol
- `getsmartcooking.com/pt/` → landing em português

Se der **erro 500** ao acessar qualquer URL: o `.htaccess` não foi compatível com a versão do Apache do seu host. Me chama e eu adapto.

Se **HTTPS estiver em loop infinito**: o modo SSL do Cloudflare está em "Flexible". Mude pra "Full".

Se URLs com `.html` no final continuarem funcionando ao invés de redirecionar: limpe o cache do Cloudflare em **"Caching, Configuration, Purge Everything"**.

### Passo 4, submeter sitemap ao Google

Depois que o site estiver no ar:

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade `getsmartcooking.com`
3. Verifique a propriedade (Cloudflare facilita com DNS record automático)
4. Em "Sitemaps", submeta `https://getsmartcooking.com/sitemap.xml`

Em 3 a 7 dias o Google indexa as 9 páginas dos 3 idiomas separadamente.

## Antes do go-live, ainda falta

### 1. IDs de tracking

Em `en/index.html`, `es/index.html` e `pt/index.html`, procure por:

- `YOUR_PIXEL_ID` → substituir pelo ID do Meta Pixel
- `G-XXXXXXX` → substituir pelo ID do GA4 (2 ocorrências em cada arquivo)

Os scripts estão comentados com `<!-- ... -->`. Descomente o bloco quando colocar os IDs.

### 2. Ativos visuais

Em cada `index.html` dos 3 idiomas, procure pelos comentários `REPLACE:`:

- 3 vídeos verticais 9:16 (sorvete, pão, risoto)
- Foto da Natascha cozinhando com a Thermomix (4:5 vertical)
- Opcional, vídeo de fundo do hero

Os placeholders atuais funcionam, mas a página real precisa desses assets pra performance de conversão.

### 3. Revisão jurídica recomendada

Antes de subir Meta Ads acima de USD 50 por dia, vale pagar uma hora de advogado especializado em direct sales pra revisar os Terms em inglês. Custa USD 250 a USD 500. Os outros idiomas seguem a mesma lógica jurídica do inglês.

### 4. Atualização do ICA com a Vorwerk

A Natascha está registrada como Advisor pessoa física. O site é operado pela Costa Launch LLC. Vale comunicar à Vorwerk USA essa estrutura, por escrito, pra evitar qualquer questionamento futuro.

## Identidade legal definida no site

- Operador do site: Costa Launch LLC, sociedade do Texas
- Endereço: 2001 Timberloch Place, The Woodlands, Texas 77380
- Consultora Independente: Natascha Costa, pessoa física
- WhatsApp: +1 832 804 5758
- Email: support@getsmartcooking.com
- Instagram: @nataschaflow

## Tracking já implementado

Cada CTA do WhatsApp dispara dois eventos:
- Meta Pixel: evento `Contact` com parâmetros `source` (seção da página) e `lang` (idioma)
- GA4: evento `whatsapp_click` com `cta_source` e `language`

Depois de 30 dias de tráfego você terá visibilidade total de qual seção e qual idioma converte mais.

## Próximos blocos do sistema, ainda não construídos

- System prompt da Bella refinado pra detectar idioma e responder em PT, EN, ES
- 3 anúncios trilíngues no Meta Ads apontando direto pra `/en/`, `/es/`, `/pt/`
- Briefing de produção dos vídeos verticais pros cards
- Setup de CRM e n8n conforme arquivo `06_briefing_dev_e_setup.md` do projeto
