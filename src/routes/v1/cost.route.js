const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const axios = require('axios');
// const { challengeService } = require('../../services');

const router = express.Router();
const { challengeService } = require('../../services');

const CHALLENGE_NAME_COST = 'WEEK_1_COST_OPTIMISATION';
const CHALLENGE_NAME_SERVICE = 'WEEK_1_SERVICE_AVAILABILITY';

router.route('/getCost').get(
  catchAsync(async (req, res) => {
    const team = req.query.team;
    const result = [];
    const challengeObject = await challengeService.findOneChallenge({ name: CHALLENGE_NAME_COST });
    const teamBets = {};
    challengeObject.bettings.forEach((bet) => {
      teamBets[bet.team] = bet.users.length * 100;
    });
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
              betsPlaced: Object.keys(teamBets).includes(team.TeamName) ? teamBets[team.TeamName] : 0,
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
    const challengeObject = await challengeService.findOneChallenge({ name: CHALLENGE_NAME_SERVICE });
    const teamBets = {};
    challengeObject.bettings.forEach((bet) => {
      teamBets[bet.team] = bet.users.length * 100;
    });
    const data = axios.get(apiUrl).then((response) => {
      const data = response.data.data.result;
      data.forEach((element) => {
        result.push({
          service: element.metric.service,
          availability: element.value[1],
          betsPlaced: Object.keys(teamBets).includes(element.metric.service) ? teamBets[element.metric.service] : 0,
        });
      });
      res.send(result);
    });
  })
);

