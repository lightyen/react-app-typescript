import React from "react"
import { Example, ExampleSFC } from "components/Example"
import { inject, observer } from "mobx-react"
import { AppStore, IStore } from "stores"

interface IProps extends IStore {}

@inject(AppStore.User)
@observer
export class MainPage extends React.Component<IProps> {
    private click = () => {
        this.props.user.setCounter(this.props.user.counter + 1)
    }

    public render() {
        return (
            <React.Fragment>
                <Example value="Hello React!" onClick={this.click} />
                <div>{this.props.user.counter}</div>
            </React.Fragment>
        )
    }
}
