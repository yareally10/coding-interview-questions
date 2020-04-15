/**
quickestWayUp(
  [
    [32, 62],
    [42, 68],
    [12, 98]
  ],
  [
    [95, 13],
    [97, 25],
    [93, 37],
    [79, 27],
    [75, 19]
  ]
);

quickestWayUp(
  [
    [3, 54],
    [37, 100]
  ],
  [
    [56, 33]
  ]
);

quickestWayUp(
  [
    [7, 98]
  ],
  [
    [99, 1]
  ]
);
*/

function quickestWayUp(ladders, snakes) {
  const graph = {};
  ladders.forEach(e => {
    let [x, y] = e;
    graph[x] = y;
  });

  snakes.forEach(e => {
    let [x, y] = e;
    graph[x] = y;
  });

  return steps(graph, 1, 100);
}

function steps(graph, s, d) {
  const visited = {}, queue = [s];
  visited[1] = 0;
  while (queue.length > 0) {
    console.log(queue);
    let p = queue.shift();
    if (p == d) {
      return visited[d];
    }

    //calculate potential next step for each dice face
    for (let i=1; i<=6; i++) {
      let nextStep = p + i;
      if (graph.hasOwnProperty(nextStep)) {
        nextStep = graph[nextStep];
      }
      if (!visited.hasOwnProperty(nextStep)) {
        visited[nextStep] = visited[p] + 1;
        queue.push(nextStep);
      } else if (visited[p] + 1 < visited[nextStep]) {
        visited[nextStep] = visited[p] + 1;
      }
    }
  }
  return -1;
}