export default function ConferenceFilter({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="mb-4 d-flex align-items-center gap-2">
      <label htmlFor="conferenceFilter" className="form-label mb-0 fw-semibold">
        Filter by Conference:
      </label>
      <select
        id="conferenceFilter"
        className="form-select form-select-sm w-auto"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">All</option>
        <option value="East">East</option>
        <option value="West">West</option>
      </select>
    </div>
  );
}
