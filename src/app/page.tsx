import { getOverallMetrics, Farm } from '@/mock/util';
import Link from 'next/link';
import { RefreshButton } from '@/components/RefreshButton';
import { formatNumber } from '@/utils';

async function getFarmsData() {
  const response = await fetch('http://localhost:3000/api/farms', {
    next: { 
      revalidate: 30,
      tags: ['farms']
    }
  });
  const data = await response.json();
  const farms = data.farms;
  const metrics = getOverallMetrics(farms);
  return { farms, metrics };
}

function getActiveCrops(farm: Farm): string {
  const activeCrops = farm.crops.filter(crop => crop.status === 'IN_PROGRESS');
  return activeCrops.length > 0 ? activeCrops.map(crop => crop.crop_name).join(', ') : 'None';
}

function getAnnualYield(farm: Farm): number {
  return farm.crops.reduce((sum, crop) => sum + crop.actual_yield, 0);
}

export default async function Dashboard() {
  const { farms, metrics } = await getFarmsData();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Farm Produce Supply Management</h1>
          <RefreshButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Farms</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(metrics.totalFarms)}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Acreage</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(metrics.totalAcreage)} acres</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Annual Yield</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(metrics.totalAnnualYield)} kg</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Average Yield per Acre</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(Math.round(metrics.averageYieldPerAcre))} kg</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Farms</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Farm Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total Acreage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Active Crops
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Annual Yield (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {farms.map((farm: Farm) => (
                  <tr key={farm.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/farms/${farm.id}`}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        {farm.farm_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {farm.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {farm.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatNumber(farm.total_acreage)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {getActiveCrops(farm)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatNumber(getAnnualYield(farm))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}