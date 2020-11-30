import React from 'react'
import { Form, Input } from 'antd';
const Detail = ({name ='', desc=''}) => {
    return (
        <Form >
      <Form.Item
        label="name"
        name="namme"
      >
        <Input value ={name}/>
      </Form.Item>

      <Form.Item
        label="desc"
        name="desc"
      >
        <Input value={desc}/>
      </Form.Item>
    </Form>
    )
}

export default Detail