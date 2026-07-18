import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { writingCoachContent } from '@/lib/service-pages/writing-coach';

export const metadata = {
  title: writingCoachContent.title,
  description: writingCoachContent.metaDescription,
  alternates: { canonical: writingCoachContent.slug },
  openGraph: {
    title: writingCoachContent.title,
    description: writingCoachContent.metaDescription,
    url: writingCoachContent.slug,
    type: 'website',
  },
};

export default function BookWritingCoachPage() {
  return <ServiceDetailPage content={writingCoachContent} />;
}
