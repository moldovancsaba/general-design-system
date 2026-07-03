import { FoodMenuSection } from '@sovereignsquad/gds';

const dish = (from: string, to: string) => (
  <img
    alt=""
    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
    src={`data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='320' height='240' fill='url(#g)'/></svg>`,
    )}`}
  />
);

export const Default = () => (
  <FoodMenuSection
    eyebrow="Today"
    title="Weekly menu"
    description="Grouped menu categories with consistent rhythm and per-item affordances."
    categories={[
      {
        id: 'lunch',
        title: 'Lunch',
        description: 'Fast pickup dishes for midday orders.',
        items: [
          {
            id: 'dish-1',
            title: 'Smoked paprika chicken bowl',
            state: 'available',
            price: '€12.50',
            description: 'Roasted vegetables, herbed rice, and citrus yogurt.',
            image: dish('#e8590c', '#ffd43b'),
          },
          {
            id: 'dish-2',
            title: 'Green falafel plate',
            state: 'limited',
            price: '€10.90',
            description: 'Tahini slaw, pickled onions, and warm flatbread.',
            helperText: 'Only a few left today.',
            image: dish('#2f9e44', '#a9e34b'),
          },
        ],
      },
      {
        id: 'dessert',
        title: 'Dessert',
        description: 'Made fresh each morning.',
        items: [
          {
            id: 'dish-3',
            title: 'Pistachio cardamom cake',
            state: 'available',
            price: '€6.00',
            description: 'Rosewater glaze and toasted pistachio.',
            image: dish('#66a80f', '#d8f5a2'),
          },
          {
            id: 'dish-4',
            title: 'Seasonal fruit tart',
            state: 'sold-out',
            price: '€5.50',
            description: 'Vanilla custard with a buttery shell.',
            image: dish('#c2255c', '#faa2c1'),
          },
        ],
      },
    ]}
  />
);

export const TwoColumn = () => (
  <FoodMenuSection
    title="Breakfast"
    description="Available until 11:00."
    columns={2}
    categories={[
      {
        id: 'mains',
        title: 'Mains',
        items: [
          { id: 'b-1', title: 'Shakshuka', state: 'available', price: '€9.50', description: 'Two eggs poached in spiced tomato.', image: dish('#e03131', '#ffa94d') },
          { id: 'b-2', title: 'Oat porridge', state: 'preorder', price: '€6.00', description: 'Almond milk, berries, and honey.', image: dish('#9c6644', '#ffe8cc') },
        ],
      },
    ]}
  />
);
