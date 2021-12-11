const fs = require('fs')

const input = fs.readFileSync('./input').toString().split('\n').map(line => line.split('').map(el => parseInt(el)))

const add = (arr, i, j) => {
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[i].length || arr[i][j] === null) {
        return arr
    }
    const arrCopy = [...arr]
    arrCopy[i][j]++
    return arrCopy
}

const flash = (arr, i = 0, j = 0, count = 0) => {
    if (i >= arr.length) {
        if (arr.some(line => line.some(el => el >= 10))) {
            return flash(arr, 0, 0, count)
        }
        return [arr, count]
    }
    if (j >= arr[i].length) {
        return flash(arr, i + 1, 0, count)
    }
    if (arr[i][j] >= 10) {
        arr[i][j] = null
        const newArr = add(add(add(add(add(add(add(add(arr, i - 1, j - 1), i - 1, j), i - 1, j + 1), i, j - 1), i, j + 1), i + 1, j - 1), i + 1, j), i + 1, j + 1)
        return flash(newArr, i, j + 1, count + 1)
    }
    return flash(arr, i, j + 1, count)
}

const manyflashes = (arr, flashFunc, repeats = 1, count = 0) => {
    if (repeats === 0) {
        return [arr, count]
    }
    const [newArr, newCount] = flashFunc(arr.map(line => line.map(el => el === null ? 1 : el + 1)))
    return manyflashes(newArr, flashFunc, repeats - 1, count + newCount)
}

const countSync = (arr, flashFunc, count = 0) => {
    if (arr.every(line => line.every(el => el === null))) {
        return count
    }
    const [newArr, newCount] = flashFunc(arr.map(line => line.map(el => el === null ? 1 : el + 1)))
    return countSync(newArr, flashFunc, count + 1)
}

const [res, count] = manyflashes(input, flash, 100)
console.log(res.map(line => line.map(el => el === null ? 0 : el).join('')).join('\n'), count)

console.log(countSync(input, flash))
