import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { bookEditingContent } from '@/lib/service-pages/book-editing';

export const metadata = {
  title: bookEditingContent.title,
  description: bookEditingContent.metaDescription,
  alternates: { canonical: bookEditingContent.slug },
  openGraph: {
    title: bookEditingContent.title,
    description: bookEditingContent.metaDescription,
    url: bookEditingContent.slug,
    type: 'website',
  },
};

export default function BookEditingServicesPage() {
  return <ServiceDetailPage content={bookEditingContent} />;
}
