import { useAnalytics } from '../../hooks/useAnalytics';
import BandwidthChart from '../../components/analytics/BandwidthChart';
import StorageChart from '../../components/analytics/StorageChart';
import VisitorsChart from '../../components/analytics/VisitorsChart';

const Analytics = () => {
  const [timeframe, setTimeframe] = React.useState<'7d' | '30d' | '90d'>('30d');
  const { data, isLoading, error } = useAnalytics(timeframe);

  if (isLoading) {
    return <div>Loading analytics data...</div>;
  }

  if (error) {
    return <div>Error loading analytics data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Timeframe selector */}
      <div className="flex justify-end space-x-2">
        {(['7d', '30d', '90d'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)}
            className={`px-4 py-2 rounded-lg ${
              timeframe === period 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <BandwidthChart data={data.bandwidth} timeframe={timeframe} />
        <StorageChart data={data.storage} />
        <VisitorsChart data={data.visitors} timeframe={timeframe} />
      </div>
    </div>
  );
};

export default Analytics;