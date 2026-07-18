import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { selfPublishingContent } from '@/lib/service-pages/self-publishing';

export const metadata = {
  title: selfPublishingContent.title,
  description: selfPublishingContent.metaDescription,
  alternates: { canonical: selfPublishingContent.slug },
  openGraph: {
    title: selfPublishingContent.title,
    description: selfPublishingContent.metaDescription,
    url: selfPublishingContent.slug,
    type: 'website',
  },
};

export default function SelfPublishingServicesPage() {
  return <ServiceDetailPage content={selfPublishingContent} />;
}
