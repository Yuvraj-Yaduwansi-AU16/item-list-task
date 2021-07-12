import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import { getItems } from '../../actions/itemActions';

const Items = () => {
  const data = useSelector((state) => state.data);
  const { items } = data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-3'>
      {items.length !== 0 ? (
        items.map((item, idx) => <ItemCard item={item} key={idx} />)
      ) : (
        <h4 className='text-warning'>Add any Item</h4>
      )}
    </div>
  );
};

export default Items;
