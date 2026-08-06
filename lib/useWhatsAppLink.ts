"use client";

import { useEffect, useState } from "react";
import { getWhatsAppLink, type WaLinkParams } from "./whatsapp";

/**
 * Link do WhatsApp resolvido no cliente.
 *
 * O SSR gera a versão sem UTM (não existe `window` no servidor) e o efeito
 * completa com a campanha assim que a página hidrata. Sem esse passo, o href
 * renderizado no servidor divergiria do cliente.
 */
export function useWhatsAppLink(params: WaLinkParams): string {
  // Primeira renderização sem UTM para bater com o HTML do servidor.
  const [url, setUrl] = useState(() => getWhatsAppLink(params, false));
  const key = JSON.stringify(params);

  useEffect(() => {
    setUrl(getWhatsAppLink(params, true));
    // `key` serializa os params: evita reexecutar a cada render por identidade de objeto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return url;
}
