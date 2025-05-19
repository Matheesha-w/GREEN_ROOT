import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ConfirmPage = () => {
  return (
    <div>
      ConfirmPage
      <Link to="/Customer/Orderhistory">
        <Button>OK</Button>
      </Link>
    </div>
  );
};

export default ConfirmPage;