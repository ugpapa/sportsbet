import UserChart from './UserChart';
import BettingChart from './BettingChart';
import SportsChart from './SportsChart';

interface ChartSectionProps {
  selectedPeriod: 'today' | 'yesterday' | 'week' | 'month';
  sportsBetting: {
    soccer: number;
    baseball: number;
    volleyball: number;
    basketball: number;
    others: number;
  };
}

export default function ChartSection({ selectedPeriod, sportsBetting }: ChartSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserChart selectedPeriod={selectedPeriod} />
        <BettingChart selectedPeriod={selectedPeriod} />
      </div>
      <SportsChart sportsBetting={sportsBetting} />
    </div>
  );
} 