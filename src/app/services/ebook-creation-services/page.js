import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { ebookCreationContent } from '@/lib/service-pages/ebook-creation';

export const metadata = {
  title: ebookCreationContent.title,
  description: ebookCreationContent.metaDescription,
  alternates: { canonical: ebookCreationContent.slug },
  openGraph: {
    title: ebookCreationContent.title,
    description: ebookCreationContent.metaDescription,
    url: ebookCreationContent.slug,
    type: 'website',
  },
};

export default function EbookCreationServicesPage() {
  return <ServiceDetailPage content={ebookCreationContent} />;
}
