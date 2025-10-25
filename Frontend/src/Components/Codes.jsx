import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./codes.css";

const Code = ({ algo }) => {
  const [language, setLanguage] = useState("cpp");

const codeSnippets = {
  // Sorting Algorithms
  "Bubble Sort": {
    cpp: `
void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++)
    for (int j = 0; j < n-i-1; j++)
      if (arr[j] > arr[j+1])
        swap(arr[j], arr[j+1]);
}`,
    java: `
void bubbleSort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++)
    for (int j = 0; j < n-i-1; j++)
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
}`,
    python: `
def bubble_sort(arr):
  n = len(arr)
  for i in range(n-1):
    for j in range(n-i-1):
      if arr[j] > arr[j+1]:
        arr[j], arr[j+1] = arr[j+1], arr[j]
`
  },

  "Selection Sort": {
    cpp: `
void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    swap(arr[min_idx], arr[i]);
  }
}`,
    java: `
void selectionSort(int arr[]) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}`,
    python: `
def selection_sort(arr):
  n = len(arr)
  for i in range(n-1):
    min_idx = i
    for j in range(i+1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
`
  },

  "Insertion Sort": {
    cpp: `
void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    java: `
void insertionSort(int arr[]) {
  int n = arr.length;
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    python: `
def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key
`
  },

  "Quick Sort": {
    cpp: `
int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
    java: `
int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
    python: `
def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[len(arr)//2]
  left = [x for x in arr if x < pivot]
  middle = [x for x in arr if x == pivot]
  right = [x for x in arr if x > pivot]
  return quick_sort(left) + middle + quick_sort(right)
`
  },

  "Merge Sort": {
    cpp: `
void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j])
      arr[k++] = L[i++];
    else
      arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    java: `
void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}
`,
    python: `
def merge_sort(arr):
  if len(arr) > 1:
    mid = len(arr) // 2
    L = arr[:mid]
    R = arr[mid:]
    merge_sort(L)
    merge_sort(R)
    i = j = k = 0
    while i < len(L) and j < len(R):
      if L[i] < R[j]:
        arr[k] = L[i]
        i += 1
      else:
        arr[k] = R[j]
        j += 1
      k += 1
    while i < len(L):
      arr[k] = L[i]
      i += 1
      k += 1
    while j < len(R):
      arr[k] = R[j]
      j += 1
      k += 1
`
  },

  //Searching Algorithms
  "Linear Search": {
    cpp: `
int linearSearch(int arr[], int n, int x) {
  for (int i = 0; i < n; i++)
    if (arr[i] == x)
      return i;
  return -1;
}`,
    java: `
int linearSearch(int arr[], int x) {
  for (int i = 0; i < arr.length; i++)
    if (arr[i] == x)
      return i;
  return -1;
}`,
    python: `
def linear_search(arr, x):
  for i in range(len(arr)):
    if arr[i] == x:
      return i
  return -1
`
  },

  "Binary Search": {
    cpp: `
int binarySearch(int arr[], int l, int r, int x) {
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == x)
      return m;
    if (arr[m] < x)
      l = m + 1;
    else
      r = m - 1;
  }
  return -1;
}`,
    java: `
int binarySearch(int arr[], int x) {
  int l = 0, r = arr.length - 1;
  while (l <= r) {
    int m = l + (r - l) / 2;
    if (arr[m] == x)
      return m;
    if (arr[m] < x)
      l = m + 1;
    else
      r = m - 1;
  }
  return -1;
}`,
    python: `
def binary_search(arr, x):
  l, r = 0, len(arr) - 1
  while l <= r:
    m = (l + r) // 2
    if arr[m] == x:
      return m
    elif arr[m] < x:
      l = m + 1
    else:
      r = m - 1
  return -1
`
  },

  // Graph Algorithms
  "Depth-First Search": {
    cpp: `
void DFSUtil(int v, vector<bool>& visited, vector<int> adj[]) {
  visited[v] = true;
  cout << v << " ";
  for (int u : adj[v])
    if (!visited[u])
      DFSUtil(u, visited, adj);
}

void DFS(int V, vector<int> adj[], int start) {
  vector<bool> visited(V, false);
  DFSUtil(start, visited, adj);
}`,
    java: `
void DFSUtil(int v, boolean visited[], ArrayList<ArrayList<Integer>> adj) {
  visited[v] = true;
  System.out.print(v + " ");
  for (int u : adj.get(v))
    if (!visited[u])
      DFSUtil(u, visited, adj);
}

void DFS(int V, ArrayList<ArrayList<Integer>> adj, int start) {
  boolean visited[] = new boolean[V];
  DFSUtil(start, visited, adj);
}`,
    python: `
def dfs(graph, start, visited=None):
  if visited is None:
    visited = set()
  visited.add(start)
  print(start, end=" ")
  for neighbor in graph[start]:
    if neighbor not in visited:
      dfs(graph, neighbor, visited)
`
  },

  "Breadth-First Search": {
    cpp: `
void BFS(int V, vector<int> adj[], int start) {
  vector<bool> visited(V, false);
  queue<int> q;
  visited[start] = true;
  q.push(start);
  while (!q.empty()) {
    int node = q.front();
    q.pop();
    cout << node << " ";
    for (int neighbor : adj[node])
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        q.push(neighbor);
      }
  }
}`,
    java: `
