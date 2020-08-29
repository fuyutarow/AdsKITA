import Paper from '@material-ui/core/Paper';

import { useBreakpoint } from 'plugins/breakpoint';
import { law } from 'plugins/brand';
import AppFrame from 'views/AppFrame';

const Main = () => {
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
      }}>特定商取引法に基づく表記</h1>
      {Object.entries(law).map(([key, value]) => (
        <dl style={{
          display: 'flex',
          flexWrap: 'wrap',
          borderBottom: '1px solid #ccc',
        }}>
          <dt style={{
            width: '30%',
            padding: 10,
            boxSizing: 'border-box',
          }}>{key}</dt>
          <dd style={{
            padding: 10,
            margin: 0,
            width: '70%',
            boxSizing: 'border-box',
          }}>{value}</dd>
        </dl>
      ))
      }
    </Paper>
  );

};

const Page = () => {
  return (
    <AppFrame>

      <Main />

    </AppFrame>
  );
};

export default Page;
