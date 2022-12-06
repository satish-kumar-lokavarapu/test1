import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


function RatingForm({ onFinish, initivalValues }) {
  const navigate = useNavigate();

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues
      }}
    >
      <h1 className="card-title mt-3">Rating Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Add Review"
            name="Review"
            rules={[{ required: true }]}
          >
            <Input placeholder="Add Review" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Rating (Out of 5)"
            name="Rating"
            rules={[{ required: true }]}
          >
            <Input placeholder="Rating" />
          </Form.Item>
        </Col>

      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default RatingForm;
