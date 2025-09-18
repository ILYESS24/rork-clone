import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export const Route = createFileRoute('/analytics')({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
