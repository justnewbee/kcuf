export default function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
