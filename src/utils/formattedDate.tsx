const formattedDate = (timestamp: any) => {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
  )
  const formattedDate = date.toLocaleString('ko-kr', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return formattedDate
}

export default formattedDate
