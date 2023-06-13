import React,{useState} from 'react';
import { Button, Container } from "reactstrap";
import './OrderScreen.css'

import { useTranslation } from 'react-i18next';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import PlatformIcon from './PopUpIcon';
import Confirmation from './PopUpConfirmation';
import PerfectScrollbar from "react-perfect-scrollbar";



    const OrderScreen = () => {
      const { t } = useTranslation();
      const [deletingOrderId, setDeletingOrderId] = useState(null);
      const [selectedOptions, setSelectedOptions] = useState({});

      const handleSelectChange = (event, id) => {
        setSelectedOptions({
          ...selectedOptions,
          [id]: event.target.value
        });
      };

      const handleCopy = (address) => {
        navigator.clipboard.writeText(address)
          .then(() => {
            console.log('Texto copiado com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao copiar texto:', error);
          });
      };

      const handleDeleteOrder = (orderId) => {
        setDeletingOrderId(orderId);
      
        setTimeout(() => {
          setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
          setDeletingOrderId(null);
        }, 1000);
      };

      const [orders, setOrders] = useState([
        {
            id: 1,
            customer: 'João',
            pizza: 'Calabresa',
            observation: 'Sem cebola',
            status: 'Em preparação',
            address: 'Rua Elizeu 1428',
            platform: 'Messenger',
            communication: 'joao@example.com'
          },
          {
            id: 2,
            customer: 'Maria',
            pizza: 'Marguerita calabresa salsicha mortadela com coca de 2 l',
            observation: 'Adicionar azeitonas',
            status: 'Pronta para entrega',
            address: 'Avenida Principal 789',
            platform: 'WhatsApp',
            communication: '999123456'
          },
          {
            id: 3,
            customer: 'Carlos',
            pizza: 'Quatro Queijos',
            observation: 'Com borda recheada de cheddar e bacon com catupiry',
            status: 'A caminho',
            address: 'Rua das Flores 10',
            platform: 'WhatsApp',
            communication: '999987654'
          },
          {
            id: 4,
            customer: 'Ana',
            pizza: 'Frango com Catupiry',
            observation: 'Adicionar milho',
            status: 'Entregue',
            address: 'Rua dos Pássaros 25',
            platform: 'Messenger',
            communication: 'ana@example.com'
          },
          {
            id: 5,
            customer: 'Pedro',
            pizza: 'Portuguesa',
            observation: 'Sem cebola',
            status: 'Entregue',
            address: 'Rua das Palmeiras 512',
            platform: 'WhatsApp',
            communication: '9988776655'
          }
      ]);
         
          
          

        document.title="Omnichat";
        return (
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title='Omnichat' breadcrumbItem={t("OrderScreen")} />
                        <div style={styles.container} className='right'>
                            {orders.map(order => (
                                <div key={order.id} style={styles.card} className={`order-item ${deletingOrderId === order.id ? 'up' : ''}`}>
                                  <div style={styles.container_between}>
                                    <h3 style={styles.customer}>{order.customer}</h3>
                                    <PlatformIcon platform={order.platform} communication={order.communication} />
                                  </div>
                                    <p style={styles.pizza}>{order.pizza}</p>
                                    <p className="observation-field">{order.observation}</p>
                                    <div style={styles.container_between}>
                                    <select 
                                        value={selectedOptions[order.id] || ''}
                                        onChange={(event) => handleSelectChange(event, order.id)}
                                        className={selectedOptions[order.id] ? `selected-${selectedOptions[order.id].toLowerCase()}` : 'select'}
                                      >
                                        <option value="">Selecione</option>
                                        <option value="Em preparação">Em preparação</option>
                                        <option value="Pronto para entrega">Pronto para entrega</option>
                                        <option value="A caminho">A caminho</option>
                                        <option value="Entregue" >Entregue </option>
                                    </select>
                                        <i className="bx bx-map map_icon" onClick={() => handleCopy(order.address)}></i>
                                    </div>
                                    <Button color='danger' className='mt-3 d-grid width' onClick={() => handleDeleteOrder(order.id)}>
                                        Encerrar atendimento
                                    </Button>                                  
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            );
        }

        const styles = {
            container: {
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'start',
              overflowX: 'auto',
              padding: '20px',
            },
            container_between: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            card: {
              backgroundColor: '#fff',
              borderRadius: '8px',
              margin: '10px',
              padding: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px',
              height: '100%'
            },
            customer: {
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px',
            },
            pizza: {
              fontSize: '16px',
            },
            
          };

export default OrderScreen;