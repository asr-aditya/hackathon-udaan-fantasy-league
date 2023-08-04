const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const axios = require('axios');
const { challengeService } = require('../../services');

const router = express.Router();

const CHALLENGE_NAME_COST = 'Week_1_Cost_Optimisation_challenge';

router.route('/getCost').get(
  catchAsync(async (req, res) => {
    const team = req.query.team;
    const result = [];
    const challengeObject = challengeService.findOneChallenge({ name: CHALLENGE_NAME_COST });
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

router.route('/getCostArray').get(
  catchAsync(async (req, res) => {
    const team = req.query.team;
    const result = [];
    const data = axios
      .get('https://svc-hack.dev.udaan.io/cost-analysis/api/summary?Granularity=DAY&LookBackWindow=30')
      .then((response) => {
        // console.log('Value is ', response.data);
        const data = response.data;
        const keysData = data.graphTimeline;
        console.log(`kys : ${keysData}`);
        data.data.forEach((element) => {
          element.children.forEach((team) => {
            const valuableKeys = Object.keys(team).filter((key) => keysData.includes(key));
            result.push({
              teamName: team['TeamName'],
              values: valuableKeys.map((key) => team[key]),
            });
          });
        });
        res.send(result);
      });
  })
);

router.route('/getSDHistory').get();

router.route('/getServiceAvailability').get(
  catchAsync(async (req, res) => {
    const apiUrl = `https://thanos.k8s0.xp.udaan.io/api/v1/query?query=%28%28100.0+-+%28error_http_request_duration_seconds_count%3Asum5m%7Bcluster%3D%22udaan-sin0%22%2Cnamespace%3D%22prod%22%7D%2Fhttp_request_duration_seconds_count%3Asum5m%7Bcluster%3D%22udaan-sin0%22%2Cnamespace%3D%22prod%22%7D*100%29%29+or+on%28%29+vector%28100%29%29&dedup=true&partial_response=false&time=${
      Date.now() / 1000
    }`;
    const result = [];
    const data = axios.get(apiUrl).then((response) => {
      const data = response.data.data.result;
      data.forEach((element) => {
        result.push({
          service: element.metric.service,
          availability: element.value[1],
        });
      });
      res.send(result);
    });
  })
);

module.exports = router;
