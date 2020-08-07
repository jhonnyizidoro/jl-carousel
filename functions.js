const isElement = element => element instanceof Element || element instanceof HTMLDocument || window.self === element
const isNodeList = nodeList => nodeList instanceof NodeList && nodeList.length > 0
const isArray = array => array instanceof Array && array.length > 0

const on = (eventListeners, elements, callback, passive = true) => {
	let events = eventListeners
	if (typeof events === 'string') {
		events = [events]
	}
	events.forEach(eventName => {
		if (isNodeList(elements) || isArray(elements)) {
			elements.forEach(element => {
				element.addEventListener(eventName, event => callback(element, event), { passive })
			})
		} else if (isElement(elements)) {
			elements.addEventListener(eventName, event => callback(event), { passive })
		}
	})
}