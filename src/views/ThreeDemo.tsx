import React, { useEffect, useRef } from "react"
import * as Three from "three"

const ThreeCanvas: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>()
    const canvasRef = useRef<HTMLCanvasElement>()

    useEffect(() => {
        let handle = 0
        let currentWidth = wrapperRef.current.clientWidth
        let currentHeight = wrapperRef.current.clientHeight

        let camera = new Three.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
        camera.position.z = 1

        const scene = new Three.Scene()

        const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
        const material = new Three.MeshNormalMaterial()

        const mesh = new Three.Mesh(geometry, material)
        scene.add(mesh)

        const renderer = new Three.WebGLRenderer({ antialias: true, canvas: canvasRef.current })
        renderer.setSize(currentWidth, currentHeight)

        function handleSizeChange(width: number, height: number) {
            if (width === currentWidth && height === currentHeight) {
                return
            }
            camera = new Three.PerspectiveCamera(70, width / height, 0.01, 10)
            camera.position.z = 1
            renderer.setSize(width, height, true)
            currentWidth = width
            currentHeight = height
        }

        function animate() {
            handle = window.requestAnimationFrame(animate)
            handleSizeChange(wrapperRef.current.clientWidth, wrapperRef.current.clientHeight)
            mesh.rotation.x += 0.01
            mesh.rotation.y += 0.02
            renderer.render(scene, camera)
        }

        animate()

        return () => {
            window.cancelAnimationFrame(handle)
            renderer.dispose()
        }
    }, [])

    return (
        <div ref={wrapperRef} className="w-100 h-100">
            <canvas style={{ position: "fixed" }} ref={canvasRef} />
        </div>
    )
}

const ThreeDemo: React.FC = () => {
    return (
        <div className="fadeIn h-100">
            <ThreeCanvas />
        </div>
    )
}

export default ThreeDemo
