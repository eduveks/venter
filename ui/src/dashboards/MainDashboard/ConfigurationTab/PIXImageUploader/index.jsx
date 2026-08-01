import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Typography } from 'antd';

import _service from "@netuno/service-client";

import "./index.less";
import {useState} from "react";

const {Title} = Typography;

function PIXImageUploader({}) {
    const [previewUpdateCounter, setPreviewUpdateCounter] = useState(1);
    const handleChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`O arquivo ${info.file.name} carregado com sucesso.`);
            setPreviewUpdateCounter((prev) => prev + 1);
        } else if (info.file.status === 'error') {
            if (info.file.response.error === 'file-extension') {
                message.error(`O arquivo ${info.file.name} não é PNG.`);
            } else {
                message.error(`Não foi possível carregar o arquivo ${info.file.name}.`);
            }
        }
    };
    return (
        <div className="pix-image-uploader">
            <Title level={3}>Imagem PIX</Title>
            <div className="pix-image-uploader__preview">
                <img src={_service.url("pix") + "?" + previewUpdateCounter} alt="" />
            </div>
            <Upload action={_service.url("admin/pix/upload")} onChange={handleChange} >
                <Button icon={<UploadOutlined />}>Alterar a imagem PIX</Button>
            </Upload>
        </div>
    )
}

export default PIXImageUploader;
