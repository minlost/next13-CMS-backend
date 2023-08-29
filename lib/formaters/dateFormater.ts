export function formatDateToDDMMYY(dateToFormat: Date | string) {
  if (typeof dateToFormat === "string") {
    dateToFormat = new Date(dateToFormat)
  }
  const dateString = dateToFormat.toISOString()
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear().toString().substr(-2)

  return `${day}/${month}/${year}`
}
