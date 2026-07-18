import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { ghostwritingContent } from '@/lib/service-pages/ghostwriting';

export const metadata = {
  title: ghostwritingContent.title,
  description: ghostwritingContent.metaDescription,
  alternates: { canonical: ghostwritingContent.slug },
  openGraph: {
    title: ghostwritingContent.title,
    description: ghostwritingContent.metaDescription,
    url: ghostwritingContent.slug,
    type: 'website',
  },
};

export default function GhostwritingServicesPage() {
  return <ServiceDetailPage content={ghostwritingContent} />;
}
