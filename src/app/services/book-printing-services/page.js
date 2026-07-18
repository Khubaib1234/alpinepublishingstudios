import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { bookPrintingContent } from '@/lib/service-pages/book-printing';

export const metadata = {
  title: bookPrintingContent.title,
  description: bookPrintingContent.metaDescription,
  alternates: { canonical: bookPrintingContent.slug },
  openGraph: {
    title: bookPrintingContent.title,
    description: bookPrintingContent.metaDescription,
    url: bookPrintingContent.slug,
    type: 'website',
  },
};

export default function BookPrintingServicesPage() {
  return <ServiceDetailPage content={bookPrintingContent} />;
}
