import { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./visual.css";
import GraphVisualizer from "./GraphVisualizer";
import Code from "./Codes";


const algorithms = {
  Sorting: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort", "Merge Sort"],
  Searching: ["Linear Search", "Binary Search"],
  Graph: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm"]
};

function getRandomArray(size = 10, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

const Visualizer = () => {
  const [category, setCategory] = useState("Sorting");
  const [algo, setAlgo] = useState(algorithms["Sorting"][0]);
  const [array, setArray] = useState(getRandomArray());
  const [searchTarget, setSearchTarget] = useState(21);
  const [highlight, setHighlight] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [gridSize, setGridSize] = useState(8);
  const [customArray, setCustomArray] = useState("");
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [highlightEdges, setHighlightEdges] = useState([]);


  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setAlgo(algorithms[newCategory][0]);
    setHighlight([]);
  };

  const handleAlgoChange = (e) => {
    const selectedAlgo = e.target.value;
    setAlgo(selectedAlgo);
    setHighlight([]);
    if (selectedAlgo === "Binary Search") {
    setArray((prev) => [...prev].sort((a, b) => a - b));
  }
  };

  const bubbleSort = (arr) => {
    const anim = [];
    let a = arr.slice();
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        anim.push({ type: "compare", indices: [j, j + 1] });
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          anim.push({ type: "swap", indices: [j, j + 1], array: a.slice() });
        }
      }
    }
    return anim;
  };

  const insertionSort = (arr) => {
    const anim = [];
    let a = arr.slice();
    for (let i = 1; i < a.length; i++) {
      let key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        anim.push({ type: "compare", indices: [j, j + 1] });
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = key;
      anim.push({ type: "swap", array: a.slice() });
    }
    return anim;
  };

  const selectionSort = (arr) => {
    const anim = [];
    let a = arr.slice();
    for (let i = 0; i < a.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < a.length; j++) {
        anim.push({ type: "compare", indices: [minIdx, j] });
        if (a[j] < a[minIdx]) {
          minIdx = j;
        }
      }
      if (i !== minIdx) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        anim.push({ type: "swap", indices: [i, minIdx], array: a.slice() });
      }
    }
    return anim;
  };

  const quickSort = (arr) => {
    const anim = [];
    let a = arr.slice();

    const sort = (lo, hi) => {
      if (lo >= hi) return;
      let pivot = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        anim.push({ type: "compare", indices: [j, hi] });
        if (a[j] < pivot) {
          [a[i], a[j]] = [a[j], a[i]];
          anim.push({ type: "swap", indices: [i, j], array: a.slice() });
          i++;
        }
      }
      [a[i], a[hi]] = [a[hi], a[i]];
      anim.push({ type: "swap", indices: [i, hi], array: a.slice() });
      sort(lo, i - 1);
      sort(i + 1, hi);
    };

    sort(0, a.length - 1);
    return anim;
  };

  const mergeSort = (arr) => {
  const anim = [];
  let a = arr.slice();

  const merge = (start, mid, end) => {
    const left = a.slice(start, mid + 1);
    const right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      anim.push({ type: "compare", indices: [start + i, mid + 1 + j] });
      if (left[i] <= right[j]) {
        a[k] = left[i++];
      } else {
        a[k] = right[j++];
      }
      anim.push({ type: "swap", array: a.slice() });
      k++;
    }

    while (i < left.length) {
      a[k++] = left[i++];
      anim.push({ type: "swap", array: a.slice() });
    }

    while (j < right.length) {
      a[k++] = right[j++];
      anim.push({ type: "swap", array: a.slice() });
    }
  };

  const divide = (start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    divide(start, mid);
    divide(mid + 1, end);
    merge(start, mid, end);
  };

  divide(0, a.length - 1);
  return anim;
};


  const linearSearch = (arr, target) => {
    const anim = [];
    for (let i = 0; i < arr.length; i++) {
      anim.push({ type: "highlight", indices: [i] });
      if (arr[i] === target) break;
    }
    return anim;
  };

  const binarySearch = (arr, target) => {
    const anim = [];
    let a = arr.slice().sort((x, y) => x - y);
    let left = 0, right = a.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      anim.push({ type: "highlight", indices: [mid] });
      if (a[mid] === target) break;
      else if (a[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return anim;
  };


const timeoutRef = useRef(null);
const currentIndexRef = useRef(0); 
const animate = (anim, idx) => {
  if (idx >= anim.length) {
    setPlaying(false);
    return;
  }

  currentIndexRef.current = idx; 

  const step = anim[idx];
  setHighlight(step.indices || []);
  if (step.array) setArray(step.array);

  timeoutRef.current = setTimeout(() => animate(anim, idx + 1), 1000);
};

const ANIM_DELAY = 400; 

const runGraphAnim = (anim, idx = 0) => {
  if (idx >= anim.length) {
    setPlaying(false);
    return;
  }

  const step = anim[idx];

  if (step.type === "visit") {
    // Mark node as visited (green)
    setHighlight(prev => (prev.includes(step.node) ? prev : [...prev, step.node]));

    // Highlight edges where both nodes are visited
    setHighlightEdges(prev => {
      const updated = prev.map(e => {
        if (
          highlight.includes(e.source) &&
          highlight.includes(e.target)
        ) {
          return { ...e, relaxed: true }; // edge visited
        }
        return e;
      });
      return updated;
    });
  }

  else if (step.type === "exploreEdge") {
    // Add new edge if not already highlighted
    setHighlightEdges(prev => {
      const exists = prev.some(
        e =>
          (e.source === step.source && e.target === step.target) ||
          (e.source === step.target && e.target === step.source)
      );
      if (exists) return prev;
      return [
        ...prev,
        {
          source: step.source,
          target: step.target,
          weight: step.weight,
          relaxed: false,
          path: false,
        },
      ];
    });
  }

  else if (step.type === "relax") {
    // Mark this edge as relaxed (better distance found)
    setHighlightEdges(prev =>
      prev.map(e =>
        (e.source === step.source && e.target === step.target) ||
        (e.source === step.target && e.target === step.source)
          ? { ...e, relaxed: true }
          : e
      )
    );
  }

  else if (step.type === "path") {
    // Highlight final shortest path (gold)
    setHighlightEdges(prev => {
      const newPrev = [...prev];
      for (const p of step.edges) {
        const foundIdx = newPrev.findIndex(
          e =>
            (e.source === p.source && e.target === p.target) ||
            (e.source === p.target && e.target === p.source)
        );
        if (foundIdx >= 0) {
          newPrev[foundIdx] = { ...newPrev[foundIdx], path: true };
        } else {
          newPrev.push({
            source: p.source,
            target: p.target,
            weight: null,
            relaxed: true,
            path: true,
          });
        }
      }
      return newPrev;
    });
  }

  timeoutRef.current = setTimeout(() => runGraphAnim(anim, idx + 1), ANIM_DELAY);
};


const handleVisualize = () => {
  setPlaying(true);
  setPaused(false);
  let anim = [];

  if (category === "Sorting") {
    if (algo === "Bubble Sort") anim = bubbleSort(array);
    else if (algo === "Selection Sort") anim = selectionSort(array);
    else if (algo === "Insertion Sort") anim = insertionSort(array);
    else if (algo === "Quick Sort") anim = quickSort(array);
    else if (algo === "Merge Sort") anim = mergeSort(array);
    animate(anim, 0);

  } else if (category === "Searching") {
    if (algo === "Linear Search") anim = linearSearch(array, Number(searchTarget));
    else if (algo === "Binary Search") anim = binarySearch(array, Number(searchTarget));
    animate(anim, 0);

  } else if (category === "Graph") {
    const graph = generateGraph();
    setGraphData(graph);
    setHighlight([]);
    setHighlightEdges([]);

    if (algo === "Breadth-First Search") anim = bfs(graph);
    else if (algo === "Depth-First Search") anim = dfs(graph);
    else anim = dijkstra(graph);
    runGraphAnim(anim, 0);
  }
};


const handlePauseResume = () => {
  if (paused) {
    
    setPaused(false);

    if (category === "Sorting" || category === "Searching") {
      animate(
        category === "Sorting"
          ? algo === "Bubble Sort"
            ? bubbleSort(array)
            : algo === "Selection Sort"
            ? selectionSort(array)
            : algo === "Insertion Sort"
            ? insertionSort(array)
            : quickSort(array)
          : category === "Searching"
          ? algo === "Linear Search"
            ? linearSearch(array, Number(searchTarget))
            : binarySearch(array, Number(searchTarget))
          : [],
        currentIndexRef.current
      );
    } else if (category === "Graph") {
      // Resume graph animation
      runGraphAnim(
        category === "Graph"
          ? algo === "Breadth-First Search"
            ? bfs(graphData)
            : algo === "Depth-First Search"
            ? dfs(graphData)
            : dijkstra(graphData)
          : [],
        currentIndexRef.current
      );
    }
  } else {
    // Pause
    setPaused(true);
    clearTimeout(timeoutRef.current);
  }
};



  const handleCustomArray = () => {
    const nums = customArray
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);
    if (nums.length > 0 && nums.length <= 20) {
      setArray(nums);
    }
  };



// Generate graph with more edges and weights
const generateGraph = (numNodes = 7) => {
  const nodes = Array.from({ length: numNodes }, (_, i) => ({ id: i }));
  const edges = [];

  // Connect in sequence
  for (let i = 0; i < numNodes - 1; i++) {
    edges.push({ source: i, target: i + 1, weight: Math.floor(Math.random() * 9) + 1 });
  }

  // Add extra random connections
  for (let i = 0; i < numNodes; i++) {
    const randTarget = Math.floor(Math.random() * numNodes);
    if (randTarget !== i && !edges.some(e =>
        (e.source === i && e.target === randTarget) ||
        (e.source === randTarget && e.target === i)
      )) {
      edges.push({ source: i, target: randTarget, weight: Math.floor(Math.random() * 9) + 1 });
    }
  }

  return { nodes, edges };
};

// BFS traversal for animation
const bfs = (graph) => {
  const { nodes, edges } = graph;

  // Build adjacency list
  const adj = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach((e) => {
    adj.get(e.source).push(e.target);
    adj.get(e.target).push(e.source); // undirected
  });

  const anim = [];
  const visited = new Set();
  const queue = [0];
  visited.add(0);

  const pushVisit = (node) => anim.push({ type: "visit", node });
  const pushExploreEdge = (u, v) => anim.push({ type: "exploreEdge", source: u, target: v });

  while (queue.length) {
    const u = queue.shift();
    pushVisit(u);

    for (const v of adj.get(u)) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        pushExploreEdge(u, v);
      } else {
        // still show explored edge for visualization
        pushExploreEdge(u, v);
      }
    }
  }

  return anim;
};

