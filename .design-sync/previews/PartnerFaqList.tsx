import { PartnerFaqList } from '@doneisbetter/gds';

export const Default = () => (
  <PartnerFaqList
    items={[
      { id: 'free', question: 'Is Partner Baby free to use?', answer: 'Yes — browsing the map and lists is completely free, no account required.' },
      { id: 'submit', question: 'How do I add a place?', answer: 'Tap “Add a place”, fill in the amenities, and a moderator reviews it within 48 hours.' },
      { id: 'accuracy', question: 'What if a listing is wrong?', answer: 'Use the flag button on any place and we’ll verify and update the details.' },
      { id: 'cities', question: 'Which cities are covered?', answer: 'We’re live across major metro areas and expanding as the community grows.' },
    ]}
  />
);

export const Short = () => (
  <PartnerFaqList
    items={[
      { id: 'data', question: 'Do you sell my data?', answer: 'Never. Saved places stay on your device unless you sign in.' },
      { id: 'cost', question: 'Will it always be free?', answer: 'Core discovery features will always be free for families.' },
    ]}
  />
);
