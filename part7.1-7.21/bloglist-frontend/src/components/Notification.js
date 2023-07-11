const Notification = ({ message, color }) => {
  const notificationStyle =
    color === 'red'
      ? 'text-white text-center h-12 bg-red-500 w-3/5 ml-auto mr-auto'
      : 'text-white text-center h-12 bg-green-500 w-3/5 ml-auto mr-auto'

  if (message === null) {
    return null
  }

  return <div className={notificationStyle}>{message}</div>
}
export default Notification
