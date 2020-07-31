import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import { useBreakpoint } from 'plugins/breakpoint';
import { terms } from 'plugins/brand';
import { routes } from 'router';

export default () => {
  const breakpoint = useBreakpoint();

  return (
    <Paper style={(['L', 'M'].includes(breakpoint))
      ? {
        padding: 40,
      } : {
        padding: 10,
      }}>
      <h1 style={{
        fontSize: 20,
      }}>
        {terms.title}
      </h1>
      <div>
        {terms.header && terms.header.split('\n').map(line => <div>{line}</div>)}
      </div>

      {terms.terms.map(({ term, description }) => (
        <div>
          <h2 style={{
            fontSize: 18,
          }}>{term}</h2>
          <div>
            {description.split('\n').map(line => <div>{line}</div>)}
          </div>
        </div>
      ))}

      <div>
        {terms.footer && terms.footer.split('\n').map(line => <div>{line}</div>)}
      </div>
    </Paper>
  );

};
