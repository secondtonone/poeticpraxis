import { h } from 'preact';
import { lazy, Suspense, useEffect } from 'preact/compat';

import useResizeUpdate from '@hooks/useResizeUpdate';
import useTitlePage from '@hooks/useTitlePage';

import scrollToAnchor from '@utils/scrollToAnchor';
import maxMatchMedia from '@utils/maxMatchMedia';
import getDaysFromNow from '@utils/getDaysFromNow';
import engSuffixNumber from '@utils/engSuffixNumber';

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
    Footer
} from '@styles/components';


const daysFromNow = getDaysFromNow(new Date(2016, 4, 25));
const engDateSuffix = engSuffixNumber(daysFromNow);

const About = ({ lang = 'ru' }) => {
    
    useResizeUpdate();

    const isRusLang = lang === 'ru';
    const title = isRusLang ? 'ГЛАВНАЯ' : 'MAIN PAGE';
    const mediaQuery = maxMatchMedia(800);

    useTitlePage(title);

    useEffect(() => {
        scrollToAnchor();
    }, []);

    return (
        <section>
            <AboutLanding lang={lang} mediaQuery={mediaQuery} />

            <AboutEngine lang={lang} mediaQuery={mediaQuery} />

            <Suspense fallback={<Loader />}>
                <AboutRhythmic lang={lang} mediaQuery={mediaQuery} />
            </Suspense>

            <Suspense fallback={<Loader />}>
                <AboutProject lang={lang} mediaQuery={mediaQuery} />
            </Suspense>

            <Footer>
                &copy; POETIC PRAXIS {daysFromNow}
                {isRusLang ? '-й день' : `${engDateSuffix} day`}
            </Footer>
        </section>
    );
    
}

/* class About extends Component {
    state = { innerWidth: window.innerWidth };
    mediaQuery = maxMatchMedia(800);

    daysFromNow = getDaysFromNow(new Date(2016, 4, 25));

    engDateSuffix = engSuffixNumber(this.daysFromNow);
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
                    />
                </Suspense>

                <Footer>
                    &copy; POETIC PRAXIS {this.daysFromNow}
                    {isRusLang ? '-й день' : `${this.engDateSuffix} day`}
                </Footer>
            </section>
        );
    }
}
 */
export default About;
