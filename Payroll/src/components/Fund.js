import React, { Component } from 'react'
import { Form, InputNumber, Button } from 'antd';

import Common from './Common';

const FormItem = Form.Item;

class Fund extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const { payroll, account, web3 } = this.props;
        payroll.addFund({
            from: account,
            gas: 1000000,
            value: web3.toWei(this.state.fund)
        }).then(result => {
            this.setState({
                fund: false,
                fundAdd: 1
            });
        });
    }

    render() {
        const { account, payroll, web3 } = this.props;
        return (
            <div>
                <Common account={account} payroll={payroll} web3={web3} />

                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <InputNumber
                            min={1}
                            defaultValue={this.state.fundAdd}
                            onChange={fund => this.setState({fund})} />
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!this.state.fund}>增加资金</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Fund