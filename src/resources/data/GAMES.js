const GAMES = {
  "01": {
    id: "01", 
    name: "Underground ",
    difficulty: "Easy",
    url: require("../images/01.png"), 
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [475, 670], boxSize: [50, 44]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [74, 404], boxSize: [44, 40]},
        {name: "Cracked Bowl", url: require("../images/cracked-bowl.png"), coordinate: [1183, 467], boxSize: [70, 40]}
      ]
  },
  "02": {
    id: "02", 
    name: "Apple Orchard",
    difficulty: "Medium",
    url: require("../images/02.png"), 
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [913, 789], boxSize: [71, 67]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [512, 681], boxSize: [54, 47]},
        {name: "Maximum Tomato", url: require("../images/maximum-tomato.png"), coordinate: [310, 287], boxSize: [51, 39]}
      ]
  },
  "03": {
    id: "03", 
    name: "Outer Space",
    difficulty: "Hard",
    url: require("../images/03.png"), 
    targets: 
      [
        {name: "Star Rod", url: require("../images/star-rod.png"), coordinate: [474, 33], boxSize: [45, 45]},
        {name: "Band-aid", url: require("../images/band-aid.png"), coordinate: [216, 237], boxSize: [33, 30]},
        {name: "Flag", url: require("../images/flag.png"), coordinate: [1090, 490], boxSize: [47, 61]}
      ]
  },
};

export default GAMES;
