export const distance = function calculDistance(lat1, lat2, long1, long2) {
  const moyenne = (lat1 + lat2) / 2;
  const x = (long2 - long1).Math.cos(moyenne);
  const y = lat1 - lat2;
  const d = Math.sqrt(x * x + y * y);
  const distancePoints = 1852 * d;
  return distancePoints;
};
