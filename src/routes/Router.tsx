import type { FunctionalComponent } from 'preact';
import { Suspense, lazy } from 'preact/compat';
import { Route, Routes } from 'react-router-dom';
import Loader from '@components/Loader';

const About = lazy(
  () =>
    import(
      /* webpackChunkName: "About", webpackPreload: true  */ './About'
    )
);

const Rhythmic = lazy(
  () => import(/* webpackChunkName: "Rhythmic", webpackPrefetch: true */ './Rhythmic')
);

const ImagesEngine = lazy(
  () => import(/* webpackChunkName: "ImagesEngine", webpackPrefetch: true */ './ImagesEngine')
);

const Router: FunctionalComponent = () => (
  <Routes>
    <Route
      path="/images-engine"
      element={(
        <Suspense fallback={<Loader />}>
          <ImagesEngine />
        </Suspense>
      )}
    />
    <Route
      path="/"
      element={(
        <Suspense fallback={<Loader />}>
          <About />
        </Suspense>
      )}
    />
    <Route
      path="/rhythmic"
      element={(
        <Suspense fallback={<Loader />}>
          <Rhythmic />
        </Suspense>
      )}
    />
    <Route
      path="*"
      element={(
        <Suspense fallback={<Loader />}>
          <About />
        </Suspense>
      )}
    />
  </Routes>
);

export default Router;
