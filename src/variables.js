const apiUrl = process.env.REACT_APP_API_URL;

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

const ITEM_HIDDEN_CLASS = "item-hidden";
const ITEM_VISIBLE_CLASS = "item-visible";

const buildingNames = {
  TOWN_HALL: "Town Hall",
  HOUSE: "House",
  MINE: "Mine",
  LOGGING: "Logging",
  ROCK_PICKER: "Rock picker",
  BARRACKS: "Barracks",
  STABLE: "Stable",
  WATCH_TOWER: "Watch Tower",
  RESEARCH_CENTER: "Research Center",
  MARKET: "Market",
  WAREHOUSE: "Warehouse",
  FARM: "Farm",
  WORKSHOP: "Siege Workshop",
};
const buildingIdToName = {
  "623173e1f10faea791509fb3": "Town Hall",
  "62318861b51742f20a95513e": "House",
  "62318895b51742f20a955140": "Farm",
  "623188b7b51742f20a955142": "Mine",
  "623188e4b51742f20a955144": "Logging",
  "62318919b51742f20a955147": "Rock picker",
  "62318931b51742f20a955149": "Barracks",
  "62318945b51742f20a95514b": "Stable",
  "62318982b51742f20a95514f": "Watch Tower",
  "623189b9b51742f20a955154": "Research Center",
  "623189dab51742f20a955156": "Market",
  "6232a83b79c7546bbfe20d58": "Warehouse",
  "6231899db51742f20a955152": "Walls",
  "62318965b51742f20a95514d": "Siege Workshop",
};

const buildingPosition = {
  HOUSE: "65% 16%",
  TOWN_HALL: "0% 0%",
  MINE: "0% 20%",
  LOGGING: "-2% 34%",
  ROCK_PICKER: "42% 36%",
  BARRACKS: "68% -4%",
  STABLE: "93% -1%",
  WATCH_TOWER: "5% 6%",
  RESEARCH_CENTER: "9% 8%",
  MARKET: "49% -3%",
  WAREHOUSE: "4% 23%",
  FARM: "90% -4%",
  WORKSHOP: "12% 94%",
};

const resourceSets = {
  Iron: "6231728ff10faea791509fac",
  Wood: "623172adf10faea791509fae",
  Stone: "623172a5f10faea791509fad",
  Food: "6233f7f7e996f0998ee1ce7a",
  Gold: "6233f80ae996f0998ee1ce7c",
};



module.exports = {
  apiUrl,
  buildingIdToName,
  buildingPosition,
  buildingNameToId,
  resourceSets,
  buildingNames,
  ITEM_HIDDEN_CLASS,
  ITEM_VISIBLE_CLASS,
};