// DFS traversal for animation
const dfs = (graph) => {
  const { nodes, edges } = graph;

  // Build adjacency list
  const adj = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach((e) => {
    adj.get(e.source).push(e.target);
    adj.get(e.target).push(e.source); // undirected
  });

  const anim = [];
  const visited = new Set();

  const pushVisit = (node) => anim.push({ type: "visit", node });
  const pushExploreEdge = (u, v) => anim.push({ type: "exploreEdge", source: u, target: v });

  const dfsVisit = (u, parent = null) => {
    visited.add(u);
    pushVisit(u);

    for (const v of adj.get(u)) {
      if (!visited.has(v)) {
        pushExploreEdge(u, v); // show edge as explored
        dfsVisit(v, u);
      } else if (v !== parent) {
        // still show edge even if visited (for animation)
        pushExploreEdge(u, v);
      }
    }
  };

  dfsVisit(0);
  return anim;
};


const dijkstra = (graph, start = 0, target = null) => {
  const { nodes, edges } = graph;
  const n = nodes.length;

  // build adjacency list with weights
  const adj = Array.from({ length: n }, () => []);
  edges.forEach(e => {
    adj[e.source].push({ to: e.target, weight: e.weight ?? 1 });
    adj[e.target].push({ to: e.source, weight: e.weight ?? 1 }); 
  });

  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(null);
  const visited = new Set();

  dist[start] = 0;

  // steps to animate
  const anim = [];

  const pushVisit = (u) => anim.push({ type: "visit", node: u });
  const pushExploreEdge = (u, v, w) => anim.push({ type: "exploreEdge", source: u, target: v, weight: w });
  const pushRelax = (u, v, oldDist, newDist) => anim.push({ type: "relax", source: u, target: v, oldDist, newDist });
  const pushFinalPath = (pathEdges) => anim.push({ type: "path", edges: pathEdges });


  while (visited.size < n) {
    let u = -1;
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && dist[i] < best) {
        best = dist[i];
        u = i;
      }
    }
    if (u === -1 || best === Infinity) break; 
    visited.add(u);
    pushVisit(u);
    for (const { to: v, weight } of adj[u]) {
      pushExploreEdge(u, v, weight);
      if (visited.has(v)) {
        continue;
      }

      const alt = dist[u] + weight;
      if (alt < dist[v]) {
        const old = dist[v];
        dist[v] = alt;
        prev[v] = u;
        pushRelax(u, v, old, alt);
      }
    }
  }
  const end = (typeof target === "number") ? target : (n - 1);
  if (dist[end] < Infinity) {
    const path = [];
    let cur = end;
    while (prev[cur] !== null) {
      path.push({ source: prev[cur], target: cur });
      cur = prev[cur];
    }
    path.reverse();
    pushFinalPath(path);
  } else {
    pushFinalPath([]);
  }

  return anim;
};



  return (
    <section className="visualizer">
      <h2>Algorithm Visualizer</h2>
      <div className="visualizer-controls">
        <select value={category} onChange={handleCategoryChange} disabled={playing}>
          {Object.keys(algorithms).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={algo} onChange={handleAlgoChange} disabled={playing}>
          {algorithms[category].map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {category === "Searching" && (
          <input
            type="number"
            placeholder="Search target"
            value={searchTarget}
            onChange={e => setSearchTarget(e.target.value)}
            disabled={playing}
          />
        )}

        {category === "Graph" && (
          <input
            type="number"
            placeholder="Grid size (max 15)"
            value={gridSize}
            onChange={e => setGridSize(Math.min(15, Math.max(2, e.target.value)))}
            disabled={playing}
          />
        )}
        <input
          type="text"
          placeholder="Custom array (comma-separated)"
          value={customArray}
          onChange={(e) => setCustomArray(e.target.value)}
          disabled={playing}
        />
        <button onClick={handleCustomArray} disabled={playing}>Set Array</button>

        {!playing ? (
          <button onClick={handleVisualize}>Visualize</button>
        ) : (
          <button onClick={handlePauseResume}>{paused ? "Resume" : "Pause"}</button>
        )}
          <button onClick={() => { let newArr = getRandomArray();
              if (algo === "Binary Search") {
                  newArr.sort((a, b) => a - b);
                }
              setArray(newArr);
            }}
  disabled={playing}
            >
        Randomize
      </button>
      </div>
      {category === "Graph" ? (
          <GraphVisualizer
            nodes={graphData.nodes}
            edges={graphData.edges}
            highlight={highlight}
            highlightEdges={highlightEdges}
          />   ): (
        <div className="bars">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              className={`bar ${highlight.includes(idx) ? "bar-active" : ""}`}
              style={{ height: `${val * 2}px` }}
              animate={{ y: highlight.includes(idx) ? -10 : 0 }}
              transition={{ duration: 0.7 }}
            >
              <span>{val}</span>
            </motion.div>
          ))}
        </div>
      )}
      
<Code algo={algo} />
    </section>
    
  );
};

export default Visualizer;

