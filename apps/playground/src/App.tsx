import { GdsProvider } from '@gds/theme';
import { AppShell, DataTable, FormSection, StatsStrip } from '@gds/admin';
import { StatusBadge, EmptyState, ConfirmDialog } from '@gds/core';
import { useState } from 'react';
import '@mantine/core/styles.css';

const mockData = [
  { id: 1, name: 'Alice', role: 'Admin', status: 'success' as const },
  { id: 2, name: 'Bob', role: 'Editor', status: 'warning' as const },
];

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <GdsProvider>
      <AppShell
        title="GDS Playground"
        navLinks={[
          { label: 'Dashboard', href: '#' },
          { label: 'Users', href: '#' },
          { label: 'Settings', href: '#' },
        ]}
      >
        <StatsStrip
          stats={[
            { label: 'Total Users', value: 120, diff: 5 },
            { label: 'Active Sessions', value: 34, diff: -2 },
            { label: 'Conversion Rate', value: '4.2%', diff: 12 },
          ]}
        />
        
        <div style={{ marginTop: '2rem' }}>
          <FormSection title="User Management" description="Manage access and roles.">
            <DataTable
              data={mockData}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { 
                  key: 'status', 
                  label: 'Status',
                  render: (item) => (
                    <StatusBadge status={item.status}>
                      {item.status.toUpperCase()}
                    </StatusBadge>
                  )
                },
                {
                  key: 'actions',
                  label: 'Actions',
                  render: () => (
                    <button onClick={() => setOpened(true)}>Delete</button>
                  )
                }
              ]}
            />
          </FormSection>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <EmptyState
            title="No recent activity"
            description="There hasn't been any activity in this workspace yet."
          />
        </div>
      </AppShell>

      <ConfirmDialog
        opened={opened}
        onClose={() => setOpened(false)}
        onConfirm={() => setOpened(false)}
        title="Delete User"
      >
        Are you sure you want to delete this user? This action cannot be undone.
      </ConfirmDialog>
    </GdsProvider>
  );
}

export default App;
