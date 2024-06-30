import React, { ReactNode } from 'react'
// import App from './App.tsx'
// import './index.css'
import ReactReconciler from 'react-reconciler'
import { DefaultEventPriority } from 'react-reconciler/constants'
import { ReactCanvas } from './react-canvas'
import treeReconciler from './reconcilers/treeReconciler'

type ReactCanvasScreen = {
  canvas: HTMLCanvasElement,
  children: ReactCanvas.Node[],
}

const screenReconciler = ReactReconciler({
  supportsMutation: true,
  isPrimaryRenderer: true,
  createInstance(type: string, props: ReactCanvas.NodeProps, container: ReactCanvasScreen, context, handle): ReactCanvas.Node {
    return { type, ...props, children: [], computedRenderProperties: { x: 0, y: 0, w: 0, h: 0, color: 'white' } }
  },
  appendChildToContainer(container: ReactCanvasScreen, node: ReactCanvas.Node) {
    container.children.push(node)

    const ctx = container.canvas.getContext('2d')!;

    const iterateChild = (parent: ReactCanvas.Node | null) => (child: ReactCanvas.Node) => {
      if (!child.renderProperties) return
      
      child.computedRenderProperties = {
        x: (parent?.computedRenderProperties.x ?? 0) + child.renderProperties.x,
        y: (parent?.computedRenderProperties.y ?? 0) + child.renderProperties.y,
        w: child.renderProperties.w,
        h: child.renderProperties.h,
        color: child.renderProperties.color
      }
      const { x, y, w, h, color } = child.computedRenderProperties
      
      console.log(child.computedRenderProperties)
      ctx.fillStyle = color
      ctx.fillRect(x, y, w, h)

      if (!child.children?.length) {
        return
      }

      child.children.forEach(iterateChild(child))
    }

    container.children.forEach(iterateChild(null))
  },
  getCurrentEventPriority() {
    return DefaultEventPriority
  },
  supportsPersistence: false,
  createTextInstance: function (text: string, rootContainer: unknown, hostContext: unknown, internalHandle: any) {
    return { children: [] }
  },
  appendInitialChild: function (parentInstance: ReactCanvas.Node, child: ReactCanvas.Node): void {
    parentInstance.children.push(child)
  },
  appendChild(parentInstance: ReactCanvas.Node, child: ReactCanvas.Node) {
    parentInstance.children.push(child)
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
  prepareForCommit: function (containerInfo: ReactCanvasScreen) {
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
  getInstanceFromScope: function (scopeInstance: any) {
    throw new Error('Function not implemented.')
  },
  detachDeletedInstance: function (node: unknown): void {
  },
  clearContainer() {},
  supportsHydration: false
})

const ReactCanvasAPI = {
  render(element: ReactNode, root: HTMLElement, callback?: () => void) {
    const tree = document.createElement('ul')

    const canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 480

    root.appendChild(tree)
    root.appendChild(canvas)

    ;(async() => {
      const treeContainer = treeReconciler.createContainer(tree, 0, null, false, false, 'foobar', console.error, null);
      treeReconciler.updateContainer(element, treeContainer, null, callback)
    })()

    const screen: ReactCanvasScreen = {
      canvas,
      children: [],
    }
    const screenContainer = screenReconciler.createContainer(screen, 0, null, false, false, 'foobar', console.error, null);
    screenReconciler.updateContainer(element, screenContainer, null, callback)
  }
}

ReactCanvasAPI.render(
  <>
    <sprite renderProperties={{ x: 5, y: 5, w: 10, h: 10, color: 'black' }}>
      Sprite 1
      <sprite renderProperties={{ x: 5, y: 5, w: 10, h: 10, color: 'red' }}>
        Sprite 2
      </sprite>
    </sprite>
  </>,
  document.querySelector('#root')!
)
