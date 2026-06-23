import { GdsContainer } from '@doneisbetter/gds';

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '16px 20px',
      background: 'var(--mantine-color-blue-0)',
      border: '1px solid var(--mantine-color-blue-3)',
      borderRadius: 8,
      fontSize: 14,
      color: 'var(--mantine-color-blue-9)',
    }}
  >
    {children}
  </div>
);

export const Narrow = () => (
  <div style={{ background: 'var(--mantine-color-gray-1)', padding: 16, borderRadius: 8 }}>
    <GdsContainer size="narrow" center>
      <Panel>A narrow, centered reading column keeps long-form content comfortable to scan.</Panel>
    </GdsContainer>
  </div>
);

export const Page = () => (
  <div style={{ background: 'var(--mantine-color-gray-1)', padding: 16, borderRadius: 8 }}>
    <GdsContainer size="page" center>
      <Panel>A page container constrains a settings layout to a predictable maximum width.</Panel>
    </GdsContainer>
  </div>
);

export const Wide = () => (
  <div style={{ background: 'var(--mantine-color-gray-1)', padding: 16, borderRadius: 8 }}>
    <GdsContainer size="wide" center>
      <Panel>A wide container suits dashboards and data-dense layouts that need more horizontal room.</Panel>
    </GdsContainer>
  </div>
);
