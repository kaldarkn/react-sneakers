
import {useState} from 'react';
import axios from "axios";

import Info from "../info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, items = [], onRemove, opened}) {


    const {cartItems, setcartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://62809afd7532b4920f71324e.mockapi.io/orders',{items: cartItems});
            setOrderId(data.id)
            setIsOrderComplete(true);
            setcartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                //Прилетает ошибка 404 (Исправь)
                await axios.delete('https://62809afd7532b4920f71324e.mockapi.io/cart/' + item.id);
                await delay(1000);
            }

        } catch(error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
        
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible :''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина 
                <img onClick = {onClose}  className="cu-p" src="/img/btn-remove.svg" alt="Close"/>
                </h2>
                
                {
                    items.length > 0 ?
                    
                    (
                    <div className="d-flex flex-column flex">
                    <div className="items flex">
                        {
                        items.map(obj => {
                            return (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div 
                                        style={{backgroundImage: `url(${obj.imageUrl})`}} 
                                        className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                                </div>
                            )
                        })
                        }
    
                    </div>

                    <div className="cartTotalBlock">
                        <ul>
                            <li>
                                <span>Итого: </span>
                                <div></div>
                                <b>{totalPrice} руб. </b>
                            </li>

                            <li>
                                <span>Налог 5%: </span>
                                <div></div>
                                <b>{(totalPrice * 0.05).toFixed(1)} руб. </b>
                            </li>
                        </ul>

                        <button disabled = {isLoading} onClick={onClickOrder} className="greenButton">
                            Оформить заказ
                            <img src="/img/arrow.svg" alt="Arrow"/>
                        </button>
                    </div>
                    </div>
                    )
                    : 
                    (
                        <Info 
                        title={isOrderComplete ? "Заказ оформлен!":"Корзина пустая"} 
                        image={isOrderComplete ? "/img/complete-order.jpg" :"/img/empty-cart.jpg"} 
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` :"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}/>
                    )
                }
            </div>
        </div>
    )
}

export default Drawer;