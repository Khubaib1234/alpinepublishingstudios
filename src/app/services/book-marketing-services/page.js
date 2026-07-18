import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { bookMarketingContent } from '@/lib/service-pages/book-marketing';

export const metadata = {
  title: bookMarketingContent.title,
  description: bookMarketingContent.metaDescription,
  alternates: { canonical: bookMarketingContent.slug },
  openGraph: {
    title: bookMarketingContent.title,
    description: bookMarketingContent.metaDescription,
    url: bookMarketingContent.slug,
    type: 'website',
  },
};

export default function BookMarketingServicesPage() {
  return <ServiceDetailPage content={bookMarketingContent} />;
}
