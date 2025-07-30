import type { Franchise } from "../models/Franchise";

export default function FranchiseCard({ franchise }: { franchise: Franchise }) {
  return (
    <a
      href={franchise.Website}
      className="card h-100"
      style={{ borderLeft: `6px solid ${franchise.Color}` }}
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
        <div>
          <h5 className="card-title mb-1">
            {franchise.Name} <span className="text-muted">({franchise.City})</span>
          </h5>
          <p className="card-text small mb-0">
            Championships: {franchise.Championships}
          </p>
        </div>
      </div>
    </a>
  );
}
