import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    PageHeader,
    Layout,
    Form,
    Input,
    Radio,
    Button,
    Checkbox,
    Row,
    BackTop,
    Empty
} from 'antd';
import './TicketPage.scss';

import FlightCard from '../../components/FlightCard';
import Spinner from '../../components/Spinner';

const { Content, Sider } = Layout;

const TicketPage = ({ filteredFlights, loading, error, filteredAirlines, sortType, sortTypeStatus, filterTypeStatus, priceFromStatus, priceToStatus, airlinesStatus, getFlights }) => {
    const [showMore, setShowMore] = useState(() => {
        return false;
    });

    useEffect(() => {
        setShowMore(() => {
            return false;
        });
    }, [filteredFlights]);

    const handleShowMore = useCallback(() => {
        setShowMore(() => {
            return true;
        })
    }, []);

    let flightsList = filteredFlights.map((item, index) => <FlightCard key={index} flight={item} />);

    let checkboxes = filteredAirlines.map((item, index) => (
        <Row key={index}>
            <Checkbox name="airlines" value={item.flight.carrier.caption}>
                <div className="sider__form__airlineName--wrapper">
                    - <span className="sider__form__airlineName">{item.flight.carrier.caption}</span> от {item.flight.price.total.amount} р.
                </div>
            </Checkbox>
        </Row>
    ));

    let numberOfItems = showMore ? flightsList.length : 2;

    return (
        <Layout className="container">
            <Sider width="400"
                breakpoint="lg"
                collapsedWidth="0"
                theme="light"
            >
                <div className="sider__header" />
                <Form
                    className="sider__form--wrapper"
                    name="flight-search"
                >
                    <h3>Сортировать</h3>
                    <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                        <Radio.Group defaultValue={"rise"}>
                            <Radio value={"rise"} checked={sortType === "rise"} onChange={sortTypeStatus} >- по возрастанию цены</Radio>
                            <Radio value={"fall"} checked={sortType === "fall"} onChange={sortTypeStatus} >- по убыванию цены</Radio>
                            <Radio value={"time"} checked={sortType === "time"} onChange={sortTypeStatus} >- по времени в пути</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <h3>Фильтровать</h3>
                    <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                        <Checkbox.Group name="filter" onChange={filterTypeStatus}>
                            <Row>
                                <Checkbox name="filter" value="withTransfer">
                                    - 1 пересадка
                                </Checkbox>
                            </Row>
                            <Row>
                                <Checkbox name="filter" value="withoutTransfer">
                                    - без пересадок
                        </Checkbox>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <h3>Цена</h3>
                    <Form.Item className="sider__form__input--wrapper" label="От" wrapperCol={{ span: 18, offset: 0 }}>
                        <Input type="number" className="sider__form__input" placeholder="Минимальная стоимость..." onChange={priceFromStatus} />
                    </Form.Item>
                    <Form.Item label="До" wrapperCol={{ span: 18, offset: 0 }}>
                        <Input type="number" className="sider__form__input" placeholder="Максимальная стоимость..." onChange={priceToStatus} />
                    </Form.Item>

                    {checkboxes.length > 0 ? <h3>Авиакомпании</h3> : ""}
                    <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                        <Checkbox.Group name="airlines" onChange={airlinesStatus}>
                            {checkboxes}
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                        <Button type="primary" htmlType="submit" onClick={getFlights}>
                            Искать
                        </Button>
                    </Form.Item>
                </Form>
                <div className="sider__header"></div>
            </Sider>
            <Layout>
                <PageHeader
                    className="main__header"
                    title="Flight Finder"
                    subTitle="Быстрый поиск авиабилетов"
                />
                <Content className="main__content--wrapper">
                    <div className="main__content">
                        {error ? error :
                            <>{loading ? <Spinner /> : !flightsList.length ? <Empty description={false} /> : flightsList.slice(0, numberOfItems)}</>}
                        {flightsList.length > 2 && !showMore ? <Button onClick={handleShowMore}>Показать еще</Button> : ""}
                        <BackTop />
                    </div>

                </Content>
            </Layout>
        </Layout >
    )
}

TicketPage.propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    filteredFlights: PropTypes.array,
    filteredAirlines: PropTypes.array,
    sortType: PropTypes.string,
    sortTypeStatus: PropTypes.func,
    filterTypeStatus: PropTypes.func,
    priceFromStatus: PropTypes.func,
    priceToStatus: PropTypes.func,
    airlinesStatus: PropTypes.func,
    getFlights: PropTypes.func,
}

export default TicketPage;