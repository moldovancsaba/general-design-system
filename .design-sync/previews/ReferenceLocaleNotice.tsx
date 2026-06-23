import { ReferenceLocaleNotice } from '@doneisbetter/gds';

export const Default = () => (
  <ReferenceLocaleNotice
    localeLabel="Deutsch"
    detail="The reference-site narrative remains English while semantic vocabulary is already localized."
  />
);

export const French = () => (
  <ReferenceLocaleNotice
    localeLabel="Français"
    detail="Documentation prose is shown in English; action labels and semantic vocabulary follow the selected locale."
  />
);
