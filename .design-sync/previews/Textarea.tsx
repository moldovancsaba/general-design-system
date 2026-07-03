import { Textarea } from '@sovereignsquad/gds';

export const Default = () => (
  <Textarea
    label="Release notes"
    placeholder="Summarize what changed in this release…"
    description="Shared with the team when the version ships."
    autosize
    minRows={3}
  />
);

export const WithValue = () => (
  <Textarea
    label="Incident summary"
    description="Keep it factual; this feeds the postmortem."
    defaultValue={"Checkout latency spiked at 14:02 UTC after the payments deploy.\nRolled back within 8 minutes; no data loss observed."}
    autosize
    minRows={3}
  />
);

export const Error = () => (
  <Textarea
    label="Justification"
    placeholder="Explain the exception…"
    error="A justification of at least 20 characters is required."
    withAsterisk
    minRows={3}
  />
);

export const Disabled = () => (
  <Textarea
    label="Audit log entry"
    description="Locked once the record is archived."
    defaultValue="Archived by system on 2026-06-18."
    disabled
    minRows={2}
  />
);
