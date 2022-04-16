// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = 'http://localhost:8080';

const buildingNameToId = {
  'Town Hall': '623173e1f10faea791509fb3',
  'House': '62318861b51742f20a95513e',
  'Farm': '62318895b51742f20a955140',
  'Mine': '623188b7b51742f20a955142',
  'Logging': '623188e4b51742f20a955144',
  'Rock picker': '62318919b51742f20a955147',
  'Barracks': '62318931b51742f20a955149',
  'Stable': '62318945b51742f20a95514b',
  'Watch Tower': '62318982b51742f20a95514f',
  'Research Center': '623189b9b51742f20a955154',
  'Market': '623189dab51742f20a955156',
  'Warehouse': '6232a83b79c7546bbfe20d58',
  'Walls': '6231899db51742f20a955152',
  'Siege Workshop': '62318965b51742f20a95514d'
}
const ITEM_HIDDEN_CLASS = 'item-hidden';
const ITEM_VISIBLE_CLASS = 'item-visible';

const buildingNames = {
  TOWN_HALL: 'Town Hall',
  HOUSE: 'House',
  MINE: 'Mine',
  LOGGING: 'Logging',
  ROCK_PICKER: 'Rock picker',
  BARRACKS: 'Barracks',
  STABLE: 'Stable',
  WATCH_TOWER: 'Watch Tower',
  RESEARCH_CENTER: 'Research Center',
  MARKET: 'Market',
  WAREHOUSE: 'Warehouse',
  FARM: 'Farm',
  WORKSHOP: 'Siege Workshop'
}


module.exports = {
  apiUrl,
  buildingNameToId,
  buildingNames,
  ITEM_HIDDEN_CLASS,
  ITEM_VISIBLE_CLASS
};
