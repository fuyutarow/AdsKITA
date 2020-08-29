import Paper from '@material-ui/core/Paper';

import { useBreakpoint } from 'plugins/breakpoint';
import AppFrame from 'views/AppFrame';
import { policy } from 'plugins/brand';
import Link from 'next/link';

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
      }}>
        {policy.title}
      </h1>
      <div>
        {policy.header && policy.header.split('\n').map(line => <div>{line}</div>)}
      </div>

      {policy.terms.map(({ term, description }) => (
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
        <Link href={'/contact'}>
          お問い合わせ
        </Link>
      </div>

      <div>
        {policy.footer && policy.footer.split('\n').map(line => <div>{line}</div>)}
      </div>
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
