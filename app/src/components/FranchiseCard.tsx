import type { Franchise } from "../models/Franchise";

export default function FranchiseCard({ franchise }: { franchise: Franchise }) {
  return (
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
  );
}
