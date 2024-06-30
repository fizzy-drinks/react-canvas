import ReactReconciler from "react-reconciler"
import { DefaultEventPriority } from "react-reconciler/constants"

const treeReconciler = ReactReconciler({
    supportsMutation: true,
    isPrimaryRenderer: true,
    createInstance(type, { children, ...props}: Record<string, unknown>, container, context, handle) {
      const li = document.createElement('li')
      li.textContent = `${type}(${Object.entries(props).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')})`
      
      const ul = document.createElement('ul')
      li.appendChild(ul)
      
      return li
    },
    appendChildToContainer(container, child) {
      container.appendChild(child)
    },
    getCurrentEventPriority() {
      return DefaultEventPriority
    },
    supportsPersistence: false,
    createTextInstance: function (text: string, rootContainer: unknown, hostContext: unknown, internalHandle: any): unknown {
      const li = document.createElement('li')
      li.textContent = `"${text}"`
      return li
    },
    appendInitialChild: function (parentInstance: unknown, child: unknown): void {
      parentInstance.querySelector('ul').appendChild(child)
    },
    appendChild(parentInstance, child) {
      parentInstance.querySelector('ul').appendChild(child)
    },
    createContainerChildSet(container) {
    },
    removeChildFromContainer(container, child) {
      container.text = container.text.filter(content => content !== child.text)
    },
    finalizeInitialChildren: function (instance: unknown, type: unknown, props: unknown, rootContainer: unknown, hostContext: unknown): boolean {
      return false
    },
    prepareUpdate: function (instance: unknown, type: unknown, oldProps: unknown, newProps: unknown, rootContainer: unknown, hostContext: unknown): unknown {
      throw new Error('Function not implemented.')
    },
    shouldSetTextContent: function (type: unknown, props: unknown): boolean {
      return false
    },
    getRootHostContext: function (_rootContainer: unknown): unknown {
      return null
    },
    getChildHostContext: function (parentHostContext: unknown, type: unknown, rootContainer: unknown): unknown {
      return parentHostContext
    },
    getPublicInstance: function (instance: unknown): unknown {
      return instance
    },
    prepareForCommit: function (containerInfo: unknown): Record<string, any> | null {
      return null
    },
    resetAfterCommit: function (containerInfo: unknown): void {
    },
    preparePortalMount: function (containerInfo: unknown): void {
      throw new Error('Function not implemented.')
    },
    scheduleTimeout: function (fn: (...args: unknown[]) => unknown, delay?: number | undefined): unknown {
      throw new Error('Function not implemented.')
    },
    cancelTimeout: function (id: unknown): void {
      throw new Error('Function not implemented.')
    },
    noTimeout: undefined,
    getInstanceFromNode: function (node: any): ReactReconciler.Fiber | null | undefined {
      throw new Error('Function not implemented.')
    },
    beforeActiveInstanceBlur: function (): void {
      throw new Error('Function not implemented.')
    },
    afterActiveInstanceBlur: function (): void {
      throw new Error('Function not implemented.')
    },
    prepareScopeUpdate: function (scopeInstance: any, instance: any): void {
      throw new Error('Function not implemented.')
    },
    getInstanceFromScope: function (scopeInstance) {
      return scopeInstance
    },
    detachDeletedInstance: function (node: unknown): void {
    },
    clearContainer() {},
    supportsHydration: false
  })

  export default treeReconciler