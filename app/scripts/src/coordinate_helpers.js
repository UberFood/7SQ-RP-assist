// Return top-left of two coords
export function top_left_coord(c1, c2) {
  return {
    x: Math.min(c1.x, c2.x),
    y: Math.min(c1.y, c2.y),
  };
}

// Return bottom-right of two coords
export function bottom_right_coord(c1, c2) {
  return {
    x: Math.max(c1.x, c2.x),
    y: Math.max(c1.y, c2.y),
  };
}

// Convert coord → index
export function coord_to_index(coord, size) {
  return coord.x * size + coord.y;
}

// Convert index → {x, y}
export function index_to_coordinates(index, size) {
  return {
    x: Math.floor(index / size),
    y: index % size,
  };
}

// Euclidean distance between two indices
export function findDistance(index1, index2, size) {
  const { x: x1, y: y1 } = index_to_coordinates(index1, size);
  const { x: x2, y: y2 } = index_to_coordinates(index2, size);

  return Math.hypot(x1 - x2, y1 - y2);
}

// Check if index2 is within range of index1
export function isInRange(index1, index2, range, size) {
  const { x: x1, y: y1 } = index_to_coordinates(index1, size);
  const { x: x2, y: y2 } = index_to_coordinates(index2, size);

  const distSq = (x1 - x2) ** 2 + (y1 - y2) ** 2;
  return distSq <= range * range;
}

// Return all indices within radius
export function index_in_radius(index, range, size) {
  const { x, y } = index_to_coordinates(index, size);
  const result = [];

  for (let dx = Math.floor(-range); dx <= Math.ceil(range); dx++) {
    for (let dy = Math.floor(-range); dy <= Math.ceil(range); dy++) {
      const cx = x + dx;
      const cy = y + dy;

      if (cx >= 0 && cx < size && cy >= 0 && cy < size) {
        const candIndex = coord_to_index({ x: cx, y: cy }, size);

        if (isInRange(index, candIndex, range, size)) {
          result.push(candIndex);
        }
      }
    }
  }
  return result;
}

// Create line coefficients from 2 points
export function line_from_endpoints(p1, p2) {
  const a = -(p1.y - p2.y);
  const b = p1.x - p2.x;
  const c = -(a * p2.x + b * p2.y);

  return { a, b, c };
}

// Distance from testpoint to line through endpoint1–endpoint2
export function distance_to_line(endpoint1, endpoint2, size, pointIndex) {
  const p1 = index_to_coordinates(endpoint1, size);
  const p2 = index_to_coordinates(endpoint2, size);
  const pt = index_to_coordinates(pointIndex, size);

  const line = line_from_endpoints(p1, p2);
  const { a, b, c } = line;

  return Math.abs(a * pt.x + b * pt.y + c) / Math.sqrt(a * a + b * b);
}

// Return indices roughly on a line between endpoints
export function cells_on_line(endpoint1, endpoint2, size) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size)
  var endpoint2_coord = index_to_coordinates(endpoint2, size)
  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord)

  var scale = Math.max(Math.abs(line.a), Math.abs(line.b))
  // need to be reversed! remember line.a = delta y
  var x_step = line.b/scale
  var y_step = -1*line.a/scale
  var current_point = endpoint2_coord

  var safety_iter = 0
  var candidate_cells = []
  while (Math.abs(current_point.x - endpoint1_coord.x) > 0.5 || Math.abs(current_point.y - endpoint1_coord.y) > 0.5) {
    current_point.x += x_step
    current_point.y += y_step

    var ceil = {}
    ceil.x = Math.ceil(current_point.x)
    ceil.y = Math.ceil(current_point.y)
    var ceil_index = coord_to_index(ceil, size)

    var floor = {}
    floor.x = Math.floor(current_point.x)
    floor.y = Math.floor(current_point.y)
    var floor_index = coord_to_index(floor, size)


    candidate_cells.push(ceil_index)
    if (ceil_index != floor_index) {
      candidate_cells.push(floor_index)
    }

    safety_iter = safety_iter + 1
    if (safety_iter > 50) {
      break;
    }
  }
  return candidate_cells
}
