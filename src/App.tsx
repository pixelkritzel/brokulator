import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import './styles/index.scss';

export function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography>
          <h1>Broke u later</h1>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
