import { COMPANY, FAQ_DATA, HOW_IT_WORKS_STEPS, CASES } from "@/lib/constants";

type SchemaType =
  | "organization"
  | "faqPage"
  | "localBusiness"
  | "howTo"
  | "service"
  | "reviews"
  | "webSite";

interface JsonLdProps {
  type: SchemaType;
}

const BASE_URL = "https://plusenergy.net.br";

export function JsonLd({ type }: JsonLdProps) {
  const schemas: Record<SchemaType, object> = {
    webSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: COMPANY.name,
      description: COMPANY.tagline,
      inLanguage: "pt-BR",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: COMPANY.name,
      description: COMPANY.tagline,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
        width: 300,
        height: 100,
      },
      foundingDate: "2025",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${COMPANY.whatsapp}`,
        email: COMPANY.email,
        availableLanguage: "Portuguese",
        areaServed: "BR",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marcelino Ramos",
        addressRegion: "RS",
        addressCountry: "BR",
      },
      sameAs: [
        "https://www.instagram.com/plusenergy.rs/",
        "https://www.facebook.com/profile.php?id=61579806653489",
      ],
    },
    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_DATA.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: COMPANY.name,
      description:
        "Energia solar por assinatura com até 25% de desconto na conta de luz. Sem instalação, sem fidelidade. Regulamentado pela Lei 14.300/2022 (ANEEL).",
      url: BASE_URL,
      telephone: `+${COMPANY.whatsapp}`,
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marcelino Ramos",
        addressRegion: "RS",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -27.4688,
        longitude: -51.9097,
      },
      areaServed: {
        "@type": "State",
        name: "Rio Grande do Sul",
      },
      priceRange: "$$",
      image: `${BASE_URL}/og-image.png`,
      sameAs: [
        "https://www.instagram.com/plusenergy.rs/",
        "https://www.facebook.com/profile.php?id=61579806653489",
      ],
    },
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Como funciona a energia solar por assinatura da Plus Energy",
      description:
        "Em 5 passos simples você começa a economizar até 25% na conta de luz sem instalar nada. Processo 100% digital regulamentado pela Lei 14.300/2022.",
      totalTime: "PT30D",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "BRL",
        value: "0",
      },
      step: HOW_IT_WORKS_STEPS.map((s) => ({
        "@type": "HowToStep",
        position: s.step,
        name: s.title,
        text: s.description,
      })),
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Energia Solar por Assinatura para Empresas",
      description:
        "Desconto de até 25% na conta de luz CNPJ sem instalação, sem obra e sem fidelidade. Energia solar por assinatura regulamentada pela Lei 14.300/2022 (ANEEL) para comércios e empresas no Rio Grande do Sul.",
      provider: {
        "@type": "Organization",
        name: COMPANY.name,
        url: BASE_URL,
      },
      areaServed: {
        "@type": "State",
        name: "Rio Grande do Sul",
      },
      serviceType: "Energia Solar por Assinatura",
      audience: {
        "@type": "Audience",
        audienceType: "Empresas e Comércios",
      },
      offers: {
        "@type": "Offer",
        description: "Desconto de até 25% na conta de luz. Sem taxa de adesão.",
        priceCurrency: "BRL",
        url: `${BASE_URL}/para-empresas`,
        availability: "https://schema.org/InStock",
      },
    },
    reviews: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: COMPANY.name,
      url: BASE_URL,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: String(CASES.length),
        bestRating: "5",
        worstRating: "1",
      },
      review: CASES.map((c) => ({
        "@type": "Review",
        author: { "@type": "Person", name: c.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: c.testimonial,
        datePublished: c.reviewDate,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
    />
  );
}
