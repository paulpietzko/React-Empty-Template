import { useEffect, useState } from "react";
import type { Sxc } from "@2sic.com/2sxc-typings";
import type { Franchise } from "./models/Franchise";
import FranchiseCard from "./components/FranchiseCard";
import ConferenceFilter from "./components/ConferenceFilter";

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
  const [conferenceFilter, setConferenceFilter] = useState<string | null>(null);

  const filteredFranchises = conferenceFilter
    ? franchises.filter((f) => f.Conference === conferenceFilter)
    : franchises;
  useEffect(() => {
    const fetchData = async () => {
      if (!moduleId) {
        console.warn("Module ID not found.");
        return;
      }

      const sxc: Sxc = $2sxc(moduleId);

      try {
        const data = await sxc.webApi.fetchJson(
          "/api/2sxc/app/auto/data/Franchises"
        );
        setFranchises(data);
      } catch (err) {
        console.error("Failed to fetch franchise data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">NBA Franchises</h2>
      
      <ConferenceFilter
        value={conferenceFilter}
        onChange={setConferenceFilter}
      />

      <div className="row">
        {filteredFranchises.map((f: Franchise) => (
          <div className="col-md-4 mb-4" key={f.Id}>
            <FranchiseCard franchise={f} />
          </div>
        ))}
      </div>
    </div>
  );
}
