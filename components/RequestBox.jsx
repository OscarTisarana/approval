import React from 'react';

const RequestBox = ({ quantity }) => {
  return (
    <div className="requested-part-box">
      There are {quantity} parts requested.
    </div>
  );
};

export default RequestBox
