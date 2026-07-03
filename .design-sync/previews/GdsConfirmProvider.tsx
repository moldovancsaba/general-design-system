import { GdsConfirmProvider, useGdsConfirm } from '@sovereignsquad/gds';

const DangerZone = () => {
  const confirm = useGdsConfirm();
  return (
    <div
      style={{
        border: '1px solid var(--mantine-color-red-3)',
        background: 'var(--mantine-color-red-0)',
        borderRadius: 8,
        padding: 16,
        maxWidth: 420,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Delete project</div>
      <div style={{ fontSize: 13, color: 'var(--mantine-color-gray-7)', marginBottom: 12 }}>
        Deleting a project removes all of its data. A confirmation dialog protects this action.
      </div>
      <button
        type="button"
        onClick={() =>
          confirm.request({
            title: 'Delete project?',
            description: 'This permanently removes the project and cannot be undone.',
          } as any)
        }
        style={{
          padding: '8px 14px',
          background: 'var(--mantine-color-red-6)',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Delete project
      </button>
    </div>
  );
};

export const Default = () => (
  <GdsConfirmProvider>
    <DangerZone />
  </GdsConfirmProvider>
);
