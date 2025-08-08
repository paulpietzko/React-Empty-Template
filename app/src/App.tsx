import { useEffect, useState } from "react";
import type { Sxc } from "@2sic.com/2sxc-typings";
import type { Franchise } from "./models/Franchise";
import FranchiseCard from "./components/FranchiseCard";
import ConferenceFilter from "./components/ConferenceFilter";
import * as toolbar from "./actions/toolbar";
import React from "react";

interface AppProps {
  moduleId: number;
}

export default function App({ moduleId }: AppProps) {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [conferenceFilter, setConferenceFilter] = useState<string | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // WIP: Doesn't work yet
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("triggerd");
    if (!buttonRef.current) return;
    console.log("still in functino");
    const params = { contentType: "Franchises" };
    toolbar.add(buttonRef.current, event, params);
  };

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
  }, [moduleId]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">NBA Franchises</h2>

      <div className="d-flex justify-content-between align-items-center">
        <ConferenceFilter
          value={conferenceFilter}
          onChange={setConferenceFilter}
        />

        <button
          ref={buttonRef}
          className="btn btn-success mb-3"
          onClick={handleAddClick}
          type="button"
        >
          Add
        </button>
      </div>

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
