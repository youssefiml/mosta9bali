const base = process.env.BASE_URL || 'http://localhost:5000';

const run = async () => {
  try {
    const r1 = await fetch(`${base}/`);
    console.log('/ ->', r1.status);
    console.log(await r1.json());

    const r2 = await fetch(`${base}/api/blogs`);
    console.log('/api/blogs ->', r2.status);
    const blogs = await r2.json();
    console.log('blogs count:', Array.isArray(blogs) ? blogs.length : 'not array');
  } catch (err) {
    console.error('Check error', err.message);
  }
};

run();
