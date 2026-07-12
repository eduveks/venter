import {Modal, Button, Col, Row, Typography, Spin} from "antd";

import _service from "@netuno/service-client";

import "./index.less";
import {useEffect, useState} from "react";
import globalNotification from "../../../../common/globalNotification.js";
import DateFormatter from "../../../../common/DateFormatter.js";

const {Title} = Typography;

function MemberRegistration({uid, name, description, date_start, date_end, price, onClose}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        if (uid == null) {
            return;
        }
        setLoading(true);
        setModalOpen(true);
        setData(null);
        setFinished(false);
        _service({
            url: 'member/registration',
            data: {uid},
            success: ({json}) => {
                setLoading(false);
                setData(json);
            },
            fail: (error) => {
                console.error(error);
                setLoading(false);
                globalNotification.serviceFail({
                    message: 'Participar',
                    description: 'Não foi possível consultar a inscrição, tente novamente mais tarde.',
                });
            }
        });
    }, [uid]);
    const onCancel = () => {
        setModalOpen(false);
        onClose && onClose(finished);
    }
    const onOk = () => {
        setLoading(true);
        _service({
            method: 'POST',
            url: 'member/registration',
            data: {uid},
            success: ({}) => {
                setLoading(false);
                setFinished(true);
            },
            fail: (error) => {
                console.error(error);
                setLoading(false);
                globalNotification.serviceFail({
                    message: 'Participar',
                    description: 'Não foi possível fazer a inscrição, tente novamente mais tarde.',
                });
            }
        });
    };
    return (
        <Modal title={finished ? 'Inscrição Concluída' : 'Participar'} open={modalOpen} onCancel={onCancel} onOk={onOk}
            footer={[
                ...((!finished && [
                    <Button key="cancel" onClick={onCancel}>
                        Cancelar
                    </Button>,
                    <Button key="ok" onClick={onOk} loading={loading} type="primary">
                        Fazer a Inscrição
                    </Button>
                ]) || []),
                ...((finished && [
                    <Button key="close" onClick={onCancel}>
                        Fechar
                    </Button>,
                ]) || []),
            ]}

        >
            {data && (
                <>
                    <Title>{name}</Title>
                    <p>De {DateFormatter.toText(date_start)} até {DateFormatter.toText(date_end)}.</p>
                    <p>Valor Total: <b>R$ {price}</b></p>
                    { data.installments > 1 && <>
                        <p>Pagamento mensal em <b>{data.installments} vezes</b> no valor de <b>R$ {data.amount}</b>.</p>
                    </>}
                    { finished && (
                        <>
                            <p><b>A sua inscrição foi realizada com sucesso.</b></p>
                            <p>Brevemente receberá um e-mail com as indicações para o pagamento.</p>
                            <p>Agradecemos a sua participação.</p>
                        </>
                    ) }
                </>
            )}
        </Modal>
    );
}

export default MemberRegistration;