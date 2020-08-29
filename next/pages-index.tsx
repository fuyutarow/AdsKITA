import Head from 'next/head';
import { NextPage } from 'next';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { MetaHead } from 'headers';
import { OGP } from 'models/ogp';
import { logo, icons, brandColors } from 'plugins/brand';
import LeftSideBar from 'components/LeftSideBar';

const drawerWidth = 240;
const iconStyle = { width: '45px', color: brandColors.khaki };
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: brandColors.ground,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    contentL: {
      flexGrow: 1,
      padding: '30px 12px 60px 12px',
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
      position: 'relative',
    },
    contentMS: {
      flexGrow: 1,
      padding: '30px 5px 60px 5px',
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
      position: 'relative',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
      position: 'relative',
    },
    bottomNav: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      fontSize: iconStyle.width,
      color: brandColors.khaki,
      backgroundColor: brandColors.ground,
    },
  }),
);

const Page: NextPage<{
  ogp: OGP
}> = ({ ogp }) => {
  const classes = useStyles();

  return (
    <>
      <MetaHead {...{ ogp }} />
      <div className={classes.root}>

        <LeftSideBar variant='permanent' />
        <main className={classes.contentL}>
          wakaran
        </main>

      </div>

    </>
  );
};

Page.getInitialProps = async ({ req }) => {
  const ogp: OGP = {
    title: 'webtan | Youtube',
    url: 'https://webtan.now.sh/youtube',
    description: 'webtan | Youtube',
    imageUrl: req ? `//${req.headers.host}${icons[512]}` : icons[512],
  };

  return { ogp };
};

export default Page;
