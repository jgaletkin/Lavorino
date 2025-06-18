'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ProviderMenu from '../components/ProviderMenu';
// import { ResponsiveBar } from '@nivo/bar';
// import { ResponsiveLine } from '@nivo/line';
// import { ResponsivePie } from '@nivo/pie';

// Mock data for impressions vs clicks
const impressionsClicksData = [
  { date: 'Mon', impressions: 120, clicks: 45 },
  { date: 'Tue', impressions: 150, clicks: 60 },
  { date: 'Wed', impressions: 180, clicks: 75 },
  { date: 'Thu', impressions: 160, clicks: 65 },
  { date: 'Fri', impressions: 200, clicks: 85 },
  { date: 'Sat', impressions: 250, clicks: 100 },
  { date: 'Sun', impressions: 220, clicks: 90 }
];

// Mock data for competitive performance
const competitiveData = [
  {
    id: 'Your Business',
    data: [
      { x: 'Week 1', y: 45 },
      { x: 'Week 2', y: 60 },
      { x: 'Week 3', y: 75 },
      { x: 'Week 4', y: 65 },
      { x: 'Week 5', y: 85 },
      { x: 'Week 6', y: 100 },
      { x: 'Week 7', y: 90 }
    ]
  },
  {
    id: 'Industry Average',
    data: [
      { x: 'Week 1', y: 40 },
      { x: 'Week 2', y: 55 },
      { x: 'Week 3', y: 65 },
      { x: 'Week 4', y: 60 },
      { x: 'Week 5', y: 75 },
      { x: 'Week 6', y: 85 },
      { x: 'Week 7', y: 80 }
    ]
  }
];

// Mock data for service demand
const serviceDemandData = [
  { id: 'Plumbing', value: 35, label: 'Plumbing' },
  { id: 'Electrical', value: 25, label: 'Electrical' },
  { id: 'Carpentry', value: 20, label: 'Carpentry' },
  { id: 'Painting', value: 15, label: 'Painting' },
  { id: 'Cleaning', value: 5, label: 'Cleaning' }
];

export default function ProviderDashboardClient() {
  const router = useRouter();
  const { t } = useTranslation(['dashboard', 'common']);
  const [timeScale, setTimeScale] = useState<'weeks' | 'months'>('weeks');
  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load business data from localStorage
        const providers = localStorage.getItem('providers');
        if (providers) {
          const providersList = JSON.parse(providers);
          if (providersList.length > 0) {
            setBusinessData(providersList[providersList.length - 1]);
          } else {
            // If no providers found, redirect to login
            router.push('/provider-login');
          }
        } else {
          // If no providers data found, redirect to login
          router.push('/provider-login');
        }
      } catch (err) {
        console.error('Error loading provider data:', err);
        router.push('/provider-login');
      }
    };

    loadData();
  }, []); // Empty dependency array since router is stable

  if (!businessData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => router.push('/provider-dashboard')}
              className="focus:outline-none self-start"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Lavorino
              </span>
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {businessData?.businessDetails?.businessName || 'Business'} Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
                <ProviderMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Impressions vs Clicks Chart */}
          {/* <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Impressions vs Clicks</h2>
            <div className="h-80">
              <ResponsiveBar
                data={impressionsClicksData}
                keys={['impressions', 'clicks']}
                indexBy="date"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                colors={{ scheme: 'nivo' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Date',
                  legendPosition: 'middle',
                  legendOffset: 32
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Count',
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20
                  }
                ]}
              />
            </div>
          </div> */}

          {/* Competitive Performance Chart */}
          {/* <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Competitive Performance</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeScale('weeks')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeScale === 'weeks'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Weeks
                </button>
                <button
                  onClick={() => setTimeScale('months')}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeScale === 'months'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Months
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveLine
                data={competitiveData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Time',
                  legendOffset: 36,
                  legendPosition: 'middle'
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Clicks',
                  legendOffset: -40,
                  legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </div>
          </div> */}

          {/* Service Demand Chart */}
          {/* <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Type Demand</h2>
            <div className="h-80">
              <ResponsivePie
                data={serviceDemandData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
} 