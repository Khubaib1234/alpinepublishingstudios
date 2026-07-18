import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { proofreadingContent } from '@/lib/service-pages/proofreading';

export const metadata = {
  title: proofreadingContent.title,
  description: proofreadingContent.metaDescription,
  alternates: { canonical: proofreadingContent.slug },
  openGraph: {
    title: proofreadingContent.title,
    description: proofreadingContent.metaDescription,
    url: proofreadingContent.slug,
    type: 'website',
  },
};

export default function ProofreadingServicesPage() {
  return <ServiceDetailPage content={proofreadingContent} />;
}
