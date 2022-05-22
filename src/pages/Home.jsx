import Card from "../components/Card";



function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCard, isLoading}) {

    

    //Кайрат
    const renderItems = () => {

        const filtredItems = items.filter((item) => 
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );

        return (isLoading ? [...Array(8)] : filtredItems).map((obj, index) => (              
                    <Card 
                        key = {index}
                        onFavorite = {obj => onAddToFavorite(obj)}
                        onPlus = {obj => onAddToCard(obj)}
                        loading = {isLoading}
                        {...obj}
                    />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"></img>
                    {searchValue && <img 
                                        onClick={() => setSearchValue('')} 
                                        className="clear cu-p" 
                                        src="/img/btn-remove.svg" 
                                        alt="Clear"
                                    />
                    }
                    
                    <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."></input>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {
                    renderItems()
                }
    
            </div>
        </div>
    )
}


export default Home;