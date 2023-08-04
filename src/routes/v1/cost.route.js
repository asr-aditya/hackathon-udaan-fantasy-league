const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const axios = require('axios');

const router = express.Router();

router.route('/getCost').get(
  catchAsync(async (req, res) => {
    const team = req.query.team;
    const result = [];
    const data = axios
      .get('https://svc-hack.dev.udaan.io/cost-analysis/api/summary?Granularity=DAY&LookBackWindow=3')
      .then((response) => {
        // console.log('Value is ', response.data);
        const data = response.data;
        const key1 = data.graphTimeline[0];
        const key2 = data.graphTimeline[1];
        console.log(`ky1 : ${key1}, ky2 : ${key2}`);
        data.data.forEach((element) => {
          element.children.forEach((team) => {
            result.push({
              teamName: team.TeamName,
              costDelta: ((team[key1] - team[key2]) * 100) / team[key1],
              betsPlaced: 28,
            });
          });
        });
        res.send(result);
      });
  })
);

module.exports = router;
