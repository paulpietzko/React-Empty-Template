import type { Franchise } from "../models/Franchise";
import * as toolbar from "../actions/toolbar";
import React from "react";
import type { CommandNames } from "@2sic.com/2sxc-typings";

export default function FranchiseCard({ franchise }: { franchise: Franchise }) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const params = { contentType: "Franchises", entityId: franchise.Id };
    toolbar.openDialog(cardRef.current, event, "edit" as CommandNames, params);
  };

  return (
    <div className="position-relative group" ref={cardRef}>
      <a
        href={franchise.Website}
        className="card h-100 text-dark"
        style={{
          borderLeft: `6px solid ${franchise.Color}`,
          background: `linear-gradient(to right, ${franchise.Color}50, #fff)`,
        }}
      >
        <div className="card-body d-flex align-items-center">
          <img
            src={franchise.Logo}
            alt={franchise.Name}
            className="me-3"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "contain",
            }}
          />
          <h5>{franchise.Name}</h5>
        </div>
      </a>
      <button
        onClick={handleEditClick}
        className="btn btn-link position-absolute top-0 end-0 m-2"
        style={{
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.2s",
        }}
        tabIndex={-1}
        type="button"
      >
        Edit
      </button>
      <style>
        {`
        .group:hover .position-absolute {
          opacity: 1 !important;
          pointer-events: auto !important;
        }
        `}
      </style>
    </div>
  );
}