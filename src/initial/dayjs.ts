import dayjs from 'dayjs';
import UpdateLocale from 'dayjs/plugin/updateLocale';
import RelativeTime from 'dayjs/plugin/relativeTime';
import durationPlugin from 'dayjs/plugin/duration';
import sameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(UpdateLocale);
dayjs.extend(RelativeTime);
dayjs.extend(durationPlugin);
dayjs.extend(sameOrBeforePlugin);

dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '%d 秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年',
  },
});
