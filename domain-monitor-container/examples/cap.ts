import fetch from 'node-fetch';

const obtainMetaTags = async (url: string) => {
  const response = await fetch('https://github.com/');
  const body = await response.text();

  console.log(body);
};

(async () => {
  const url = 'https://youtube.com';
  obtainMetaTags(url);
}
)();
