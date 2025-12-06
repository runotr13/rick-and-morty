'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface RootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: RootTemplateProps) {
  const pathname = usePathname();

  const baseUrl = 'https://rick-and-morty-explorer.example.com';

  const currentUrl = `${baseUrl}${pathname === '/' ? '' : pathname}`;

  const pageTitle = 'Rick & Morty Explorer';
  const pageDescription =
    'Rick & Morty Explorer – Next.js 15 ile SSR çalışan, status ve gender filtreleri, nuqs ile URL yönetimi ve React Query ile veri önbellekleme sunan karakter keşif uygulaması.';

  // Basit breadcrumb mantığı: -> /characters -> /characters/[id]
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ];

  if (pathname.startsWith('/characters')) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Characters',
      item: `${baseUrl}/characters`,
    });

    // /characters/:id için basit detail breadcrumb
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 2) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: 'Character Detail',
        item: currentUrl,
      });
    }
  }

  const jsonLdWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: currentUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Rick & Morty Explorer',
      url: baseUrl,
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bu uygulama nasıl çalışıyor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Uygulama Rick and Morty API'den karakter verilerini Next.js 15 ile SSR olarak çeker. Filtreler nuqs kütüphanesi ile URL query parametreleri üzerinden yönetilir ve React Query ile önbelleğe alınır.",
        },
      },
      {
        '@type': 'Question',
        name: 'Karakterleri status ve gender filtresine göre nasıl süzebilirim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Status (alive, dead, unknown) ve gender (female, male, genderless, unknown) filtrelerini seçtiğinizde, seçimler URL query parametrelerine yansır ve sunucu tarafında SSR ile filtrelenmiş veri tekrar çekilir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bu proje neden SEO ve performans odaklı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Projede Next.js 15 SSR, canonical URL, WebPage ve Breadcrumb JSON-LD, ayrıca FAQPage schema kullanılarak arama motorları için zengin sonuç desteği ve daha iyi SEO sağlanır.',
        },
      },
    ],
  };

  return (
    <>
      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb),
        }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebPage),
        }}
      />

      {children}
    </>
  );
}
