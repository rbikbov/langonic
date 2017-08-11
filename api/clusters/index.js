import cluster from 'cluster';

if (cluster.isMaster) {
  require('./master');
} else {
  require('./worker');
}
