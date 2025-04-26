import React, { useState, useEffect } from 'react';

// Constants for grid
const ROWS = 15;
const COLS = 15;
const WALL_PROBABILITY = 0.2;
const DELAY = 100;

// Node types
const NodeType = {
  EMPTY: 0,
  WALL: 1,
  START: 2,
  END: 3,
  VISITED: 4,
  PATH: 5
};

const AlgorithmVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: 1, col: 1 });
  const [endNode, setEndNode] = useState({ row: ROWS - 2, col: COLS - 2 });
  const [isRunning, setIsRunning] = useState(false);

  // Initialize grid
  const initializeGrid = () => {
    const newGrid = Array(ROWS).fill().map(() => Array(COLS).fill(NodeType.EMPTY));
    
    // Place walls randomly
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (Math.random() < WALL_PROBABILITY) {
          newGrid[row][col] = NodeType.WALL;
        }
      }
    }

    // Set start and end nodes
    newGrid[startNode.row][startNode.col] = NodeType.START;
    newGrid[endNode.row][endNode.col] = NodeType.END;
    
    setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  // Helper functions
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const isValid = (row, col) => {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
  };

  const getNeighbors = (row, col) => {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    return directions
      .map(([dr, dc]) => [row + dr, col + dc])
      .filter(([r, c]) => isValid(r, c) && grid[r][c] !== NodeType.WALL);
  };

  const manhattan = (row1, col1, row2, col2) => {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  };

  // Visualization helper
  const visualizeStep = async (visitedNodes, path) => {
    const newGrid = grid.map(row => [...row]);
    
    // Visualize visited nodes
    for (const [row, col] of visitedNodes) {
      if (newGrid[row][col] !== NodeType.START && newGrid[row][col] !== NodeType.END) {
        newGrid[row][col] = NodeType.VISITED;
      }
      await sleep(DELAY/4);
      setGrid([...newGrid]);
    }

    // Visualize path
    for (const [row, col] of path) {
      if (newGrid[row][col] !== NodeType.START && newGrid[row][col] !== NodeType.END) {
        newGrid[row][col] = NodeType.PATH;
      }
      await sleep(DELAY/4);
      setGrid([...newGrid]);
    }
  };

  // Algorithm implementations
  const bfs = async () => {
    const visited = new Set();
    const queue = [[startNode.row, startNode.col]];
    const parent = new Map();
    
    while (queue.length > 0) {
      const [row, col] = queue.shift();
      const key = `${row},${col}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      if (row === endNode.row && col === endNode.col) {
        const path = [];
        let current = [row, col];
        while (current) {
          path.unshift(current);
          current = parent.get(`${current[0]},${current[1]}`);
        }
        return [Array.from(visited).map(str => str.split(',').map(Number)), path];
      }
      
      for (const [nextRow, nextCol] of getNeighbors(row, col)) {
        const nextKey = `${nextRow},${nextCol}`;
        if (!visited.has(nextKey)) {
          queue.push([nextRow, nextCol]);
          parent.set(nextKey, [row, col]);
        }
      }
    }
    return [[], []];
  };

  const dfs = async () => {
    const visited = new Set();
    const stack = [[startNode.row, startNode.col]];
    const parent = new Map();
    
    while (stack.length > 0) {
      const [row, col] = stack.pop();
      const key = `${row},${col}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      if (row === endNode.row && col === endNode.col) {
        const path = [];
        let current = [row, col];
        while (current) {
          path.unshift(current);
          current = parent.get(`${current[0]},${current[1]}`);
        }
        return [Array.from(visited).map(str => str.split(',').map(Number)), path];
      }
      
      for (const [nextRow, nextCol] of getNeighbors(row, col)) {
        const nextKey = `${nextRow},${nextCol}`;
        if (!visited.has(nextKey)) {
          stack.push([nextRow, nextCol]);
          parent.set(nextKey, [row, col]);
        }
      }
    }
    return [[], []];
  };

  const dijkstra = async () => {
    const distances = new Map();
    const parent = new Map();
    const visited = new Set();
    const pq = [[0, startNode.row, startNode.col]];
    
    distances.set(`${startNode.row},${startNode.col}`, 0);
    
    while (pq.length > 0) {
      pq.sort((a, b) => b[0] - a[0]);
      const [dist, row, col] = pq.pop();
      const key = `${row},${col}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      if (row === endNode.row && col === endNode.col) {
        const path = [];
        let current = [row, col];
        while (current) {
          path.unshift(current);
          current = parent.get(`${current[0]},${current[1]}`);
        }
        return [Array.from(visited).map(str => str.split(',').map(Number)), path];
      }
      
      for (const [nextRow, nextCol] of getNeighbors(row, col)) {
        const nextKey = `${nextRow},${nextCol}`;
        const newDist = distances.get(key) + 1;
        
        if (!distances.has(nextKey) || newDist < distances.get(nextKey)) {
          distances.set(nextKey, newDist);
          parent.set(nextKey, [row, col]);
          pq.push([newDist, nextRow, nextCol]);
        }
      }
    }
    return [[], []];
  };

  const aStar = async () => {
    const gScore = new Map();
    const fScore = new Map();
    const parent = new Map();
    const visited = new Set();
    const pq = [[0, startNode.row, startNode.col]];
    
    gScore.set(`${startNode.row},${startNode.col}`, 0);
    fScore.set(`${startNode.row},${startNode.col}`, manhattan(startNode.row, startNode.col, endNode.row, endNode.col));
    
    while (pq.length > 0) {
      pq.sort((a, b) => b[0] - a[0]);
      const [_, row, col] = pq.pop();
      const key = `${row},${col}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      if (row === endNode.row && col === endNode.col) {
        const path = [];
        let current = [row, col];
        while (current) {
          path.unshift(current);
          current = parent.get(`${current[0]},${current[1]}`);
        }
        return [Array.from(visited).map(str => str.split(',').map(Number)), path];
      }
      
      for (const [nextRow, nextCol] of getNeighbors(row, col)) {
        const nextKey = `${nextRow},${nextCol}`;
        const tentativeGScore = gScore.get(key) + 1;
        
        if (!gScore.has(nextKey) || tentativeGScore < gScore.get(nextKey)) {
          parent.set(nextKey, [row, col]);
          gScore.set(nextKey, tentativeGScore);
          fScore.set(nextKey, tentativeGScore + manhattan(nextRow, nextCol, endNode.row, endNode.col));
          pq.push([fScore.get(nextKey), nextRow, nextCol]);
        }
      }
    }
    return [[], []];
  };

  const runAllAlgorithms = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const algorithms = [
      { name: 'BFS', func: bfs },
      { name: 'DFS', func: dfs },
      { name: 'Dijkstra', func: dijkstra },
      { name: 'A*', func: aStar }
    ];

    await Promise.all(algorithms.map(async (algo) => {
      const [visited, path] = await algo.func();
      await visualizeStep(visited, path);
    }));

    setIsRunning(false);
  };

  const getNodeColor = (type) => {
    switch (type) {
      case NodeType.WALL: return 'bg-gray-800';
      case NodeType.START: return 'bg-green-500';
      case NodeType.END: return 'bg-red-500';
      case NodeType.VISITED: return 'bg-blue-300';
      case NodeType.PATH: return 'bg-yellow-400';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Pathfinding Visualizer</h1>
          <div className="space-x-4">
            <button 
              onClick={initializeGrid}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isRunning}
            >
              Randomize Grid
            </button>
            <button 
              onClick={runAllAlgorithms}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-sm hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isRunning}
            >
              Start Visualization
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-8">
          {['BFS', 'DFS', 'Dijkstra', 'A*'].map((algorithm) => (
            <div key={algorithm} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{algorithm}</h2>
              <div className="grid grid-cols-15 gap-1 w-full aspect-square">
                {grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div
                      key={`${algorithm}-${rowIndex}-${colIndex}`}
                      className={`aspect-square ${getNodeColor(cell)} rounded-sm border border-gray-200 transition-colors duration-200`}
                    />
                  ))
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
          <div className="flex space-x-6">
            {[
              { type: NodeType.START, label: 'Start' },
              { type: NodeType.END, label: 'End' },
              { type: NodeType.WALL, label: 'Wall' },
              { type: NodeType.VISITED, label: 'Visited' },
              { type: NodeType.PATH, label: 'Path' },
            ].map(({ type, label }) => (
              <div key={label} className="flex items-center space-x-2">
                <div className={`w-6 h-6 ${getNodeColor(type)} rounded-sm border border-gray-200`} />
                <span className="text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;