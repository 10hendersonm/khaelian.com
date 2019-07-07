import React from 'react'

import { Link } from 'react-router-dom'

const OptionalLink = ({ disabled, children, ...props }) => {
  if (disabled) return children
  return <Link {...props}>{children}</Link>
}

export default OptionalLink
