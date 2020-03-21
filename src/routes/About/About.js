import { h, Component } from 'preact';
import { lazy, Suspense } from 'preact/compat';

import { scrollToAnchor, maxMatchMedia, getDaysFromNow } from '@utils';

import Loader from '@components/Loader';

import AboutLanding from './AboutLanding';
import AboutEngine from './AboutEngine';

const AboutRhythmic = lazy(() =>
    import(
        /* webpackChunkName: "AboutRhythmic" */
        /* webpackPreload: true */
        './AboutRhythmic'
    )
);

const AboutProject = lazy(() =>
    import(
        /* webpackChunkName: "AboutProject" */
        /* webpackPreload: true */
        './AboutProject'
    )
);

import {
    Link,
    Footer
} from '@styles/components';

export default class About extends Component {
    state = { innerWidth: window.innerWidth };
    mediaQuery = maxMatchMedia(800);
    changeTitle = () => {
        document.title = `POETIC PRAXIS | ${
            this.props.lang === 'ru' ? 'ГЛАВНАЯ' : 'HOME'
        }`;
    };
    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.changeTitle();
        }
    }
    componentDidMount() {
        this.changeTitle();

        window.scrollTo(0, 0);

        scrollToAnchor();

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        if (window.innerWidth !== this.state.innerWidth) {
            this.setState({
                innerWidth: window.innerWidth
            });
        }
    };

    render() {
        const { lang = 'ru' } = this.props;
        const isRusLang = lang === 'ru';
        const screenHeight = window.innerHeight;

        return (
            <section>
                
                <AboutLanding lang={lang} mediaQuery={this.mediaQuery} />

                <AboutEngine lang={lang} mediaQuery={this.mediaQuery} />

                <Suspense fallback={<Loader />}>
                    <AboutRhythmic lang={lang} mediaQuery={this.mediaQuery} />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <AboutProject
                        lang={lang}
                        mediaQuery={this.mediaQuery}
                        screenHeight={screenHeight}
                    />
                </Suspense>

                <Footer>
                    &copy; POETIC PRAXIS {getDaysFromNow(new Date(2016, 4, 25))}{' '}
                    {lang === 'ru' ? 'день' : 'day'}
                    {this.mediaQuery && <br />}
                    {' ▴ '}
                    {this.mediaQuery && <br />}
                    <Link href="mailto:thearchitect@poeticpraxis.ru">
                        {isRusLang
                            ? 'Жалобы и предложения'
                            : 'Complaints and suggestions'}
                    </Link>{' '}
                </Footer>
            </section>
        );
    }
}
