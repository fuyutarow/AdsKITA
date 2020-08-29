import Paper from '@material-ui/core/Paper';

import { useBreakpoint } from 'plugins/breakpoint';
import AppFrame from 'views/AppFrame';
import { contactFormLink } from 'plugins/brand';

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
        お問い合わせ
      </h1>
      <div>
        Google Formを利用しています <br />
          こちらのフォームからお問い合わせください
        <div>
          <a href={contactFormLink}>お問い合わせフォーム</a>
        </div>
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
