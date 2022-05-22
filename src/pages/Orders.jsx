import Card from "../components/Card";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import AppContext from "../context";


function Orders() {
    const {onAddToFavorite, onAddToCard} = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {

        async function fetchData() {
            try {
                const {data} = await axios.get('https://62809afd7532b4920f71324e.mockapi.io/orders');
                const ordersItem =data.reduce((prev, obj) => [...prev,...obj.items],[]);         
                setOrders(ordersItem);
                setIsLoading(false);
            } catch(error) {
                alert('Ошибка при запросе заказов!');
                console.error(error);
            }
        
        }
    
    fetchData();
    
    },[])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>

            </div>

            <div className="d-flex flex-wrap">
                
                {
                    (isLoading ? [...Array(8)] : orders).map((obj, index) => {  
                    return (
                        <Card 
                        key = {index}
                        loading = {isLoading}
                        {...obj}
                        />
                    )
                    })
                }
            </div>
        </div>
    )
}


export default Orders;