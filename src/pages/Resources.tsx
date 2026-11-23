import { resources } from '../data/resources';

export default function Resources() {
  return (
    <>
      <div className="detail-head">
        <div className="eyebrow">LEARN MORE / GET HELP</div>
        <h1>
          Good sources.
          <br />
          Better decisions.
        </h1>
        <p className="lead">
          Use official guidance for fast-changing features and recognized safety organizations for practical support.
          These links open outside the course.
        </p>
      </div>
      <div className="card">
        {resources.map((r) => (
          <a key={r.url + r.name} className="resource" href={r.url} target="_blank" rel="noopener noreferrer">
            <span className="resicon">{r.icon}</span>
            <span>
              <strong>{r.name} ↗</strong>
              <span>{r.description}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="risk">
        <strong>Urgent situations:</strong> If someone is in immediate danger, contact emergency services. If a young
        person is facing sexual exploitation or sextortion, contact a trusted adult and consult the CyberTipline. Do not
        attempt to handle threats alone.
      </div>
    </>
  );
}
