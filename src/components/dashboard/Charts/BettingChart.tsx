import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getChartLabels, getChartData } from '../../../utils/chartUtils';

interface BettingChartProps {
  selectedPeriod: 'today' | 'yesterday' | 'week' | 'month';
}

export default function BettingChart({ selectedPeriod }: BettingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: getChartLabels(selectedPeriod),
        datasets: [{
          label: '배팅 금액',
          data: getChartData(selectedPeriod, 'betting'),
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '배팅 금액 추이'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₩' + value.toLocaleString('ko-KR');
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedPeriod]);

  return (
    <div className="bg-white rounded-lg shadow p-3">
      <h2 className="text-base font-semibold mb-3">배팅 금액 추이</h2>
      <div className="relative h-[300px] w-full">
        <canvas ref={chartRef} className="max-w-full"></canvas>
      </div>
    </div>
  );
} 