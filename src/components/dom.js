export const
  div = (className, children) => {
    const node = document.createElement('div')
    if (className) node.setAttribute('class', className)
    if (children) {
      if (!Array.isArray(children)) node.append(children)
      else children.forEach(child => node.append(child))
    }

    return node
  }