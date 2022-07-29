const GAMES = {
  "01": {
    id: "01", 
    name: "Underground ",
    difficulty: "Easy",
    url: require("../images/01.png"),
    size: [1280, 915],
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [475, 670], boxSize: [50, 44]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [74, 404], boxSize: [44, 40]},
        {name: "Cracked Bowl", url: require("../images/cracked-bowl.png"), coordinate: [1183, 467], boxSize: [70, 40]}
      ]
  },
  "02": {
    id: "02", 
    name: "The Beanstalk",
    difficulty: "Easy",
    url: require("../images/02.png"),
    size: [1280, 914],
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [1066, 395], boxSize: [50, 45]},
        {name: "Flag", url: require("../images/flag.png"), coordinate: [527, 114], boxSize: [41, 41]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [916, 745], boxSize: [55, 52]}
      ]
  },
  "03": {
    id: "03", 
    name: "Apple Orchard",
    difficulty: "Medium",
    url: require("../images/03.png"),
    size: [1280, 912],
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [913, 789], boxSize: [71, 67]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [512, 681], boxSize: [54, 47]},
        {name: "Maximum Tomato", url: require("../images/maximum-tomato.png"), coordinate: [310, 287], boxSize: [51, 39]}
      ]
  },
  "04": {
    id: "04", 
    name: "The Race",
    difficulty: "Medium",
    url: require("../images/04.png"),
    size: [1280, 911],
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [42, 362], boxSize: [72, 70]},
        {name: "Flag", url: require("../images/flag.png"), coordinate: [1131, 28], boxSize: [28, 26]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [503, 202], boxSize: [40, 46]}
      ]
  },
  "05": {
    id: "05", 
    name: "Water Fountain",
    difficulty: "Medium",
    url: require("../images/05.png"),
    size: [1280, 908],
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [685, 61], boxSize: [60, 49]},
        {name: "Flag", url: require("../images/flag.png"), coordinate: [1064, 374], boxSize: [32, 30]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [278, 776], boxSize: [62, 65]}
      ]
  },
  "06": {
    id: "06", 
    name: "Outer Space",
    difficulty: "Hard",
    url: require("../images/06.png"),
    size: [1280, 914],
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [474, 33], boxSize: [45, 45]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [216, 237], boxSize: [33, 30]},
        {name: "Flag", url: require("../images/flag.png"), coordinate: [1090, 490], boxSize: [47, 61]}
      ]
  },
};

export default GAMES;
