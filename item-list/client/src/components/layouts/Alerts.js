import React from 'react';
import { useSelector } from 'react-redux';

const Alerts = () => {
  const data = useSelector((state) => state.data);
  const auth = useSelector((state) => state.auth);
  const { autherror } = auth;
  const { error } = data;
  return (
    <div>
      {error && <div className={`alert alert-danger`}>{error}</div>}
      {autherror && <div className={`alert alert-danger`}>{autherror}</div>}
    </div>
  );
};

export default Alerts;
