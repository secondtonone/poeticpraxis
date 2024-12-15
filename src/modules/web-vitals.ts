import { type MetricWithAttribution } from 'web-vitals/src/types';
import { YANDEX_ID } from '@constants/analytics';

let analyticsData: Record<string, number | string | undefined> = {};

const sendToAnalytics = () => {
  if (ym) ym(YANDEX_ID, 'userParams', analyticsData);
};

const addTarget = <T extends MetricWithAttribution>({
  name,
  attribution,
  delta,
  value,
  id,
  navigationType,
  rating,
}: T) => {
  let target = '';

  switch (name)
  {
  case 'CLS':
    target = attribution.largestShiftTarget as string;
    break;
  case 'FID':
    target = attribution.eventTarget as string;
    break;
  case 'LCP':
    target = attribution.element as string;
    break;
  }

  return { name, value, delta, target, id, navigationType, rating };
};

const convertToObject = <
  T extends Partial<MetricWithAttribution> & { target: string | undefined }
>({
    name,
    ...props
  }: T) => {
  const propsWithName: Record<string, keyof T | string | undefined> = {
    [`${name}.name`]: name,
  };

  (Object.keys(props) as Array<keyof Omit<T, 'name'>>).forEach((key) => {
    //@ts-ignore
    propsWithName[`${name}.${key}`] = props[key];
  });

  return propsWithName;
};

const addToAnalyticsData = (
  data: Record<string, number | string | undefined>
) => (analyticsData = { ...analyticsData, ...data });

const metricHandler = <T extends MetricWithAttribution>(dataset: T) =>
  addToAnalyticsData(convertToObject(addTarget(dataset)));

const sendOnLast = <T extends MetricWithAttribution>(dataset: T) => {
  addToAnalyticsData(convertToObject(addTarget(dataset)));
  sendToAnalytics();
};

const enableRUM = async () => {
  const { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } = await import(
    'web-vitals/attribution'
  );

  onFID(metricHandler);
  onLCP(metricHandler);
  onFCP(metricHandler);
  onTTFB(metricHandler);
  onINP(metricHandler);

  onCLS(sendOnLast);
};

export default enableRUM;
