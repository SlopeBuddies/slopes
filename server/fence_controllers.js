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
      [[-111.66207790374756, 40.23160995055288], [-111.66233539581299, 40.22325479821151], 
      [-111.65152072906494, 40.22305819398159], [-111.65139198303223, 40.231773766767056], 
      [-111.66207790374756, 40.23160995055288]]
  ]),
  TimsHouse: turf.polygon([
      [[-111.634741, 40.217847], [-111.629859, 40.217912], [-111.627627, 40.213338],
    [-111.635364, 40.212138], [-111.634741, 40.217847]]
  ]),
  CodysHouse: turf.polygon([
      [[-111.708482, 40.312540], [-111.705880, 40.312520], [-111.706154, 40.310340],
   [-111.708734, 40.310041], [-111.708482, 40.312540] ]
  ]),
  StefsHouse: turf.polygon([
      [[-111.740678, 40.365843], [-111.740709, 40.366391], [-111.739767, 40.366391],
    [-111.739423, 40.366187], [-111.739503, 40.365797], [-111.740678, 40.365843]]
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
        req.app.get('db').update_current_mtn([resort, req.user.user_id])
        return res.status(200).send(resort);

    } else {
        req.app.get('db').update_current_mtn([null, req.user.user_id])
        return res.status(200).send('NOT IN FENCE')
    }
  },
  friendLocation: (req, res)=>{
    req.app.get('db').friends_location([req.params.mtn, req.user.user_id]).then((response)=>{
      res.status(200).send(response);
    })
  }
};
