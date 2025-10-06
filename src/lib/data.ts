export interface Crop {
  id: string;
  crop_name: string;
  season: string;
  area_planted: number; // acres
  expected_yield: number; // kg
  actual_yield: number; // kg
  price_per_kg: number; // GBP
  status: 'harvested' | 'in progress';
}

export interface Farm {
  id: string;
  farm_name: string;
  location: string;
  owner: string;
  total_acreage: number;
  established_date: string; // ISO date string
  certifications: string[];
  crops: Crop[];
}

export const mockFarms: Farm[] = [
  {
    id: '1',
    farm_name: 'Green Valley Farm',
    location: 'Devon, UK',
    owner: 'John Smith',
    total_acreage: 150,
    established_date: '2010-03-15',
    certifications: ['Organic', 'Fair Trade'],
    crops: [
      {
        id: '1-1',
        crop_name: 'Wheat',
        season: 'Spring',
        area_planted: 50,
        expected_yield: 25000,
        actual_yield: 27500,
        price_per_kg: 0.35,
        status: 'harvested'
      },
      {
        id: '1-2',
        crop_name: 'Barley',
        season: 'Spring',
        area_planted: 30,
        expected_yield: 15000,
        actual_yield: 16200,
        price_per_kg: 0.28,
        status: 'harvested'
      },
      {
        id: '1-3',
        crop_name: 'Potatoes',
        season: 'Summer',
        area_planted: 25,
        expected_yield: 50000,
        actual_yield: 0,
        price_per_kg: 0.45,
        status: 'in progress'
      }
    ]
  },
  {
    id: '2',
    farm_name: 'Meadowbrook Estate',
    location: 'Kent, UK',
    owner: 'Sarah Johnson',
    total_acreage: 200,
    established_date: '2005-08-22',
    certifications: ['Organic', 'Soil Association'],
    crops: [
      {
        id: '2-1',
        crop_name: 'Apples',
        season: 'Autumn',
        area_planted: 40,
        expected_yield: 80000,
        actual_yield: 85000,
        price_per_kg: 1.20,
        status: 'harvested'
      },
      {
        id: '2-2',
        crop_name: 'Pears',
        season: 'Autumn',
        area_planted: 25,
        expected_yield: 35000,
        actual_yield: 0,
        price_per_kg: 1.50,
        status: 'in progress'
      },
      {
        id: '2-3',
        crop_name: 'Cherries',
        season: 'Summer',
        area_planted: 15,
        expected_yield: 12000,
        actual_yield: 12800,
        price_per_kg: 3.50,
        status: 'harvested'
      }
    ]
  },
  {
    id: '3',
    farm_name: 'Riverside Farm',
    location: 'Somerset, UK',
    owner: 'Michael Brown',
    total_acreage: 120,
    established_date: '2012-05-10',
    certifications: ['Organic'],
    crops: [
      {
        id: '3-1',
        crop_name: 'Carrots',
        season: 'Spring',
        area_planted: 20,
        expected_yield: 40000,
        actual_yield: 42000,
        price_per_kg: 0.60,
        status: 'harvested'
      },
      {
        id: '3-2',
        crop_name: 'Onions',
        season: 'Spring',
        area_planted: 15,
        expected_yield: 25000,
        actual_yield: 0,
        price_per_kg: 0.40,
        status: 'in progress'
      },
      {
        id: '3-3',
        crop_name: 'Lettuce',
        season: 'Summer',
        area_planted: 10,
        expected_yield: 15000,
        actual_yield: 15800,
        price_per_kg: 0.80,
        status: 'harvested'
      }
    ]
  },
  {
    id: '4',
    farm_name: 'Highland Farm',
    location: 'Scotland, UK',
    owner: 'Emma Wilson',
    total_acreage: 300,
    established_date: '2008-11-03',
    certifications: ['Organic', 'Biodynamic'],
    crops: [
      {
        id: '4-1',
        crop_name: 'Oats',
        season: 'Spring',
        area_planted: 80,
        expected_yield: 40000,
        actual_yield: 42000,
        price_per_kg: 0.32,
        status: 'harvested'
      },
      {
        id: '4-2',
        crop_name: 'Rye',
        season: 'Autumn',
        area_planted: 60,
        expected_yield: 30000,
        actual_yield: 0,
        price_per_kg: 0.38,
        status: 'in progress'
      },
      {
        id: '4-3',
        crop_name: 'Turnips',
        season: 'Winter',
        area_planted: 30,
        expected_yield: 45000,
        actual_yield: 0,
        price_per_kg: 0.25,
        status: 'in progress'
      }
    ]
  },
  {
    id: '5',
    farm_name: 'Sunny Acres',
    location: 'Essex, UK',
    owner: 'David Taylor',
    total_acreage: 180,
    established_date: '2015-04-18',
    certifications: ['Organic'],
    crops: [
      {
        id: '5-1',
        crop_name: 'Tomatoes',
        season: 'Summer',
        area_planted: 25,
        expected_yield: 75000,
        actual_yield: 78000,
        price_per_kg: 1.80,
        status: 'harvested'
      },
      {
        id: '5-2',
        crop_name: 'Peppers',
        season: 'Summer',
        area_planted: 20,
        expected_yield: 30000,
        actual_yield: 0,
        price_per_kg: 2.20,
        status: 'in progress'
      },
      {
        id: '5-3',
        crop_name: 'Cucumbers',
        season: 'Summer',
        area_planted: 15,
        expected_yield: 25000,
        actual_yield: 26000,
        price_per_kg: 1.50,
        status: 'harvested'
      }
    ]
  }
];

export function getFarmById(id: string): Farm | undefined {
  return mockFarms.find(farm => farm.id === id);
}

export function getAllFarms(): Farm[] {
  return mockFarms;
}

export function calculateFarmMetrics(farm: Farm) {
  const totalYield = farm.crops.reduce((sum, crop) => sum + crop.actual_yield, 0);
  const topCrop = farm.crops.reduce((top, crop) => 
    crop.actual_yield > top.actual_yield ? crop : top, farm.crops[0] || { actual_yield: 0 }
  );
  const totalRevenue = farm.crops.reduce((sum, crop) => 
    sum + (crop.actual_yield * crop.price_per_kg), 0
  );
  const averageYieldPerAcre = farm.total_acreage > 0 ? totalYield / farm.total_acreage : 0;

  return {
    totalYield,
    topCrop: topCrop.crop_name,
    totalRevenue,
    averageYieldPerAcre
  };
}

export function calculateOverallMetrics(farms: Farm[]) {
  const totalFarms = farms.length;
  const totalAcreage = farms.reduce((sum, farm) => sum + farm.total_acreage, 0);
  const totalAnnualYield = farms.reduce((sum, farm) => 
    sum + farm.crops.reduce((cropSum, crop) => cropSum + crop.actual_yield, 0), 0
  );
  const averageYieldPerAcre = totalAcreage > 0 ? totalAnnualYield / totalAcreage : 0;

  return {
    totalFarms,
    totalAcreage,
    totalAnnualYield,
    averageYieldPerAcre
  };
}
