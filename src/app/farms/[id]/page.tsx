import { getFarmMetrics, Crop } from '@/mock/util';
import { notFound } from 'next/navigation';
import { formatNumber, formatCurrency, formatDate } from '@/utils';


function getStatusBadge(status: 'HARVESTED' | 'IN_PROGRESS') {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  if (status === 'HARVESTED') {
    return (
      <span className={`${baseClasses} bg-green-900 text-green-300`}>
        HARVESTED
      </span>
    );
  } else {  
    return (
      <span className={`${baseClasses} bg-yellow-900 text-yellow-300`}>
        IN_PROGRESS
      </span>
    );
  }
}

const getFarm = async (id: string) => {
  const response = await fetch(`http://localhost:3002/api/farms/${id}`, {
    next: { 
      revalidate: 60,
      tags: ['farm-details', `farm-${id}`]
    }
  });
  const data = await response.json();
  const metrics = getFarmMetrics(data.farm);
  return { farm: data.farm, metrics };
}

export default async function FarmDetailPage({ params }: { params: { id: string } }) {
  const { farm, metrics } = await getFarm(params.id);
  
  if (!farm) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">{farm.farm_name}</h1>


        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 mb-8">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Farm Profile Info</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Location</h3>
                <p className="text-gray-300">{farm.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Owner</h3>
                <p className="text-gray-300">{farm.owner}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Established Date</h3>
                <p className="text-gray-300">{formatDate(farm.established_date)}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {farm.certifications.map((cert: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Annual Yield</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(metrics.totalYield)} kg</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Top Crop</h3>
            <p className="text-2xl font-bold text-white">{metrics.topCrop}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-white">{formatCurrency(metrics.totalRevenue)}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Average Yield per Acre</h3>
            <p className="text-2xl font-bold text-white">{formatNumber(Math.round(metrics.averageYieldPerAcre))} kg</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Crops</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Crop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Season
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Area Planted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Expected Yield
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actual Yield
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price per kg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {farm.crops.map((crop: Crop) => (
                  <tr key={crop.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {crop.crop_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {crop.season}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatNumber(crop.area_planted)} acres
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatNumber(crop.expected_yield)} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {crop.actual_yield > 0 ? formatNumber(crop.actual_yield) + ' kg' : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatCurrency(crop.price_per_kg)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(crop.status)}
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
