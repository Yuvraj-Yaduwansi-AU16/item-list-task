import React, { useEffect } from 'react';
import Items from '../items/Items';
import ItemForm from '../items/ItemForm';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../actions/itemActions';
const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  useEffect(() => {
    dispatch(getItems());
    // eslint-disable-next-line
  }, []);
  return (
    <div className=''>
      <div className='w-25'>{user === 'admin' && <ItemForm />}</div>
      <div>
        <Items />
      </div>
    </div>
  );
};

export default Home;
