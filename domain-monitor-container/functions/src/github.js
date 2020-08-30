const {getData} = require('similarweb-scrape');

const domain = 'github.com';

getData(domain)
    .then((data) => {
      console.log(data);

      /*
        {
          domain: 'github.com',
          totalVisits: '387.76M',
          avgVisitDuration: '00:06:10',
          pagesPerVisit: '6.63',
          bounceRate: '41.63%',
          globalRank: '78',
          category: 'Computer and Electronics > Software' }
        }
        */
    })
    .catch((error) => {
      console.log('**********');
      console.error(error);
    });
