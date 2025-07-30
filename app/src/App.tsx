import { useEffect, useState } from 'react';
import type { Sxc } from '@2sic.com/2sxc-typings';

interface Franchise {
  Id: number;
  Name: string;
  City: string;
  Championships: number;
  Logo: string;
  Color: string;
}

declare global {
  interface Window {
    reactAppConfig?: {
      moduleId?: number;
    };
  }
}

// Pick up moduleId passed from Razor
const moduleId = (window?.reactAppConfig?.moduleId ?? 0) as number;

export default function App() {
  const [franchises, setFranchises] = useState<Franchise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!moduleId) {
        console.warn('Module ID not found.');
        return;
      }

      const sxc: Sxc = $2sxc(moduleId);
      const apiUrl = sxc.webApi.url('/api/2sxc/app/auto/data/Franchises');
      const headers = sxc.webApi.headers('GET');

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
        });

        const data = await response.json();
        setFranchises(data);
      } catch (err) {
        console.error('Failed to fetch franchise data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="franchise-list">
      <h2>NBA Franchises</h2>
      <ul>
        {franchises.map((f: Franchise) => (
          <li key={f.Id} style={{ color: f.Color }}>
            <img
              src={f.Logo}
              alt={f.Name}
              style={{ height: '40px', verticalAlign: 'middle' }}
            />{' '}
            {f.Name} ({f.City}) - Championships: {f.Championships}
          </li>
        ))}
      </ul>
    </div>
  );
}
