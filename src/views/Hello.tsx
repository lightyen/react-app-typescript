import React from "react"
import { RouteComponentProps } from "react-router-dom"
import MyCounter from "~/components/Example/ReduxCounter"
import Button from "~/components/Button"
import TimeCounter from "~/components/TimeCounter"
import CodeHighlight from "~/components/CodeHighlight"

import { Dispatch } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getHello } from "~/store/saga/hello/action"
import { getUser, setUser } from "~/store/user/action"
import { IUser } from "~/store/model"
import { HelloStore } from "~/store/saga/hello/reducer"
import { IAppStore } from "~/store"

const dispatchProps = {
    getHello,
}

type DispatchProps = typeof dispatchProps

interface OwnProps {}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(dispatchProps, dispatch)

type PickProps = Partial<Pick<HelloStore, "status">>
const mapStateToProps = (state: IAppStore, ownProps: OwnProps): PickProps => {
    const { status } = state.hello
    return { status }
}

type Props = RouteComponentProps & DispatchProps & PickProps & OwnProps

const input = `const CodeHighlight: React.FC<OwnProps> = ({ code, language }) => {
    const ref = React.useRef(null)
    React.useEffect(() => {
        Prism.highlightElement(ref.current, false, () => {
            console.log("change")
        })
    })

    return (
        <pre data-language={tags[language]} className={classnames(\`language-\${language}\`, "line-numbers")}>
            <code ref={ref}>{code}</code>
        </pre>
    )
}
`

class Hello extends React.Component<Props> {
    public render() {
        const { history, status } = this.props
        const { getHello } = this.props
        return (
            <div>
                <Button onClick={() => getHello()}>Hello API</Button>
                <span>"{status}"</span>
                <MyCounter />
                <input
                    size={16}
                    placeholder="input..."
                    onChange={e => {
                        const user: IUser = { name: e.target.value, age: 22 }
                        setUser(user)
                    }}
                />
                <div className="fade show">
                    <CodeHighlight code={input} language="tsx" />
                </div>
                <GoBackButton onClick={() => history.goBack()} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Hello)

const GoBackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return <Button onClick={onClick}>Go Back</Button>
}
