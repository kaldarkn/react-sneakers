import styles from './Card.module.scss';
import {useState, useContext} from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from "../../context";


function Card({ id, imageUrl, title, price, onFavorite, onPlus, favorited = false, loading = false}) {
    
    
    const {isItemAdded} = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);
    
    
    const onClickPlus = () => {
        onPlus({id, imageUrl, title, price});
    }

    const onClickFavorite = () => {
        onFavorite({id,imageUrl, title, price});
        setIsFavorite(!isFavorite);
    }

    return (
            <div className={styles.card}>
                {
                    loading ?  <ContentLoader 
                    speed={2}
                    width={150}
                    height={265}
                    viewBox="0 0 150 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    
                  >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                    <rect x="0" y="98" rx="5" ry="5" width="150" height="15" /> 
                    <rect x="0" y="120" rx="5" ry="5" width="93" height="15" /> 
                    <rect x="0" y="156" rx="5" ry="5" width="80" height="24" /> 
                    <rect x="118" y="156" rx="10" ry="10" width="32" height="32" />
                  </ContentLoader> : 
                    <>
                        {onFavorite && <div className={styles.favorite}  onClick={onClickFavorite}>
                            <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked"/>
                        </div>}
                        <img width={133} height={112} src={imageUrl} alt="Sneakers1"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>

                            <div onClick={onClickPlus}>
                                {onPlus && <img className={styles.plus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="plus"/>}
                            </div>

                        </div>
                    </>
                }
            </div>
    )
}

export default Card;