import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCurrent } from '../../actions/itemActions';
import { Card, Button, ListGroup } from 'react-bootstrap';

const ItemCard = ({ item }) => {
  const { name, type, status, img } = item;
  const imgSrc = `data:image/png;base64,${img}`;
  const dispatch = useDispatch();
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant='top' src={imgSrc} alt='...Not Found' />
      <Card.Body>
        <Card.Title>Item : {name}</Card.Title>

        <ListGroup variant='flush'>
          <ListGroup.Item>
            Type:
            {type !== 'Select Type' ? type : 'NA'}
          </ListGroup.Item>
          <ListGroup.Item>
            Status:
            {status ? status : 'NA'}
          </ListGroup.Item>
        </ListGroup>

        <Button
          variant='primary'
          className='btn btn-dark btn-sm w-50 mt-3'
          onClick={() => dispatch(setCurrent(item))}
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};
ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};
export default ItemCard;
