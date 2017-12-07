const turf = require("turf");

const resorts = {
  Brighton: turf.polygon([
      [[0, 0], [0, 7], [7, 7], 
      [7, 0], [0, 0]]]),
      
  Snowbird: turf.polygon([
      [[9, 9], [11, 12], [14, 17], 
      [17, 24], [9, 9]]]),

  DeerValley: turf.polygon([
    [[18, 25], [22, 27], [29, 29], 
    [31, 41], [18, 25]]]),

  Sundance: turf.polygon([
      [[32, 42], [35, 45], [40, 55], 
      [45, 49], [32, 42]]]),

  Vail: turf.polygon([
      [[46, 56], [55, 58], 
      [57, 60], [59, 62], 
      [46, 56]]]),

  DevMountain: turf.polygon([
      [[-111.658, 40.225], [-111.664, 40.222], 
      [-111.667, 40.223], [-111.668, 40.225], 
      [-111.666, 40.226], [-111.658, 40.225]]
  ])    
    
};

module.exports = {
  check_fences: (req, res, next) => {
      console.log(req.body)
    var pt1 = turf.point([req.body.longitude, req.body.latitude]);
    var resort = ''

    for (key in resorts) {
      if (turf.intersect( pt1, resorts[key])) {
        console.log(key)
        resort = key
      } 
    }
    if(resort) {
        return res.status(200).send(resort)
    } else {
        return res.status(200).send('NOT IN FENCE')
    }
  }
};
