import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { bookCoverDesignContent } from '@/lib/service-pages/book-cover-design';

export const metadata = {
  title: bookCoverDesignContent.title,
  description: bookCoverDesignContent.metaDescription,
  alternates: { canonical: bookCoverDesignContent.slug },
  openGraph: {
    title: bookCoverDesignContent.title,
    description: bookCoverDesignContent.metaDescription,
    url: bookCoverDesignContent.slug,
    type: 'website',
  },
};

export default function BookCoverDesignPage() {
  return <ServiceDetailPage content={bookCoverDesignContent} />;
}
