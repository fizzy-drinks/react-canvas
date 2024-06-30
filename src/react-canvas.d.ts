import { PropsWithChildren } from 'react'

declare module ReactCanvas {
    type RenderProperties = {
        x: number;
        y: number;
        w: number;
        h: number;
        color: string;
    }
    
    type Node = {
        type: string;
        children: Node[]
        renderProperties?: RenderProperties
        computedRenderProperties: RenderProperties
    }

    type NodeProps = PropsWithChildren<{
        renderProperties?: RenderProperties
    }>
    
    type SpatialNodeProps = NodeProps

    type SpriteProps = SpatialNodeProps
}


declare module 'react' {
    declare module JSX {
        interface IntrinsicElements {
            sprite: ReactCanvas.SpriteProps
        }
    }
}
