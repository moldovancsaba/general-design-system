import { ProgressCard } from '@sovereignsquad/gds';

export const Default = () => (
  <ProgressCard
    label="Onboarding completion"
    value="6 of 8 steps"
    progress={75}
    progressLabel="Account setup"
    description="Finish the last two steps to unlock team analytics."
  />
);

export const NearDone = () => (
  <ProgressCard
    label="Migration coverage"
    value="18 / 20 sources"
    progress={90}
    progressLabel="Connected sources"
  />
);

export const Complete = () => (
  <ProgressCard
    label="Reference-site conversion"
    value="Strict consumer"
    progress={100}
    progressLabel="Current state"
  />
);
