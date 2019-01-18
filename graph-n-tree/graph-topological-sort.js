/*
topological sort

Algorithm:
Search the list of nodes/projects without any incoming edges/dependencies, 
and add those to a queue.
Process the queue as long as there are items on the queue.
    Assign current item to top of queue. Dequeue.
    Add current item to the result.
    Remove all incoming edges from the current item
    For each edge removed this way, check if the this item has no incoming edges
        If so, add this item to the queue
After processing the queue, if result contains all nodes, then done.
Otherwise topological sort is impossible; a cycle exists.
*/

/*
Alien Dictionary
Given a sorted dictionary (array of words) of an alien language, 
find order of characters in the language.

Example:
Input:  words[] = {"baa", "abcd", "abca", "cab", "cad"}
Output: Order of characters is 'b', 'd', 'a', 'c'
Note that words are sorted and in the given language "baa" 
comes before "abcd", therefore 'b' is before 'a' in output.
Similarly we can find other orders.

Input:  words[] = {"caa", "aaa", "aab"}
Output: Order of characters is 'c', 'a', 'b'

Algorithm:
First process the words into a dependency graph.
Then perform topological sort. Print the result.

graph node: {
    letter: val
    previous: {}
}
*/

function processWords(first, second) {
    var result = [], i=0;

    while(i<first.length && i<second.length) {
        if(first[i] != second[i]) {
            result = [first[i], second[i]];
            break;
        }
        i++;
    }

    return result;
}

function addToGraph(graph, edge) {
    var node = {};
    if(graph.hasOwnProperty(edge[1])) {
        node = graph[edge[1]];
        if(!node["previous"].hasOwnProperty(edge[0])) {
            node["previous"][edge[0]] = true;
        }
    } else {
        //add current letter to graph
        graph[edge[1]] = {
            "letter": edge[1],
            "previous": {}
        };
        graph[edge[1]].previous[edge[0]] = true;
        //initialize previous letter in graph to ensure graph is complete
        if(!graph.hasOwnProperty(edge[0])) {
            graph[edge[0]] = {
                "letter": edge[0],
                "previous": {}
            }
        }
    }
}

function getNoDependencies(graph) {
    var result = [], vertex;
    for(vertex in graph) {
        if(graph.hasOwnProperty(vertex)) {
            if(Object.keys(graph[vertex].previous).length == 0) {
                result.push(vertex);
            }
        }
    }
    return result;
}

function removeVertex(graph, letter) {
    if(graph.hasOwnProperty(letter)) {
        var vertex, index;
        //remove letter from graph
        delete graph[letter];
        //remove all dependencies of letter from each vertex in graph
        for(vertex in graph) {
            if(graph[vertex].previous.hasOwnProperty(letter)) {
                delete graph[vertex].previous[letter];
            }
        }
    }
}

function topologicalSort(graph) {
    var result = [], noDeps, keys = Object.keys(graph);
    while(keys.length > 0) {
        noDeps = getNoDependencies(graph);
        if(noDeps.length != 1) {
            return [];
        } else {
            result.push(noDeps[0]);
            removeVertex(graph, noDeps[0]);
            keys = Object.keys(graph);
        }
    }

    return result;
}

function alienDictionary(words) {
    var i, j, graph = {}, edge, result;
    for(i=0; i<words.length-1; i++) {
        for(j=i+1; j<words.length; j++) {
            edge = processWords(words[i], words[j]);
            addToGraph(graph, edge);
        }
    }
    console.log(JSON.stringify(graph));

    result = topologicalSort(graph);
    return result;
}