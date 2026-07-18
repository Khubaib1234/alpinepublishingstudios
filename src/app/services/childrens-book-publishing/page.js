import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { childrensBookContent } from '@/lib/service-pages/childrens-book';

export const metadata = {
  title: childrensBookContent.title,
  description: childrensBookContent.metaDescription,
  alternates: { canonical: childrensBookContent.slug },
  openGraph: {
    title: childrensBookContent.title,
    description: childrensBookContent.metaDescription,
    url: childrensBookContent.slug,
    type: 'website',
  },
};

export default function ChildrensBookPublishingPage() {
  return <ServiceDetailPage content={childrensBookContent} />;
}
