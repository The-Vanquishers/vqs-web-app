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
  HOUSE: "90% 16%",
  TOWN_HALL: "65% 16%",
  MINE: "68% 95%",
  LOGGING: "45% 82%",
  ROCK_PICKER: "42% 36%",
  BARRACKS: "59% 80%",
  STABLE: "-2% 19% ",
  WATCH_TOWER: "5% 6%",
  RESEARCH_CENTER: "9% 9%",
  MARKET: "93% -1%",
  WAREHOUSE: "36% 64%",
  FARM: "68% -4%",
  WORKSHOP: "-2% 34%",
};

const resourceSets = {
  Iron: "6231728ff10faea791509fac",
  Wood: "623172adf10faea791509fae",
  Stone: "623172a5f10faea791509fad",
  Food: "6233f7f7e996f0998ee1ce7a",
  Gold: "6233f80ae996f0998ee1ce7c",
};

const unitSets = {
  'Spear Man': '6232bf7b79c7546bbfe20e14',
  'Axe Man': '6232bf7b79c7546bbfe20e15',
  'Sword Man': '6232bf7b79c7546bbfe20e16',
  'Ram': '6232bf7b79c7546bbfe20e1b',
  'Heavy Cavalry': '6232bf7b79c7546bbfe20e18',
  'Cavalry': '6232bf7b79c7546bbfe20e17',
  'Cavalry Archer': '6232bf7b79c7546bbfe20e19',
  'Heavy Cavalry Archer': '6232bf7b79c7546bbfe20e1a',
  'Catapult': '6232bf7b79c7546bbfe20e1c',
  'Scouts': '6232bf7b79c7546bbfe20e1d',
  'Vanquisher': '624c1fc47d042172892edd9a'
}

const stableUnitNames = {
  HEAVY_CAVALRY: "Heavy Cavalry",
  CAVALRY: "Cavalry",
  CAVALRY_ARCHER: 'Cavalry Archer',
  HEAVY_CAVALRY_ARCHER: 'Heavy Cavalry Archer',
}

const stableTrainingCost = {
  [stableUnitNames.HEAVY_CAVALRY]: {
    Iron: 400,
    Wood: 280,
    Stone: 530,
    time: 800,
    housingRequirement: 2
  },
  [stableUnitNames.CAVALRY]: {
    Iron: 350,
    Wood: 250,
    Stone: 500,
    time: 750,
    housingRequirement: 2
  },
  [stableUnitNames.CAVALRY_ARCHER]: {
    Iron: 400,
    Wood: 350,
    Stone: 550,
    time: 820,
    housingRequirement: 2
  },
  [stableUnitNames.HEAVY_CAVALRY_ARCHER]: {
    Iron: 500,
    Wood: 450,
    Stone: 550,
    time: 880,
    housingRequirement: 2
  },
}



module.exports = {
  apiUrl,
  buildingIdToName,
  buildingPosition,
  buildingNameToId,
  resourceSets,
  buildingNames,
  ITEM_HIDDEN_CLASS,
  ITEM_VISIBLE_CLASS,
  unitSets,
  stableUnitNames,
  stableTrainingCost
};
