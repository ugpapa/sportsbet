import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getChartLabels, getChartData } from '../../../utils/chartUtils';

interface UserChartProps {
  selectedPeriod: 'today' | 'yesterday' | 'week' | 'month';
}

export default function UserChart({ selectedPeriod }: UserChartProps) {
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
          label: '가입자 수',
          data: getChartData(selectedPeriod, 'users'),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '가입자 수 추이'
          }
        },
        scales: {
          y: {
            beginAtZero: true
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
      <h2 className="text-base font-semibold mb-3">가입자 수 추이</h2>
      <div className="relative h-[300px] w-full">
        <canvas ref={chartRef} className="max-w-full"></canvas>
      </div>
    </div>
  );
} 