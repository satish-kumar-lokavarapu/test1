import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
function DoctorForm({ onFinish, initivalValues }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues= {initivalValues}
       
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            
            rules={[{
              message: 'First Name should contain only alphabits',
              validator: (_, value) => {
                if (/^[a-zA-Z]+$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('First Name field is rejected');
                }
              }
            }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{
              message: 'Last Name should contain only alphabits',
              validator: (_, value) => {
                if (/^[a-zA-Z]+$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('Last Name field is rejected');
                }
              }
            }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{
              message: 'Enter valid Phone Number',
              validator: (_, value) => {
                if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('Phone Number field is rejected');
                }
              }
            }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
        
          <Form.Item label="specialization" name="specialization" required rules={[{ required: true }]}>
          <select id="specialization" name="specialization" required>
                            <option value="">Select specialization</option>
                            <option value="Ent">ENT Specialist</option>
                            <option value="Skin">Skin Specialist</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Heart">Heart Specialist</option>
                            <option value="Lung">Lung Specialist</option>
                            <option value="Neuro">Neuro Specialist</option>
          </select>
          </Form.Item>
          
          {/* <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item> */}
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee Per Cunsultation"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Cunsultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
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

export default DoctorForm;