void BFS(int V, ArrayList<ArrayList<Integer>> adj, int start) {
  boolean visited[] = new boolean[V];
  Queue<Integer> q = new LinkedList<>();
  visited[start] = true;
  q.add(start);
  while (!q.isEmpty()) {
    int node = q.poll();
    System.out.print(node + " ");
    for (int neighbor : adj.get(node))
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        q.add(neighbor);
      }
  }
}`,
    python: `
from collections import deque

def bfs(graph, start):
  visited = set()
  queue = deque([start])
  visited.add(start)
  while queue:
    node = queue.popleft()
    print(node, end=" ")
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append(neighbor)
`
  },

  "Dijkstra's Algorithm": {
    cpp: `
void dijkstra(int V, vector<vector<pair<int,int>>> adj, int src) {
  vector<int> dist(V, INT_MAX);
  dist[src] = 0;
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
  pq.push({0, src});
  while (!pq.empty()) {
    int u = pq.top().second;
    pq.pop();
    for (auto &edge : adj[u]) {
      int v = edge.first, weight = edge.second;
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push({dist[v], v});
      }
    }
  }
  for (int i = 0; i < V; i++)
    cout << i << " " << dist[i] << endl;
}`,
    java: `
void dijkstra(int V, ArrayList<ArrayList<Pair>> adj, int src) {
  int[] dist = new int[V];
  Arrays.fill(dist, Integer.MAX_VALUE);
  dist[src] = 0;
  PriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a.weight));
  pq.add(new Pair(src, 0));
  while (!pq.isEmpty()) {
    Pair p = pq.poll();
    int u = p.node;
    for (Pair edge : adj.get(u)) {
      int v = edge.node, weight = edge.weight;
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.add(new Pair(v, dist[v]));
      }
    }
  }
  for (int i = 0; i < V; i++)
    System.out.println(i + " " + dist[i]);
}`,
    python: `
import heapq

def dijkstra(graph, start):
  dist = {node: float('inf') for node in graph}
  dist[start] = 0
  pq = [(0, start)]
  while pq:
    (current_dist, node) = heapq.heappop(pq)
    if current_dist > dist[node]:
      continue
    for neighbor, weight in graph[node]:
      distance = current_dist + weight
      if distance < dist[neighbor]:
        dist[neighbor] = distance
        heapq.heappush(pq, (distance, neighbor))
  for node in dist:
    print(node, dist[node])
`
  }
};


  const code = codeSnippets[algo]?.[language] || "// Code not available";

  return (
    <motion.div
      className="algo-code-container"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="code-header">
        <h3>{algo}</h3>
        <div className="language-tabs">
          {["cpp", "java", "python"].map((lang) => (
            <button
              key={lang}
              className={language === lang ? "active" : ""}
              onClick={() => setLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="code-content">
        <AnimatePresence mode="wait">
          <motion.pre
            key={language}
            className="code-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <code>{code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Code;

