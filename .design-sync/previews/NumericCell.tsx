import { NumericCell, GdsSafeBox } from '@sovereignsquad/gds';

export const Default = () => (
  <GdsSafeBox safeStyle={{ background: 'surface', border: 'default', radius: 'lg', inset: 'md' }}>
    <table style={{ borderCollapse: 'collapse', width: 280 }}>
      <tbody>
        <tr>
          <td style={{ padding: '6px 12px' }}>Revenue</td>
          <NumericCell>$48,210.00</NumericCell>
        </tr>
        <tr>
          <td style={{ padding: '6px 12px' }}>Refunds</td>
          <NumericCell>-$1,340.50</NumericCell>
        </tr>
        <tr>
          <td style={{ padding: '6px 12px' }}>Net</td>
          <NumericCell>$46,869.50</NumericCell>
        </tr>
      </tbody>
    </table>
  </GdsSafeBox>
);
