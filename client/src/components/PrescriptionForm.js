import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
function PrescriptionForm({ onFinish, initivalValues }) {
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues
      }}
    >
      <h1 className="card-title mt-3">Prescription Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Symptoms"
            name="Symptoms"
            rules={[{ required: true }]}
          >
            <Input placeholder="Symptoms" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Tests"
            name="Tests"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tests" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Medicines"
            name="Medicines"
            rules={[{ required: true }]}
          >
            <Input placeholder="Medicines" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Remarks"
            name="Remarks"
            rules={[{ required: true }]}
          >
            <Input placeholder="Remarks" />
          </Form.Item>
        </Col>
        
      </Row>

      <div className="d-flex justify-content-end">
        <Button onSubmit={handleSubmit} className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default PrescriptionForm;
