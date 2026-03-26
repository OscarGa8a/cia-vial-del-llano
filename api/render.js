export default async function handler(req, res) {
  try {
    const { reqHandler } = await import('../dist/cia-vial-del-llano/server/server.mjs');
    return reqHandler(req, res);
  } catch (error) {
    console.error('SSR Handler Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
