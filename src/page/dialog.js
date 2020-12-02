import React,{useEffect} from 'react'
import { Form,  Modal, Input } from 'antd'

const Dialog = ({option, visible, data, onSendData, onCancel}) =>{
    const [form] = Form.useForm()
   
    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(data)
    })
     // 点击确定
     const handleOk = () => {
        console.log('form', form.getFieldsValue())
        
        onSendData(form.getFieldsValue())
        onCancel(false)
    }

    // 关闭弹框
    const handleCancel = () => {
        // setModalVisible(false);
        onCancel(false)
    }

    return (<Modal
        title={option === 'edit' ? '节点编辑' : '添加节点'}
        okText='确定'
        cancelText='取消'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
    >
        <Form form={form}>
            <Form.Item label="节点id" name='id'>
                <Input placeholder="请输入节点Id" disabled={option === 'edit' ? true : false} />
            </Form.Item>
            <Form.Item label="父节点" name="source">
                <Input placeholder="请输入父节点id" disabled={Option === 'edit' ? true : false} />
            </Form.Item>
            <Form.Item label="节点名称" name="label">
                <Input placeholder="请输入节点名称" />
            </Form.Item>
            <Form.Item label="节点描述" name="desc">
                <Input placeholder="请输入节点描述" />
            </Form.Item>
        </Form>
    </Modal>)
}

export default Dialog