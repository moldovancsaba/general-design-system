import * as React from 'react';
import { GameBoardTile } from '@sovereignsquad/gds';

const Tile = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 64, height: 64 }}>{children}</div>
);

export const States = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
    <Tile>
      <GameBoardTile face="?" revealed={false} matched={false} disabled={false} />
    </Tile>
    <Tile>
      <GameBoardTile face="🍒" revealed matched={false} disabled={false} highlightColor="violet" />
    </Tile>
    <Tile>
      <GameBoardTile face="🍒" revealed matched disabled={false} highlightColor="green" />
    </Tile>
    <Tile>
      <GameBoardTile face="?" revealed={false} matched={false} disabled />
    </Tile>
  </div>
);

export const Board = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 64px)', gap: 12 }}>
    <GameBoardTile face="🍒" revealed matched disabled={false} highlightColor="green" />
    <GameBoardTile face="?" revealed={false} matched={false} disabled={false} />
    <GameBoardTile face="🍋" revealed matched={false} disabled={false} highlightColor="yellow" />
    <GameBoardTile face="?" revealed={false} matched={false} disabled={false} />
    <GameBoardTile face="?" revealed={false} matched={false} disabled={false} />
    <GameBoardTile face="🍇" revealed matched disabled={false} highlightColor="grape" />
    <GameBoardTile face="?" revealed={false} matched={false} disabled={false} />
    <GameBoardTile face="🍋" revealed matched={false} disabled={false} highlightColor="yellow" />
  </div>
);
