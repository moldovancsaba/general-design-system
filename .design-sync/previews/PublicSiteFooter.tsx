import { PublicSiteFooter } from '@doneisbetter/gds';

export const Default = () => (
  <PublicSiteFooter meta="© 2026 Done Is Better — All rights reserved.">
    Lightweight public footer for simple site meta and legal copy.
  </PublicSiteFooter>
);

export const WithLinks = () => (
  <PublicSiteFooter
    meta="© 2026 Acme Inc. · v3.4.14 · status: operational"
  >
    <a href="#privacy" style={{ marginRight: 16 }}>Privacy</a>
    <a href="#terms" style={{ marginRight: 16 }}>Terms</a>
    <a href="#contact">Contact</a>
  </PublicSiteFooter>
);
