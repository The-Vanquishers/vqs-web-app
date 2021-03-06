const apiUrl = process.env.REACT_APP_API_URL;

const buildingNameToId = {
  "Town Hall": "623173e1f10faea791509fb3",
  House: "62318861b51742f20a95513e",
  Farm: "62318895b51742f20a955140",
  Mine: "623188b7b51742f20a955142",
  Logging: "623188e4b51742f20a955144",
  "Rock picker": "62318919b51742f20a955147",
  Barracks: "62318931b51742f20a955149",
  Stable: "62318945b51742f20a95514b",
  "Watch Tower": "62318982b51742f20a95514f",
  "Research Center": "623189b9b51742f20a955154",
  Market: "623189dab51742f20a955156",
  Warehouse: "6232a83b79c7546bbfe20d58",
  Walls: "6231899db51742f20a955152",
  "Siege Workshop": "62318965b51742f20a95514d"
};

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
  COURAGE_FARM: "Courage Farm"
};
const buildingSets = ["623173e1f10faea791509fb3", "62318861b51742f20a95513e", "62318895b51742f20a955140", "623188b7b51742f20a955142", "623188e4b51742f20a955144", "62318919b51742f20a955147",
  "62318931b51742f20a955149", "62318945b51742f20a95514b", "62318965b51742f20a95514d", "62318982b51742f20a95514f", "6231899db51742f20a955152", "623189b9b51742f20a955154",
  "623189dab51742f20a955156", "6232a83b79c7546bbfe20d58", "624855f0824e3e47905e0685"];

const building1 = ["623173e1f10faea791509fb3", "62318861b51742f20a95513e", "62318895b51742f20a955140", "623188b7b51742f20a955142", "623188e4b51742f20a955144"];
const building2 = ["62318919b51742f20a955147", "62318931b51742f20a955149", "62318945b51742f20a95514b", "62318965b51742f20a95514d", "62318982b51742f20a95514f"];
const building3 = ["6231899db51742f20a955152", "623189b9b51742f20a955154", "623189dab51742f20a955156", "6232a83b79c7546bbfe20d58", "624855f0824e3e47905e0685"];

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
  "624855f0824e3e47905e0685": "Courage Farm"
};

const buildingPosition = {
  HOUSE: "68% 6%",
  TOWN_HALL: "1% 13%",
  MINE: "96% 12%",
  LOGGING: "40% 3%",
  ROCK_PICKER: "95% 4%",
  BARRACKS: "14% 4%",
  STABLE: "29% 5% ",
  WATCH_TOWER: "95% 30%",
  RESEARCH_CENTER: "96% 56%",
  MARKET: "96% 68%",
  WAREHOUSE: "55% 22%",
  FARM: "81% 4%",
  WORKSHOP: "95% 21%",
  COURAGE_FARM: "96% 76%"
};

const resourceSets = {
  Iron: "6231728ff10faea791509fac",
  Wood: "623172adf10faea791509fae",
  Stone: "623172a5f10faea791509fad",
  Food: "6233f7f7e996f0998ee1ce7a",
  Gold: "6233f80ae996f0998ee1ce7c"
};



const unitSets = {
  "Spear Man": "6232bf7b79c7546bbfe20e14",
  "Axe Man": "6232bf7b79c7546bbfe20e15",
  "Sword Man": "6232bf7b79c7546bbfe20e16",
  "Heavy Cavalry": "6232bf7b79c7546bbfe20e18",
  "Cavalry Archer": "6232bf7b79c7546bbfe20e19",
  "Heavy Cavalry Archer": "6232bf7b79c7546bbfe20e1a",
  Cavalry: "6232bf7b79c7546bbfe20e17",
  Scouts: "6232bf7b79c7546bbfe20e1d",
  Vanquisher: "624c1fc47d042172892edd9a",
  Catapult: "6232bf7b79c7546bbfe20e1c",
  Ram: "6232bf7b79c7546bbfe20e1b"
};

const stableUnitNames = {
  HEAVY_CAVALRY: "Heavy Cavalry",
  CAVALRY: "Cavalry",
  CAVALRY_ARCHER: "Cavalry Archer",
  HEAVY_CAVALRY_ARCHER: "Heavy Cavalry Archer"
};

const workShopUnitNames = {
  CATAPULT: 'Catapult',
  RAM: 'Ram'
};

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

const workShopUnitTrainingCost = {
  [workShopUnitNames.CATAPULT]: {
    Iron: 532,
    Wood: 316,
    Stone: 888,
    time: 550,
    housingRequirement: 3
  },
  [workShopUnitNames.RAM]: {
    Iron: 532,
    Wood: 316,
    Stone: 887,
    time: 550,
    housingRequirement: 3
  },
}

const researchNames = {
  BIOPHILIC: 'Biophilic Design',
  BRANCHING: 'Branching Structure',
  COMPUTATIONAL: 'Computational Design',
  NUTRIENT: 'Nutrient Dynamics',
  BACTERIAL: 'Bacterial Species',
  RECIPROCAL: 'Reciprocal Grafting'
}

const researchSets = {
  [researchNames.BIOPHILIC]: "6232291d79c7546bbfe20d48",
  [researchNames.BRANCHING]: "6232293e79c7546bbfe20d4a",
  [researchNames.COMPUTATIONAL]: "6232294c79c7546bbfe20d4c",
  [researchNames.NUTRIENT]: "62322cea79c7546bbfe20d4e",
  [researchNames.BACTERIAL]: "62322d1279c7546bbfe20d50",
  [researchNames.RECIPROCAL]: "62322d2079c7546bbfe20d52"
}


const researchCost = {
  BIOPHILIC:
  {
    time: 1200,
    Iron: 1500,
    Wood: 1500,
    Stone: 1500
  },
  BRANCHING:
  {
    time: 3000,
    Iron: 5000,
    Wood: 5000,
    Stone: 5000
  },
  COMPUTATIONAL:
  {
    time: 7000,
    Iron: 15000,
    Wood: 15000,
    Stone: 15000
  },
  NUTRIENT:
  {
    time: 7000,
    Iron: 15000,
    Wood: 15000,
    Stone: 15000
  },
  BACTERIAL:
  {
    time: 7000,
    Iron: 15000,
    Wood: 15000,
    Stone: 15000
  },
  RECIPROCAL:
  {
    time: 7000,
    Iron: 15000,
    Wood: 15000,
    Stone: 15000
  }
}

module.exports = {
  apiUrl,
  buildingSets,
  buildingIdToName,
  buildingPosition,
  buildingNameToId,
  resourceSets,
  buildingNames,
  ITEM_HIDDEN_CLASS,
  ITEM_VISIBLE_CLASS,
  unitSets,
  stableUnitNames,
  stableTrainingCost,
  workShopUnitTrainingCost,
  workShopUnitNames,
  building1,
  building2,
  building3,
  researchCost, 
  researchSets, 
  researchNames
};
