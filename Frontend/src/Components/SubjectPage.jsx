import { useParams, useNavigate } from "react-router-dom";
import "./subject.css";

const SubjectPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const content = subjectContent[name];

  if (!content) return <p>Content not found.</p>;

  return (
    <div className="subject-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>
      <h2>{content.title}</h2>
      <p>{content.description}</p>

      <h3>📚 Important Topics</h3>
      <ul className="topic-list">
        {content.topics.map((topic, idx) => (
          <li key={idx}>
            <a href={topic.url} target="_blank" rel="noopener noreferrer">{topic.heading}</a>
            </li>
        ))}
      </ul>
      <h3>Notes</h3>
       <ul className="topic-list">
        {content.notes.map((topic, idx) => (
          <li key={idx}>{topic}</li>
        ))}
      </ul>

      <h3>🔗 Recommended Resources</h3>
      <ul>
        {content.resources.map((res, idx) => (
          <li key={idx}>
            <a href={res.url} target="_blank" rel="noopener noreferrer">{res.label}</a>
          </li>
        ))}
      </ul>

      <h3>🎥 YouTube Playlist</h3>
      <ul className="playlist">
        {content.playlist.map((vid, idx) => (
          <li key={idx}>
            <a href={vid.url} target="_blank" rel="noopener noreferrer">{vid.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const subjectContent = {
  "design-algorithm-and-structure": {
    title: "Design Algorithm and Structure",
    description: "Core algorithms & data structures used in competitive programming and interviews: arrays, trees, graphs, DP, greedy, etc." ,
    topics: [
       {
    heading: "Time & Space Complexity",
    url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/"
  },
  {
    heading: "Arrays & Strings",
    url: "https://www.geeksforgeeks.org/array-data-structure/"
  },
  {
    heading: "Sorting Algorithms",
    url: "https://www.geeksforgeeks.org/sorting-algorithms/"
  },
  {
    heading: "Searching Techniques",
    url: "https://www.geeksforgeeks.org/searching-algorithms/"
  },
  {
    heading: "Divide & Conquer",
    url: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm-technique/"
  },
  {
    heading: "Greedy Algorithms",
    url: "https://www.geeksforgeeks.org/greedy-algorithms/"
  },
  {
    heading: "Linked Lists",
    url: "https://www.geeksforgeeks.org/data-structures/linked-list/"
  },
  {
    heading: "Stacks & Queues",
    url: "https://www.geeksforgeeks.org/stack-data-structure/"
  },
  {
    heading: "Recursion",
    url: "https://www.geeksforgeeks.org/recursion/"
  },
  {
    heading: "Trees & Binary Trees",
    url: "https://www.geeksforgeeks.org/binary-tree-data-structure/"
  },
  {
    heading: "Graphs (BFS/DFS)",
    url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"
  },
  {
    heading: "Backtracking",
    url: "https://www.geeksforgeeks.org/backtracking-algorithms/"
  },
  {
    heading: "Dynamic Programming",
    url: "https://www.geeksforgeeks.org/dynamic-programming/"
  }
    ],
    
    notes: [
      "Start with basic array/string problems. Move to recursion and backtracking.",
      "For DP, practice memoization -> tabulation -> optimisation patterns.",
      "Graph practice: shortest path, MST, topological sort, connected components."
    ],
    resources: [
      { label: "Leetcode", url: "https://leetcode.com" },
      { label: "GFG DSA Sheet", url: "https://www.geeksforgeeks.org/sde-sheet/" },
      { label: "Big O Cheat Sheet", url: "https://www.bigocheatsheet.com/" }
    ],
    playlist: [
      { title: "CodeHelp DSA Series", url: "https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA" },
      { title: "Striver’s A2Z DSA", url: "https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&si=2EuGFwarEdZyD1WR" }
    ]
  },
  "operating-systems": {
    title: "Operating Systems",
    description: "Dive into OS concepts like processes, memory management, scheduling, and file systems.",
    topics: [
      {
    heading: "Processes & Threads",
    url: "https://www.geeksforgeeks.org/difference-between-process-and-thread/"
  },
  {
    heading: "CPU Scheduling (RR, SJF, Priority)",
    url: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/"
  },
  {
    heading: "Synchronization (mutex, semaphores)",
    url: "https://www.geeksforgeeks.org/process-synchronization-in-operating-system/"
  },
  {
    heading: "Deadlock (detection & prevention)",
    url: "https://www.geeksforgeeks.org/deadlock-in-operating-system/"
  },
  {
    heading: "Memory Management (paging, segmentation)",
    url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/"
  },
  {
    heading: "Virtual Memory & Caching",
    url: "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/"
  },
  {
    heading: "File Systems",
    url: "https://www.geeksforgeeks.org/file-system-in-operating-system/"
  }
    ],
    notes: [
      "Understand process lifecycle and difference between processes and threads.",
      "Practice scheduling examples — compute waiting/turnaround time.",
      "Deadlock: Coffman conditions, resource allocation graphs."
    ],
    resources: [
      { label: "OSTEP Book", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
      { label: "GFG OS", url: "https://www.geeksforgeeks.org/operating-systems/" }
    ],
    playlist: [
      { title: "OS Placement Course - Code Help", url: "https://youtube.com/playlist?list=PLDzeHZWIZsTr3nwuTegHLa2qlI81QweYG&si=B738y9GyjzT41kHg" },
      { title: "OS by Neso Academy", url: "https://youtube.com/playlist?list=PLBlnK6fEyqRgLLlzdgiTUKULKYZs0dgZ9" }
    ]
  },
  "database-management-system": {
    title: "Database Management System",
    description: "Understand normalization, SQL, transactions, indexing, Relational databases, ACID & transactions, and query optimisation.",
    topics: [
      {
    heading: "Relational Models & ER Diagrams",
    url: "https://www.geeksforgeeks.org/er-model/"
  },
  {
    heading: "SQL (SELECT, JOINs, GROUP BY)",
    url: "https://www.geeksforgeeks.org/sql-tutorial/"
  },
  {
    heading: "Normalization (1NF, 2NF, 3NF)",
    url: "https://www.geeksforgeeks.org/normalization-in-dbms/"
  },
  {
    heading: "Transactions & ACID properties",
    url: "https://www.geeksforgeeks.org/transactions-in-dbms/"
  },
  {
    heading: "Indexing & Query Optimization",
    url: "https://www.geeksforgeeks.org/indexing-in-databases-set-1-introduction/"
  },
  {
    heading: "NoSQL vs SQL",
    url: "https://www.geeksforgeeks.org/difference-between-sql-and-nosql/"
  }
    ],
    notes: [
      "Master SQL JOINs (inner, left, right, full) and GROUP BY with HAVING.",
      "Transactions: isolation levels and common anomalies.",
      "Learn practical indexing strategies and explain plans."
    ],
    resources: [
      { label: "SQLZOO", url: "https://sqlzoo.net" },
      { label: "GFG DBMS", url: "https://www.geeksforgeeks.org/dbms/" }
    ],
    playlist: [
      { title: "Placement course DBMS by Code Help", url: "https://youtube.com/playlist?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU&si=RNoVhKZ72mdAo7uL" },
      { title: "DBMS by Gate Smashers", url: "https://youtube.com/playlist?list=PLmXKhU9FNesQnNEjRelWdkYbYk6qGtF8h" }
    ]
  },
  "computer-networks": {
    title: "Computer Networks",
    description: "Explore networking fundamentals including OSI/TCP-IP models, routing, switching, protocols (TCP/UDP/HTTP), DNS and network security.",
    topics: [
      {
    heading: "OSI & TCP/IP Models",
    url: "https://www.geeksforgeeks.org/layers-of-osi-model/"
  },
  {
    heading: "IP Addressing & Subnetting",
    url: "https://www.geeksforgeeks.org/ip-addressing-and-subnetting/"
  },
  {
    heading: "Routing & Switching",
    url: "https://www.geeksforgeeks.org/difference-between-routing-and-switching/"
  },
  {
    heading: "Transport Layer (TCP/UDP)",
    url: "https://www.geeksforgeeks.org/tcp-vs-udp/"
  },
  {
    heading: "Application Layer (HTTP, DNS)",
    url: "https://www.geeksforgeeks.org/application-layer-in-networking/"
  },
  {
    heading: "Network Security basics",
    url: "https://www.geeksforgeeks.org/network-security/"
  }
    ],
     notes: [
      "Practice subnetting exercises regularly.",
      "Understand TCP handshake, retransmission and congestion control.",
      "Familiarize with common protocols and packet flow."
    ],
    resources: [
      { label: "CS50 Networks", url: "https://cs50.harvard.edu/networks/" },
      { label: "GFG CN", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" }
    ],
    playlist: [
      { title: "CN by Neso Academy", url: "https://youtube.com/playlist?list=PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS" }
    ]
  },
  "system-design": {
    title: "System Design",
    description: "Build scalable systems by learning architecture patterns, databases, caching, and load balancing.",
    topics: [
     {
    heading: "Scalability & Performance",
    url: "https://www.geeksforgeeks.org/scalability-in-software-engineering/"
  },
  {
    heading: "Load Balancers & Proxies",
    url: "https://www.geeksforgeeks.org/load-balancing-in-computer-networks/"
  },
  {
    heading: "Database Sharding & Partitioning",
    url: "https://www.geeksforgeeks.org/sharding-in-database/"
  },
  {
    heading: "Caching (LRU, Redis)",
    url: "https://www.geeksforgeeks.org/caching-in-computer-architecture/"
  },
  {
    heading: "Message Queues & Event-driven",
    url: "https://www.geeksforgeeks.org/message-queuing/"
  },
  {
    heading: "CAP Theorem & Consistency Models",
    url: "https://www.geeksforgeeks.org/cap-theorem/"
  }
    ],
    notes: [
      "Start with requirements, capacity estimation, then design components and data flow.",
      "Sketch trade-offs: consistency vs availability, latency vs throughput."
    ],
    resources: [
      { label: "ByteByteGo", url: "https://www.youtube.com/c/ByteByteGo" },
      { label: "GFG SD", url: "https://www.geeksforgeeks.org/system-design-tutorial/" }
    ],
    playlist: [
      { title: "System Design - Coder Army", url: "https://youtube.com/playlist?list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT&si=IRlRUcHQw8qCKN4p" },
      { title: "System Design by Gaurav Sen", url: "https://youtube.com/playlist?list=PLMCXHnjXnTnto1N4D-Q-TF3r3t2Dg7r2P" }
    ]
  }
};

export default SubjectPage;
