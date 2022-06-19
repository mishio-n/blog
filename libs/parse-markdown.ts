import rehypeStringify from 'rehype-stringify/lib';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import {
  admonitionAlert,
  admonitionAlertHandler,
  admonitionInfo,
  admonitionInfoHandler,
  admonitionWarn,
  admonitionWarnHandler,
} from '~/libs/remark-plugins/admonition';
import { bettingHandler, bettingPlugin } from '~/libs/remark-plugins/betting';
import { raceHandler, racePlugin } from '~/libs/remark-plugins/race';
import {
  raceplanHandler,
  raceplanPlugin,
} from '~/libs/remark-plugins/raceplan';
import { Markdown } from '~/schema';

export const parseMarkdown = (markdown: Markdown) =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(admonitionInfo)
    .use(admonitionWarn)
    .use(admonitionAlert)
    .use(racePlugin)
    .use(raceplanPlugin)
    .use(bettingPlugin)
    .use(remarkRehype, {
      handlers: {
        alert: admonitionAlertHandler,
        info: admonitionInfoHandler,
        warn: admonitionWarnHandler,
        race: raceHandler,
        raceplan: raceplanHandler,
        betting: bettingHandler,
      },
    })
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
