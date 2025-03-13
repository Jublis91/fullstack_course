import { useEffect } from "react"

const Notification = ({ message, type, onClose }) => {
  if (!message) return null

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification
