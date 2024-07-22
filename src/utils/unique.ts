export function unique(arr: any[]) {
    var newArr: any[] = []
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
export default unique

export const _uniqueLast = (arr: any) => {
    const arrId = arr?.map((item: any) => item.id)
    const resultId = unique(arrId)
    const result = resultId.map((id: number) => {
        const last = arr?.filter((item: any) => item.id === id)
        return {
            id: id,
            ...last[last.length - 1]
        }
    })
    return result
}
export const _unique = (arr: any) => {
    const arrId = arr?.map((item: any) => item.id)
    const resultId = unique(arrId)
    const result = resultId.map((id: number) => {
        return {
            id: id,
            ...arr?.find((item: any) => item.id === id)
        }
    })
    return result
}
//@ts-ignore
export const uniqueArray = (a: any) => [...new Set(a.map((o: any) => JSON.stringify(o)))].map((s: any) => JSON.parse(s))