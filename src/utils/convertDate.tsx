export const convertDate = (date:Date) => {
    const day = String(date).substring(8, 10)
    const month = String(date).substring(5, 7)
    const year = String(date).substring(0, 4)
    return `${day}/${month}/${year}`
}
