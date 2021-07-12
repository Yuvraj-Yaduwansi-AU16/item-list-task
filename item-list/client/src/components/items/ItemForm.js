import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  updateItem,
  clearCurrent,
  clearError,
} from '../../actions/itemActions';
import { Form, Dropdown, DropdownButton, Card } from 'react-bootstrap';
const ItemForm = () => {
  const data = useSelector((state) => state.data);
  const { current, error } = data;
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    name: '',
    type: 'Select Type',
    status: '',
    img: '',
  });
  const { name, type, status, img, _id } = item;
  useEffect(() => {
    if (error !== '') {
      dispatch(clearError());
    }
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        name: '',
        type: 'Select Type',
        status: '',
        img: '',
      });
    }
    // eslint-disable-next-line
  }, [current, error]);

  const onChange = (e) => {
    if (e.target.name === 'img') {
      setItem({ ...item, [e.target.name]: e.target.files[0] });
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const onSelect = (e) => {
    const type = e.split('#')[1];
    setItem({ ...item, type });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('status', status);
    formData.append('img', img);
    formData.append('_id', _id);
    if (current === null) {
      dispatch(addItem(formData));
    } else {
      dispatch(updateItem(formData, _id));
    }
    clearAll();
  };

  const clearAll = (e) => {
    dispatch(clearCurrent());
  };
  return (
    <Card className='card bg-light text-wrap' style={{ width: '20rem' }}>
      <Form onSubmit={onSubmit}>
        <h2 className='text-primary'>{current ? 'Edit Item' : 'Add Item'}</h2>
        <Form.Control
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={onChange}
          required
        />
        <div className='form-group'>
          <Form.Label htmlFor='status'>Status</Form.Label>
          <input
            className='mx-3'
            type='radio'
            name='status'
            value='active'
            checked={status === 'active'}
            onChange={onChange}
          />
          Active{' '}
          <input
            className='mx-3'
            type='radio'
            name='status'
            value='in-active'
            checked={status === 'in-active'}
            onChange={onChange}
          />
          In Active
        </div>

        <Form.Group
          controlId='type'
          className='mt-3 d-flex justify-content-between'
        >
          <Form.Label>Type</Form.Label>
          <DropdownButton id='type-select' className='me-3' title={type}>
            <Dropdown.Item href='#Physical' onSelect={onSelect}>
              Physical
            </Dropdown.Item>
            <Dropdown.Item href='#Digital' onSelect={onSelect}>
              Digital
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>

        {current ? (
          <div>
            <input
              name='img'
              className='mb-4'
              type='file'
              onChange={onChange}
            />
          </div>
        ) : (
          <div>
            <input
              name='img'
              className='mb-4'
              type='file'
              onChange={onChange}
              required
            />
          </div>
        )}
        <div>
          <input
            type='submit'
            value={current ? 'Update Item' : 'Add Item'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </Form>
    </Card>
  );
};

export default ItemForm;
