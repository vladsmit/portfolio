import React, { useState } from 'react';
import {
  PageHeader,
  Layout,
  Form,
  Input,
  Radio,
  Button,
  Checkbox,
  Row,
} from 'antd';
import './styles/styles.scss';
import FlightCard from './components/FlightCard';

const { Content, Footer, Sider } = Layout;

const App = (props) => {
  const [needState, setNeedState] = useState(() => {
    return "needState";
  });

  const [transfer, setTransfer] = useState(() => {
    return true;
});

  return (
    <Layout>
      <Sider width="300"
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
      >
        <div className="sider__header" />
        <Form
          className="sider__form--wrapper"
          name="validate_other"
        >
          <h3>Сортировать</h3>
          <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
            <Radio.Group defaultValue={"rise"}>
              <Radio value={"rise"}>- по возрастанию цены</Radio>
              <Radio value={"fall"}>- по убыванию цены</Radio>
              <Radio value={"time"}>- по времени в пути</Radio>
            </Radio.Group>
          </Form.Item>

          <h3>Фильтровать</h3>
          <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
            <Checkbox.Group>
              <Row>
                <Checkbox value="withTransfer">
                  - 1 пересадка
                </Checkbox>
              </Row>
              <Row>
                <Checkbox value="withoutTransfer">
                  - без пересадок
              </Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <h3>Цена</h3>
          <Form.Item className="sider__form__input--wrapper" label="От" wrapperCol={{ span: 18, offset: 0 }}>
            <Input className="sider__form__input" placeholder="Минимальная стоимость..." />
          </Form.Item>
          <Form.Item label="До" wrapperCol={{ span: 18, offset: 0 }}>
            <Input className="sider__form__input" placeholder="Максимальная стоимость..." />
          </Form.Item>

          <h3>Авиакомпании</h3>
          <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
            <Checkbox.Group>
              <Row>
                <Checkbox value="1">
                  - авиакомпания {needState} от {needState}
                </Checkbox>
              </Row>
              <Row>
                <Checkbox value="2">
                  - авиакомпания {needState} от {needState}
                </Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Искать
        </Button>
          </Form.Item>
        </Form>
        <div className="sider__header"></div>
      </Sider>
      <Layout>
        <PageHeader
          className="site-page-header"
          title="Flight Finder"
          subTitle="Быстрый поиск авиабилетов"
        />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background">
            <FlightCard needState={needState} transfer={transfer} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Flight Finder &copy; 2021</Footer>
      </Layout>
    </Layout >
  )
}

export default App;
