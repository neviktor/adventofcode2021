const input = `1,1,3,5,1,3,2,1,5,3,1,4,4,4,1,1,1,3,1,4,3,1,2,2,2,4,1,1,5,5,4,3,1,1,1,1,1,1,3,4,1,2,2,5,1,3,5,1,3,2,5,2,2,4,1,1,1,4,3,3,3,1,1,1,1,3,1,3,3,4,4,1,1,5,4,2,2,5,4,5,2,5,1,4,2,1,5,5,5,4,3,1,1,4,1,1,3,1,3,4,1,1,2,4,2,1,1,2,3,1,1,1,4,1,3,5,5,5,5,1,2,2,1,3,1,2,5,1,4,4,5,5,4,1,1,3,3,1,5,1,1,4,1,3,3,2,4,2,4,1,5,5,1,2,5,1,5,4,3,1,1,1,5,4,1,1,4,1,2,3,1,3,5,1,1,1,2,4,5,5,5,4,1,4,1,4,1,1,1,1,1,5,2,1,1,1,1,2,3,1,4,5,5,2,4,1,5,1,3,1,4,1,1,1,4,2,3,2,3,1,5,2,1,1,4,2,1,1,5,1,4,1,1,5,5,4,3,5,1,4,3,4,4,5,1,1,1,2,1,1,2,1,1,3,2,4,5,3,5,1,2,2,2,5,1,2,5,3,5,1,1,4,5,2,1,4,1,5,2,1,1,2,5,4,1,3,5,3,1,1,3,1,4,4,2,2,4,3,1,1`

let arr = input.split(',').map(el => +el)

let arrSorted = arr.reduce((acc, cur) => {
    const index = acc.findIndex(el => el.val === cur)
    if (index === -1) {
      acc.push({
        val: cur,
        count: 1
      })
      return acc
    }
    acc[index] = {
      ...acc[index],
      count: ++acc[index].count
    }
    return acc
  }, [])

for (let i = 1; i <= 256; i++) {
  arrSorted = arrSorted.map(el => ({
    val: el.val - 1,
    count: el.count
  }))
  const index = arrSorted.findIndex(el => el.val === -1)
  if (index === -1) {
    continue
  }
  const targetIndex = arrSorted.findIndex(el => el.val === 6)
  if (targetIndex === -1) {
    arrSorted.push({
      val: 6,
      count: arrSorted[index].count
    })
  } else {
    arrSorted[targetIndex] = {
      ...arrSorted[targetIndex],
      count: arrSorted[targetIndex].count + arrSorted[index].count
    }
  }
  arrSorted.push({
    val: 8,
    count: arrSorted[index].count
  })
  arrSorted.splice(index, 1)
}

console.log(arrSorted, arrSorted.reduce((acc, cur) => acc + cur.count, 0))

