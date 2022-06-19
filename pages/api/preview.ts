import { NextApiRequest, NextApiResponse } from 'next';
import { microcmsClient } from '~/libs/client';
import { Blog } from '~/schema';

const isString = (queryValue: string | string[]): queryValue is string => {
  return typeof queryValue === 'string' && queryValue !== undefined;
};

const preview = async (request: NextApiRequest, response: NextApiResponse) => {
  const slug = request.query.slug;
  const draftKey = request.query.draftKey;

  if (!isString(slug)) {
    return response.status(404).end();
  }
  if (!isString(draftKey)) {
    return response.status(404).end();
  }

  const { id } = await microcmsClient.get<Blog>({
    endpoint: `blog/${slug}`,
    queries: { fields: 'id', draftKey },
  });

  if (!id) {
    return response.status(401).json({ message: 'Invalid slug' });
  }

  response.setPreviewData({
    id,
    draftKey,
  });
  response.writeHead(307, { Location: `/${id}` });
  response.end('Preview mode enabled');
  return;
};

export default preview;
