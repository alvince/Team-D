import React, { Component } from 'react'
// eslint-disable-next-line
import { Card, Col, Row, Layout, Alert, message, Button } from 'antd';

import Common from './Common';

class Employer extends Component {
    constructor(props) {
        super(props);
            this.state = {};
        }

    componentDidMount() {
        this.checkEmployee();
    }

    checkEmployee = () => {
        const { payroll, account, web3 } = this.props;
        payroll.employees.call(account, {
            from: account,
            gas: 1000000
        }).then((result) => {
            console.log(result);
            this.setState({
                salary: result.length >= 2 ? web3.fromWei(result[1].toNumber()) : 0,
                lastPaidDate: result.length >= 3 ? new Date(result[2].toNumber() * 1000) : 0
            });
        });
    }

    getPaid = () => {
        // eslint-disable-next-line
        const { payroll, account, web3 } = this.props;
        payroll.getPaid({
            from: account,
            gas :1000000
        }).then((result) => {
            alert("You have been paid.");
        }).catch(e => {
            console.log("employeeId:", account);
            console.log("getPaid error:", e);
        });
    }

    renderContent() {
        const { salary, lastPaidDate, balance } = this.state;

        if (!salary || salary === '0') {
            return <Alert message="你不是员工" type="error" showIcon />;
        }

        return (
            <div>
                <Row gutter={16}>
                    <Col span={8}>
                    <Card title="薪水">{salary} Ether</Card>
                    </Col>
                    <Col span={8}>
                    <Card title="上次支付">{lastPaidDate}</Card>
                    </Col>
                    <Col span={8}>
                    <Card title="帐号金额">{balance} Ether</Card>
                    </Col>
                </Row>

                <Button type="primary"
                    icon="bank"
                    onClick={this.getPaid}>获得酬劳</Button>
            </div>
        );
    }

    render() {
        const { account, payroll, web3 } = this.props;

        return (
            <Layout style={{ padding: '0 24px', background: '#fff' }}>
                <Common account={account} payroll={payroll} web3={web3} />
                <h2>个人信息</h2>
                {this.renderContent()}
            </Layout >
        );
    }
}

export default Employer
