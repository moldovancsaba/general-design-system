import { GdsMediaFrame } from '@sovereignsquad/gds';

const photo =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%234f46e5'/><stop offset='1' stop-color='%2306b6d4'/></linearGradient></defs><rect width='320' height='180' fill='url(%23g)'/><text x='160' y='96' fill='white' font-family='sans-serif' font-size='20' text-anchor='middle'>Coastline</text></svg>"
  );

export const Video = () => (
  <GdsMediaFrame aspectRatio="video" fit="cover">
    <img src={photo} alt="Aerial view of a coastline at sunset" />
  </GdsMediaFrame>
);

export const Square = () => (
  <GdsMediaFrame aspectRatio="square" fit="cover">
    <img src={photo} alt="Coastline thumbnail" />
  </GdsMediaFrame>
);

export const Portrait = () => (
  <GdsMediaFrame aspectRatio="portrait" fit="contain">
    <img src={photo} alt="Coastline portrait crop" />
  </GdsMediaFrame>
);
