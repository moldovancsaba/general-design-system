import { AdminReviewLayout, SemanticButton } from '@doneisbetter/gds';

export const Default = () => (
  <AdminReviewLayout
    media={
      <div
        style={{
          width: '100%',
          height: 180,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
        }}
      >
        Submission preview
      </div>
    }
    metadata={
      <dl style={{ margin: 0, display: 'grid', gap: 6 }}>
        <div>
          <dt style={{ fontSize: 12, opacity: 0.6 }}>Submitted by</dt>
          <dd style={{ margin: 0 }}>Riverside Bakery</dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, opacity: 0.6 }}>Region</dt>
          <dd style={{ margin: 0 }}>EU-Central</dd>
        </div>
      </dl>
    }
    actions={
      <div style={{ display: 'flex', gap: 8 }}>
        <SemanticButton action="save" />
        <SemanticButton action="delete" />
      </div>
    }
  >
    <h3 style={{ marginTop: 0 }}>Review submission</h3>
    <p style={{ margin: 0 }}>
      Confirm the listing meets directory guidelines before publishing. Check
      imagery, description accuracy, and category placement.
    </p>
  </AdminReviewLayout>
);
