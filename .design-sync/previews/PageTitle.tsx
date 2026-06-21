import { PageTitle } from '@doneisbetter/gds';

export const Default = () => (
  <div style={{ padding: 24, border: '1px solid #e9ecef', borderRadius: 12, background: '#fff' }}>
    <PageTitle order={1}>Family-friendly places</PageTitle>
    <p style={{ marginTop: 8, color: '#868e96' }}>Discover stroller-ready cafes and parks across the city.</p>
  </div>
);

export const Levels = () => (
  <div style={{ padding: 24, border: '1px solid #e9ecef', borderRadius: 12, background: '#fff', display: 'grid', gap: 8 }}>
    <PageTitle order={2}>Neighborhoods</PageTitle>
    <PageTitle order={3}>Downtown</PageTitle>
    <PageTitle order={4}>Parkside</PageTitle>
  </div>
);
