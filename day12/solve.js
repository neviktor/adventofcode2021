const fs = require('fs')
const input = fs.readFileSync('./input').toString().split('\n').map(el => el.split('-'))

const getConnected = (arr, from) => {
    const connected = arr.filter(el => el.includes(from))
    return connected.map(el => el.indexOf(from) === 0 ? el[1] : el[0])
}
const checkUp = (str) => str.toUpperCase() === str

const getPaths = (arr,caves, pos = 'start', path = ['start'], paths = []) => {
    if (pos === 'end') {
        // if (caves.every(cave => path.includes(cave))) {
        //     return paths
        // }
        return [...paths, path]
    }
    const connected = getConnected(arr, pos)
    // const toVisit = connected.filter(el => checkUp(el) || !path.includes(el))
    const toVisit = connected.filter(el => {
        if (checkUp(el)) {
            return true
        }
        const elRepeats = path.filter(cave => cave === el)
        if (elRepeats.length === 0) {
            return true
        }
        const pathWithoutUp = path.filter(el => !checkUp(el))
        const anyRepeats = pathWithoutUp.some(item =>(pathWithoutUp.filter(cave => cave === item).length === 2))
        if (elRepeats.length === 1 && !anyRepeats && el != 'start' && el != 'end') {
            return true
        }
        return false
    })
    if (toVisit.length === 0) {
        return paths
    }
    const newPaths = toVisit.map(newPos => getPaths(arr, caves, newPos, [...path, newPos], paths))
    return newPaths.reduce((acc, cur) => [...acc, ...cur])
}

const smallCaves = input.flat().reduce((acc, cur) => {
    if (checkUp(cur) || acc.includes(cur)|| cur === 'start' || cur === 'end') {
        return acc
    }
    return [...acc, cur]
}, [])

const paths = getPaths(input, smallCaves)

console.log(paths.length, paths[0].join('-'))