export function formatNum (n: number | string, digit = 2): string {
  const _digit = digit
  let num = '' + n
  if (digit > 5) return num
  while (digit-- > 0) num = '0' + num
  return num.substring(num.length - _digit)
}

export function formatDate (date: Date, format?: string): string {
  const year = date.getFullYear()
  const mon = formatNum((date.getMonth() + 1))
  const day = formatNum((date.getDay()))
  const h = formatNum((date.getHours()))
  const m = formatNum((date.getMinutes()))
  const s = formatNum((date.getSeconds()))

  if (format === undefined) return `${year}-${mon}-${day} ${h}:${m}:${s}`
  return `${year}-${mon}-${day} ${h}:${m}:${s}`
}