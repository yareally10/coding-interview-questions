/**
Given an integer that is the total number of nodes (N) and an array of edges, 
output all clusters within the graph. 
Note: assume nodes are valued 1 to N

E.G.
10
[[1 2] [1 3] [2 4] [4 5] [7 8]]

This would result in the following clusters:
[1, 2, 3, 4, 5]
[7, 8]
[6]
[9]
[10]

Test:
findClusters(10, [[1,2], [1,3], [2,4], [4,5], [7,8]])
*/

function findClusters(num, edges) {
	const graph = {};
	let result = [];

	//initialize graph
	for (let i=1; i<=num; i++) {
		graph[i] = [];
	}

	//process edges
	edges.forEach(edge => {
		let [x, y] = edge;
		//process edges "in order" to prevent double counting
		x < y ? recordNode(x, y, graph) : recordNode(y, x, graph);
	});
	//console.log(graph);
	
	//process all graph nodes
	let nodesProcessed = [];
	for (let i=1; i<=num; i++) {
		//if node is already processed, continue
		if (nodesProcessed.includes(i)) {
			continue;
		}
		//add node to processed
		nodesProcessed.push(i);

		if (graph[i] && Array.isArray(graph[i])) {
			//get current cluster and its edges
			let cluster = graph[i], edges = graph[i].slice();
			//breadth first search on current node
			while (edges.length > 0) {
				//remove point from edges and find new connected edges
				let point = edges.shift(), pointEdges = graph[point], newEdges = [];
				//add point to processed
				nodesProcessed.push(point);
				//only add edges that's not already in the current edge queue
				if (Array.isArray(pointEdges)) {
					newEdges = pointEdges.filter(e => {
						return !cluster.includes(e);
					});
					cluster.push(...newEdges);
					edges.push(...newEdges);
				}
				//remove current point from graph (to make graph cluster object easier to process)
				delete graph[point];
			}
		}
	}

	//process graph cluster object for output
	for (let [key, value] of Object.entries(graph)) {
		let temp = [parseInt(key)].concat(...value);
		result.push(temp);
	}
	return result;
}

function recordNode(node1, node2, graph) {
	if (graph.hasOwnProperty(node1)) {
		if (!graph[node1].includes(node2)) {
			graph[node1].push(node2);
		}
	} else {
		graph[node1] = [node2];
	}
}

findClusters(10, [[1,2], [1,3], [2,4], [4,5], [7,8]]);
