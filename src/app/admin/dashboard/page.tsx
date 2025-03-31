/* eslint-disable */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  ArrowUpFromLine, 
  ArrowDownToLine,
  Activity,
  Wallet,
  Coins,
  Gift,
  HelpCircle,
  MessageSquare,
  Bell,
  Calendar,
  Trophy,
  Medal,
  X,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users as UsersIcon,
  UserPlus,
  UserMinus,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Chart from 'chart.js/auto';

interface SportStats {
  soccer: number;
  baseball: number;
  volleyball: number;
  basketball: number;
  others: number;
}

interface StatsData {
  newUsers: number;
  bettingAmount: number;
  maxWinAmount: number;
  depositAmount: number;
  withdrawAmount: number;
  platformProfit: number;
  topWinners: Array<{ username: string; amount: number }>;
  topBetters: Array<{ username: string; amount: number }>;
  sportsBetting: SportStats;
}

interface DashboardStats {
  [key: string]: StatsData;
}

interface Winner {
  username: string;
  amount: number;
}

interface Bettor {
  username: string;
  amount: number;
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'yesterday' | 'week' | 'month'>('today');
  const [stats, setStats] = useState<DashboardStats>({
    today: {
      newUsers: 123,
      bettingAmount: 1234567890,
      maxWinAmount: 50000000,
      depositAmount: 2345678901,
      withdrawAmount: 1234567890,
      platformProfit: 123456789,
      topWinners: [
        { username: 'winner1', amount: 50000000 },
        { username: 'winner2', amount: 45000000 },
        { username: 'winner3', amount: 40000000 },
        { username: 'winner4', amount: 38000000 },
        { username: 'winner5', amount: 35000000 },
        { username: 'winner6', amount: 32000000 },
        { username: 'winner7', amount: 30000000 },
        { username: 'winner8', amount: 28000000 },
        { username: 'winner9', amount: 25000000 },
        { username: 'winner10', amount: 23000000 }
      ],
      topBetters: [
        { username: 'bettor1', amount: 100000000 },
        { username: 'bettor2', amount: 90000000 },
        { username: 'bettor3', amount: 80000000 },
        { username: 'bettor4', amount: 75000000 },
        { username: 'bettor5', amount: 70000000 },
        { username: 'bettor6', amount: 65000000 },
        { username: 'bettor7', amount: 60000000 },
        { username: 'bettor8', amount: 55000000 },
        { username: 'bettor9', amount: 50000000 },
        { username: 'bettor10', amount: 45000000 }
      ],
      sportsBetting: {
        soccer: 500000000,
        baseball: 300000000,
        volleyball: 200000000,
        basketball: 250000000,
        others: 150000000
      }
    },
    yesterday: {
      newUsers: 98,
      bettingAmount: 987654321,
      maxWinAmount: 45000000,
      depositAmount: 1987654321,
      withdrawAmount: 987654321,
      platformProfit: 98765432,
      topWinners: [
        { username: 'winner11', amount: 48000000 },
        { username: 'winner12', amount: 42000000 },
        { username: 'winner13', amount: 38000000 },
        { username: 'winner14', amount: 35000000 },
        { username: 'winner15', amount: 32000000 },
        { username: 'winner16', amount: 30000000 },
        { username: 'winner17', amount: 28000000 },
        { username: 'winner18', amount: 25000000 },
        { username: 'winner19', amount: 23000000 },
        { username: 'winner20', amount: 20000000 }
      ],
      topBetters: [
        { username: 'bettor11', amount: 95000000 },
        { username: 'bettor12', amount: 85000000 },
        { username: 'bettor13', amount: 75000000 },
        { username: 'bettor14', amount: 70000000 },
        { username: 'bettor15', amount: 65000000 },
        { username: 'bettor16', amount: 60000000 },
        { username: 'bettor17', amount: 55000000 },
        { username: 'bettor18', amount: 50000000 },
        { username: 'bettor19', amount: 45000000 },
        { username: 'bettor20', amount: 40000000 }
      ],
      sportsBetting: {
        soccer: 450000000,
        baseball: 280000000,
        volleyball: 180000000,
        basketball: 220000000,
        others: 120000000
      }
    },
    week: {
      newUsers: 789,
      bettingAmount: 7890123456,
      maxWinAmount: 55000000,
      depositAmount: 7890123456,
      withdrawAmount: 4567890123,
      platformProfit: 789012345,
      topWinners: [
        { username: 'winner21', amount: 52000000 },
        { username: 'winner22', amount: 48000000 },
        { username: 'winner23', amount: 45000000 },
        { username: 'winner24', amount: 42000000 },
        { username: 'winner25', amount: 40000000 },
        { username: 'winner26', amount: 38000000 },
        { username: 'winner27', amount: 35000000 },
        { username: 'winner28', amount: 32000000 },
        { username: 'winner29', amount: 30000000 },
        { username: 'winner30', amount: 28000000 }
      ],
      topBetters: [
        { username: 'bettor21', amount: 98000000 },
        { username: 'bettor22', amount: 92000000 },
        { username: 'bettor23', amount: 85000000 },
        { username: 'bettor24', amount: 80000000 },
        { username: 'bettor25', amount: 75000000 },
        { username: 'bettor26', amount: 70000000 },
        { username: 'bettor27', amount: 65000000 },
        { username: 'bettor28', amount: 60000000 },
        { username: 'bettor29', amount: 55000000 },
        { username: 'bettor30', amount: 50000000 }
      ],
      sportsBetting: {
        soccer: 480000000,
        baseball: 320000000,
        volleyball: 220000000,
        basketball: 280000000,
        others: 180000000
      }
    },
    month: {
      newUsers: 3456,
      bettingAmount: 34567890123,
      maxWinAmount: 75000000,
      depositAmount: 34567890123,
      withdrawAmount: 23456789012,
      platformProfit: 3456789012,
      topWinners: [
        { username: 'winner31', amount: 75000000 },
        { username: 'winner32', amount: 68000000 },
        { username: 'winner33', amount: 62000000 },
        { username: 'winner34', amount: 58000000 },
        { username: 'winner35', amount: 55000000 },
        { username: 'winner36', amount: 52000000 },
        { username: 'winner37', amount: 50000000 },
        { username: 'winner38', amount: 48000000 },
        { username: 'winner39', amount: 45000000 },
        { username: 'winner40', amount: 42000000 }
      ],
      topBetters: [
        { username: 'bettor31', amount: 150000000 },
        { username: 'bettor32', amount: 140000000 },
        { username: 'bettor33', amount: 130000000 },
        { username: 'bettor34', amount: 120000000 },
        { username: 'bettor35', amount: 110000000 },
        { username: 'bettor36', amount: 100000000 },
        { username: 'bettor37', amount: 95000000 },
        { username: 'bettor38', amount: 90000000 },
        { username: 'bettor39', amount: 85000000 },
        { username: 'bettor40', amount: 80000000 }
      ],
      sportsBetting: {
        soccer: 550000000,
        baseball: 380000000,
        volleyball: 280000000,
        basketball: 320000000,
        others: 220000000
      }
    }
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deposit',
      message: 'user123님이 1,000,000원 입금',
      time: '1분 전'
    },
    {
      id: 2,
      type: 'withdraw',
      message: 'betking님이 500,000원 출금 요청',
      time: '3분 전'
    },
    {
      id: 3,
      type: 'betting',
      message: 'winmaster님이 100,000원 베팅',
      time: '5분 전'
    },
    {
      id: 4,
      type: 'deposit',
      message: 'lucky777님이 2,000,000원 입금',
      time: '8분 전'
    },
    {
      id: 5,
      type: 'betting',
      message: 'probet님이 500,000원 베팅',
      time: '10분 전'
    },
    {
      id: 6,
      type: 'withdraw',
      message: 'richman님이 3,000,000원 출금 요청',
      time: '15분 전'
    },
    {
      id: 7,
      type: 'deposit',
      message: 'highroller님이 5,000,000원 입금',
      time: '20분 전'
    },
    {
      id: 8,
      type: 'betting',
      message: 'gambler님이 200,000원 베팅',
      time: '25분 전'
    },
    {
      id: 9,
      type: 'withdraw',
      message: 'player1님이 1,500,000원 출금 요청',
      time: '30분 전'
    },
    {
      id: 10,
      type: 'deposit',
      message: 'winner님이 3,500,000원 입금',
      time: '35분 전'
    }
  ]);
  const [showAllWinners, setShowAllWinners] = useState(false);
  const [showAllBetters, setShowAllBetters] = useState(false);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  const userChartRef = useRef<HTMLCanvasElement>(null);
  const bettingChartRef = useRef<HTMLCanvasElement>(null);
  const sportsChartRef = useRef<HTMLCanvasElement>(null);
  const sportsProfitChartRef = useRef<HTMLCanvasElement>(null);
  const userChartInstance = useRef<Chart | null>(null);
  const bettingChartInstance = useRef<Chart | null>(null);
  const sportsChartInstance = useRef<Chart | null>(null);
  const sportsProfitChartInstance = useRef<Chart | null>(null);

  // WebSocket 연결 설정
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://your-websocket-server';
  const ws = typeof window !== 'undefined' ? new WebSocket(wsUrl) : null;

  useEffect(() => {
    ws?.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 실시간 알림 처리
      setNotifications(prev => [data, ...prev].slice(0, 10));
    };

    return () => {
      ws?.close();
    };
  }, [ws]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prevIndex) => 
        prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3초마다 롤링

    return () => clearInterval(interval);
  }, [notifications.length]);

  const getChartLabels = (period: 'today' | 'yesterday' | 'week' | 'month') => {
    switch (period) {
      case 'today':
        return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
      case 'yesterday':
        return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
      case 'week':
        return ['월', '화', '수', '목', '금', '토', '일'];
      case 'month':
        return Array.from({ length: 30 }, (_, i) => `${i + 1}일`);
      default:
        return [];
    }
  };

  const getChartData = (period: 'today' | 'yesterday' | 'week' | 'month', type: 'users' | 'betting') => {
    switch (period) {
      case 'today':
        return type === 'users' 
          ? [65, 59, 80, 81, 56, 55, 40]
          : [12000000, 19000000, 15000000, 25000000, 22000000, 30000000, 28000000];
      case 'yesterday':
        return type === 'users'
          ? [45, 49, 60, 71, 46, 45, 30]
          : [10000000, 15000000, 13000000, 20000000, 18000000, 25000000, 22000000];
      case 'week':
        return type === 'users'
          ? [120, 150, 180, 140, 160, 170, 190]
          : [25000000, 28000000, 30000000, 27000000, 29000000, 31000000, 32000000];
      case 'month':
        return type === 'users'
          ? Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50)
          : Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000000) + 10000000);
      default:
        return [];
    }
  };

  useEffect(() => {
    // 가입자 수 추이 차트
    if (userChartRef.current) {
      const ctx = userChartRef.current.getContext('2d');
      if (ctx) {
        if (userChartInstance.current) {
          userChartInstance.current.destroy();
        }
        userChartInstance.current = new Chart(ctx, {
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
      }
    }

    // 배팅 금액 추이 차트
    if (bettingChartRef.current) {
      const ctx = bettingChartRef.current.getContext('2d');
      if (ctx) {
        if (bettingChartInstance.current) {
          bettingChartInstance.current.destroy();
        }
        bettingChartInstance.current = new Chart(ctx, {
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
      }
    }

    // 스포츠별 배팅 금액 차트
    if (sportsChartRef.current) {
      const ctx = sportsChartRef.current.getContext('2d');
      if (ctx) {
        if (sportsChartInstance.current) {
          sportsChartInstance.current.destroy();
        }
        const currentStats = stats[selectedPeriod].sportsBetting;
        sportsChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['축구', '야구', '배구', '농구', '기타'],
            datasets: [{
              label: '배팅 금액',
              data: [
                currentStats.soccer,
                currentStats.baseball,
                currentStats.volleyball,
                currentStats.basketball,
                currentStats.others
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: '스포츠별 배팅 금액'
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
      }
    }

    // 스포츠별 이익 금액 차트
    if (sportsProfitChartRef.current) {
      const ctx = sportsProfitChartRef.current.getContext('2d');
      if (ctx) {
        if (sportsProfitChartInstance.current) {
          sportsProfitChartInstance.current.destroy();
        }
        const currentStats = stats[selectedPeriod].sportsBetting;
        sportsProfitChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['축구', '야구', '배구', '농구', '기타'],
            datasets: [{
              label: '이익 금액',
              data: [
                currentStats.soccer * 0.1,
                currentStats.baseball * 0.1,
                currentStats.volleyball * 0.1,
                currentStats.basketball * 0.1,
                currentStats.others * 0.1
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(201, 203, 207, 0.5)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(201, 203, 207, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: '스포츠별 이익 금액'
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
      }
    }

    // Cleanup function
    return () => {
      if (userChartInstance.current) {
        userChartInstance.current.destroy();
      }
      if (bettingChartInstance.current) {
        bettingChartInstance.current.destroy();
      }
      if (sportsChartInstance.current) {
        sportsChartInstance.current.destroy();
      }
      if (sportsProfitChartInstance.current) {
        sportsProfitChartInstance.current.destroy();
      }
    };
  }, [selectedPeriod, stats]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const currentStats = stats[selectedPeriod];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="w-full p-3 sm:p-4">
        {/* 실시간 알림 */}
        <div className="bg-white rounded-lg shadow mb-3 sm:mb-4">
          <div className="p-2 sm:p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-500 font-medium shrink-0">
                <Bell className="h-4 w-4 mr-2" />
                실시간 알림
              </div>
              <div className="flex-1 ml-4 overflow-hidden">
                <div className="relative h-6">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`absolute w-full transition-all duration-500 ${
                        index === currentNotificationIndex 
                          ? 'top-0 opacity-100' 
                          : 'top-8 opacity-0'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`p-1 rounded-full mr-2 shrink-0 ${
                          notification.type === 'deposit' ? 'bg-green-100' :
                          notification.type === 'withdraw' ? 'bg-red-100' :
                          'bg-blue-100'
                        }`}>
                          {notification.type === 'deposit' ? (
                            <ArrowUpFromLine className="h-3 w-3 text-green-600" />
                          ) : notification.type === 'withdraw' ? (
                            <ArrowDownToLine className="h-3 w-3 text-red-600" />
                          ) : (
                            <TrendingUp className="h-3 w-3 text-blue-600" />
                          )}
                        </div>
                        <span className="text-sm truncate flex-1">{notification.message}</span>
                        <span className="text-xs text-gray-500 ml-2 shrink-0">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">대시보드</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPeriod('today')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm ${
                selectedPeriod === 'today' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setSelectedPeriod('yesterday')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm ${
                selectedPeriod === 'yesterday' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm ${
                selectedPeriod === 'week' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
              }`}
            >
              1 Week
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm ${
                selectedPeriod === 'month' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
              }`}
            >
              1 Month
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600 truncate">가입회원 수</p>
                <p className="text-lg xl:text-xl font-bold mt-1 truncate">{formatNumber(currentStats.newUsers)}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full shrink-0 ml-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600 truncate">배팅 금액</p>
                <p className="text-lg xl:text-xl font-bold mt-1 truncate">₩{formatNumber(currentStats.bettingAmount)}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full shrink-0 ml-2">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600 truncate">최고 배팅 당첨금</p>
                <p className="text-lg xl:text-xl font-bold mt-1 truncate">₩{formatNumber(currentStats.maxWinAmount)}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full shrink-0 ml-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600 truncate">충전금액</p>
                <p className="text-lg xl:text-xl font-bold mt-1 truncate">₩{formatNumber(currentStats.depositAmount)}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full shrink-0 ml-2">
                <ArrowUpFromLine className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600 truncate">인출금액</p>
                <p className="text-lg xl:text-xl font-bold mt-1 truncate">₩{formatNumber(currentStats.withdrawAmount)}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full shrink-0 ml-2">
                <ArrowDownToLine className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600 truncate">플랫폼 이익</p>
                <p className="text-lg xl:text-xl font-bold mt-1 truncate">₩{formatNumber(currentStats.platformProfit)}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full shrink-0 ml-2">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>        </div>

        {/* Top 10 당첨자 & 베터 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-sm sm:text-base font-semibold flex items-center">
                <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                Top 10 당첨자
              </h2>
              <button
                onClick={() => setShowAllWinners(!showAllWinners)}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                {showAllWinners ? '접기' : '더보기'}
              </button>
            </div>
            <div className="space-y-2">
              {(showAllWinners ? currentStats.topWinners : currentStats.topWinners.slice(0, 3)).map((winner: Winner, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center min-w-0">
                    <span className="w-5 h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-2 text-xs shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-medium truncate">{winner.username}</span>
                  </div>
                  <span className="font-bold text-green-600 shrink-0 ml-2">₩{formatNumber(winner.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h2 className="text-sm sm:text-base font-semibold flex items-center">
                <Medal className="h-4 w-4 text-blue-500 mr-2" />
                Top 10 베터
              </h2>
              <button
                onClick={() => setShowAllBetters(!showAllBetters)}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                {showAllBetters ? '접기' : '더보기'}
              </button>
            </div>
            <div className="space-y-2">
              {(showAllBetters ? currentStats.topBetters : currentStats.topBetters.slice(0, 3)).map((bettor: Bettor, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center min-w-0">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 text-xs shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-medium truncate">{bettor.username}</span>
                  </div>
                  <span className="font-bold text-blue-600 shrink-0 ml-2">₩{formatNumber(bettor.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {/* 가입자 수 추이 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-[300px]">
              <canvas ref={userChartRef} />
            </div>
          </div>

          {/* 배팅 금액 추이 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-[300px]">
              <canvas ref={bettingChartRef} />
            </div>
          </div>

          {/* 스포츠별 배팅 금액 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-[300px]">
              <canvas ref={sportsChartRef} />
            </div>
          </div>

          {/* 스포츠별 이익 금액 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-[300px]">
              <canvas ref={sportsProfitChartRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
