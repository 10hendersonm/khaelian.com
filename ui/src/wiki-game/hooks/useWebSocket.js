import React, { useState, useEffect } from 'react'

const useWebSocket = ({ url, connection, onMessage }) => {
  const [webSocketConnection, setWebSocketConnection] = useState(null)
  useEffect(() => {
    var ws
    if (connection) {
      ws = connection
    } else if (url) {
      ws = new WebSocket(url, [
        /* protocols */
      ])
    } else {
      // throw something?
      console.log('no url or connection')
    }
    setWebSocketConnection(ws)
    return () => {
      if (ws && url) ws.close()
    }
  }, [url, connection])

  const handleMessage = eventHandler => message => {
    var { data } = message
    try {
      data = JSON.parse(data)
    } catch (err) {}
    eventHandler(data)
  }

  useEffect(() => {
    if (onMessage && webSocketConnection) {
      const eventHandler = handleMessage(onMessage)
      webSocketConnection.addEventListener('message', eventHandler)
      return () => {
        webSocketConnection.removeEventListener('message', eventHandler)
      }
    }
  }, [webSocketConnection, onMessage])
  return webSocketConnection
}

export default useWebSocket
