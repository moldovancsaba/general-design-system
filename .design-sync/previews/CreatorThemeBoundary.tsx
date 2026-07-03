import { CreatorThemeBoundary } from '@sovereignsquad/gds';

const themeCss = `
.creator-card {
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  color: #fff;
  padding: 24px;
  border-radius: 12px;
}
.creator-card h3 { margin: 0 0 8px; font-size: 18px; }
.creator-card p { margin: 0; opacity: 0.9; }
`;

export const Default = () => (
  <CreatorThemeBoundary css={themeCss} scopeId="landing-preview">
    <div className="creator-card">
      <h3>Authored landing theme</h3>
      <p>Validated creator CSS is scoped to this boundary and cannot leak into the host app.</p>
    </div>
  </CreatorThemeBoundary>
);

export const WithRequiredSelectors = () => (
  <CreatorThemeBoundary
    css={themeCss}
    scopeId="landing-preview-2"
    requiredVisibleSelectors={['.creator-card']}
  >
    <div className="creator-card">
      <h3>Guarded theme</h3>
      <p>Required selectors are asserted visible before the authored theme is allowed to publish.</p>
    </div>
  </CreatorThemeBoundary>
);
