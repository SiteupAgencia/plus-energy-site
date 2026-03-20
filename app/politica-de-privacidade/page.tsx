import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Plus Energy",
  description: "Política de privacidade e tratamento de dados da Plus Energy.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="bg-white">
      <section className="bg-pe-green-950 pt-36 pb-16 px-4 text-center">
        <h1 className="font-heading text-4xl font-extrabold text-white">Política de Privacidade</h1>
        <p className="text-white/40 mt-3">Atualizada em março de 2025</p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 prose prose-slate prose-headings:font-heading prose-headings:font-bold prose-a:text-pe-green-600">
        <h2>1. Coleta de dados</h2>
        <p>A Plus Energy coleta informações fornecidas diretamente pelo usuário ao preencher formulários no site, como nome completo, telefone (WhatsApp) e endereço de e-mail. Esses dados são utilizados exclusivamente para contato comercial e prestação dos serviços contratados.</p>

        <h2>2. Uso dos dados</h2>
        <p>Os dados coletados são utilizados para: (a) entrar em contato para apresentar a simulação de economia; (b) formalizar o contrato de assinatura de energia; (c) envio da Conta Única digital mensalmente; (d) comunicações sobre a conta e o serviço.</p>

        <h2>3. Compartilhamento</h2>
        <p>A Plus Energy não vende, aluga ou compartilha seus dados pessoais com terceiros para fins comerciais. Dados poderão ser compartilhados com parceiros operacionais (distribuidoras de energia, processadores de pagamento) estritamente para execução do serviço.</p>

        <h2>4. Armazenamento e segurança</h2>
        <p>Seus dados são armazenados em servidores seguros e tratados em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).</p>

        <h2>5. Seus direitos</h2>
        <p>Você tem o direito de solicitar acesso, correção, portabilidade ou exclusão dos seus dados a qualquer momento. Para exercer esses direitos, entre em contato pelo e-mail <a href="mailto:contato@plusenergy.com.br">contato@plusenergy.com.br</a>.</p>

        <h2>6. Cookies</h2>
        <p>Utilizamos cookies para análise de navegação e melhoria da experiência no site. Você pode desabilitar cookies nas configurações do seu navegador.</p>

        <h2>7. Contato</h2>
        <p>Dúvidas sobre esta política? Entre em contato: <a href="mailto:contato@plusenergy.com.br">contato@plusenergy.com.br</a> · Plus Energy · CNPJ 51.181.561/0001-75 · Marcelino Ramos/RS.</p>
      </section>
    </main>
  );
}
