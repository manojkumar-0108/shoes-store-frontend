import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Wrapper from './Wrapper';
import ProductCard from './ProductCard';

const DisplayShoes = () => {
  const { shoes, category } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Change this value as needed

  useEffect(() => {
    setCurrentPage(1); // Reset current page whenever category changes
    updateNumPaginationButtons(); // Update number of pagination buttons on resize
    window.addEventListener('resize', updateNumPaginationButtons);
    return () => {
      window.removeEventListener('resize', updateNumPaginationButtons);
    };
  }, [category]);

  const updateNumPaginationButtons = () => {
    if (window.innerWidth < 768) {
      setItemsPerPage(3);
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(12)
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shoes?.filter(product => category === "All" || category === product.category)
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <Wrapper>

        {/* heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with
            increased stack heights to help provide cushioning
            during extended stretches of running.
          </div>
        </div>


        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols- lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {currentItems && currentItems.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>


        {/* pagination controls */}
        <div className="flex justify-center my-5">
          {[...Array(Math.ceil(shoes?.filter(product => category === "All" || category === product.category).length / itemsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className={`mx-1 px-3 py-1 border border-gray-300 rounded-md ${currentPage === number + 1 ? 'bg-gray-300' : ''}`}>{number + 1}</button>
          ))}
        </div>


      </Wrapper>
    </div>
  );
};

export default DisplayShoes;
