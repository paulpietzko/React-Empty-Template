import { useEffect, useState } from 'react';
import type { Sxc } from '@2sic.com/2sxc-typings'
import type { Franchise } from './models/Franchise';

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
    <div className="container my-4">
      <h2 className="mb-4">NBA Franchises</h2>
      <div className="row">
      {franchises.map((f: Franchise) => (
        <div className="col-md-4 mb-4" key={f.Id}>
          <a href={f.Website} className="card h-100" style={{ borderLeft: `6px solid ${f.Color}` }}>
            <div className="card-body d-flex align-items-center">
            <img
              src={f.Logo}
              alt={f.Name}
              className="me-3"
              style={{ height: '40px', width: '40px', objectFit: 'contain' }}
            />
            <div>
              <h5 className="card-title mb-1">{f.Name} <span className="text-muted">({f.City})</span></h5>
              <p className="card-text small mb-0">Championships: {f.Championships}</p>
            </div>
            </div>
          </a>
        </div>
      ))}
      </div>
    </div>
  );
}
