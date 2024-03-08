import { getData, saveData } from "../database/connection.js"

const listCustomers = async (req, res) => {
    const data = await getData();
    res.status(200).json(data);
}

const createCustomers = (req, res) => {
    const customer = req.body;
    saveData(customer);
    res.status(201);
}

const routesToCustomers = async (req, res) => {
    const data = await getData();

    const points = data.map(customer => {
        return {name: customer.name, x: customer.x, y: customer.y}
    })

    points.unshift({ name: "empresa", x: 0, y: 0 })

    console.log(points)
    const start = 0;
    const { minDistance, minPath, pathOrder } = shortestRoundTrip(points, start);

    console.log('Menor distância de ida e volta:', minDistance);
    console.log('Ordem dos pontos (com coordenadas):', pathOrder);
    res.send(minPath);
}

function calculateDistance(point1, point2) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function shortestRoundTrip(points, start) {
    const visited = new Array(points.length).fill(false);
    let minDistance = Infinity;
    let minPath = null;
    let pathOrder = [];

    function dfs(node, depth, distance, order) {
        if (depth === points.length && node === start) {
            if (distance < minDistance) {
                minDistance = distance;
                minPath = order.map(pointName => {
                    const point = points.find(p => p.name === pointName);
                    return { name: pointName, x: point.x, y: point.y };
                });
                pathOrder = order.map(pointName => {
                    const point = points.find(p => p.name === pointName);
                    return { name: pointName, x: point.x, y: point.y };
                });
            }
            return;
        }

        for (let i = 0; i < points.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                order.push(points[i].name);
                dfs(i, depth + 1, depth === 0 ? 0 : distance + calculateDistance(points[node], points[i]), order);
                visited[i] = false;
                order.pop();
            }
        }
    }

    dfs(start, 0, 0, [points[start].name]);

    return { minDistance, minPath, pathOrder };
}

export { listCustomers, createCustomers, routesToCustomers };
