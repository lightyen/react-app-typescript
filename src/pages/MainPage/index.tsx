import React, { Fragment, Component } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Example, ExampleFC, ReactHookCounter } from "components"
import { inject, observer } from "mobx-react"
import { AppStore, IStore } from "stores"

interface IProps extends RouteComponentProps, IStore {}

@inject(AppStore.User)
@observer // Notice that this component will not render again when the user store changed.
export class MainPage extends Component<IProps> {
    private click = () => {
        this.props.user.setCounter(this.props.user.counter + 1)
    }

    public render() {
        console.log(this.props.location)
        return (
            <Fragment>
                <Example value="Hello React!" onClick={this.click} />
                <Counter />
                <ReactHookCounter />
            </Fragment>
        )
    }
}

interface ICounterProps extends IStore {}

@inject(AppStore.User)
@observer // Notice that when the user store change will trigger this component rendering.
class Counter extends Component<ICounterProps> {
    public render() {
        console.log("counter")
        return <div>{this.props.user.counter}</div>
    }
}