router.route('/getAvailabilityArray').get(
  catchAsync(async (req, res) => {
    const servicesList = [
      'ads-service',
      'ads-tracking-service',
      'api-server',
      'assist-dt',
      'assist-iur-service',
      'assist-jobs',
      'assist-recon',
      'assist-service',
      'auth-server',
      'brands-service',
      'catalog-console',
      'catalog-internal-service',
      'catalog-readpath-service',
      'catalog-service',
      'chat-backend-service',
      'chat-service',
      'cheque-service',
      'communication-framework-service',
      'communication-request-executor',
      'communication-service',
      'compliance-service',
      'config-service',
      'constraint-service',
      'content-ads-service',
      'control-tower-console-service',
      'credit-accounting-service',
      'credit-analytics-service',
      'credit-console',
      'credit-fe-app',
      'credit-service',
      'customer-journey-service',
      'cx-chatbot-service',
      'dashboard-service',
      'data-platform-daemon-service',
      'data-platform-file-service',
      'data-platform-jupyterlab',
      'data-platform-service',
      'dev-tools',
      'ds-gateway-service',
      'escalations-automations',
      'first-party-accounting-consumer',
      'first-party-accounting-message-broker',
      'first-party-accounting-service',
      'first-party-catalog-service',
      'first-party-procurement-service',
      'first-party-service',
      'fos-app',
      'fos-console',
      'fos-event-consumers',
      'fos-sales',
      'fos-service',
      'fos-udaan-core-service',
      'fp-pricing-ingestion',
      'fulfilment-catalog-internal-service',
      'fulfilment-catalog-service',
      'fulfilment-catalog-tmp-service',
      'fulfilment-console-service',
      'fulfilment-service',
      'graphql-gateway-service',
      'hiveloop-capital-web',
      'hooks-gateway-service',
      'inbound-fulfilment-service',
      'inventory-non-critical-service',
      'inventory-reservation-service',
      'inventory-service',
      'invoice-digitization-service',
      'invoicing-service',
      'lbh-measure-python-service',
      'ledger-service',
      'listing-tags-service',
      'listing-tests',
      'logistics-console-service',
      'logistics-external-service',
      'logistics-external-shipment-status-consumer-service',
      'logistics-ops-console',
      'logistics-service',
      'logistics-shipping-charge-service',
      'logistics-vms-service',
      'logistics-workflow-service',
      'mario-distribution-service',
      'next-sel275-api-server',
      'notification-service',
      'orchestrator-non-critical-service',
      'orchestrator-service',
      'order-charges-service',
      'order-graphiql',
      'order-mgt-buyer-svc',
      'order-mgt-console',
      'order-mgt-svc',
      'order-mgt-workflows',
      'order-read-service',
      'order-write-service',
      'orderflow-gateway-service',
      'orderform-service',
      'pacman-orderform-service',
      'pagebuilder-gateway-service',
      'payments-console',
      'payments-ecollect-service',
      'payments-service',
      'payments-workflow-service',
      'performance-metrics-service',
      'pickily-service',
      'planning-consumer',
      'planning-service',
      'postorderflow-gateway-service',
      'preorderflow-gateway-service',
      'pricing-service',
      'product-master-catstack-service',
      'product-master-service',
      'promotions-console-service',
      'promotions-discovery-service',
      'promotions-service',
      'ratings-service',
      'recommendations-service',
      'resource-config-service',
      'returns-service',
      'rewards-console',
      'rewards-service',
      'search-ads-service',
      'search-indexing',
      'search-localisation-service',
      'search-service',
      'search-solr8-slave',
      'seller-charges-service',
      'seller-lifecycle-service',
      'sellers-gateway-service',
      'semantic-search-service',
      'subscription-console-service',
      'subscription-service',
      'superclub-gateway-service',
      'supply-chain-alogorithm-executor',
      'supply-planning-service',
      'support-chat-service',
      'support-hooks-service',
      'support-monitoring-service',
      'support-service',
      'support-user-service',
      'targeting-service',
      'trade-quality-service',
      'udaan-escalations-service',
      'udaan-telephony-ari-sbconsumer',
      'udaan-telephony-monitor',
      'udaan-telephony-sbconsumer',
      'udaan-telephony-service',
      'udaan-web',
      'udaan-web-frontend',
      'user-account-audit-service',
      'user-account-service',
      'user-service',
      'vehicle-routing-service',
      'vendor-console-service',
      'vendor-management-service',
      'vertical-prediction-service',
      'vertical-service',
      'warehouse-console',
      'warehouse-fresh-crating-service',
      'warehouse-service',
      'wcm-service',
      'wondermart-discovery-service',
      'wondermart-gateway-service',
      'wondermart-orderform-service',
    ];
    const result = {};

    // eslint-disable
    servicesList.slice(0, 3).forEach((service) => {
      // eslint-disable
      const url = `https://thanos.k8s0.xp.udaan.io/api/v1/query_range?query=100%20-%20((sum(increase(http_request_duration_seconds_count{namespace=%22prod%22,cluster=%22udaan-sin0%22,%20service=%22${service}%22,%20code=~%225..%22}[5m]))%20or%20on()%20vector(0))%20/%20(sum(increase(http_request_duration_seconds_count{namespace=%22prod%22,cluster=%22udaan-sin0%22,%20service=%22${service}%22}[5m]))))%20*%20100&dedup=true&partial_response=false&start=${
        Date.now() / 1000 - 1296000
      }&end=${Date.now() / 1000}&step=86400&max_source_resolution=0s`;
      axios.get(url.replace(/\s+/g, '')).then((response) => {
        result[service] = response.data.data.result[0].values.map((item) => item[1]);
      });
    });
    res.send(result);
  })
);

router.route('/getCostWinner').get(
  catchAsync(async (req, res) => {
    const challengeObject = await challengeService.findOneChallenge({ name: CHALLENGE_NAME_COST });
    const teamBets = {};
    challengeObject.bettings.forEach((bet) => {
      teamBets[bet.team] = bet.users;
    });
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
            });
          });
        });
        result.sort((a, b) => b.costDelta - a.costDelta);

        const winner = result[0].teamName;
        const users = teamBets[winner];
        res.send({
          team: winner,
          betters: users,
        });
      });
  })
);

module.exports = router;
