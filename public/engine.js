var uuid = require('node-uuid');
var Alea = require('alea');

var INITIAL_OBJECTS = [
  {
    path: 'Assets/thing.png',
    lifeTime: 400,
    x: 0,
    y: 0,
    z: 20,
    xVel: -4,
    yVel: -10
  }
];

function ChampionEngine() {
  this.sessions = {};
}

ChampionEngine.prototype.login = function (sessionId, client) {
  if (!sessionId) {
    sessionId = uuid.v4();
  }
  var session = this.sessions[sessionId];
  if (!session) {
    session = this.sessions[sessionId] = {
      id: sessionId,
      client: [],
      prng: new Alea(123),
      time: 0
    };
  }

  function randomInt(min, max) {
    return Math.floor(session.prng() * (max + 1 - min) + min);
  }
  function sendFrame() {
    if (!session.client.length) {
      return;
    }
    if (session.time === 0 ) {
      session.clients.map(function (client) {
        client.setUp(INITIAL_OBJECTS);
      });
    } else {
      var newObjects = [];
      if (randomInt(0, 99) === 0) {
        newObjects.push({
          path: 'Assets/thing.png',
          lifeTime: 400,
          position: {
            x: 0,
            y: 0,
            z: 20
          },
          xVel: -4,
          yVel: -10
        });
      }
      session.clients.map(function (client) {
        client.loadObjects(newObjects);
      });
    }
    session.time += 1;
    setTimeout(sendFrame, 100);
  }
  session.clients.push(client);
  sendFrame();
  return session;
};

