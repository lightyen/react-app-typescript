import React from "react"
import PopperJS, { PopperOptions, Data } from "popper.js"
import classnames from "classnames"
import styled, { css } from "styled-components"
import AnimeJS from "animejs"

const arrowStyle = css`
    position: absolute;
    width: 1rem;
    height: 1rem;
`

const Inner = styled.div`
    opacity: 0;
    transform: translateY(20%);
`

interface PopperWrapperProps {
    arrowBackground: string
}

const PopperWrapper = styled.div<PopperWrapperProps>`
  z-index: 999;
  & [x-inner] {
    filter: drop-shadow(0px 0px 5px #000);
  }
  &[x-placement^="top"] [x-arrow] {
    ${arrowStyle}
    background: ${p => p.arrowBackground};
    bottom: -1rem;
    clip-path: polygon(100% 0, 0 0, 50% 80%);
  }
  &[x-placement^="left"] [x-arrow] {
    ${arrowStyle}
    background: ${p => p.arrowBackground};
    right: -1rem;
    clip-path: polygon(80% 50%, 0 0, 0 100%);
  }
  &[x-placement^="bottom"] [x-arrow] {
    ${arrowStyle}
    background: ${p => p.arrowBackground};
    top: -1rem;
    clip-path: polygon(50% 20%, 0% 100%, 100% 100%);
  }
  &[x-placement^="right"] [x-arrow] {
    ${arrowStyle}
    background: ${p => p.arrowBackground};
    left: -1rem;
    clip-path: polygon(20% 50%, 100% 100%, 100% 0);
  }
`

interface PopperProps {
    placement?: PopperJS.Placement
}

const Popper: React.FC<PopperProps> = ({ placement }) => {
    const reference = React.useRef()
    const arrow = React.useRef()
    const popper = React.useRef<HTMLDivElement>()
    const inner = React.useRef<HTMLDivElement>()
    const content = React.useRef<HTMLDivElement>()
    const instance = React.useRef<PopperJS>()
    const arrowHeight = 16
    const arrowWidth = 16

    const [open, setOpen] = React.useState(false)
    const [visiable, setVisiable] = React.useState(false)

    const [background, setBackground] = React.useState("#fff")

    const animation = React.useRef<AnimeJS.AnimeInstance>()

    React.useEffect(() => {
        // https://animejs.com/documentation/
        if (inner.current) {
            animation.current = AnimeJS({
                targets: inner.current,
                autoplay: false,
                duration: 300,
                opacity: [0, 1],
                translateX: [30, 0],
                translateY: [50, 0],
                loop: true,
                easing: "easeInOutCirc",
                direction: "alternate",
                loopComplete: (anime: AnimeJS.AnimeInstance) => {
                    anime.pause()
                },
            })
        }
        return () => {
            if (animation.current) {
                AnimeJS.remove(inner.current)
                animation.current = null
            }
        }
    }, [])

    React.useEffect(() => {
        const options: PopperOptions = {
            placement,
            modifiers: {
                // https://popper.js.org/popper-documentation.html#modifiers..offset
                offset: {
                    offset: `,16px`,
                },
                flip: {
                    enabled: false,
                },
                arrow: {
                    element: arrow.current,
                },
            },
        }
        instance.current = new PopperJS(reference.current, popper.current, options)

        const style = window.getComputedStyle(content.current)
        const background = style.getPropertyValue("background-color")
        setBackground(background)

        return () => {
            if (instance.current) {
                instance.current.destroy()
                instance.current = null
            }
        }
    }, [visiable, placement])

    function handleClick(e: React.MouseEvent) {
        if (animation.current.paused) {
            animation.current.play()
        } else {
            animation.current.reverse()
        }
        setOpen(!open)
        if (!visiable) {
            setVisiable(true)
        }
    }

    return (
        <div>
            <PopperButton ref={reference} onClick={handleClick} open={open} />
            <PopperWrapper ref={popper} style={{ display: visiable ? "initial" : "none" }} arrowBackground={background}>
                <div ref={inner} x-inner="">
                    <div ref={arrow} x-arrow="" />
                    <PopperContent ref={content} />
                </div>
            </PopperWrapper>
        </div>
    )
}

Popper.defaultProps = {
    placement: "bottom-start",
}

interface PopperButtonProps {
    open: boolean
    onClick: (e: React.MouseEvent) => void
}
const PopperButton = React.forwardRef<HTMLButtonElement, PopperButtonProps>(({ open, onClick, ...rest }, ref) => {
    return (
        <button ref={ref} className="btn btn-primary" onClick={onClick} {...rest}>
            {open ? "Hide" : "Show"}
        </button>
    )
})

const PopperContent = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} {...props} className="card border-0 bg-primary text-light">
        <div className="card-header bg-primary">Header</div>
        <div className="card-body rounded-bottom bg-light text-dark">This is my body.</div>
    </div>
))

const Test: React.FC = () => {
    return (
        <div style={{ padding: "30px 50px" }}>
            <Popper placement="bottom-start" />
        </div>
    )
}

export default Test
