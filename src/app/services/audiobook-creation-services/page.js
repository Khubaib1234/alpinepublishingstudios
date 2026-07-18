import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { audiobookCreationContent } from '@/lib/service-pages/audiobook-creation';

export const metadata = {
  title: audiobookCreationContent.title,
  description: audiobookCreationContent.metaDescription,
  alternates: { canonical: audiobookCreationContent.slug },
  openGraph: {
    title: audiobookCreationContent.title,
    description: audiobookCreationContent.metaDescription,
    url: audiobookCreationContent.slug,
    type: 'website',
  },
};

export default function AudiobookCreationServicesPage() {
  return <ServiceDetailPage content={audiobookCreationContent} />;
}
