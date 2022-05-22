import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, {useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom'
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";





// const arr = [
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": "10001",
//     "imageUrl": "/img/sneakers/1.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Air Max 270",
//     "price": "10002",
//     "imageUrl": "/img/sneakers/2.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": "10003",
//     "imageUrl": "/img/sneakers/3.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": "10004",
//     "imageUrl": "/img/sneakers/4.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Under Armour Curry 8",
//     "price": "10005",
//     "imageUrl": "/img/sneakers/5.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Kyrie 7",
//     "price": "10006",
//     "imageUrl": "/img/sneakers/6.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Jordan Air Jordan 11",
//     "price": "10007",
//     "imageUrl": "/img/sneakers/7.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike LeBron XVIII",
//     "price": "10008",
//     "imageUrl": "/img/sneakers/8.jpg"
//   }
// ]


function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] =  useState(true);

  //Получаем кросовки с бэкенда. Этот запрос будет только при первом рендере
  useEffect(() => {

    //Запрос на сервер для получения кроссовок с использованием fetch
    // fetch('https://62809afd7532b4920f71324e.mockapi.io/Items')
    // .then(res => res.json())
    // .then(json => setItems(json)
    // );

    //Перепишем на axios
    async function fetchData() {
      
      try {
        const cartsResponse = await axios.get('https://62809afd7532b4920f71324e.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://62809afd7532b4920f71324e.mockapi.io/favorites');
        const itemsResponse = await axios.get('https://62809afd7532b4920f71324e.mockapi.io/Items');
  
        setIsLoading(false);
        setcartItems(cartsResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)

      } catch (error) {
        alert('Ошибка при запросе данных :(');
        console.error(error);
      }
  
    }

    fetchData();

  },[])

  const onAddToCard = async (obj) => {
    const findItem = cartItems.find(item => Number(obj.id) === Number(item.id));
    try {
      if (findItem) {
        await axios.delete(`https://62809afd7532b4920f71324e.mockapi.io/cart/${findItem.idQ}`);
        setcartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://62809afd7532b4920f71324e.mockapi.io/cart',obj);
        setcartItems(prevItems => [...prevItems, data])
        
      }
 
    } catch(error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  }

  const onRemoveItem = async (id) => {
    
    const findItem = cartItems.find(item => Number(id) === Number(item.id));

    try {
      await axios.delete(`https://62809afd7532b4920f71324e.mockapi.io/cart/${findItem.idQ}`);
      setcartItems(prevItems => prevItems.filter(item => item.id !== id)) 
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) => {

    try {
      if (favorites.find(favoriteObj => Number(obj.id) === Number(favoriteObj.id))) {
        await axios.delete(`https://62809afd7532b4920f71324e.mockapi.io/favorites/${obj.id}`);
        // setFavorites(prevItems =>prevItems.filter(item => Number(item.id) !== Number(obj.id)))   
      } else {
        const {data} = await axios.post('https://62809afd7532b4920f71324e.mockapi.io/favorites',obj);
        setFavorites(prevItems => [...prevItems, data]) 
      }  
    } catch (error) {
      alert('не удалось добавить в фавориты');
      console.error(error);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((cart) => Number(cart.id) === Number(id))
  }

  return (
    <AppContext.Provider value ={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCard, setCartOpened, setcartItems}}>
      <div className="wrapper clear">
        
        <Drawer items = {cartItems} onClose = {() => setCartOpened(false)} onRemove = {onRemoveItem} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true)}/>

        <Routes>
          <Route path="/" element = {
            <Home 
                  items = {items} 
                  cartItems = {cartItems}
                  searchValue = {searchValue} 
                  setSearchValue = {setSearchValue}
                  onChangeSearchInput = {onChangeSearchInput}
                  onAddToFavorite = {onAddToFavorite}
                  onAddToCard = {onAddToCard}
                  isLoading = {isLoading}
                  />
          }/>
          <Route path = "/favorites" element = {<Favorites/>}/>
          <Route path = "/orders" element = {<Orders/>}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
