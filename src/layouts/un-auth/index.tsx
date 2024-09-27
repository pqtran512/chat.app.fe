import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { STORAGE_KEY } from 'src/utils/constants';

interface UnAuthProps {
  children?: ReactNode;
}

const UnAuth: FC<UnAuthProps> = ({ children }) => {
  if (localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

UnAuth.propTypes = {
  children: PropTypes.node
};

export default UnAuth;
